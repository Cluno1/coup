import { Avatar, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./readyRoom.css";
import { Flex } from "antd";
import { useSocket } from "../utl/socketContext";
import { clientMessage, serverMessage } from "../utl/socket.message";
import { message } from "antd";

export function ReadyRoom() {
  const [messageApi, contextHolder] = message.useMessage();
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
      setUser(location.state?.user);
    } else {
      messageApi.open({
        type: "error",
        content: "准备房间不存在",
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  }, []);

  const isAlert = useRef(false);

  useEffect(() => {
    const sDeleteOk = (data) => {
      if (!isAlert.current) {
        socket.disconnect();
        messageApi.open({
          type: "warning",
          content: "房间已被房主删除",
        });
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        isAlert.current = true;
      }
    };
    const sPJoin = (data) => {
      console.log(data, "--27");
      if (Array.isArray(data.players)) {
        console.log("Player joined:", data.players);
        messageApi.info("玩家加入房间");
        setPlayers(data.players);
      }
    };
    const sPLeft = (data) => {
      if (Array.isArray(data.players)) {
        console.log("Player left:", data.players);
        messageApi.info("玩家离开房间");
        setPlayers(data.players);
      }
    };
    const lRFail = (message) => {
      console.error(message);
      messageApi.open({
        type: "error",
        content: message,
      });
    };
    const uP = (data) => {
      console.log(data, "--40");
      if (Array.isArray(data.players)) {
        console.log("Player update:", data.players);
        setPlayers(data.players);
      }
    };
    const pAllReady = () => {
      console.log("playersAllReady");
      messageApi.open({
        type: "loading",
        content: "即将进入对局...",
        duration: 0,
      });
      setTimeout(() => {
        messageApi.destroy();
        navigate("/room", { state: { user: user, roomId: room?.id } });
      }, 3000);
    };
    // 监听 socket 事件
    socket.on("playerJoined", sPJoin);
    socket.on(clientMessage.playerLeft, sPLeft);
    socket.on("leaveRoomFail", lRFail);
    socket.on("updatePlayers", uP);
    socket.on("playersAllReady", pAllReady);
    socket.on(clientMessage.deleteRoomOk, sDeleteOk);
    return () => {
      socket.off("playerJoined", sPJoin);
      socket.off(clientMessage.playerLeft, sPLeft);
      socket.off("leaveRoomFail", lRFail);
      socket.off("updatePlayers", uP);
      socket.off("playersAllReady", pAllReady);
      socket.off(clientMessage.deleteRoomOk, sDeleteOk);
    };
  }, [user,room]);

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

  function handleDelete() {
    socket.emit(serverMessage.deleteRoom, { roomId: room?.id });
  }

  // tips:确保在映射之前 players 玩家是一个数组
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
      {contextHolder}
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

          {room?.owner.name === user?.name ? (
            <Button type="primary" onClick={handleDelete}>
              删除房间
            </Button>
          ) : (
            <Button type="primary" onClick={handleLeave}>
              离开
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
}
