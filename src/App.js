import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Room from "./pages/room";
import Test from "./pages/test";
import { ReadyRoom } from "./pages/readyRoom";
import { SocketProvider } from "./pages/utl/socketContext";

function App() {
  function adjustHeight() {
    //动态获取玩家手机的绝对高度: css里面可以:root{--min-height: calc(var(--vh, 1vh) * 100)};
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  function adjustWidth() {
    // 动态获取玩家手机的宽度，并设置为CSS的自定义属性
    var vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }

  // 监听窗口大小变化事件，调整高度和宽度
  window.addEventListener("resize", function () {
    adjustHeight();
    adjustWidth();
  });

  // 初始化调用，设置初始的高度和宽度
  adjustHeight();
  adjustWidth();

  return (
    <div>
      <SocketProvider>
      <Routes>
        <Route path="/login" element={<Login />} /> //用法
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/test" element={<Test />} />
        <Route path="/readyRoom" element={<ReadyRoom />} />
      </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
