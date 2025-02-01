import { Flex } from "antd";
import "./challengeConclusion.css";
import {
  background,
  conclusionPlayerLayout,
  conclusionText,
} from "./component";

/**
 * isSuccess 是否
 * @param {*} param0 
 * @returns 
 */
export function Spectator({ actor, challenger,isChallengeSuccess,actorCharacter }) {
    return (
      <>
        <div className="success-mask">
          {background("challenging")}
          <Flex vertical style={{ width: "100vw" }} align="center" gap={"small"}>
            {conclusionPlayerLayout(challenger,isChallengeSuccess,false,!isChallengeSuccess)}
            {conclusionText(false,false,true,isChallengeSuccess)}
            {conclusionPlayerLayout(actor,!isChallengeSuccess,true,isChallengeSuccess,(!isChallengeSuccess?actorCharacter:null),false)}
          </Flex>
        </div>
      </>
    );
  }
  