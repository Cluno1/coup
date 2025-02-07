import { judgeAllegiance } from "./judgeAllegiance";
import { Image } from "antd";
import { Flex } from "antd";
import React from "react";
import characterCards from "../character";
import "./playersLayout.css";
import {
  ActMessage,
  BlockMessage,
  isChallenger,
  MaskComponent,
  MessageComponent,
} from "./component";

/**const owner={
    id:2,
    img:'/public/logo192.png',
    name:'cluno',
    characterCardNum:2,
    characterCards:[1,3],
    coin:4,
    allegiance:true,//reformist==false or loyalist==true
  }  */

/**
 *
 * @param {object} owner 主玩家
 * @param {Array} players 其他玩家对象数组
 * @param {object} actionRecord 对局信息对象
 * @param {Array<string>} challengerIdArray 是否是挑战玩家对象
 * @returns
 */
export default function ownerLayout(
  owner,
  players,
  actionRecord,
  challengerIdArray
) {
  const cards = owner.characterCards.map((cardIndex, index) => {
    if (cardIndex > 0) {
      return (
        <Flex vertical align="center" justify="center" key={index}>
          <Image
            preview={false}
            width={100}
            src={characterCards[cardIndex].img}
          />
          <b>{characterCards[cardIndex].name}</b>
        </Flex>
      );
    } else {
      return null;
    }
  });

  //主要的owner layout，其他是外接的补丁
  let commonLayout = (
    <Flex gap={"small"} align="center" justify="center" className="bg-mask">
      <Flex vertical align="center" justify="center">
        <Image preview={false} width={60} src={owner.avatar} />
        <b>{owner.name}</b>
        <span>
          player<b>{owner.id}</b>
        </span>
      </Flex>
      {cards}
      <Flex vertical align="center" justify="center">
        <Image
          preview={false}
          width={60}
          src={judgeAllegiance(owner.allegiance).img}
        />
        <span>
          coin:<b>{owner.coin}</b>
        </span>
      </Flex>
    </Flex>
  );

  if (actionRecord.actionPlayerId === owner.id) {
    //主玩家是行动玩家
    commonLayout = (
      <div style={{ backgroundColor: "var(--attacker-color)" }}>
        {commonLayout}
      </div>
    );
    //'Act'不用管

    const message = (
      <ActMessage actionRecord={actionRecord} players={players} owner={owner} />
    );

    return (
      <MessageComponent
        component={commonLayout}
        messageComponent={message}
        direction={"top"}
      />
    );
  } else {
    //主玩家是非行动玩家

    if (
      //主玩家是被攻击玩家且阶段不是Act
      actionRecord.period != "Act" &&
      actionRecord.victimPlayerId === owner.id
    ) {
      commonLayout = (
        <div
          style={{
            backgroundColor: "var(--owner-victim-color)",
            borderRadius: "10px",
          }}
        >
          {commonLayout}
        </div>
      );
      
      if (actionRecord.period === "BlockChallenge") {
        //是受击玩家且打印block信息
        const message = <BlockMessage actionRecord={actionRecord} />;
        return (
          <MessageComponent
            component={commonLayout}
            messageComponent={message}
            direction={"top"}
          />
        );
      }
    }

    if (isChallenger(actionRecord, challengerIdArray, owner)) {
      //是质疑者的话添加补丁话语
      return (
        <MessageComponent
          component={commonLayout}
          messageComponent={<p>质疑</p>}
          direction={"top"}
        />
      );
    } else {
      return commonLayout;
    }
  }
}
