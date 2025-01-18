import { Button } from "antd";
import Instructions from "./instruction";
import { Popover } from "antd";
import characterCards, { commonActions } from "./character";
import { useEffect, useState } from "react";
import { Flex } from "antd";

/**
 * const [actionRecord,setActionRecord]=useState({
    actionPlayerId:1,
    period:'Act',//'Act','ActChallenge','ChallengeConclusion','ActConclusion','Block','BlockChallenge',''ChallengeConclusion'','BlockConclusion'
    victimPlayerId:2,
    actionName:'',
  })
 */

  /** const owner={
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
  // }  */
//中间那个控制按钮的  
  export default function MainContent({actionRecord,owner,players}){

    const [isAct,setIsAct]=useState(false)
    const [isChallenge,setIsChallenge]=useState(false)

//'Act','ActChallenge','ChallengeConclusion','ActConclusion','Block','BlockChallenge',''ChallengeConclusion'','BlockConclusion'
   useEffect(()=>{
    if(actionRecord.actionPlayerId===owner.id){
        if(actionRecord.period==='Act'){
            setIsAct(true)
            setIsChallenge(false)
        }else if(actionRecord.period==='ActChallenge'){
            setIsAct(false)
            setIsChallenge(false)
        }

    }else{
        if(actionRecord.period==='Act'){
            setIsAct(false)
            setIsChallenge(false)
        }else if(actionRecord.period==='ActChallenge'){
            setIsAct(false)
            setIsChallenge(true)
        }
    }

   },[])
    
    
return (<>
<Instructions />
<ActionButton disabled={!isAct} players={players} owner={owner}/>
<ChallengeButton disabled={!isChallenge}/>
</>)

}

function ActionButton({disabled, players,owner}){
    const [actionChoose,setActionChoose]=useState('action')
    const [actionVictim,setActionVictim]=useState('')//具体的行动的对象

//css
const activeCss={
    backgroundColor:'gray',
}

const playersName=players.map((p)=>p.name)//playersName其他玩家昵称
let pn=playersName.map((name,index)=>(  //pn 其他玩家昵称组件
    <span
    key={name+index}
    onClick={()=>setActionVictim(name)}
>
    {name}
</span>))

const actionName=[];

commonActions.forEach((c)=>{
    //叛变  叛变自己 叛变其他玩家 actionChoose=Conversion  actionExp='Conversion myself' | 'Conversion 玩家2'
    if(c.actions==='Conversion'){
        
        
        pn.push(<span
            key={owner.name}
            
            onClick={()=>setActionVictim('myself')}
        >
            {'myself'}
        </span>)

        actionName.push(
            <Popover placement="right"  content={()=>(<Flex vertical>
                {pn}
            </Flex>)} autoAdjustOverflow>
        <span
            key={c.actions}
            style={actionChoose==c.actions?activeCss:null}
            onClick={()=>setActionChoose(c.actions)}
        >
            {c.actions}
        </span>
        </Popover>
        )
        return
    }else if(c.actions==='Coup'){
        actionName.push(
            <Popover placement="right"  content={()=>(<Flex vertical>
                {pn}
            </Flex>)} autoAdjustOverflow>
            
        <span
            key={c.actions}
            style={actionChoose==c.actions?activeCss:null}
            onClick={()=>setActionChoose(c.actions)}
        >
            {c.actions}
        </span>
        </Popover>
        )
        return
    }
    actionName.push(<span
        key={c.actions}
        style={actionChoose==c.actions?activeCss:null}
        onClick={()=>setActionChoose(c.actions)}
    >{c.actions}</span>)
})

characterCards.forEach((c)=>{
    if(!c.actions){
        return 
    }
    if(Array.isArray(c.actions)){
         c.actions.map((act)=>{
            actionName.push(<span
             key={act}
             style={actionChoose==act?activeCss:null}
             onClick={()=>setActionChoose(act)}
            >{act+'('+c.name+')'}</span>)
        })
        return
    }
    actionName.push(
        <span
        key={c.actions}
        style={actionChoose==c.actions?activeCss:null}
        onClick={()=>setActionChoose(c.actions)}
        >{c.actions+'('+c.name+')'}</span>
    )
})

/**const embezzlementCharacter={
        img:null,
        name:null,
        actions:'Embezzlement',
        explain:'从国库获取所有钱(男爵除外)',
        act:embezzlement,
        blocks:null,
    }; */

    return (<>
    
    
    <Popover placement="right"  content={()=>(<Flex vertical>{actionName}</Flex>)} autoAdjustOverflow>
        <Button type="text">{actionChoose+' '+actionVictim}</Button>
    </Popover>

    <Button type="primary" disabled={disabled}>行动</Button>
    
    </>)
}




function ActPopover(props){
    const data=props.data  //气泡窗口的数据列
    const text=props.text   //触发气泡窗口的文本
    return(<>
    <Popover placement="right"  content={()=>(<Flex vertical>{data}</Flex>)} autoAdjustOverflow>
        {text}
    </Popover>
    </>)
}



function ChallengeButton({disabled}){

    return (<>
    <Button type="primary" disabled={disabled}>质疑</Button>
    </>)
}