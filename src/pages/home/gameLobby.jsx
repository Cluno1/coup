import React, { useEffect, useState } from "react";

import { Card, Modal, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import api from "../utl/api/api";
import { useSocket } from "../utl/socketContext";
import { useNavigate } from "react-router-dom";

export default function GameLobby({ isOpen, setIsOpen,user }) {

  useEffect(() => {
    async function a() {  
      const list = await api.getRoomList(); 
      setRooms(list)
    }
    if (isOpen) {
      a();
    }
  }, [isOpen]);
  const navigate = useNavigate();
  const socket = useSocket();
  const [rooms,setRooms] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [inputPassword, setInputPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  let  name, avatar, user_rank ;
  ({ name, avatar, user_rank }=user);

  const handleRoomClick = (room) => {
    if (!room.isPublic) {
      setSelectedRoom(room);
      setVisible(true);
    } else {

      socket.connect();
      socket.emit("joinRoom",{room:room,player:{ name, avatar, user_rank }});
      // 监听服务器发送的 playerJoined 消息
      socket.on("playerJoined", (players) => {
        console.log("Player joined:", players);
        navigate('/readyRoom',{state:{players}})
      });

      // 监听服务器发送的 failAddInRoom 消息
      socket.on("failAddInRoom", (error) => {
        console.error("Failed to join the room:", error);
        // 这里可以处理加入房间失败的逻辑，比如显示错误消息等
        alert('Failed to join the room');
        socket.disconnect();
      });

    }
  };

  const handlePasswordSubmit = () => {
    if (inputPassword === selectedRoom.password) {
      setVisible(false);
      message.success(`成功进入房间：${selectedRoom.roomName}`);
      setPasswordConfirm(true);
      // 这里可以添加进入房间的逻辑
    } else {
      message.error("密码错误");
      setPasswordConfirm(false);
    }
  };

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
        {rooms.length>0?rooms.map((room, index) => (
          <Card
            key={index}
            title={room.roomName}
            style={{
              width: 300,
              margin: "16px auto",
              backgroundColor: "#8400f845",
            }}
            onClick={() => handleRoomClick(room)}
          >
            <p>房主：{room.owner.name}</p>
            <p>人数：{room.playerCount}</p>
            {!room.isPublic && <LockOutlined />}
          </Card>
        )):<span>暂无房间信息</span>}
        <Modal
          title="输入密码"
          open={visible}
          onOk={handlePasswordSubmit}
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
      </Drawer>
    </>
  );
}
