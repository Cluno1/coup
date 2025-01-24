import React, { useState } from "react";
import "./playersLayout.css";
import { Popover } from "antd";

/**
 *
 * @param {*} param0
 * @returns  简单蒙版组件
 */
export function MaskComponent({
    playerComponent,
    maskString,
    maskColor = "var(--mask-color)",
  }) {
    return (
      <div className="mask-container">
        <div className="mask-layer" style={{ backgroundColor: maskColor }}>
          <span className="mask-text">{maskString}</span>
        </div>
        {playerComponent}
      </div>
    );
  }
  
  
  /**
   *
   * @param {*} param0
   * @returns  返回 简单信息组件
   */
export  function MessageComponent({
    component,
    messageComponent,
    direction = "bottom",
  }) {
  
    const [isOpen,setIsOpen]=useState(true)
    return (
      <div onClick={()=>setIsOpen(!isOpen)}>
      <Popover
        content={messageComponent}
        open={isOpen}
        autoAdjustOverflow
        placement={direction}
        
      >
        
        {component}
        <div></div>
        
      </Popover>
      </div>
    );
  }


   //判断是否质疑者
   export const isChallenger=(actionRecord,challengerIdArray,player)=> {
    
    //如果非ActChallenge或BlockChallenge，则没有质疑者
    if(actionRecord.period!='ActChallenge'&&actionRecord.period!='BlockChallenge'){
      return false
    }
    let tem=false
    if (challengerIdArray.length != 0) {
      challengerIdArray.forEach((id) => {
        if (id === player.id) {
         tem=true;
        }
      });
    }
    return tem;
  }