import React, { useRef, useState } from "react";
import "./playersLayout.css";
import { Popover, Image } from "antd";
import { courtDeckBackgroundUrl } from "../../utl/imgUrl";
import characterCards from "../character";
import CardFlip from "../challengeConclusion/cardFlip";
import { Flex } from "antd";

/**
 *简单蒙版组件
 * @param {*} playerComponent
 * @param {*} maskString
 * @param {*} maskColor
 * @returns
 */
export function MaskComponent({
  playerComponent,
  maskString,
  maskColor = "var(--mask-color)",
}) {
  return (
    <div className="mask-container">
      {playerComponent}
      <div className="mask-layer" style={{ backgroundColor: maskColor }}>
        <span className="mask-text">{maskString}</span>
      </div>
    </div>
  );
}

/**
 *
 * @param {*} param0
 * @returns  返回 简单信息组件
 */
export function MessageComponent({
  component,
  messageComponent,
  direction = "bottom",
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <Popover
        content={messageComponent}
        open={isOpen}
        autoAdjustOverflow
        placement={direction}
      >
        {component}
        <div></div>
      </Popover>
    </div>
  );
}

/**
 * 判断是否是质疑者
 * @param {*} actionRecord
 * @param {*} challengerIdArray
 * @param {*} player
 * @returns
 */
export const isChallenger = (actionRecord, challengerIdArray, player) => {
  //如果非ActChallenge或BlockChallenge，则没有质疑者
  if (
    actionRecord.period != "ActChallenge" &&
    actionRecord.period != "BlockChallenge"
  ) {
    return false;
  }
  let tem = false;
  if (challengerIdArray.length != 0) {
    challengerIdArray.forEach((id) => {
      if (id === player.id) {
        tem = true;
      }
    });
  }
  return tem;
};

/**
 * 行动阶段的表达的信息组件
 * @param {*} param0
 * @returns
 */
export function ActMessage({ actionRecord, owner, players }) {
  if (!actionRecord.character) {
    //独吞 是额外的界面
    if (actionRecord.actionName === "Embezzlement") {
      return (
        <Flex vertical align="center" justify="center">
          <span>
            我没有<b>{"Duke"}</b>
          </span>
          <span>
            行动<b>{actionRecord.actionName}</b>
          </span>
        </Flex>
      );
    } else {
      return (
        <Flex vertical align="center" justify="center">
          <span>{actionRecord.actionName}</span>
        </Flex>
      );
    }
  }
  //act的信息：
  let victimName = null;
  if (actionRecord.victimPlayerId > 0) {
    if (owner.id === actionRecord.victimPlayerId) {
      victimName = owner.name;
    } else {
      players.forEach((p) => {
        if (p.id === actionRecord.victimPlayerId) victimName = p.name;
      });
    }
  }

  return (
    <Flex vertical align="center" justify="center">
      <span>
        我拥有<b>{actionRecord.character}</b>
      </span>
      <span>
        使用<b>{actionRecord.actionName}</b>
      </span>
      {victimName ? (
        <p>
          对待<b>{victimName}</b>
        </p>
      ) : null}
    </Flex>
  );
}

/**
 * 阻止阶段的信息
 * @param {object} actionRecord
 * @returns
 */
export function BlockMessage({ actionRecord }) {
  if (!actionRecord.victimCharacter) {
    null;
  }

  return (
    <>
      <p>
        我拥有<b>{actionRecord.victimCharacter}</b>
      </p>
      <p>能够{actionRecord.victimBlock}</p>
    </>
  );
}

/**
 * 返回牌背的组件，主玩家返回手牌
 * @param {object} player
 * @param {number} imgWidth
 * @param {string} cardFlipName  需要旋转的卡片的名称，为空则不旋转
 * @returns
 */
export const courtDeck = (player, imgWidth, cardFlipName = "") => {
  let flipCardUrl = null;
  if (cardFlipName) {
    characterCards.forEach((c) => {
      if (cardFlipName === c.name) {
        flipCardUrl = c.img;
      }
    });
  }

  if (player.characterCards || player.characterCards?.length >= 1) {
    //是主玩家，展示主玩家的牌

    const cards = player.characterCards.map((cardIndex) => {
      if (cardIndex > 0) {
        if (flipCardUrl === characterCards[cardIndex].img) {
          return (
            <>
              <CardFlip frontCardImg={flipCardUrl} imgWidth={imgWidth / 1.3} />
            </>
          );
        }
        return (
          <>
            <Image
              preview={false}
              width={imgWidth / 1.3}
              src={characterCards[cardIndex].img}
            />
          </>
        );
      } else {
        return null;
      }
    });
    return cards;
  }

  let courtDeck = [];

  for (let i = 0; i < player.characterCardNum; i++) {
    if (flipCardUrl) {
      courtDeck.push(
        <>
          <CardFlip frontCardImg={flipCardUrl} imgWidth={imgWidth / 1.3} />
        </>
      );
      flipCardUrl = null;
      continue;
    }

    courtDeck.push(
      <>
        <Image
          preview={false}
          width={imgWidth / 1.3}
          src={courtDeckBackgroundUrl}
        />
      </>
    );
  }
  return courtDeck;
};

/**
 * 返回可被选择的手牌 组件
 * @param {object} owner 主玩家
 * @param {number} imgWidth
 * @param {Function} onSelect
 * @returns
 */
export function canSelectCourt(owner, imgWidth, onSelect) {
  /**
   * selectCard={index:'',key:''}
   */
  const [selectCard, setSelectCard] = useState({index:-1,key:-1});
  
  const selectedCss = {
    width: `${imgWidth * 1.3}px`,
    transform: "translateY(-20%) ",
    transition: "all 0.4s ease-in-out",
  };

  const cardCss = {
    width: `${imgWidth}px`,
    cursor: "pointer",
    transition: "all 0.4s ease-in-out",
  };

  return owner.characterCards.map((cardIndex, index) => {
    return (
      <>
        <img
          key={index}
          style={
            selectCard.index === cardIndex &&selectCard.key=== index
              ? selectedCss
              : cardCss
          }
          src={characterCards[cardIndex].img}
          onClick={() => {
            if (selectCard.index != cardIndex && selectCard.key!= index) {
              
              setSelectCard({index:cardIndex,key:index});
              onSelect(cardIndex);
            } else {
              
              setSelectCard({index:-1,key:-1});
              onSelect(null);
            }
          }}
        />
      </>
    );
  });
}
