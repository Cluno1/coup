import { Flex } from "antd";
import "./challengeConclusion.css";
import {
  background,
  conclusionPlayerLayout,
  conclusionText,
} from "./component";

export function Fail({ owner, another, isActor,actorCharacter }) {
  return (
    <>
      <div className="success-mask">
        {background("fail")}

        <Flex vertical style={{ width: "100vw" }} align="center" gap={"small"}>
          {conclusionPlayerLayout(another, true, !isActor, false,actorCharacter)}
          {conclusionText(false,isActor)}
            {/* TODO 用户点击选择哪一个卡片丢弃 */}
          {conclusionPlayerLayout(owner, false, isActor, false)}
        </Flex>
      </div>
    </>
  );
}
