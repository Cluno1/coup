import { Button } from "antd";
import Instructions from "./instruction";
import { Popover } from "antd";
import characterCards, { commonActions } from "../character";
import { Fragment, useEffect, useState } from "react";
import { Flex } from "antd";
import { useSocket } from "../../utl/socketContext";
import { serverMessage } from "../../utl/socket.message";
import { DownOutlined } from "@ant-design/icons";
import { CommonProgress } from "../challengeConclusion/component";

//中间那个控制按钮的面板
export default function MainContent({
  messageApi,
  roomId,
  actionRecord,
  owner,
  players,
}) {
  const [isAct, setIsAct] = useState(false); //行动按钮是否开放
  const [isChallenge, setIsChallenge] = useState(false); //挑战按钮是否开放
  const [isBlock, setIsBlock] = useState(false); //阻止按钮是否开放

  //'Act','ActChallenge','ChallengeConclusion','Block','BlockChallenge',''ChallengeConclusion'','ActConclusion'
  useEffect(() => {
    setIsAct(false);
    setIsChallenge(false);
    setIsBlock(false);

    if (actionRecord.actionPlayerId === owner.id) {
      //主玩家是行动玩家
      if (actionRecord.period === "Act") {
        setIsAct(true);
      } else if (actionRecord.period === "BlockChallenge") {
        setIsChallenge(true);
      }
    } else {
      //玩家非行动玩家
      if (actionRecord.period === "ActChallenge") {
        setIsChallenge(true);
      } else if (
        actionRecord.victimPlayerId === owner.id &&
        actionRecord.period === "Block"
      ) {
        //受击玩家
        setIsBlock(true);
      } else if (
        actionRecord.victimPlayerId !== owner.id &&
        actionRecord.period === "BlockChallenge"
      ) {
        //非受击玩家,阶段是BlockChallenge
        setIsChallenge(true);
      } else if (
        actionRecord.period === "Block" &&
        actionRecord.actionName === "Foreign Aid"
      ) {
        setIsBlock(true);
      }
    }
  }, [actionRecord, owner]);

  return (
    <Flex gap="small" vertical align="center">
      <Flex gap="small" align="flex-end">
        <Instructions />
        <ActionButton
          messageApi={messageApi}
          disabled={!isAct}
          players={players}
          roomId={roomId}
          ownerId={owner.id}
        />
        <ChallengeButton
          roomId={roomId}
          ownerId={owner.id}
          disabled={!isChallenge}
          ButtonTopText={
            actionRecord.period === "ActChallenge"
              ? actionRecord.character
              : actionRecord.period === "BlockChallenge"
              ? actionRecord.victimCharacter
              : ""
          }
        />
        <BlockButton
          messageApi={messageApi}
          disabled={!isBlock}
          roomId={roomId}
          ownerId={owner.id}
        />
      </Flex>
      {isAct ? (
        <CommonProgress
          nowTime={0}
          isInterval={true}
          totalTime={15}
          isShow={true}
        />
      ) : null}
      {isChallenge ? (
        <CommonProgress
          nowTime={0}
          isInterval={true}
          totalTime={15}
          isShow={true}
        />
      ) : null}
      {isBlock ? (
        <CommonProgress
          nowTime={0}
          isInterval={true}
          totalTime={15}
          isShow={true}
        />
      ) : null}
    </Flex>
  );
}

//行动按钮
function ActionButton({ messageApi,disabled, players, roomId, ownerId }) {
  const [actionChoose, setActionChoose] = useState("请选择"); //第一列动作名称记录
  const [actionVictim, setActionVictim] = useState(""); //第二列具体的行动所指的对象

  const [afterClick, setAfterClick] = useState(false);
  useEffect(() => setAfterClick(false), [disabled]);

  const playersName = players.map((p) => p.name); //playersName其他玩家昵称
  const allPlayersName = [...playersName, "myself"]; //包括自己的所有玩家昵称

  const socket = useSocket();
  function handleClick() {
    if (actionChoose === "请选择") {
      messageApi.info("请选择行动");
    } else {
      let character = null; //寻找玩家行动的是哪个角色
      characterCards.forEach((c) => {
        if (Array.isArray(c.actions)) {
          //审判官的情况
          //审判官的行动数组
          c.actions.forEach((a) => {
            if (a === actionChoose) {
              character = c.name;
            }
          });
        }
        if (c.actions === actionChoose) {
          character = c.name;
        }
      });
      let victimId = -1; //寻找玩家行动对应的是哪个受害者玩家id，如果没有，返回-1
      if (actionVictim === "myself") {
        victimId = ownerId;
      } else {
        players.forEach((p) => {
          if (p.name === actionVictim) {
            victimId = p.id;
          }
        });
      }

      setAfterClick(true);
      //发送行动的消息
      socket.emit(serverMessage.action, {
        character,
        actionName: actionChoose,
        actionVictimId: victimId,
        roomId,
      });
      setTimeout(() => {
        setAfterClick(false);
      }, 3000);
    }
  }
  //更改了动作,立马更新对应玩家
  useEffect(() => setActionVictim(""), [actionChoose]);

  let actionName = []; //行动的名称list
  commonActions.forEach((c) => {
    //Coup Conversion
    if (c.actions === "Conversion") {
      let con = actSpan(c.actions, actionChoose, setActionChoose);
      actionName.push(
        actPopover(
          con,
          allPlayersName,
          false,
          setActionVictim,
          actionChoose === "Conversion" ? actionVictim : null
        )
      );
      return;
    } else if (c.actions === "Coup") {
      let con = actSpan(c.actions, actionChoose, setActionChoose);
      actionName.push(
        actPopover(
          con,
          playersName,
          false,
          setActionVictim,
          actionChoose === "Coup" ? actionVictim : null
        )
      );
      return;
    }
    //income foreignAid embezzlement
    actionName.push(actSpan(c.actions, actionChoose, setActionChoose));
  });
  characterCards.forEach((c) => {
    //contessa
    if (!c.actions) {
      return;
    }
    //inquisitor
    else if (Array.isArray(c.actions)) {
      c.actions.map((act) => {
        if (act === "Examine") {
          let con = actSpan(
            act,
            actionChoose,
            setActionChoose,
            "(" + c.name + ")"
          );
          actionName.push(
            actPopover(
              con,
              playersName,
              false,
              setActionVictim,
              actionChoose === "Examine" ? actionVictim : null
            )
          );
          return;
        }
        actionName.push(
          actSpan(act, actionChoose, setActionChoose, "(" + c.name + ")")
        );
      });
      return;
    }
    //assassinate
    else if (c.actions === "Assassinate") {
      let con = actSpan(
        c.actions,
        actionChoose,
        setActionChoose,
        "(" + c.name + ")"
      );
      actionName.push(
        actPopover(
          con,
          playersName,
          false,
          setActionVictim,
          actionChoose === "Assassinate" ? actionVictim : null
        )
      );
      return;
    } else if (c.actions === "Steal") {
      let con = actSpan(
        c.actions,
        actionChoose,
        setActionChoose,
        "(" + c.name + ")"
      );
      actionName.push(
        actPopover(
          con,
          playersName,
          false,
          setActionVictim,
          actionChoose === "Steal" ? actionVictim : null
        )
      );
      return;
    }
    //
    actionName.push(
      actSpan(c.actions, actionChoose, setActionChoose, "(" + c.name + ")")
    );
  });

  //行动的按钮
  const actButton = (
    <Button type="link">
      <Flex align="center" gap={"small"}>
        <span>
          {actionVictim ? actionChoose + " " + actionVictim : actionChoose}
        </span>
        <DownOutlined />
      </Flex>
    </Button>
  );
  return (
    <Flex vertical gap={"small"}>
      {actPopover(actButton, actionName, true)}
      <Button
        type="primary"
        disabled={disabled || afterClick} //disabled=true 禁止      disabled=false 开放 | false
        onClick={handleClick}
      >
        行动
      </Button>
    </Flex>
  );
}

