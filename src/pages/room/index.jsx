import React, {  useState } from "react";
import { Flex } from "antd";
import FullScreenComponent from "../utls/fullScreen";

import MainContent from "./mainContent";
import lMRPlayerLayout from "./playersLayout/playersLayout";
import ownerLayout from "./playersLayout/ownerLayout";

export default function Room(){

  //玩家数量   时间  第几局  国库  牌堆
  // const roomBase={
  //   playerNum:3,
  //   time:'3:20',
  //   round:2,//第几回合
  //   treasuryReserve:3,//国库里的金币数量
  //   courtDeckNum:15,
  //   courtDeck:[2,2,2,2,2,5],//牌堆牌数
  // }

  //后端更改   房间信息
  const [roomBase,setRoomBase]=useState({
    playerNum:3,
    time:'3:20',
    round:2,//第几回合
    treasuryReserve:3,//国库里的金币数量
    courtDeckNum:15,   //牌数
    courtDeck:[2,2,2,2,2,5],//牌堆牌数
  })

  //后端更改    单回合对局信息
  const [actionRecord,setActionRecord]=useState({
    actionPlayerId:3,  //行动玩家
    period:'Act',//'Act','ActChallenge','ChallengeConclusion','ActConclusion','Block','BlockChallenge',''ChallengeConclusion'','BlockConclusion'
    victimPlayerId:1,  //被攻击玩家
    character:'Assassin',  //行动玩家声明的角色
    actionName:'Assassinate',//行动玩家作的行动
    victimCharacter:'Contessa',  //被攻击玩家的声明角色
    victimBlock:'Blocks Assassination'     //被攻击玩家所阻止的行动
  })

  //后端更改   单回合提出质疑的玩家的id
  const [challengerIdArray,setChallengerIdArray]=useState([1,4]);

  

  //2-10 人

  //维护的数据
  // const owner={
  //   // 基本信息
  //   id:2,
  //   avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
  //   name:'cluno',
  //   characterCardNum:2,
  //   characterCards:[1,3],
  //   coin:4,
  //   allegiance:true,//reformist==false or loyalist==true,
  //   //对局信息
  //   isDead:false,
  // } 
  const [owner,setOwner]=useState({
    // 基本信息
    id:2,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'cluno',
    characterCardNum:2,
    characterCards:[1,3],
    coin:4,
    allegiance:true,//reformist==false or loyalist==true,
    //对局信息
    isDead:false,
  } )

  const player1={
    id:3,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'james',
    characterCardNum:1,
    characterCards:null,
    coin:2,
    allegiance:true,
    //对局信息
    isDead:false,
  }
  const player2={
    id:1,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'jason',
    characterCardNum:2,
    characterCards:null,
    coin:2,
    allegiance:false,
    //对局信息
    isDead:false,
  }
  const player3={
    id:4,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'jerry',
    characterCardNum:2,
    characterCards:null,
    coin:8,
    allegiance:true,
  }
  const player4={
    id:5,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'tom',
    characterCardNum:2,
    characterCards:null,
    coin:8,
    allegiance:true,
  }
  const player5={
    id:6,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'tomas',
    characterCardNum:2,
    characterCards:null,
    coin:8,
    allegiance:true,
  }
  const player6={
    id:7,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'lily',
    characterCardNum:2,
    characterCards:null,
    coin:8,
    allegiance:true,
  }
  // const players=[player1,player2,player3,player4,player5,player6]
  
  const [players,setPlayer]=useState([player1,player2,player3,player4,player5,player6])

  const {
    playerLeft,
    playerMiddle,
    playerRight
  }=lMRPlayerLayout(players,owner,actionRecord,challengerIdArray);  //不包括owner的其他玩家队列,分为左 中 右 三个排序好的玩家数组

  //css
  const footerCSS={
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: 'translateX(-50%)',
    width: '100%',/* 或者具体的宽度 */
    textAlign: 'center', 
  }
  const mainCss={
    
    minHeight:'150px',
    minWidth:'200px',
    
  }
  return (
    <>
    <Flex vertical gap={'small'}>
      {/* 头部 */}
      <div>
        <Flex justify="space-between">
          <FullScreenComponent  
           />
          <Flex gap={'small'}>
          {playerMiddle}
          </Flex>
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
        <Flex justify="space-between" >
          <div>
            <Flex vertical gap={'small'}>
            {playerLeft}
            </Flex>
          </div>
          <div style={mainCss}>
            <Flex justify="center" gap={"large"} align="center"style={mainCss}>
              <MainContent actionRecord={actionRecord} owner={owner} players={players}/>
              
            </Flex>
          </div>
          <div>
          <Flex vertical gap={'small'}>
            {playerRight}
          </Flex>  
          </div>
        </Flex>
      </div>

      <div style={footerCSS} >{ownerLayout(owner) }</div>
      </Flex>
    </>
  );
}






