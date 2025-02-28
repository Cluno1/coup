import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Flex } from "antd/es";
import { Button } from "antd/es";
import CreateHome from "./createRoom";
import GameLobby from "./gameLobby";
import "../../App.css";
import api from "../utl/api/api";
import { message } from "antd";

async function getUserByLocalStorage() {
  
  const savedAccount = localStorage.getItem("account");
  const savedPassword = localStorage.getItem("password");
  if (savedAccount && savedPassword) {
    const user = await api.login({
      account: savedAccount,
      password: savedPassword,
    });
    if (!user?.code) {
      return user;
    }
  }
  return {
    account: "游客",
    name: "小可爱_游客",
    user_rank: "",
    id: null,
  };
}

/**
 * // 连接到 WebSocket 服务器
    socket.connect();

    // 监听玩家加入房间的事件
    socket.on('playerJoined', (data) => {
      setPlayers(data.players);
    });
    //断开连接
    socket.disconnect();
    //发消息
    const data = {
      room: { id: 'roomId' }, // 替换为实际的房间 ID
      player: { id: 'playerId', name: 'PlayerName' }, // 替换为实际的玩家信息
    };
    socket.emit('joinRoom', data);
 * @returns 
 */

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  //路由传值接收部分  ： 包括账号名称，昵称，用户id，用户金币等级
  const location = useLocation();
  const [user, setUser] = useState({ account: "", name: "", user_rank: "" });
  useEffect(() => {
    
    if (location?.state) {
      //用户信息
      setUser({ ...location?.state?.user });
    } else {
      const a = async () => {
        const u = await getUserByLocalStorage();
        setUser(u);
      };
      a();
    }
  }, []);

  /**account:"cluno"
avatar:"https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/players-avatar/coup1.jpeg"
id: 1
isBan:0
name:"cluno01"
password:"81dc9bdb52d04dc20036dbd8313ed055"
sex:1
user_rank:"gold"
     */

  //创建房间
  const [isCreateHome, setIsCreateHome] = useState(false);
  //打开房间列表
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      key: "0",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          账号:{user?.account}
        </a>
      ),
    },
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          昵称:{user?.name}
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          等级:{user?.user_rank}
        </a>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          paddingRight: "10px",
          paddingTop: "10px",
        }}
      >
        <Dropdown menu={{ items }} placement="bottomRight">
          <Flex vertical align="center" justify="center">
            <Avatar size={64} src={user?.avatar} icon={<UserOutlined />} />
            <span>{user?.name}</span>
          </Flex>
        </Dropdown>
      </div>

      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", position: "absolute", top: 0, zIndex: -1 }}
      >
        <h1>Coup 政变</h1>
      </Flex>

      <Flex align="center" justify="center" gap="small" className="full-screen">
        <Button type="primary" onClick={() => setIsCreateHome(true)}>
          创建房间
        </Button>
        <Button type="primary" onClick={() => setIsOpen(true)}>
          加入房间
        </Button>
      </Flex>
      <GameLobby messageApi={messageApi} isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      <CreateHome messageApi={messageApi} open={isCreateHome} setOpen={setIsCreateHome} user={user} />
    </div>
  );
}
