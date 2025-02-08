import { useEffect, useLayoutEffect, useState } from "react";
import "../challengeConclusion/challengeConclusion.css";
import { background, CommonProgress } from "../challengeConclusion/component";
import { Flex } from "antd";
import characterCards from "../character";
import { Examine, Exchange } from "./exchange";

/**
 *行动组件
 * @param {*} isSuccess
 * @param {*} players 全部玩家数组,不包括owner
 *  @param {*} owner
 * @returns
 */
export function ActConclusion({ actionRecord, players, owner }) {
  const [isShow, setIsShow] = useState(true);
  
  let isCanClick=true;

    if (actionRecord.character === characterCards[3].name || actionRecord.character === characterCards[5].name) {
      isCanClick=false;
    }
    
  
  let name = null;
  

  
  

  if (owner.id === actionRecord.actionPlayerId) {
    //本玩家是行动玩家
    name = owner.id;
      debugger;
      //ambassador 的交换两张牌 exchange2 和 Inquisitor交换一张牌
      if(actionRecord.actionName===characterCards[3].actions||actionRecord.actionName===characterCards[5].actions[0]){

        return <Exchange owner={owner} actionRecord={actionRecord} />
        
      }else if(actionRecord.actionName===characterCards[5].actions[1]){
        return <Examine owner={owner} actionRecord={actionRecord} players={players}/>
      }

  } else {
    players.forEach((p) => {
      if (p.id === actionRecord.actionPlayerId) {
        name = p.name;
      }
    });
  }

  let message = null;
  if (actionRecord.actConclusion) {
    message = (
      <>
        {isShow ? (
          <div
            className="success-mask"
            onClick={() => (isCanClick ? setIsShow(false) : null)}
          >
            {actionRecord.actConclusion
              ? background("success")
              : background("fail")
            }

            <Flex  
            vertical
            align="center"
            justify="center"
            style={{width:'100vw'}}
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
              <span>{name}</span>
              
              <span>
                {actionRecord.actConclusion ? "开始行动" : "行动失败"}
              </span>
            </Flex>
            

            <CommonProgress
              totalTime={3}
              isInterval={true}
              onOk={() => isCanClick ? setIsShow(false) : null}
            />
          </Flex>
          </div>
        ) : null}
      </>
    );
  }
  return message;
}
