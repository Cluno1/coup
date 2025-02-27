import { useEffect, useLayoutEffect, useState } from "react";
import "../challengeConclusion/challengeConclusion.css";
import { background, CommonProgress } from "../challengeConclusion/component";
import { Flex } from "antd";
import characterCards from "../character";
import { Examine, Exchange } from "./exchange";
import { ActFail, ActFailFinal, FailFinal } from "../challengeConclusion/fail";
import { ActSuccess, SuccessFinal } from "../challengeConclusion/success";
import { ActSpectator } from "../challengeConclusion/spectator";

/**
 *行动组件
 * @param {*} isSuccess
 * @param {*} players 玩家数组,不包括owner
 *  @param {*} owner
 * @returns
 */
export function ActConclusion({roomId='', actionRecord, players, owner }) {
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    setIsShow(true);
  }, [actionRecord]);

  let isCanClick = true;

  if (
    actionRecord.character === characterCards[3].name ||
    actionRecord.character === characterCards[5].name ||
    actionRecord.actionName === "Assassinate" ||
    actionRecord.actionName === "Coup"
  ) {
    isCanClick = false;
  }

  let actionPlayer = null; //行动玩家的名称
  let victimPlayer = null;//受击玩家名称

  

  if (owner.id === actionRecord.actionPlayerId) {
    //本玩家是行动玩家
    actionPlayer = owner;
    //ambassador 的交换两张牌 exchange2 和 Inquisitor交换一张牌
    if (
      actionRecord.actionName === characterCards[3].actions ||
      actionRecord.actionName === characterCards[5].actions[0]
    ) {
      return <Exchange roomId={roomId} owner={owner} actionRecord={actionRecord} />;
    } else if (actionRecord.actionName === characterCards[5].actions[1]) {
      //看牌组件
      return (
        <Examine  roomId={roomId} owner={owner} actionRecord={actionRecord} players={players} />
      );
    }
  } else {
    //主玩家不是行动玩家
    if(owner.id===actionRecord.victimPlayerId){
      victimPlayer=owner;
    }
    
  }
  players.forEach((p) => {
    if (p.id === actionRecord.actionPlayerId) {
      actionPlayer = p;
    }else if(p.id === actionRecord.victimPlayerId){
      victimPlayer = p;
    }
  });
  //刺杀或政变返回不一样的行动结算界面
  if (
    actionRecord.actionName === "Assassinate" ||
    actionRecord.actionName === "Coup"
  ) {
    if(!victimPlayer?.id){
      console.log('找不到受击玩家')
      return
    }else{
      if(victimPlayer.characterCardNum<=1){
        //最后一击,这个受击玩家已经死亡了
        console.log('最后一击,这个受击玩家已经死亡了')
        if(owner.id===victimPlayer.id){
          return <ActFailFinal ownerId={owner.id} winner={actionPlayer} roomId={roomId} />
        }else {
          return <SuccessFinal winner={actionPlayer} />
        }
        
      }else{
        console.log('coup 或 刺杀 行动结算')
        if(owner.id===victimPlayer.id){
          return <ActFail owner={owner} another={actionPlayer} roomId={roomId} />
        }else if(owner.id === actionPlayer.id){
          return <ActSuccess owner={owner} another={victimPlayer} isActor={true} />
        }else{
          return <ActSpectator actor={actionPlayer} challenger={victimPlayer} isChallengeSuccess={true} />
        }
      }

    }
  }

  let message = null;
  
  console.log("进入 行动结算界面 --act conclusion");
  message = (
    <>
      {isShow ? (
        <div
          className="success-mask"
          onClick={() => (isCanClick ? setIsShow(false) : null)}
        >
          {actionRecord.actConclusion
            ? background("success")
            : background("fail")}

          <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: "100vw" }}
          >
            <Flex
              vertical
              align="center"
              justify="center"
              style={{
                fontSize: "26px",
                color: "white",
              }}
            >
              <span>{actionPlayer?.name}</span>

              <span>
                {actionRecord.actionName}
                {actionRecord.actConclusion ? "开始行动" : "行动失败"}
              </span>
            </Flex>

            <CommonProgress
              totalTime={5}
              isInterval={true}
              onOk={() => (isCanClick ? setIsShow(false) : null)}
            />
          </Flex>
        </div>
      ) : null}
    </>
  );

  return message;
}
