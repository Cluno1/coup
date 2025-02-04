import { Fail } from "./fail";
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
  owner,
  challenger,
  actor,
  actorCharacter,
  isSuccess
) {

  if (owner.id === actor.id) {//是行动者
    

    if (isSuccess) {//质疑成功  owner失败，需要挑选一张扔掉
      
      return (
        <Fail
          owner={owner}
          another={challenger}
          isActor={true}
          actorCharacter={actorCharacter}
        />
      );
    } else {
      //owner成功

      return <Success owner={owner} another={challenger} isActor={true} />;
    }
  } else if (owner.id === challenger.id) {
    //是质疑者

    if (isSuccess) {
      //质疑成功

      //TODO 需要判断 是否只剩一个角色，
      if(actor.characterCardNum<=1){//如果是一个角色，则该玩家被淘汰！
        return <SuccessFinal winner={challenger}/>

      }

      return <Success owner={owner} another={actor} isActor={false} />;
    } else {
      //质疑失败
      return (
        <Fail
          owner={owner}
          another={actor}
          isActor={false}
          actorCharacter={actorCharacter}
        />
      );
    }
  } else {
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
