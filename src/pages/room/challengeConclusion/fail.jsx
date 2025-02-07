import { Flex } from "antd";
import "./challengeConclusion.css";
import {
  background,
  CommonProgress,
  conclusionPlayerLayout,
  conclusionText,
} from "./component";
import { useState } from "react";

export function Fail({ owner, another, isActor,actorCharacter }) {
  return (
    <>
      <div className="success-mask">
        {background("fail")}
        <Flex vertical style={{ width: "100vw" }} align="center" gap={"small"}>
          {conclusionPlayerLayout(another, true, !isActor, false,actorCharacter)}
          {conclusionText(false,isActor)}
            {/* TODO 用户点击选择哪一个卡片丢弃 */}
          {conclusionPlayerLayout(owner, false, isActor, false,null,true)}
        </Flex>
      </div>
    </>
  );
}


export function FailFinal({winner}){
  const [ok,setOk]=useState(false)
  return (
    <>
      {ok?<div className="success-mask" >
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
            <Flex
            align="center"
            justify="center"
            gap={"small"}
            >
            <span style={{fontSize:'17px'}}>{'YOUAREDEAD!'}</span>
            <a style={{fontSize:'12px'}}>{'by '+winner.name}</a>
            </Flex>
            <CommonProgress  totalTime={5} isInterval={true} onOk={()=>setOk(true)} isShow={false}/>
          </Flex>
        </div>
      </div>:null}
    </>
  );
}