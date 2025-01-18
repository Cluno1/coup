import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Flex } from 'antd/es';
import { Button } from 'antd/es';
import CreateHome from './createRoom';
import GameLobby from './gameLobby';
export default function Home(){

    //路由传值接收部分  ： 包括账号名称，昵称，用户id，用户金币等级
    const location = useLocation();
    const { state } = location;
    // const account = state?.account  || '游客';
    
    //用户信息
    const user={
        avatar:'https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg',//头像
        account:state?.account  || '游客',
        id:1,
        name:'cluno' ||state?.account  || '游客',
        money:200,
    }

    //创建房间
    const [isCreateHome,setIsCreateHome]=useState(false)
    
    // 下拉菜单的配置
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a target="_blank" rel="noopener noreferrer">
          账号：{user.account}
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer">
          昵称：{user.name}
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
        <GameLobby/>  
        <h1>Reformation or Coup</h1>
      <div style={{ position: 'fixed', top: 0, right: 0, padding: '10px' }}>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Flex vertical>
          
            <Avatar  size={64}
            src={user.avatar} icon={<UserOutlined />}                
            />
            <span>{user.money}</span>
          
          </Flex>
        </Dropdown>
      </div>
      <Flex  align='center' justify='center' gap='small' style={{height:'100vh'}}>
        <Button type="primary" onClick={()=>setIsCreateHome(true)}>创建房间</Button>
        <Button type="primary">加入房间</Button>
      </Flex>
      <CreateHome open={isCreateHome} setOpen={setIsCreateHome}/>
    </div>
    
  );
}