/**
 * 返回气泡卡片包裹的组件
 * @param {component} component
 * @param {component or list} dataList
 * @param {boolean} isDataListComponent
 * @param {function} selectData
 * @param {data} activeColumn
 * @returns
 */
function actPopover(
  component,
  dataList,
  isDataListComponent,
  selectData,
  activeColumn
) {
  return (
    <>
      <Popover
        placement="right"
        content={() => (
          <Flex vertical>
            {isDataListComponent
              ? dataList
              : dataList.map((name) => actSpan(name, activeColumn, selectData))}
          </Flex>
        )}
        autoAdjustOverflow
      >
        {component}
      </Popover>
    </>
  );
}

/**
 * 返回span包裹的组件
 * @param {*} text
 * @param {string} active 被选中的列
 * @param {*} setActive 选中函数
 * @param {*} addText
 * @returns
 */
function actSpan(text, active, setActive, addText) {
  //css
  const activeCss = {
    backgroundColor: "gray",
  };

  return (
    <span
      style={text === active ? activeCss : null}
      onClick={() => setActive(text)}
    >
      {text}
      {addText ? addText : null}
    </span>
  );
}

//质疑按钮
function ChallengeButton({
  disabled,
  ButtonTopText = "质疑",
  ownerId,
  roomId,
}) {
  const [afterClick, setAfterClick] = useState(false);
  const socket = useSocket();
  useEffect(() => setAfterClick(false), [disabled]);
  function handleClick() {
    setAfterClick(true);

    //发送质疑的消息
    socket.emit(serverMessage.challenge, {
      playerId: ownerId,
      roomId,
    });
  }
  return (
    <>
      <Flex vertical align="center" justify="center" gap={"small"}>
        <span>{ButtonTopText}</span>
        <Button
          type="primary"
          disabled={disabled || afterClick}
          onClick={handleClick}
        >
          质疑
        </Button>
      </Flex>
    </>
  );
}
//阻止按钮
function BlockButton({ messageApi, disabled, roomId, ownerId }) {
  const [afterClick, setAfterClick] = useState(false);
  useEffect(() => setAfterClick(false), []);
  const socket = useSocket();

  const [blocks, setBlocks] = useState("请选择"); //这里是角色名称

  const button = (
    <Button type="link">
      <Flex align="center" gap={"small"}>
        <span>{blocks}</span>
        <DownOutlined />
      </Flex>
    </Button>
  );

  const b = characterCards.map((character) => {
    if (character.blocks) {
      return actSpan(
        character.name,
        blocks,
        setBlocks,
        "(" + character.blocks + ")"
      );
    }
    return null;
  });

  function handleClick() {
    if (blocks === "请选择") {
      messageApi.info("请选择行动");
    } else {
      let b = blocks,
        blockName = null;
      if (b === "不阻止") {
        b = "";
      } else {
        characterCards.forEach((c) => {
          if (c.name === b) {
            blockName = c.blocks;
          }
        });
      }
      socket.emit(serverMessage.block, {
        blockName: blockName,
        character: b,
        roomId,
        playerId: ownerId,
      });
      setAfterClick(true);
    }
  }
  return (
    <Flex vertical gap={"small"}>
      {actPopover(button, b, true)}
      <Button
        type="primary"
        disabled={disabled || afterClick}
        onClick={handleClick}
      >
        阻止
      </Button>
    </Flex>
  );
}
//
