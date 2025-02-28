import { background } from "../challengeConclusion/component";
import "../challengeConclusion/challengeConclusion.css";

import React, { useEffect, useRef } from "react";
import { Layout, Row, Col, Typography, Button } from "antd";
import { Flex } from "antd";
import { Avatar } from "antd";
import { useSocket } from "../../utl/socketContext";
import { serverMessage } from "../../utl/socket.message";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

export function GameOver({ players, owner, roomBase }) {
  const navigate = useNavigate();
  let first;
  const socket = useSocket();
  

  let playerAll = [owner, ...players].filter((player) => {
    player.score = player.kill * 10 + player.assists * 7 + player.challenge * 5;
    if (player.id === roomBase.winnerId) {
      first = player;
    }
    return player.id !== roomBase.winnerId;
  });

  // 对playerAll进行排序
  playerAll.sort((a, b) => {
    return b.score - a.score; // 如果b的score大于a的score，则b会排在a前面
  });

  const [second, third, ...others] = playerAll;

  const isAlert = useRef(false);
  function handleClick() {
    if (!isAlert.current) {
      socket.emit(serverMessage.deleteRoom, { roomId: roomBase.roomId });
      socket.disconnect();
      navigate("/home");
      isAlert.current=true
    }
  }

  return (
    <>
      <div className="success-mask">
        <div style={{ position: "absolute", left: '5px', top: '5px' }}>
          <Button type="primary" onClick={handleClick}>
            返回主页
          </Button>
        </div>
        {background("gameOver")}
        <Layout
          style={{
            textAlign: "center",
            backgroundColor: "var(--mask-white-color)",
          }}
        >
          <Content>
            <Title>游戏结束！</Title>
            <Row gutter={16} style={{ marginTop: "14px" }}>
              <Col
                xs={24}
                sm={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {second && (
                  <Flex vertical align="center" justify="center">
                    <Title level={3}>第二名</Title>
                    <Avatar size={54} src={second.avatar} alt="第二名" />
                    <span>
                      <b>{second.name}</b>
                    </span>
                    <span>击杀数:{second.kill}</span>
                    <span>助杀数:{second.assists}</span>
                    <span>质疑数:{second.challenge}</span>
                  </Flex>
                )}
              </Col>
              <Col
                xs={24}
                sm={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {first && (
                  <Flex vertical align="center" justify="center">
                    <Title level={3}>第一名</Title>
                    <Avatar size={64} src={first.avatar} alt="第一名" />
                    <span>
                      <b>{first.name}</b>
                    </span>
                    <span>击杀数:{first.kill}</span>
                    <span>助杀数:{first.assists}</span>
                    <span>质疑数:{first.challenge}</span>
                  </Flex>
                )}
              </Col>
              <Col
                xs={24}
                sm={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {third && (
                  <Flex vertical align="center" justify="center">
                    <Title level={3}>第三名</Title>
                    <Avatar size={44} src={third.avatar} alt="第三名" />
                    <span>
                      <b>{third.name}</b>
                    </span>
                    <span>击杀数:{third.kill}</span>
                    <span>助杀数:{third.assists}</span>
                    <span>质疑数:{third.challenge}</span>
                  </Flex>
                )}
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: "14px" }}>
              <Col span={24}>
                <Title level={5}>其他玩家</Title>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Avatar.Group>
                    {others.map((player, index) => (
                      <Avatar
                        key={index}
                        src={player?.avatar}
                        alt={`玩家${index + 4}`}
                      />
                    ))}
                  </Avatar.Group>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    </>
  );
}
