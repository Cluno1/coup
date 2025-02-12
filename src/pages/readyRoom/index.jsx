import { Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./readyRoom.css";
import { Flex } from "antd";
import { useSocket } from "../utl/socketContext";

export function ReadyRoom() {
  const [players, setPlayers] = useState([]);

  //路由传值接收部分
  const location = useLocation();
  const socket = useSocket();

  useEffect(() => {
    // 确保从 location.state 接收到的 players 是一个数组
    debugger;
    if (location.state && Array.isArray(location.state.players.players)) {
      setPlayers(location.state.players.players);
    }

    // 监听 socket 事件
    socket.on("playerJoined", (newPlayers) => {
      if (Array.isArray(newPlayers)) {
        console.log("Player joined:", newPlayers);
        setPlayers(newPlayers);
      }
    });
  }, []);

  // 确保在映射之前 players 是一个数组
  const playersLayout = Array.isArray(players)
    ? players.map((p) => {
        return (
          <div
            className="player"
            style={{
              backgroundColor: p.isReady
                ? "var(--ready-color)"
                : "var(--unready-color)",
            }}
          >
            <Flex vertical>
              <Avatar src={p.avatar} />
              <span>{p.name}</span>
              <span>{p.user_rank}</span>
            </Flex>
          </div>
        );
      })
    : null; // 如果 players 不是数组，则不渲染任何内容

  return (
    <>
      <h1>准备房间</h1>
      <Flex vertical gap={"small"}>
        {playersLayout}
      </Flex>
      <Button type="primary">准备</Button>
    </>
  );
}
