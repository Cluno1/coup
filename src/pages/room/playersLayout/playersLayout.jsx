import { judgeAllegiance} from './judgeAllegiance'
import {Image } from "antd";
import { Flex } from "antd";
import React from "react";


  /**
   * 
   * @param {Array} player  玩家数组
   * const player=[{
    id:3,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'james',
    characterCardNum:2,
    characterCards:null,
    coin:2,
    allegiance:true,
  },] 
   * @param {number} ownerId 
   * @param {object} actionRecord  回合信息对象
   * actionRecord={
    actionPlayerId:2,
    period:'ChallengeConclusion',//'Act','ActChallenge','ChallengeConclusion','ActConclusion','Block','BlockChallenge',''ChallengeConclusion'','BlockConclusion'
    victimPlayerId:-1,
    actionName:'Assassinate',
  }
   * @returns 返回left middle right layout的数组
   */
 export default function lMRPlayerLayout(player,ownerId,actionRecord) {

    // 辅助函数来检查数组是否已经是最终形式
    function judge(players, ownerId) {
      
      function isAlreadyInLayout(players, ownerId) {
        for (let i = 0; i < players.length-1; i++) {
         if(players[i]<ownerId){
          if(players[i+1]<ownerId){
            if(players[i]>players[i+1]){
              continue
            }else{
              return false
            }
          }
          
         }else{
            if(players[i]>players[i+1]){
              continue
            }else{
              return false
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
      let index = sortedPlayers.findIndex(player => player.id <= ownerId);
      
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
    player=judge(player,ownerId)
  
  
  
    let imgWidth=120;
  
    if(player.length<=3&&player.length>1){
      imgWidth=imgWidth/2
    }else if(player.length==1){
      
    }else{
      imgWidth=imgWidth/3
    }
  
    
    //返回牌数量
    const court=(player) => {
      let courtDeck = [];
      for (let i = 0; i < player.characterCardNum; i++) {
        courtDeck.push(
          <>
            <Image
              preview={false}
              width={imgWidth/1.3}
              src={
                "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/courtDeck-background.jpg"
              }
            />
          </>
        );
      }
      return courtDeck;
    }
  
    //每一个玩家的ui
    const players = player.map((player, index) => (
      <div style={{border:'1px solid'}}>
      <Flex  align="center" justify="center" key={index}>
        <Flex vertical align="center" justify="center" >
          <Image preview={false} width={imgWidth/1.3 } src={player.avatar} />
          <b>{player.name}</b>
          <span>
            player<b>{player.id}</b>
          </span>
        </Flex>
        <Flex>
          {court(player)}
        </Flex>
        
        <Flex vertical align="center" justify="center">
          <Image
            preview={false}
            width={imgWidth/2 }
            src={judgeAllegiance(player.allegiance).img}
          />
          <span>
            coin:<b>{player.coin}</b>
          </span>
        </Flex>
      </Flex>
      </div>
    ));
  
    let playerLeft=[];
    let playerMiddle=[];
    let playerRight=[];
    if(player.length<=3){
      playerMiddle=players
    }else if(player.length==4){
      playerLeft.push(players.shift())
      playerMiddle=players
    }else if(player.length==5){
      playerLeft.push(players.shift())
      playerRight.push(players.pop())
      playerMiddle=players
    }else if(player.length==6){
      playerLeft.push(players[1])
      playerLeft.push(players[0])
      players.shift()
      players.shift()
      playerRight.push(players.pop())
      playerMiddle=players
    }else if(player.length==7){
      playerLeft.push(players[1])
      playerLeft.push(players[0])
      playerRight.push(players[5])
      playerRight.push(players[6])
      players.shift()
      players.shift()
      players.pop()
      players.pop()
      
      playerMiddle=players
    }
    
    return {
      playerLeft,
      playerMiddle,
      playerRight
    }
  }
  