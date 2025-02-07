import { useState } from "react";
import "../challengeConclusion/challengeConclusion.css";
import { background, CommonProgress } from "../challengeConclusion/component";
import { Flex } from "antd";

/**
 *
 * @param {*} isSuccess
 * @param {*} players
 * @returns
 */
export function ActConclusion({ actionRecord, players }) {
  const [isShow, setIsShow] = useState(true);
  let name = null;
  players.forEach((p) => {
    if (p.id === actionRecord.actionPlayerId) {
      name = p.name;
    }
  });

  let message = null;
  if (actionRecord.actConclusion) {
    message = (
      <>
        {isShow ? (
          <Flex className="success-mask" vertical>
            {actionRecord.actConclusion
              ? background("success")
              : background("fail")}

            <span
              style={{
                fontSize: "26px",
                color: "white",
                width: "100vw",
                minHeight: "30px",
              }}
            >
                <span>{name}</span><br/>
                <span>{(actionRecord.actConclusion ? "开始行动" : "行动失败")}</span>
            </span>
            <CommonProgress
              totalTime={5}
              isInterval={true}
              onOk={() => setIsShow(false)}
            />
          </Flex>
        ) : null}
      </>
    );
  }
  return message;
}
