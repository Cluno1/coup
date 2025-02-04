import { Flex } from "antd";
import "./challengeConclusion.css";
import {
  background,
  conclusionPlayerLayout,
  conclusionText,
  CommonProgress,
} from "./component";
import { useEffect, useState } from "react";

/**
 * owner胜利并且对方有两个势力  返回成功组件
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

export function SuccessFinal({ winner }) {
  const [ok,setOk]=useState(false)
  

  return (
    <>
      <div className="success-mask" style={ok?{display: 'none'}:null}>
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
            <span>{"一破，卧龙出山!"}</span>
            <CommonProgress  totalTime={3} isInterval={true} onOk={()=>setOk(true)} isShow={false}/>
            
          </Flex>
        </div>
      </div>
    </>
  );
}
