import { Button } from "antd";
import Instructions from "./instruction";
import { Popover } from "antd";
import characterCards, { commonActions } from "./character";
import { useEffect, useState } from "react";
import { Flex } from "antd";


//中间那个控制按钮的面板  
  export default function MainContent({actionRecord,owner,players}){

    const [isAct,setIsAct]=useState(false)//行动按钮是否开放
    const [isChallenge,setIsChallenge]=useState(false)//挑战按钮是否开放
    const [isBlock,setIsBlock]=useState(false)//阻止按钮是否开放

//'Act','ActChallenge','ChallengeConclusion','Block','BlockChallenge',''ChallengeConclusion'','ActConclusion'
   useEffect(()=>{
    setIsAct(false)
    setIsChallenge(false)
    setIsBlock(false)
    
    if(actionRecord.actionPlayerId===owner.id){//主玩家是行动玩家
        if(actionRecord.period==='Act'){
            setIsAct(true)
            
        }else if(actionRecord.period==='BlockChallenge'){
            
            setIsChallenge(true)
        }

    }else{
        
        if(actionRecord.period==='ActChallenge'){
            
            setIsChallenge(true)
        }else if(actionRecord.victimPlayerId===owner.id&&actionRecord.period==='Block'){//受击玩家
            setIsBlock(true)
        }else if(actionRecord.victimPlayerId!==owner.id&&actionRecord.period==='BlockChallenge'){//非受击玩家,阶段是BlockChallenge
            setIsChallenge(true)
        }
    }

   },[actionRecord.period])
    
    
return (<Flex gap='small' align="flex-end">
<Instructions />
<ActionButton disabled={!isAct} players={players} />
<ChallengeButton disabled={!isChallenge}/>
<BlockButton disabled={!isBlock}/>
</Flex>)
}

//行动按钮
function ActionButton({disabled, players}){
    const [actionChoose,setActionChoose]=useState('action')//第一列动作名称记录
    const [actionVictim,setActionVictim]=useState('')//第二列具体的行动所指的对象
    

    const playersName=players.map((p)=>p.name)//playersName其他玩家昵称
    const allPlayersName=[...playersName,'myself']//包括自己的所有玩家昵称
    
    //更改了动作,立马更新对应玩家
    useEffect(()=>setActionVictim(''),[actionChoose])

    let actionName=[]//行动的名称list
    commonActions.forEach((c)=>{
        
       //Coup Conversion
       if(c.actions==='Conversion'){
           
            let con=actSpan(c.actions,actionChoose,setActionChoose)
            
            actionName.push(actPopover(con,allPlayersName,false,setActionVictim,actionChoose==='Conversion'?actionVictim:null))
            return
       }else if(c.actions==='Coup'){
            let con=actSpan(c.actions,actionChoose,setActionChoose)  
            actionName.push(actPopover(con,playersName,false,setActionVictim,actionChoose==='Coup'?actionVictim:null))
            return
       }
        //income foreignAid embezzlement
        actionName.push(actSpan(c.actions,actionChoose,setActionChoose))
    })
    characterCards.forEach((c)=>{
        //contessa
        if(!c.actions){
            return 
        }else
        //inquisitor
        if(Array.isArray(c.actions)){
             c.actions.map((act)=>{
                if(act==='Examine'){
                    let con=actSpan(act,actionChoose,setActionChoose,'('+c.name+')')  
                    actionName.push(actPopover(con,playersName,false,setActionVictim,actionChoose==='Examine'?actionVictim:null))
                    return
                }
                actionName.push(actSpan(act,actionChoose,setActionChoose,'('+c.name+')'))
            })
            return
        }else
        //assassinate
        if(c.actions==='Assassinate'){
            let con=actSpan(c.actions,actionChoose,setActionChoose,'('+c.name+')')  
            actionName.push(actPopover(con,playersName,false,setActionVictim,actionChoose==='Assassinate'?actionVictim:null))
            return
        }else if(c.actions==='Steal'){
            let con=actSpan(c.actions,actionChoose,setActionChoose,'('+c.name+')')  
            actionName.push(actPopover(con,playersName,false,setActionVictim,actionChoose==='Steal'?actionVictim:null))
            return
        }
        //
        actionName.push(actSpan(c.actions,actionChoose,setActionChoose,'('+c.name+')'))
    })

    //行动的按钮
    const actButton = <Button type="text">{actionVictim?actionChoose+' '+actionVictim:actionChoose}</Button>;
    return (<Flex vertical>
    {actPopover(actButton,actionName,true)}
    <Button type="primary" disabled={disabled}>行动</Button>
    </Flex>)

}

/**
 * 
 * @param {component} component 
 * @param {component or list} dataList 
 * @param {boolean} isDataListComponent 
 * @param {function} selectData 
 * @param {data} activeColumn 
 * @returns 
 */
function actPopover(component,dataList,isDataListComponent,selectData,activeColumn){

    
    
    return(<>
    <Popover placement="right"  content={()=>(
        <Flex vertical>{
            isDataListComponent?dataList:dataList.map((name)=>actSpan(name,activeColumn,selectData)          
            )
        }
        </Flex>)
    } autoAdjustOverflow>
        {component}
    </Popover>
    </>)
}

/**
 * 返回span包裹的组件
 * @param {*} text 
 * @param {string} active 被选中的列
 * @param {*} setActive 选中函数
 * @param {*} addText 
 * @returns 
 */
function actSpan(text,active,setActive,addText){

    //css
    const activeCss={
        backgroundColor:'gray',
    }

    return <span
    style={text===active?activeCss:null}
    onClick={()=>setActive(text)}  
    >
        {text}{addText?addText:null}
    </span>
}

//挑战按钮
function ChallengeButton({disabled}){

    return (<>
    <Button type="primary" disabled={disabled}>质疑</Button>
    </>)
}
//阻止按钮
function BlockButton({disabled}){
    const [blocks,setBlocks]=useState('block');

   const button=<Button type="text" >{blocks}</Button>

    const b=characterCards.map((character)=>{
        if(character.blocks){
            return actSpan(character.name,blocks,setBlocks,'('+character.blocks+')')
        }
        return null
    })

    

    return (<Flex vertical>
    {actPopover(button,b,true)}
    <Button type="primary" disabled={disabled}>阻止</Button>
    </Flex>)
}
//