import React, { useState } from "react";
import { Drawer, Button, Table } from "antd";
import { Flex } from "antd";
import { CloseCircleOutlined, LineOutlined } from "@ant-design/icons";
import characterCards, { commonActions } from "../character";
import "../room.css";


/**
 *
 * @returns 说明按钮 组件
 */
export default function Instructions() {
  const [visible, setVisible] = useState(false);
  /**const Inquisitor={
        img:'https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/inquisitor.jpg',
        name:character[5],
        actions:[actions[4],actions[5]],
        act:[exchange1,examine],
        blocks:blocks[1],
    }; */

  const dataColumns = [
    {
      title: "Character",
      dataIndex: "character",
      key: "character",
      render: (character) => {
        if (character == null) {
          return <LineOutlined />;
        } else {
          return <p>{character}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (act) => {
        if (act == null) {
          return <CloseCircleOutlined />;
        } else if (Array.isArray(act)) {
          return act.map((act) => (
            <>
              <Flex vertical>
                <p>{act}</p>
              </Flex>
            </>
          ));
        } else {
          return <p>{act}</p>;
        }
      },
    },
    {
      title: "Action Explain",
      dataIndex: "actionExplain",
      key: "actionExplain",
      render: (act) => {
        if (act == null) {
          return <CloseCircleOutlined />;
        } else if (Array.isArray(act)) {
          return act.map((act) => (
            <>
              <Flex vertical>
                <p>{act}</p>
              </Flex>
            </>
          ));
        } else {
          return <p>{act}</p>;
        }
      },
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (block) => {
        if (block == null) {
          return <CloseCircleOutlined />;
        } else {
          return <p>{block}</p>;
        }
      },
    },
  ];

  /**const incomeCharacter={
        img:null,
        name:null,
        actions:'income',
        act:income,
        blocks:null,
    }; */

  const d = [...commonActions, ...characterCards];
  const data = d.map((action) => {
    return {
      character: action.name,
      action: action.actions,
      actionExplain: action.explain,
      block: action.blocks,
    };
  });

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  //table
  // 设置表格滚动属性
  const scroll = {
    y: 140, // 设置内容区域的高度，表头将固定在顶部
    x: 1, // 如果需要固定列宽，可以设置为true或者具体数值
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        说明
      </Button>
      <Drawer
        forceRender
        title="Instructions 说明"
        placement="top"
        closable={true}
        onClose={onClose}
        open={visible}
        key="top"
        height={300}
      >
        <Table
          dataSource={data}
          columns={dataColumns}
          scroll={scroll} // 添加scroll属性
          pagination={false}
        />
      </Drawer>
    </>
  );
}
