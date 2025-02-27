import { Flex } from "antd";
import "./challengeConclusion.css";
import {
  ActConclusionPlayerLayout,
  ActConclusionText,
  background,
  conclusionPlayerLayout,
  conclusionText,
} from "./component";

/**
 * isSuccess 是否  旁观者组件 质疑结果阶段
 * { actor, challenger,isChallengeSuccess,actorCharacter }
 * @param {*} param0
 * @returns
 */
export function Spectator({
  actor,
  challenger,
  isChallengeSuccess,
  actorCharacter,
}) {
  return (
    <>
      <div className="success-mask">
        {background("challenging")}
        <Flex vertical style={{ width: "100vw" }} align="center" gap={"small"}>
          {conclusionPlayerLayout(
            challenger,
            isChallengeSuccess,
            false,
            !isChallengeSuccess
          )}
          {conclusionText(false, false, true, isChallengeSuccess)}
          {conclusionPlayerLayout(
            actor,
            !isChallengeSuccess,
            true,
            isChallengeSuccess,
            !isChallengeSuccess ? actorCharacter : null,
            false
          )}
        </Flex>
      </div>
    </>
  );
}

/**
 * 行动阶段的 旁观者组件
 * isSuccess 是否  旁观者组件
 * { actor, challenger,isChallengeSuccess }
 * @param {*} param0
 * @returns
 */
export function ActSpectator({
  actor,
  challenger,
  isChallengeSuccess,
  actorCharacter='',
}) {
  return (
    <>
      <div className="success-mask">
        {background("challenging")}
        <Flex vertical style={{ width: "100vw" }} align="center" gap={"small"}>
          {ActConclusionPlayerLayout(
            challenger,
            isChallengeSuccess,
            false,
            !isChallengeSuccess
          )}
          {ActConclusionText(false, true)}
          {ActConclusionPlayerLayout(
            actor,
            !isChallengeSuccess,
            true,
            isChallengeSuccess,
            null,
            false
          )}
        </Flex>
      </div>
    </>
  );
}
