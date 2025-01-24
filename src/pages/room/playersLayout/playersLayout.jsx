import { judgeAllegiance } from "./judgeAllegiance";
import { Image } from "antd";
import { Flex } from "antd";
import React from "react";
import {isChallenger, MaskComponent,MessageComponent} from './component'


/**
   * 
   * @param {Array<Object>} player  玩家数组
   * const player=[{
    id:3,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'james',
    characterCardNum:2,
    characterCards:null,
    coin:2,
    allegiance:true,
  },] 
   * @param {Object} owner
   * @param {Object} actionRecord  回合信息对象
   * actionRecord={
    actionPlayerId:3,  //行动玩家
    period:'ActChallenge',//'Act','ActChallenge','ChallengeConclusion','ActConclusion','Block','BlockChallenge',''ChallengeConclusion'','BlockConclusion'
    victimPlayerId:1,  //被攻击玩家
    character:'Assassin',  //行动玩家声明的角色
    actionName:'Assassinate',//行动玩家作的行动
    victimCharacter:'',  //被攻击玩家的声明角色
    victimBlock:''     //被攻击玩家所阻止的行动
  }
   * @returns 返回left middle right ,playerLayout的数组
   */
export default function lMRPlayerLayout(
  player,
  owner,
  actionRecord,
  challengerIdArray
) {
  // 辅助函数来检查数组是否已经是最终形式
  function judge(players, ownerId) {
    function isAlreadyInLayout(players, ownerId) {
      for (let i = 0; i < players.length - 1; i++) {
        if (players[i] < ownerId) {
          if (players[i + 1] < ownerId) {
            if (players[i] > players[i + 1]) {
              continue;
            } else {
              return false;
            }
          }
        } else {
          if (players[i] > players[i + 1]) {
            continue;
          } else {
            return false;
          }
        }
      }

      return true;
    }

    // 如果数组已经是最终形式，直接返回
    if (isAlreadyInLayout(players, ownerId)) {
      return players;
    }

    // 进行排序
    const sortedPlayers = players.sort((a, b) => b.id - a.id);

    // 使用一次遍历来分割数组，并直接构建最终数组
    let index = sortedPlayers.findIndex((player) => player.id <= ownerId);

    if (index === -1) {
      // 所有player的id都大于ownerId
      return sortedPlayers;
    } else if (index === 0) {
      // 所有player的id都小于等于ownerId
      return sortedPlayers;
    } else {
      // 分割数组并合并
      const higher = sortedPlayers.slice(0, index);
      const lower = sortedPlayers.slice(index);
      return [...lower, ...higher];
    }
  }
  player = judge(player, owner.id);

  //图片宽度
  let imgWidth = 120;
  if (player.length <= 3 && player.length > 1) {
    imgWidth = imgWidth / 2;
  } else if (player.length == 1) {
  } else {
    imgWidth = imgWidth / 3;
  }

  const players = [...player];
  const playersTemp=player;
  //分别按照逆时针顺序排序好左中右数组
  let playerLeft = [];
  let playerMiddle = [];
  let playerRight = [];

  if (player.length <= 3) {
    playerMiddle = players;
  } else if (player.length == 4) {
    playerLeft.push(players.shift());
    playerMiddle = players;
  } else if (player.length == 5) {
    playerLeft.push(players.shift());
    playerRight.push(players.pop());
    playerMiddle = players;
  } else if (player.length == 6) {
    playerLeft.push(players[1]);
    playerLeft.push(players[0]);
    players.shift();
    players.shift();
    playerRight.push(players.pop());
    playerMiddle = players;
  } else if (player.length == 7) {
    playerLeft.push(players[1]);
    playerLeft.push(players[0]);
    playerRight.push(players[5]);
    playerRight.push(players[6]);
    players.shift();
    players.shift();
    players.pop();
    players.pop();
    playerMiddle = players;
  }

  /**
   * 为每一个玩家数组（左中右）搞ui
   * @param {Array} playersArray
   * @param {string} direction
   */
  function layout(playersArray, direction) {
    //每一个玩家的ui
    return playersArray.map((player) => {

      
      
      //逻辑判断，对于该玩家
      if (actionRecord.actionPlayerId === player.id) {//该玩家是该回合行动的玩家
        //'Act','ActChallenge','ChallengeConclusion','ActConclusion','Block','BlockChallenge',''ChallengeConclusion'','BlockConclusion'
        const isAct = actionRecord.period === "Act";
        const mc = (
          <MaskComponent
            playerComponent={
              <PlayerLayout player={player} imgWidth={imgWidth} />
            }
            maskString={isAct ? "行动中..." : "行动"}
            maskColor="var(--attacker-color)"
          />
        );
        if (actionRecord.period === "ActChallenge") {//打印行动玩家的信息

          //act的信息：
          let victimName = null;
          if (actionRecord.victimPlayerId > 0) {
            if (owner.id === actionRecord.victimPlayerId) {
              victimName = owner.name;
            } else {
              playersTemp.forEach((p) => {
                if (p.id === actionRecord.victimPlayerId) victimName = p.name;
              });
            }
          }

          const message = (
            <>
              <p>
                我拥有<b>{actionRecord.character}</b>
              </p>
              <p>使用{actionRecord.actionName}</p>
              {victimName ? <p>对待{victimName}</p> : victimName}
            </>
          );
          return (
            <MessageComponent
              component={mc}
              direction={direction}
              messageComponent={message}
            />
          );
        } else {  
          return mc;
        }
      } else if (actionRecord.period!='Act'&&actionRecord.victimPlayerId === player.id) {//该玩家是受攻击的玩家
        const mc = (
          <MaskComponent
            playerComponent={
              <PlayerLayout player={player} imgWidth={imgWidth} />
            }
            maskString="被攻击"
            maskColor="var(--victim-color)"
          />
        );

        if (isChallenger(actionRecord,challengerIdArray,player)) {//判断是否提出了质疑
          
          return (
            <MessageComponent
              component={mc}
              messageComponent={<p>质疑</p>}
              direction={direction}
            />
          );
        } else {
          return mc;
        }
      }

      const pl = <PlayerLayout player={player} imgWidth={imgWidth} />;
      
      if (isChallenger(actionRecord,challengerIdArray,player)) {//判断是否提出了质疑
        
        return (
          <MessageComponent
            component={pl}
            messageComponent={<p>质疑</p>}
            direction={direction}
          />
        );
      } else {
        return pl;
      }
    });
  }


  let pl = layout(playerLeft,'right');
  let pm = layout(playerMiddle,'bottom');
  let pr = layout(playerRight,'left');



  return {
    playerLeft:pl,
    playerMiddle:pm,
    playerRight:pr,
  };
}

//返回牌数量
const court = (player, imgWidth) => {
  let courtDeck = [];
  for (let i = 0; i < player.characterCardNum; i++) {
    courtDeck.push(
      <>
        <Image
          preview={false}
          width={imgWidth / 1.3}
          src={
            "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/courtDeck-background.jpg"
          }
        />
      </>
    );
  }
  return courtDeck;
};

/**
 * @returns  组件 返回正常layout
 */
function PlayerLayout({ player, imgWidth }) {
  return (
    <div style={{ border: "1px solid" }}>
      <Flex align="center" justify="center">
        <Flex vertical align="center" justify="center">
          <Image preview={false} width={imgWidth / 1.3} src={player.avatar} />
          <b>{player.name}</b>
          <span>
            player<b>{player.id}</b>
          </span>
        </Flex>
        <Flex>{court(player, imgWidth)}</Flex>

        <Flex vertical align="center" justify="center">
          <Image
            preview={false}
            width={imgWidth / 2}
            src={judgeAllegiance(player.allegiance).img}
          />
          <span>
            coin:<b>{player.coin}</b>
          </span>
        </Flex>
      </Flex>
    </div>
  );
}


