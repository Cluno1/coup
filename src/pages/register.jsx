import { Input, Flex, Alert } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Button } from "antd/es";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "./utl/api/api";
function Register() {
  //路由
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate("/login");
  };

  //css
  let inputCss = {
    maxWidth: "200px",
  };
  const boxStyle = {
    width: "100%",
    height: "100vh",
  };

  //处理数据
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [confirm, setConfirm] = useState(true);
  function changeInput(val, e) {
    if (val === "account") setAccount(e.target.value);
    else if (val === "password") setPassword(e.target.value);
    else if (val === "rePassword") setRePassword(e.target.value);
  }

  async function submit() {
    if (password === rePassword) {
      //进行注册
      const re = await api.register({ account, password });

      if (!re?.code) {
        //跳转
        localStorage.setItem("account", account);
        localStorage.setItem("password", password);
        navigate("/home", { state: { user: re } });
      }
    } else {
      setRePassword("");
      setConfirm(false);
    }
  }
  return (
    <div style={boxStyle}>
      <Flex
        vertical
        gap="large"
        justify="center"
        style={boxStyle}
        align="center"
      >
        <h1>注册界面</h1>
        <Input
          size="large"
          placeholder="帐号名"
          prefix={<UserOutlined />}
          style={inputCss}
          value={account}
          onChange={(e) => changeInput("account", e)}
        />
        <Input.Password
          size="large"
          placeholder="密码"
          prefix={<KeyOutlined />}
          style={inputCss}
          value={password}
          onChange={(e) => changeInput("password", e)}
        />
        <Flex vertical align="flex-end">
          <Input.Password
            size="large"
            placeholder="再次输入密码"
            onFocus={() => setConfirm(true)}
            prefix={<KeyOutlined />}
            style={inputCss}
            value={rePassword}
            onChange={(e) => changeInput("rePassword", e)}
          />
          {confirm ? null : <span>密码输入错误</span>}
        </Flex>

        <Flex gap="small" align="flex-end">
          <Button type="primary" onClick={submit}>
            {" "}
            注册
          </Button>

          <span onClick={handleRowClick}>
            已有账户？<a>去登录</a>
          </span>
        </Flex>
      </Flex>
    </div>
  );
}

export default Register;
