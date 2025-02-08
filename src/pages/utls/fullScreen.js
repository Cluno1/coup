import { RotateLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { Button } from "antd";
import { useEffect, useState } from "react";
import "../../App.css";

const FullScreenComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullScreen = () => {
    const element = document.documentElement;

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        /* Firefox */
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        /* IE/Edge */
        element.msRequestFullscreen();
      }

      // 检测是否为移动设备并设置横屏
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        screen.orientation.lock("landscape").catch((error) => {
          console.error("无法锁定屏幕方向:", error);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      // 解锁屏幕方向
      screen.orientation.unlock();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // 监听全屏状态变化的事件
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    // 清理事件监听器
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  //顶格要求玩家全屏
  const topFullScreen = (
    <div
      className="full-screen"
      style={{
        position: "absolute",
        zIndex: 2000,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "gray",
        color: "white",
      }}
    >
      <Flex vertical gap={"small"} align="center" justify="center" style={{width:'99vw',height:'98vh'}} >
        <span>开始游戏请全屏体验</span>
        <div>
          <Button size={"large"} onClick={handleFullScreen}>
            {"全屏"}
          </Button>
        </div>
      </Flex>
    </div>
  );

  return (
    <div>
      {isFullscreen ? null : topFullScreen}

      <Button size={"large"} onClick={handleFullScreen}>
        {isFullscreen ? <RotateLeftOutlined /> : "全屏"}
      </Button>
    </div>
  );
};

export default FullScreenComponent;
