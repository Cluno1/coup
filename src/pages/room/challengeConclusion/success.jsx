import { Flex } from "antd";
import "./challengeConclusion.css";
import {
  background,
  conclusionPlayerLayout,
  conclusionText,
} from "./component";

/**
 * owner胜利并且对方有两个势力  返回成功组件
 * @param {*} param0
 * @returns
 */
export function Success({ owner, another, isActor }) {
  //

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
