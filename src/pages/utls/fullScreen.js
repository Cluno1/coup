import { RotateLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";

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
  
    return (
      <div>
        
        <Button size={'large'} onClick={handleFullScreen} >
          {isFullscreen ? <RotateLeftOutlined /> : "全屏"}
        </Button>
      </div>
    );
  };

  export default FullScreenComponent ;
  