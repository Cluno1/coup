import React, { useEffect, useState } from "react";

import { Card, Modal, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import api from "../utl/api/api";
import { useSocket } from "../utl/socketContext";
import { useNavigate } from "react-router-dom";
import { clientMessage, serverMessage } from "../utl/socket.message";

export default function GameLobby({ messageApi, isOpen, setIsOpen, user }) {
  useEffect(() => {
    async function a() {
      //获取room列表
      const list = await api.getRoomList();
      setRooms(list);
    }
    if (isOpen) {
      a();
    }
  }, [isOpen]);
  const navigate = useNavigate();
  const socket = useSocket();
  const [rooms, setRooms] = useState([]); //房间列表
  const [visible, setVisible] = useState(false); //密码modal是否展示
  const [inputPassword, setInputPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(true); //密码输入是否正确
  let name, avatar, user_rank;
  ({ name, avatar, user_rank } = user);

  const handleRoomClick = (room) => {
    setPasswordConfirm(true);
    if (!room.isPublic && !visible) {
      setVisible(true);
    } else {
      room.password = inputPassword;

      socket.connect();
      socket.emit(serverMessage.joinRoom, {
        room: room,
        player: { name, avatar, user_rank },
      });
      // 监听服务器发送的 playerJoined 消息
      socket.on(clientMessage.playerJoined, (data) => {
        console.log("Player joined:", data.players);

        setPasswordConfirm(true);
        setVisible(false);

        navigate("/readyRoom", {
          state: { players: data.players, room, user },
        });
      });

      // 监听服务器发送的 fail 消息
      socket.on("joinRoomFail", (error) => {
        console.error("Failed to join the room:", error);
        // 这里可以处理加入房间失败的逻辑，比如显示错误消息等

        messageApi.info(error);
        setPasswordConfirm(false);
        socket.disconnect();
      });
      socket.on(clientMessage.roomIsFull, (error) => {
        console.error("room is full:", error);
        // 这里可以处理加入房间失败的逻辑，比如显示错误消息等
        // alert(error);
        messageApi.info(error);
        setPasswordConfirm(false);
        socket.disconnect();
      });
    }
  };

  // const handlePasswordSubmit = () => {
  //   if (inputPassword === selectedRoom.password) {
  //     setVisible(false);
  //     message.success(`成功进入房间：${selectedRoom.roomName}`);
  //     setPasswordConfirm(true);
  //     // 这里可以添加进入房间的逻辑
  //   } else {
  //     message.error("密码错误");
  //     setPasswordConfirm(false);
  //   }
  // };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleCancel = () => {
    setVisible(false);
    setInputPassword("");
  };

  return (
    <>
      <Drawer
        forceRender
        placement="top"
        closeIcon={true}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        key="top" //位置
      >
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <>
              <Card
                key={"card" + index}
                title={room.roomName}
                style={{
                  width: 300,
                  margin: "16px auto",
                  backgroundColor: "#8400f845",
                }}
                onClick={() => handleRoomClick(room)}
              >
                <p>ID:{room.id}</p>
                <p>房主：{room.owner.name}</p>
                <p>人数：{room.playerCount}</p>
                {!room.isPublic && <LockOutlined />}
              </Card>
              <Modal
                key={"modal" + index}
                title="输入密码"
                open={visible}
                onOk={() => handleRoomClick(room)}
                onCancel={handleCancel}
              >
                <Input
                  type="password"
                  placeholder="请输入房间密码"
                  value={inputPassword}
                  onChange={handlePasswordChange}
                  onFocus={() => setPasswordConfirm(true)}
                />
                {passwordConfirm ? null : <span>密码错误</span>}
              </Modal>
            </>
          ))
        ) : (
          <span>暂无房间信息</span>
        )}
      </Drawer>
    </>
  );
}
