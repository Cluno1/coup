import { Flex } from "antd";
import "./challengeConclusion.css";
import {
  background,
  conclusionPlayerLayout,
  conclusionText,
  CommonProgress,
  ActConclusionText,
  ActConclusionPlayerLayout,
} from "./component";
import { useEffect, useState } from "react";

/**
 * owner胜利并且对方有两个势力  返回成功组件
 * { owner, another, isActor }
 * @param {*} param0
 * @returns
 */
export function Success({ owner, another, isActor }) {
  return (
    <>
      <div className="success-mask">
        {background("success")}

        <Flex vertical style={{ width: "100vw" }} align="center" gap={"small"}>
          {conclusionPlayerLayout(another, false, !isActor, true)}
          {conclusionText(true, isActor)}
          {conclusionPlayerLayout(owner, true, isActor, false)}
        </Flex>
      </div>
    </>
  );
}

/**
 * 行动结算阶段,使用coup或刺杀胜利 ,owner胜利,并且对方有两个势力  返回成功组件
 * { owner, another, isActor }
 * @param {*} param0
 * @returns
 */
export function ActSuccess({ owner, another, isActor }) {
  return (
    <>
      <div className="success-mask">
        {background("success")}

        <Flex vertical style={{ width: "100vw" }} align="center" gap={"small"}>
          {ActConclusionPlayerLayout(another, false, !isActor, true)}
          {ActConclusionText(true, false)}
          {ActConclusionPlayerLayout(owner, true, isActor, false)}
        </Flex>
      </div>
    </>
  );
}


function successText(player){
  switch(player.kill){
    case 1:
      return "一破,卧龙出山!";
    case 2:
      return '双连,一战成名!';
    case 3:
      return '三连,举世皆惊!';
    default:
      return '无双,万军取首!';
  }
}

export function SuccessFinal({ winner }) {
  
  const [ok,setOk]=useState(true)
  return (
    <>
      {ok?<div className="success-mask"  >
        <div
          style={{
            backgroundColor: "var(--mask-white-color)",
            width: "100vw",
            height: "100px",
          }}
        >
          <Flex
            vertical
            style={{ width: "100vw" }}
            align="center"
            justify="center"
            gap={"small"}
          >
            <span>{winner.name}</span>
            <br />
            <span>{successText(winner)}</span>
            
            
          </Flex>
        </div>
      </div>:null}
    </>
  );
}
