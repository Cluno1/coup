import React, { useState } from "react";
import { Modal, Input, Switch, InputNumber } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Flex } from "antd/es";
import { useNavigate } from "react-router-dom";
import api from "../utl/api/api";
import { useSocket } from "../utl/socketContext";

export default function CreateRoom(props) {
  const socket = useSocket();
  const navigate = useNavigate();
  const open = props.open;
  const setOpen = props.setOpen;
  const user = props.user;
  const { name, avatar, user_rank } = user;

  //loading状态
  const [confirmLoading, setConfirmLoading] = useState(false);
  //数据项
  const [roomName, setRoomName] = useState("");
  const [playerCount, setPlayerCount] = useState(4); // 默认4人
  const [isPublic, setIsPublic] = useState(true); // 默认公开
  const [password, setPassword] = useState(""); // 密码状态

  const handlePlayerCountChange = (value) => {
    setPlayerCount(value);
  };

  const handleSwitchChange = (checked) => {
    setIsPublic(checked);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOk = async () => {
    if (!user.id) {
      alert("请先登录");
      setOpen(false);
    }
    setConfirmLoading(true);

    const room = await api.createRoom({
      roomName,
      playerCount,
      isPublic,
      password,
      owner: { name, avatar, user_rank },
    });
    if (room) {
      //socket 连接
      socket.connect();
      socket.emit("joinRoom", {
        room: room,
        player: { name, avatar, user_rank },
      });
      // 监听服务器发送的 playerJoined 消息
      socket.on("playerJoined", (players) => {
        console.log("Player joined:", players);

        //navigate("/home", { state: { user } });
        navigate("/readyRoom", { state: { players } });
      });
      // 监听服务器发送的 failAddInRoom 消息
      socket.on("failAddInRoom", (error) => {
        console.error("Failed to join the room:", error);
        // 这里可以处理加入房间失败的逻辑，比如显示错误消息等
        alert("Failed to join the room");
        socket.disconnect();
      });
    }
    setConfirmLoading(false);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="创建房间"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Flex vertical gap={"small"}>
          <div style={{ marginTop: 16 }}>
            <Flex>
              <label>房间名称：</label>
              <Input
                placeholder="房间名字"
                prefix={<HomeOutlined />}
                style={{ maxWidth: "200px" }}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </Flex>
          </div>
          <div>
            <label>参与人数：</label>
            <InputNumber
              min={2}
              max={10}
              value={playerCount}
              onChange={handlePlayerCountChange}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <label>是否公开：</label>
            <Switch checked={isPublic} onChange={handleSwitchChange} />
          </div>
          {!isPublic && (
            <div style={{ marginTop: 16 }}>
              <label>设置密码：</label>
              <Input.Password
                value={password}
                onChange={handlePasswordChange}
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}
        </Flex>
      </Modal>
    </>
  );
}
