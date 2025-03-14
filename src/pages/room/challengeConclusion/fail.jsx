import { Flex } from "antd";
import "./challengeConclusion.css";
import {
  ActConclusionPlayerLayout,
  ActConclusionText,
  background,
  CommonProgress,
  conclusionPlayerLayout,
  conclusionText,
} from "./component";
import { useEffect, useState } from "react";
import { useSocket } from "../../utl/socketContext";
import { serverMessage } from "../../utl/socket.message";
/**
 * roomId, owner, another, isActor,actorCharacter
 * @param isActor 示意主玩家是否是行动玩家
 * @returns
 */
export function Fail({ roomId, owner, another, isActor, actorCharacter }) {
  return (
    <>
      <div className="success-mask">
        {background("fail")}
        <Flex vertical style={{ width: "100vw" }} align="center" gap={"small"}>
          {conclusionPlayerLayout(
            another,
            true,
            !isActor,
            false,
            !isActor ? actorCharacter : null
          )}
          {conclusionText(false, isActor)}
          {/*  用户点击选择哪一个卡片丢弃 */}
          {conclusionPlayerLayout(
            owner,
            false,
            isActor,
            false,
            null,
            true,
            roomId
          )}
        </Flex>
      </div>
    </>
  );
}

/**
 * 该owner死亡 ,自动发送
 * ownerId,winner ,roomId
 * @param {object} param0
 * @returns
 */
export function FailFinal({ ownerId, winner, roomId }) {
  const socket = useSocket();

  console.log("come to fail");
  if (winner && winner?.id && ownerId > 0) {
    socket.emit(serverMessage.challengeKilled, {
      playerId: ownerId,
      roomId: roomId,
      character: null,
    });
  }

  return (
    <>
      <div className="success-mask">
        <div
          style={{
            backgroundColor: "var(--mask-white-color)",
            width: "100vw",
            height: "100px",
          }}
        >
          <Flex
            vertical
            style={{ width: "100vw" }}
            align="center"
            justify="center"
            gap={"small"}
          >
            <Flex align="center" justify="center" gap={"small"}>
              <span style={{ fontSize: "17px" }}>{"YOUAREDEAD!"}</span>
              <a style={{ fontSize: "12px" }}>{"by " + winner.name}</a>
            </Flex>
          </Flex>
        </div>
      </div>
    </>
  );
}

/**
 * 行动结算阶段 , 该owner死亡 ,自动发送
 * ownerId,winner ,roomId
 * @param {object} param0
 * @returns
 */
export function ActFailFinal({ ownerId, winner, roomId }) {
  const socket = useSocket();
  console.log(winner, ownerId);
  

    if (winner&&winner?.id && ownerId > 0) {
      setTimeout(() => {
        socket.emit(serverMessage.coupOrAssassinateConclusion, {
          roomId: roomId,
          character: null,
        });
      }, 3000);
    }
  

  return (
    <>
      <div className="success-mask">
        <div
          style={{
            backgroundColor: "var(--mask-white-color)",
            width: "100vw",
            height: "100px",
          }}
        >
          <Flex
            vertical
            style={{ width: "100vw" }}
            align="center"
            justify="center"
            gap={"small"}
          >
            <Flex align="center" justify="center" gap={"small"}>
              <span style={{ fontSize: "17px" }}>{"YOUAREDEAD!"}</span>
              <a style={{ fontSize: "12px" }}>{"by " + winner.name}</a>
            </Flex>
          </Flex>
        </div>
      </div>
    </>
  );
}

/**
 * 行动结算阶段,被coup或刺杀需要丢失势力
 * {roomId, owner, another}
 * @param
 * @returns
 */
export function ActFail({ roomId, owner, another }) {
  console.log("act fail 界面");
  return (
    <>
      <div className="success-mask">
        {background("fail")}
        <Flex vertical style={{ width: "100vw" }} align="center" gap={"small"}>
          {ActConclusionPlayerLayout(another, true, true, false, null)}
          {ActConclusionText(false, false)}
          {/*  用户点击选择哪一个卡片丢弃 */}
          {ActConclusionPlayerLayout(
            owner,
            false,
            false,
            false,
            null,
            true,
            roomId
          )}
        </Flex>
      </div>
    </>
  );
}
