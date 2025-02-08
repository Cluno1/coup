import { Button, Flex, Progress } from "antd";
import { backgroundUrl } from "../../utls/imgUrl";
import "./challengeConclusion.css";
import { Divider } from "antd";
import { canSelectCourt, courtDeck } from "../playersLayout/component";
import { Spin } from "antd";
import { useEffect, useState } from "react";

/**
 *返回适应屏幕大小的背景图片
 * @param {string} type  'success' | 'fail' | 'background' | 'challenging'
 * @returns
 */
export const background = (type = "background") => {
  let url = "";
  switch (type) {
    case "success":
      url = backgroundUrl.successUrl;
      break;
    case "fail":
      url = backgroundUrl.failUrl;
      break;
    case "background":
      url = backgroundUrl.backgroundUrl;
      break;
    case "challenging":
      url = backgroundUrl.challengingUrl;
      break;
  }
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "var(--min-height)",
          zIndex: -10,
          overflow: "hidden",
        }}
      >
        <img
          alt="background"
          src={url}
          style={{
            width: "100%" /* 图片宽度为父元素的100% */,
            height: "100%" /* 图片高度为父元素的100% */,
            objectFit: "cover" /* 覆盖模式，裁剪图片以覆盖整个div */,
          }}
        />
      </div>
    </>
  );
};

/**
 * 质疑结果的文本组件
 * isActor=true 是行动者 非是质疑者
 * isWinner=true 胜利
 * @param {boolean} isWinner
 * @param {boolean} isActor
 * @param {boolean} isSpectator  是否是旁观者
 * @param {boolean} isChallengeSuccess  如果旁观者是true，质疑者是否质疑成功
 * @returns
 */
export const conclusionText = (
  isWinner,
  isActor,
  isSpectator = false,
  isChallengeSuccess = null
) => {
  //是否行动者 是否胜利

  //isActor=true 是行动者 非是质疑者
  //isWinner=true 胜利
  return (
    <div
      style={{
        backgroundColor: "var(--mask-white-color)",
        width: "100vw",
      }}
    >
      <Flex vertical>
        <Divider
          orientation="left"
          orientationMargin="200"
          style={
            isSpectator
              ? {
                  borderColor: "var(--success-color)",
                  color: "var(--success-color)",
                }
              : isWinner
              ? {
                  borderColor: "var(--success-color)",
                  color: "var(--success-color)",
                }
              : {
                  borderColor: "var(--fail-color)",
                  color: "var(--fail-color)",
                }
          }
        >
          {isSpectator
            ? isChallengeSuccess
              ? "质疑者成功"
              : "质疑者失败"
            : isActor
            ? isWinner
              ? "反击质疑"
              : "已被质疑成功"
            : isWinner
            ? "质疑成功"
            : "质疑失败"}
        </Divider>

        <span>
          {isSpectator
            ? "YOUARESPECTATOR!"
            : isWinner
            ? "YOUAREWIN!"
            : "YOUAREDEAD!"}
        </span>

        <Divider
          orientation="right"
          orientationMargin="200"
          style={
            isSpectator
              ? {
                  borderColor: "var(--success-color)",
                  color: "var(--success-color)",
                }
              : isWinner
              ? {
                  borderColor: "var(--success-color)",
                  color: "var(--success-color)",
                }
              : {
                  borderColor: "var(--fail-color)",
                  color: "var(--fail-color)",
                }
          }
        >
          {isSpectator
            ? "等待失败者失去一点势力..."
            : isWinner
            ? "等待对方失去一点势力..."
            : "请选择失去一点势力！"}
        </Divider>
      </Flex>
    </div>
  );
};

/**
 *质疑的界面组件
 * @param {object} player
 * @param {boolean} isWinner
 * @param {boolean} isActor
 * @param {boolean} isLoading   手牌是否是加载中的状态
 * @param {string} cardFlipName     角色名称,让一张手牌旋转
 * @param {boolean} isCanSelect     是否是可以被选择的卡片，即被选择后可以被传到后端删除
 * @returns
 */
export const conclusionPlayerLayout = (
  player,
  isWinner,
  isActor,
  isLoading = false,
  cardFlipName = "",
  isCanSelect = false
) => {
  
  const [selectCard, setSelectCard] = useState(null);

  const handleButton = () => {
    //TODO
    console.log("todo 传到后端删除");
  };

  const button = (
    <>
      <Divider
        type="vertical"
        style={{ borderColor: "black", height: "60px" }}
      />
      <Button
        type="primary"
        disabled={selectCard ? false : true}
        onClick={handleButton}
        style={{ color: "white" }}
      >
        丢弃
      </Button>
    </>
  );

  return (
    <>
      <div style={{ color: "white" }}>
        <Flex gap={"small"} justify="center" align="center">
          <img
            src={player.avatar}
            style={{
              width: "50px",
            }}
          />

          <Flex vertical>
            <p>
              <span
                style={
                  !isWinner
                    ? {
                        color: "var(--fail-color)",
                      }
                    : {
                        color: "var(--success-color)",
                      }
                }
              >
                {!isActor ? "质疑者:" : "行动者:"}
              </span>
              <br />
              {player.name}
            </p>
          </Flex>
          <Divider
            type="vertical"
            style={{ borderColor: "black", height: "60px" }}
          />

          <Flex vertical gap={"small"}>
            <Spin spinning={isLoading}>
              <Flex gap="middle">
                {isCanSelect
                  ? canSelectCourt(player, 50, setSelectCard)
                  : courtDeck(player, 30, cardFlipName)}
                <div style={cardFlipName ? { height: "30px" } : {}}></div>
              </Flex>
            </Spin>

            <span>
              coin: <b>{player.coin}</b>
            </span>
          </Flex>
          {isCanSelect ? button : null}
        </Flex>
      </div>
    </>
  );
};

/**
 * 进度条组件
 * @param {*} nowTime 现在的时间 ,默认0
 * @param {*} totalTime 总共的时间
 * @param {*} isInterval 是否定时，默认false ；如果true，从nowTime-totalTime开始定时
 * @param {*} onOk ok回调函数，当达到total时间时候触发
 * @param {*} isShow 默认true, false为不显示
 * @returns
 */
export function CommonProgress({
  nowTime = 0,
  totalTime = 0,
  isInterval = false,
  onOk=()=>{},
  isShow=true,
}) {
  const [percent, setPercent] = useState(nowTime / totalTime);
  
  const [showTime, setShowTime] = useState(nowTime);

 

  useEffect(() => {
    if (isInterval) {
      
      const startTime = performance.now();
      // const endTime = startTime + totalTime * 1000;

      const step = () => {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const newTime = elapsed / 1000;
        const newPercent = (newTime / totalTime) * 100;

        
        setPercent(newPercent);
        setShowTime(Math.floor(newTime));

        if(newTime>=totalTime){
          
          onOk()
        }
          const nextTick = 10 - ((currentTime - startTime) % 10);
          setTimeout(step, nextTick);
        
      };

      step();
    }
  }, [totalTime, isInterval]); // 依赖于totalTime和isInterval

  const conicColors = {
    from: "blue",
    to: "red",
  };

  

  return (
    <>
      {isShow?<Flex >
        <div>
          <Progress
            percent={percent >= 100 ? 100 : percent}
            showInfo={false}
            size={[600, 5]}
            strokeColor={conicColors}
            status="active"
          />
        </div>
        <span>{showTime+'s'}</span>
      </Flex>:null}
    </>
  );
}
