import { Flex } from "antd";
import { backgroundUrl } from "../../utls/imgUrl";
import "./challengeConclusion.css";
import { Divider } from "antd";
import { courtDeck } from "../playersLayout/component";
import { Spin } from "antd";

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
          zIndex: -1,
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
 *
 * @param {boolean} isWinner
 * @param {boolean} isActor
 * @returns
 */
export const conclusionText = (isWinner, isActor) => {
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
            isWinner
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
          {isActor
            ? isWinner
              ? "反击质疑"
              : "已被质疑成功"
            : isWinner
            ? "质疑成功"
            : "质疑失败"}
        </Divider>

        <span>{isWinner ? "YOUWIN!" : "YOUDEAD!"}</span>

        <Divider
          orientation="right"
          orientationMargin="200"
          style={
            isWinner
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
          {isWinner ? "等待对方失去一点势力..." : "请选择失去一点势力！"}
        </Divider>
      </Flex>
    </div>
  );
};

/**
 *
 * @param {object} player
 * @param {boolean} isWinner
 * @param {boolean} isActor
 * @param {boolean} isLoading   手牌是否是加载中的状态
 * @param {string} cardFlipName     角色名称,让一张手牌旋转
 * @returns
 */
export const conclusionPlayerLayout = (
  player,
  isWinner,
  isActor,
  isLoading = false,
  cardFlipName='',
) => {
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

          <Flex vertical gap={'small'}>
            <Spin spinning={isLoading}>
              <Flex gap="small" >{courtDeck(player,30,cardFlipName)}</Flex>
            </Spin>
            <span>
              coin: <b>{player.coin}</b>
            </span>
          </Flex>
        </Flex>
      </div>
    </>
  );
};
