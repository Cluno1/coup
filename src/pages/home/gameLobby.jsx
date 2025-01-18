
import React, { useState } from 'react';


import { Card, Modal, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
export default function GameLobby(props){
    const [rooms] = useState([
        {
          roomName: '弟兄势不可挡',
          owner: 'cluno',
          playerCount: 4,
          isPublic: true,
          password: '',
        },
        {
            roomName: '弟兄势不可挡',
            owner: 'cluno02',
            playerCount: 5,
            isPublic: false,
            password: '1234',
        },
        // ...其他房间数据
      ]);
    
      const [visible, setVisible] = useState(false);
      const [selectedRoom, setSelectedRoom] = useState(null);
      const [inputPassword, setInputPassword] = useState('');
      const [passwordConfirm,setPasswordConfirm]=useState(true);
    
      const handleRoomClick = (room) => {
        if (!room.isPublic) {
          setSelectedRoom(room);
          setVisible(true);
        } else {
          // 处理公开房间的点击事件
          message.info(`进入房间：${room.roomName}`);
        }
      };
    
      const handlePasswordSubmit = () => {
        if (inputPassword === selectedRoom.password) {
          setVisible(false);
          message.success(`成功进入房间：${selectedRoom.roomName}`);
          setPasswordConfirm(true);
          // 这里可以添加进入房间的逻辑
        } else {
          message.error('密码错误');
          setPasswordConfirm(false);
        }
      };
    
      const handlePasswordChange = (e) => {
        setInputPassword(e.target.value);
      };
    
      const handleCancel = () => {
        setVisible(false);
        setInputPassword('');
      };
    
      return (
        <div>
          {rooms.map((room, index) => (
            <Card
              key={index}
              title={room.roomName}
              style={{ width: 300, margin: '16px auto',backgroundColor:'purple' }}
              onClick={() => handleRoomClick(room)}
            >
              <p>房主：{room.owner}</p>
              <p>人数：{room.playerCount}</p>
              {!room.isPublic && <LockOutlined />}
            </Card>
          ))}
          <Modal
            title="输入密码"
            visible={visible}
            onOk={handlePasswordSubmit}
            onCancel={handleCancel}
          >
            <Input
              type="password"
              placeholder="请输入房间密码"
              value={inputPassword}
              onChange={handlePasswordChange}
              onFocus={()=>setPasswordConfirm(true)}
            />
            {passwordConfirm?null:<span>密码错误</span>}
          </Modal>
        </div>
      );
}

