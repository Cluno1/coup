import React, { useEffect, useState } from "react";
import { Button, Flex } from "antd";
import FullScreenComponent from "../utls/fullScreen";
import MainContent from "./button/mainContent";
import lMRPlayerLayout from "./playersLayout/playersLayout";
import ownerLayout from "./playersLayout/ownerLayout";
import challengeConclusion from "./challengeConclusion";
import { background } from "./challengeConclusion/component";
import { ActConclusion } from "./actConclusion";
import { GameOver } from "./gameOver";

export default function Room() {
  //后端更改   房间信息
  const [roomBase, setRoomBase] = useState({
    playerNum: 6, //玩家人数
    time: "3:20",
    round: 5, //第几回合
    treasuryReserve: 3, //国库里的金币数量
    courtDeckNum: 15, //牌数
    courtDeck: [2, 2, 2, 2, 2, 5], //牌堆牌数

    gameOver: true, //是否游戏结束
    winnerId: 1,
  });

  //后端更改   单回合提出质疑的玩家的id
  const [challengerIdArray, setChallengerIdArray] = useState([2, 4]);

  //2-10 人

  const [owner, setOwner] = useState({
    // 基本信息
    id: 2,
    avatar:
      "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/players-avatar/coup2.jpg", //头像
    name: "Cluno",
    characterCardNum: 2,
    characterCards: [5, 0],
    coin: 4,
    allegiance: true, //阵营 reformist==false or loyalist==true,
    //对局信息
    isDead: false,
    assists: 0, //助攻杀人数量
    kill: 1, //击杀数
    challenge: 1, //提出质疑数
    assistsKilledId: 1, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 1, //被最后一击的人的id
  });

  const player1 = {
    id: 3,
    avatar:
      "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/players-avatar/coup1.jpeg", //头像
    name: "james",
    characterCardNum: 0,
    characterCards: null,
    coin: 2,
    allegiance: true,
    //对局信息
    isDead: false,
    assists: 0, //助攻
    kill: 1, //击杀数
    challenge: 1, //提出质疑数
    assistsKilledId: 1, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 1, //被最后一击的人的id
  };
  const player2 = {
    id: 1,
    avatar:
      "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/players-avatar/coup4.jpg", //头像
    name: "jason",
    characterCardNum: 0,
    characterCards: null,
    coin: 2,
    allegiance: false,
    //对局信息
    isDead: false,
    assists: 2, //助攻
    kill: 1, //击杀数
    challenge: 1, //提出质疑数
    assistsKilledId: 1, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 1, //被最后一击的人的id
  };
  const player3 = {
    id: 4,
    avatar:
      "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/players-avatar/coup3.png", //头像
    name: "jerry",
    characterCardNum: 0,
    characterCards: null,
    coin: 8,
    allegiance: true,
    //对局信息
    isDead: false,
    assists: 0, //助攻
    kill: 1, //击杀数
    challenge: 1, //提出质疑数
    assistsKilledId: 1, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 1, //被最后一击的人的id
  };
  const player4 = {
    id: 5,
    avatar:
      "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/players-avatar/coup2.jpg", //头像
    name: "tom",
    characterCardNum: 0,
    characterCards: null,
    coin: 8,
    allegiance: true,
    //对局信息
    isDead: false,
    assists: 0, //助攻
    kill: 1, //击杀数
    challenge: 1, //提出质疑数
    assistsKilledId: 1, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 1, //被最后一击的人的id
  };
  const player5 = {
    id: 6,
    avatar:
      "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/players-avatar/coup1.jpeg", //头像
    name: "暴龙战士",
    characterCardNum: 0,
    characterCards: null,
    coin: 8,
    allegiance: true,
    //对局信息
    isDead: false,
    assists: 0, //助攻
    kill: 1, //击杀数
    challenge: 1, //提出质疑数
    assistsKilledId: 1, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 1, //被最后一击的人的id
  };
  const player6 = {
    id: 7,
    avatar:
      "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/players-avatar/coup4.jpg", //头像
    name: "lily",
    characterCardNum: 0,
    characterCards: null,
    coin: 8,
    allegiance: true,
    //对局信息
    isDead: false,
    assists: 0, //助攻
    kill: 1, //击杀数
    challenge: 1, //提出质疑数
    assistsKilledId: 1, // 被助攻杀的人的id，即被人砍半条命的人的id
    Killed: 1, //被最后一击的人的id
  };

  const [players, setPlayer] = useState([
    player1,
    player2,
    player3,
    player4,
    player5,
    player6,
  ]);

  //后端更改    单回合对局信息
  const [actionRecord, setActionRecord] = useState({
    actionPlayerId: 3, //行动玩家id
    period: "Act", //'Act','ActChallenge','ChallengeConclusion','Block','BlockChallenge',''ChallengeConclusion'','ActConclusion'
    victimPlayerId: 1, //被攻击玩家id
    character: "Ambassador", //行动玩家声明的角色
    actionName: "Examine", //行动玩家作的行动
    victimCharacter: "Contessa", //被攻击玩家的声明角色
    victimBlock: "Blocks Assassination", //被攻击玩家所阻止的行动
    actConclusion: true, //行动是否要成功执行
    checkCourt: ["Assassin", "Ambassador"], //如果是执行交换牌或看牌的行动,该条数组里面是牌的名称
    //'ChallengeConclusion'时候需要更新质疑结果
    challengeConclusion: {
      challenger: player2, //质疑的玩家
      actor: player1, //行动的玩家
      actorCharacter: "Assassin", //行动玩家声明的角色
      isSuccess: true, //是否成功质疑
    },
  });

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
  }, [roomBase.gameOver]);

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
    minHeight: "150px",
    minWidth: "200px",
  };

  return (
    <>
      {background("background")}
      <Flex vertical gap={"small"}>
        {/* 头部 */}
        <div
          style={{ marginTop: "5px", marginLeft: "15px", marginRight: "10px" }}
        >
          <Flex justify="space-between">
            <FullScreenComponent />
            <Flex gap={"small"}>{playerMiddle}</Flex>
            <div>
              <Flex vertical align="flex-start">
                <span>时间:{roomBase.time}</span>
                <span>回合:{roomBase.round}</span>
                <span>国库:{roomBase.treasuryReserve} coin</span>
                <span>剩余牌数:{roomBase.courtDeckNum}</span>
              </Flex>
            </div>
          </Flex>
        </div>

        <div>
          <Flex
            justify="space-between"
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            <div>
              <Flex vertical gap={"small"}>
                {playerLeft}
              </Flex>
            </div>
            {/* 中间 */}
            <div style={mainCss}>
              <Flex
                justify="center"
                gap={"large"}
                align="center"
                style={mainCss}
              >
                <MainContent
                  actionRecord={actionRecord}
                  owner={owner}
                  players={players}
                />
              </Flex>
            </div>

            <div>
              <Flex vertical gap={"small"}>
                {playerRight}
              </Flex>
            </div>
          </Flex>
        </div>
        {/* 底部 */}
        <div style={footerCSS}>
          <Flex justify="center" style={{ width: "100vw" }}>
            {ownerLayout(owner, players, actionRecord, challengerIdArray)}
          </Flex>
        </div>
      </Flex>
      {isChallengeConclusion
        ? challengeConclusion(
            owner,
            ...Object.values(actionRecord.challengeConclusion)
          )
        : null}
      {isActConclusion ? (
        <ActConclusion
          actionRecord={actionRecord}
          players={players}
          owner={owner}
        />
      ) : null}
      {isGameOver ? (
        <GameOver roomBase={roomBase} players={players} owner={owner} />
      ) : null}
    </>
  );
}
