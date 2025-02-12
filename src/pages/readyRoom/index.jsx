import { Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./readyRoom.css";
import { Flex } from "antd";
import { useSocket } from "../utl/socketContext";

export function ReadyRoom() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  //路由传值接收部分
  const location = useLocation();
  const socket = useSocket();

  useEffect(() => {
    // 确保从 location.state 接收到的 players 是一个数组
    if (location.state && Array.isArray(location.state.players)) {
      setPlayers(location.state.players);
      setRoom(location.state?.room);
      setUser(location.state.user);
    }
  }, []);

  // 监听 socket 事件
  socket.on("playerJoined", (data) => {
    console.log(data, "--27");
    if (Array.isArray(data.players)) {
      console.log("Player joined:", data.players);

      setPlayers(data.players);
    }
  });
  socket.on("leaveRoomFail", (message) => {
    console.error(message);
    alert(message);
  });

  socket.on("updatePlayers", (data) => {
    
    console.log(data, "--40");
    if (Array.isArray(data.players)) {
      console.log("Player update:", data.players);
      setPlayers(data.players);
    }
  });
  socket.on("playersAllReady", ()=>{
    console.log('playersAllReady')
    //TODO 进入房间阶段
    navigate('/room',{state:{owner:user}})
  });

  function handleLeave() {
    socket.emit("leaveRoom", {
      room: room,
      player: {
        name: user.name,
        avatar: user.avatar,
        user_rank: user.user_rank,
      },
    });
    navigate("/home", { state: { user } });
  }
  function handleIsReady() {
    if (!isReady) {
      //没准备好,就设置准备好
      socket.emit("setReady", {
        room: room,
        player: {
          name: user.name,
          avatar: user.avatar,
          user_rank: user.user_rank,
        },
      });
      setIsReady(true);
    } else {
      socket.emit("setUnready", {
        room: room,
        player: {
          name: user.name,
          avatar: user.avatar,
          user_rank: user.user_rank,
        },
      });
      setIsReady(false);
    }
  }

  // tips:确保在映射之前 players 是一个数组
  const playersLayout = Array.isArray(players)
    ? players.map((p, index) => {
        return (
          <div
            key={p.name + index}
            className="player"
            style={{
              backgroundColor: p.isReady
                ? "var(--ready-color)"
                : "var(--unready-color)",
            }}
          >
            <Flex vertical justify="center" align="center">
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
      <Flex vertical gap={"small"} justify="center" align="center">
        <h1>准备房间</h1>
        <Flex vertical gap={"small"}>
          {playersLayout}
        </Flex>
        <Flex className="room-message" vertical>
          <h3>房间名: {room?.roomName}</h3>
          <span>房间ID: {room?.id}</span>
          <span>房间密码: {room?.password}</span>
        </Flex>
        <Flex className="footer" justify="center" gap={"small"}>
          <Button type="primary" onClick={handleIsReady} danger={!isReady}>
            {isReady ? "已准备" : "准备"}
          </Button>
          <Button type="primary" onClick={handleLeave}>
            离开
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
