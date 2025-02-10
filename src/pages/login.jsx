import { Input, Flex } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Button } from "antd/es";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./utl/api/api";
function Login() {
  //路由
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate("/register");
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

  function changeInput(val, e) {
    if (val === "account") setAccount(e.target.value);
    else if (val === "password") setPassword(e.target.value);
  }

  async function submit() {
    if (account && password) {
      let re = await api.login({ account, password });
      
      if (!re?.code) {
        //进行登录
        navigate("/home", { state: { user:re } });
      }
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
        <h1>登录界面</h1>
        <Input
          size="large"
          placeholder="账号名"
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
        <Flex gap="small" align="flex-end">
          <Button type="primary" onClick={submit}>
            登录
          </Button>
          <span onClick={handleRowClick}>
            没有账户？<a>去注册</a>
          </span>
        </Flex>
      </Flex>
    </div>
  );
}

export default Login;
