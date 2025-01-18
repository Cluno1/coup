
import React, { useState } from 'react';
import { Modal,Input,Switch,InputNumber } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Flex } from 'antd/es';
import { useNavigate } from 'react-router-dom';


export default function CreateRoom(props){
  const navigate=useNavigate()
    const open=props.open
    const setOpen=props.setOpen
    //loading状态
    const [confirmLoading, setConfirmLoading] = useState(false);
    //数据项
    const [roomName, setRoomName] = useState(''); 
    const [playerCount, setPlayerCount] = useState(2); // 默认2人
  const [isPublic, setIsPublic] = useState(true); // 默认公开
  const [password, setPassword] = useState(''); // 密码状态

  const handlePlayerCountChange = value => {
    setPlayerCount(value);
  };

  const handleSwitchChange = checked => {
    setIsPublic(checked);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  
  //modal函数
    
    const handleOk = () => {
      setConfirmLoading(true);


      //TODO：收集房间数据，发送后端
      //[roomName,playerCount, isPublic, password，owner]
      //TODO 本人进入房间等待
      navigate('/room')
      console.log({ roomName,playerCount, isPublic, password })
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
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
            <Flex vertical gap={'small'}>
            <div style={{ marginTop: 16 }}>
                <Flex>
            <label>房间名称：</label>
             <Input
                placeholder="房间名字"
                prefix={<HomeOutlined />}
                style={{maxWidth:'200px'}}
                value={roomName}
                onChange={(e) =>setRoomName(e.target.value)}
            />
        </Flex>
            </div>
             <div>
             
        <label>参与人数：</label>
        <InputNumber min={2} max={10} value={playerCount} onChange={handlePlayerCountChange} />
      </div>
      <div style={{ marginTop: 16 }}>
        <label>是否公开：</label>
        <Switch checked={isPublic} onChange={handleSwitchChange} />
      </div>
      {!isPublic && (
        <div style={{ marginTop: 16 }}>
          <label>设置密码：</label>
          <Input.Password value={password} onChange={handlePasswordChange}
            style={{maxWidth:'200px'}}
          />
        </div>
      )}
      
      </Flex>
        </Modal>
      </>
    );
}