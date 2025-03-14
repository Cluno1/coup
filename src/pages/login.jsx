import { Input, Flex, Button } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
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

   // 从 localStorage 中获取存储的账号和密码
   useEffect(() => {
    const savedAccount = localStorage.getItem("account");
    const savedPassword = localStorage.getItem("password");
    if (savedAccount) setAccount(savedAccount);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  function changeInput(val, e) {
    if (val === "account") setAccount(e.target.value);
    else if (val === "password") setPassword(e.target.value);
  }

  async function submit() {
    if (account && password) {
      let user = await api.login({ account, password });
      if (!user?.code) {
        
        localStorage.setItem("account", account);
        localStorage.setItem("password", password);
        navigate("/home", { state: { user } });
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
