import React, { useEffect, useState } from "react";
import {Image } from "antd";


import { Flex } from "antd";
import FullScreenComponent from "../utls/fullScreen";
import characterCards from "./character";
import MainContent from "./mainContent";





export default function Room(){



  useEffect(()=>{

  },[]);

  //玩家数量   时间  第几局  国库  牌堆
  // const roomBase={
  //   playerNum:3,
  //   time:'3:20',
  //   round:2,//第几回合
  //   treasuryReserve:3,//国库里的金币数量
  //   courtDeckNum:15,
  //   courtDeck:[2,2,2,2,2,5],//牌堆牌数
  // }

  const [roomBase,setRoomBase]=useState({
    playerNum:3,
    time:'3:20',
    round:2,//第几回合
    treasuryReserve:3,//国库里的金币数量
    courtDeckNum:15,
    courtDeck:[2,2,2,2,2,5],//牌堆牌数
  })

  const [actionRecord,setActionRecord]=useState({
    actionPlayerId:2,
    period:'Act',//'Act','ActChallenge','ChallengeConclusion','ActConclusion','Block','BlockChallenge',''ChallengeConclusion'','BlockConclusion'
    victimPlayerId:-1,
    actionName:'',
  })

  

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
  // const player3={
  //   id:4,
  //   avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
  //   name:'jerry',
  //   characterCardNum:2,
  //   characterCards:null,
  //   coin:8,
  //   allegiance:true,
  // }
  // const player4={
  //   id:5,
  //   avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
  //   name:'jerry',
  //   characterCardNum:2,
  //   characterCards:null,
  //   coin:8,
  //   allegiance:true,
  // }
  // const player5={
  //   id:6,
  //   avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
  //   name:'jerry',
  //   characterCardNum:2,
  //   characterCards:null,
  //   coin:8,
  //   allegiance:true,
  // }
  // const player6={
  //   id:7,
  //   avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
  //   name:'jerry',
  //   characterCardNum:2,
  //   characterCards:null,
  //   coin:8,
  //   allegiance:true,
  // }
  // const players=[player1,player2,player3,player4,player5,player6]
  
  const [players,setPlayer]=useState([player1,player2])

  const {
    playerLeft,
    playerMiddle,
    playerRight
  }=lmrPlayerComponent(players,owner.id);  //不包括owner的其他玩家队列,分为左 中 右 三个排序好的玩家数组

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
        <Flex justify="space-around">
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
//判断阵营
const judgeAllegiance=(allegiance)=>{
  const loyalist={
    name:'loyalist',
    img:'https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/loyalist.jpg',
  }
  const reformist={
    name:'reformist',
    img:'https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/reformist.jpg',
  }

  if(allegiance){
    return loyalist
  }else{
    return reformist
  }
}
/**const owner={
    id:2,
    img:'/public/logo192.png',
    name:'cluno',
    characterCardNum:2,
    characterCards:[1,3],
    coin:4,
    allegiance:true,//reformist==false or loyalist==true
  }  */
function ownerLayout(owner){

  

    const cards = owner.characterCards.map((cardIndex,index) => {
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
  return (
    <>
    
    <Flex gap={'small'} align="center" justify="center">

    <Flex  vertical align="center" justify="center">
      <Image
        preview={false}
        width={60}
        src={owner.avatar}
      />
      <b>{owner.name}</b>
      <span>player<b>{owner.id}</b></span>
      
    </Flex>
    
    {cards}
    <Flex  vertical align="center" justify="center">
    <Image
        preview={false}
        width={60}
        src={judgeAllegiance(owner.allegiance).img}
      />
      <span>coin:<b>{owner.coin}</b></span>
      
    </Flex>


    </Flex>
    </>
  )
}
/**const player=[{
    id:3,
    avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
    name:'james',
    characterCardNum:2,
    characterCards:null,
    coin:2,
    allegiance:true,
  },] */
function lmrPlayerComponent(player,ownerId) {


  function judge(players, ownerId) {
    // 辅助函数来检查数组是否已经是最终形式
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


