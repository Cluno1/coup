import { Fail, FailFinal } from "./fail";
import { Spectator } from "./spectator";
import { Success, SuccessFinal } from "./success";

/**
 *@param {object} owner 主玩家
 * @param {object} challenger 质疑的玩家
 * @param {object} actor 行动的玩家
 * @param {string} actorCharacter 行动玩家声明的角色
 * @param {boolean} isSuccess 是否成功质疑
 */
export default function challengeConclusion(
  roomId,
  owner,
  challenger,
  actor,
  actorCharacter,
  isSuccess,
) {
  
  
  if(!challenger||!actor||!actorCharacter){
    console.log(challenger,actor,actorCharacter,isSuccess)
    console.log('to challenge conclusion but return nothing')
    return null;
  }

  if (owner.id === actor.id) {
    //owner是行动者
    if (isSuccess) {
      //质疑成功 ,owner失败，需要挑选一张扔掉

      
      if (actor.characterCardNum <= 1) {//看行动者是否仅剩一张牌
        return <FailFinal ownerId={owner.id} winner={challenger} roomId={roomId}/>;
      }
      return (
        <Fail
          roomId={roomId}
          owner={owner}
          another={challenger}
          isActor={true}
          actorCharacter={actorCharacter}
        />
      );
    } else {
      //owner成功,行动者成功,质疑失败

      if (challenger.characterCardNum <= 1) {//看质疑者是否仅剩一张牌
        return <SuccessFinal winner={actor} />;
      }

      return <Success owner={owner} another={challenger} isActor={true} />;
    }
  } else if (owner.id === challenger.id) {
    //owner是质疑者

    if (isSuccess) {
      //质疑者成功,owner成功,actor失败

      
      if (actor.characterCardNum <= 1) {//看行动者是否仅剩一张牌
        //如果是一个角色，则该玩家被淘汰！
        return <SuccessFinal winner={challenger} />;
      }

      return <Success owner={owner} another={actor} isActor={false} />;
    } else {
      //质疑失败,owner失败,actor成功
      if (challenger.characterCardNum <= 1) {//看质疑者是否仅剩一张牌
        return <FailFinal ownerId={owner.id} winner={actor} roomId={roomId}/>;
      }

      return (
        <Fail
          owner={owner}
          another={actor}
          isActor={false}
          actorCharacter={actorCharacter}
          roomId={roomId}
        />
      );
    }
  } else {

    if(isSuccess){
      if(actor.characterCardNum <= 1){
        return <SuccessFinal winner={challenger} />;
      }
    }else{
      if(challenger.characterCardNum<=1){
        return <SuccessFinal winner={actor}/>
      }
    }

    return (
      <Spectator
        actor={actor}
        challenger={challenger}
        isChallengeSuccess={isSuccess}
        actorCharacter={actorCharacter}
      />
    );
  }
}
