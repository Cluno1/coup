import React, { useEffect, useRef, useState } from "react";
import { Button, Flex } from "antd";
import FullScreenComponent from "../utl/fullScreen";
import MainContent from "./button/mainContent";
import lMRPlayerLayout from "./playersLayout/playersLayout";
import ownerLayout from "./playersLayout/ownerLayout";
import challengeConclusion from "./challengeConclusion";
import { background } from "./challengeConclusion/component";
import { ActConclusion } from "./actConclusion";
import { GameOver } from "./gameOver";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../utl/socketContext";
import { clientMessage, serverMessage } from "../utl/socket.message";
import OwnerLayout from "./playersLayout/ownerLayout";
import { message } from "antd";

/**
 * 比较两个对象是否相同
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
function deepCompareEntities(obj1, obj2) {
  // 如果两个对象是同一个引用，直接返回 true
  if (obj1 === obj2) return true;

  // 如果两个值都是 null，返回 true
  if (obj1 === null && obj2 === null) return true;

  // 如果其中一个为 null 或者不是对象，返回 false
  if (
    obj1 === null ||
    typeof obj1 !== "object" ||
    obj2 === null ||
    typeof obj2 !== "object"
  ) {
    return false;
  }

  // 获取两个对象的 keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 如果 keys 的数量不同，返回 false
  if (keys1.length !== keys2.length) return false;

  // 遍历 keys，递归比较每个属性
  for (let key of keys1) {
    if (!keys2.includes(key) || !deepCompareEntities(obj1[key], obj2[key])) {
      return false;
    }
  }

  // 如果所有属性都相同，返回 true
  return true;
}

export default function Room() {
  const location = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  //用户信息,房间id
  const user = useRef(null);
  const roomId = useRef(null);
  const socket = useSocket();

  const [timeDifference, setTimeDifference] = useState("00:00:00");
  //后端更改   单回合提出质疑的玩家的id
  const [challengerIdArray, setChallengerIdArray] = useState([]);
  // 用于存储初始时间
  const startTimeRef = useRef(null);
  //后端更改   房间信息
  const [roomBase, setRoomBase] = useState({
    playerNum: -1, //玩家人数
    time: "00:00:00",
    round: 0, //第几回合
    treasuryReserve: 0, //国库里的金币数量
    courtDeckNum: 0, //牌数
    courtDeck: [], //牌堆牌数
    gameOver: false, //是否游戏结束
    winnerId: -1,
  });
  //主玩家
  const [owner, setOwner] = useState({
    id: -1,
    avatar: "",
    name: "",
    characterCardNum: 0,
    characterCards: [],
    coin: 0,
    allegiance: false,
    //对局信息
    isDead: false,
    assists: 0, //助攻
    kill: 0, //击杀数
    challenge: 0, //提出质疑数
    assistsKilledId: 0, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 0, //被最后一击的人的id
  });
  const player1 = {
    id: -1,
    avatar: "",
    name: "",
    characterCardNum: 0,
    characterCards: null,
    coin: 0,
    allegiance: false,
    //对局信息
    isDead: false,
    assists: 0, //助攻
    kill: 0, //击杀数
    challenge: 0, //提出质疑数
    assistsKilledId: 0, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 0, //被最后一击的人的id
  };
  const player2 = {
    id: -1,
    avatar: "",
    name: "",
    characterCardNum: 0,
    characterCards: null,
    coin: 0,
    allegiance: false,
    //对局信息
    isDead: false,
    assists: 0, //助攻
    kill: 0, //击杀数
    challenge: 0, //提出质疑数
    assistsKilledId: 0, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 0, //被最后一击的人的id
  };
  const [players, setPlayers] = useState([player2, player1]);

  //后端更改    单回合对局信息
  const [actionRecord, setActionRecord] = useState({
    actionPlayerId: -1, //行动玩家id
    period: "Act", //'Act','ActChallenge','ChallengeConclusion','Block','BlockChallenge',''ChallengeConclusion'','ActConclusion'
    victimPlayerId: -1, //被攻击玩家id
    character: "", //行动玩家声明的角色
    actionName: "", //行动玩家作的行动
    victimCharacter: "", //被攻击玩家的声明角色
    victimBlock: "", //被攻击玩家所阻止的行动
    actConclusion: false, //行动是否要成功执行
    checkCourt: [], //如果是执行交换牌或看牌的行动,该条数组里面是牌的名称
    //'ChallengeConclusion'时候需要更新质疑结果
    challengeConclusion: {
      challenger: null, //质疑的玩家
      actor: null, //行动的玩家
      actorCharacter: "", //行动玩家声明的角色
      isSuccess: false, //是否成功质疑
    },
  });

  //处理时间
  useEffect(() => {
    // 记录组件挂载时的时间
    startTimeRef.current = new Date();
    // 每秒更新一次时间差
    const timerID = setInterval(() => {
      const now = new Date();
      const differenceInSeconds = Math.floor(
        (now - startTimeRef.current) / 1000
      ); // 计算时间差（秒）
      const formattedTime = formatTime(differenceInSeconds); // 格式化时间差
      setTimeDifference(formattedTime);
    }, 1000);

    // 组件卸载时清除定时器
    return () => {
      clearInterval(timerID);
    };
  }, []);
  // 将秒数格式化为 HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  //添加socket监听
  useEffect(() => {
    console.log("添加监听");
    const handleRoomBase = (data) => {
      console.log("房间信息更新 ", data);
      setRoomBase(data.roomBase);
    };

    const handleActionRecord = (data) => {
      console.log("对局信息 ", data);
      //每次对局信息更新，需要重新请求自己和玩家信息
      socket.emit(serverMessage.getRoomBase, {
        name: user.current?.name,
        roomId: roomId.current,
      });
      socket.emit(serverMessage.getOwner, {
        name: user.current?.name,
        roomId: roomId.current,
      });
      socket.emit(serverMessage.getOtherPlayers, {
        name: user.current?.name,
        roomId: roomId.current,
      });
      setActionRecord(data.actionRecord);
    };

    const handleAllOtherPlayers = (data) => {
      console.log("其他玩家数组更新 ", data);
      setPlayers(data.allOtherPlayers);
    };

    const handleOwner = (data) => {
      console.log("主玩家更新", data);
      setOwner(data.owner);
    };

    const handleChallengeIdArray = (data) => {
      console.log("质疑数组更新 ", data);
      setChallengerIdArray(data.challengeIdArray);
    };

    const handleActError = (data) => {
      console.log("行动报错 ", data);
      messageApi.open({
        type: "error",
        content: data.actError,
      });
      messageApi.open({
        type: "error",
        content: "报错原因可能是页面尚未完善导致用户操作错误,请再次尝试",
      });

      socket.emit(serverMessage.getActionRecord, {
        name: user.current?.name,
        roomId: roomId.current,
      });
    };

    socket.on(clientMessage.roomBase, handleRoomBase);
    socket.on(clientMessage.actionRecord, handleActionRecord);
    socket.on(clientMessage.allOtherPlayers, handleAllOtherPlayers);
    socket.on(clientMessage.owner, handleOwner);
    socket.on(clientMessage.challengeIdArray, handleChallengeIdArray);
    socket.on(clientMessage.actError, handleActError);

    // 清理函数
    return () => {
      console.log("清除监听");
      socket.off(clientMessage.roomBase, handleRoomBase);
      socket.off(clientMessage.actionRecord, handleActionRecord);
      socket.off(clientMessage.allOtherPlayers, handleAllOtherPlayers);
      socket.off(clientMessage.owner, handleOwner);
      socket.off(clientMessage.challengeIdArray, handleChallengeIdArray);
      socket.off(clientMessage.actError, handleActError);
    };
  }, []);

  // 检查 location.state 是否存在，以及是否包含 user 信息
  const userErr = useRef(false);
  useEffect(() => {
    console.log(location);
    if (!location.state?.user) {
      userErr.current = true;
      messageApi.info("房间不存在");
      setTimeout(() => {
        navigate("/error", { state: { message: "房间不存在" } });
      }, 1000);
    } else {
      user.current = location.state.user;
      roomId.current = location.state.roomId;
      //把这个客户端发送到后端存储
      socket.emit(serverMessage.setClientToMap, {
        userName: user.current?.name,
        roomId: roomId.current,
      });
      socket.emit(serverMessage.getActionRecord, {
        name: user.current?.name,
        roomId: roomId.current,
      });
    }
  }, [location, socket]);

  //判断进入challengeConclusion函数
  const [isChallengeConclusion, setIsChallengeConclusion] = useState(false);
  //判断进入ActConclusion函数
  const [isActConclusion, setIsActConclusion] = useState(false);

  //进入conclusion或ActConclusion阶段
  useEffect(() => {
    setIsChallengeConclusion(false);
    setIsActConclusion(false);

    if (actionRecord.period === "ChallengeConclusion") {
      setIsChallengeConclusion(true);
    } else if (actionRecord.period === "ActConclusion") {
      setIsActConclusion(true);
    }
  }, [actionRecord]);

  //进入game over阶段
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    setIsGameOver(roomBase.gameOver);
  }, [roomBase]);

  //返回players的layout数组
  const { playerLeft, playerMiddle, playerRight } = lMRPlayerLayout(
    players,
    owner,
    actionRecord,
    challengerIdArray
  ); //不包括owner的其他玩家队列,分为左 中 右 三个排序好的玩家数组

  //css
  const footerCSS = {
    position: "absolute",
    bottom: 0,
    marginBottom: "2px",
  };
  const mainCss = {
    minHeight: "80px",
    minWidth: "200px",
  };

  return (
    <>
      {contextHolder}
      {background("background")}
      <Flex
        justify="space-between"
        style={{
          position: "absolute",
          width: "100%",
        }}
      >
        <div
          style={{
            marginLeft: "5px",
            marginTop: "5px",
          }}
        >
          {userErr.current ? null : <FullScreenComponent />}
        </div>

        <div
          style={{
            marginRight: "15px",
            marginTop: "5px",
          }}
        >
          <Flex vertical align="flex-start">
            <span>时间:{timeDifference}</span>
            <span>回合:{roomBase.round}</span>
            <span>国库:{roomBase.treasuryReserve} coin</span>
            <span>剩余牌数:{roomBase.courtDeckNum}</span>
          </Flex>
        </div>
      </Flex>
      <Flex vertical>
        {/* 头部 */}

        <Flex justify="center">
          <Flex gap={"small"}>{playerMiddle}</Flex>
        </Flex>

        <Flex
          justify="space-between"
          align="flex-end"
          style={{ marginLeft: "5px", marginRight: "5px" }}
        >
          {/* 左边 */}
          <div>
            <Flex vertical gap={"small"}>
              {playerLeft}
            </Flex>
          </div>
          {/* 中间 */}
          <div style={mainCss}>
            <Flex justify="center" gap={"large"} align="center" style={mainCss}>
              <MainContent
                messageApi={messageApi}
                actionRecord={actionRecord}
                owner={owner}
                players={players}
                roomId={roomBase.roomId}
              />
            </Flex>
          </div>
          {/* 右边 */}
          <div>
            <Flex vertical gap={"small"}>
              {playerRight}
            </Flex>
          </div>
        </Flex>

        {/* 底部 */}
        <div style={footerCSS}>
          <Flex justify="center" style={{ width: "100vw" }}>
            <OwnerLayout
              owner={owner}
              players={players}
              actionRecord={actionRecord}
              challengerIdArray={challengerIdArray}
            />
          </Flex>
        </div>
      </Flex>
      {isChallengeConclusion
        ? challengeConclusion(
            roomId.current,
            owner,
            actionRecord.challengeConclusion?.challenger,
            actionRecord.challengeConclusion?.actor,
            actionRecord.challengeConclusion?.actorCharacter,
            actionRecord.challengeConclusion?.isSuccess
          )
        : null}
      {isActConclusion ? (
        <ActConclusion
          actionRecord={actionRecord}
          players={players}
          owner={owner}
          roomId={roomId.current}
        />
      ) : null}
      {isGameOver ? (
        <GameOver roomBase={roomBase} players={players} owner={owner} />
      ) : null}
    </>
  );
}
