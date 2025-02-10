import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Flex } from "antd/es";
import { Button } from "antd/es";
import CreateHome from "./createRoom";
import GameLobby from "./gameLobby";
import '../../App.css'
export default function Home() {
  //路由传值接收部分  ： 包括账号名称，昵称，用户id，用户金币等级
  const location = useLocation();
  const { state } = location;
  const account = state?.user?.account || "游客";
  const name = state?.user?.name || "小可爱_游客";
  const id = state?.user?.id || null;
  //用户信息
  const user = { ...state?.user, id, account, name };

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

  const items = [
    {
      key: "0",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          账号:{account}
        </a>
      ),
    },
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          昵称:{name}
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
      <div style={{position:'absolute',top:0,right:0,paddingRight:'10px',paddingTop:'10px'}}>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Flex vertical>
          <Avatar size={64} src={user?.avatar} icon={<UserOutlined />} />
          <span>{user.name}</span>
        </Flex>
      </Dropdown>
      </div>

      <Flex align="center" justify="center" style={{ width: "100%",position:'absolute',top:0,zIndex:-1}} >
        <h1>Coup 政变</h1>
      </Flex>

      <Flex
        align="center"
        justify="center"
        gap="small"
        className="full-screen"
      >
        <Button type="primary" onClick={() => setIsCreateHome(true)}>
          创建房间
        </Button>
        <Button type="primary">加入房间</Button>
      </Flex>
      <CreateHome open={isCreateHome} setOpen={setIsCreateHome} />
    </div>
  );
}
