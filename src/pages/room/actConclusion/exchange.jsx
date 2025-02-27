import { Button, Flex } from "antd";
import "../challengeConclusion/challengeConclusion.css";
import { background } from "../challengeConclusion/component";
import characterCards from "../character";
import { useEffect, useState } from "react";
import { Avatar } from "antd";
import { useSocket } from "../../utl/socketContext";
import { serverMessage } from "../../utl/socket.message";


const selectedCss = (imgWidth) => ({
  width: `${imgWidth}px`,
  transform: "translateY(-20%) ",
  objectFit: "contain",
  transition: "all 0.4s ease-in-out",
});

const cardCss = (imgWidth) => ({
  width: `${imgWidth}px`,
  cursor: "pointer",
  objectFit: "contain",
  transition: "all 0.4s ease-in-out",
});

/**
 * 返回卡牌layout
 * @param {object} card   卡片对象 card={cardName,index,from}//index是下标,from是标记玩家手牌还是后端牌来源,index和from用来区分选中的牌是什么牌
 * @param {Array} selectCards 选取的卡片对象数组
 * @param {fn} setActive   setActive(card) 该函数的param是一个卡片对象
 * @param {number} imgWidth
 * @returns
 */
function CheckCourtImg({
  card,
  selectCards = [],
  setActive = () => {},
  imgWidth = 80,
}) {
  const [select, setSelect] = useState(false);

  function isSelectCard(card) {
    let i = false;
    selectCards.forEach((c) => {
      if (
        c?.cardName === card?.cardName &&
        c?.index === card?.index &&
        c?.from === card?.from
      ) {
        i = true;
      }
    });
    return i;
  }

  useEffect(() => {
    //选取的卡片更新,同样更新该卡片是否是选取状态
    if (isSelectCard(card)) {
      setSelect(true);
    } else {
      setSelect(false);
    }
  }, [selectCards]);

  let i = null;
  characterCards.forEach((character) => {
    if (character.name === card?.cardName) {
      i = (
        <>
          <img
            src={character.img}
            style={select ? selectedCss(imgWidth) : cardCss(imgWidth)}
            onClick={() => setActive(card)}
          />
        </>
      );
    }
  });

  return i;
}

/**
 * 抽取牌库的牌,选择重新组成手牌
 * @param {*} actionRecord
 * @param {*} owner
 * @param {*} roomId
 * @returns
 */
export function Exchange({ roomId,actionRecord, owner }) {
  //图片宽
  const courtImgWidth = 120;
  const selectedCourtImgWidth = 90;

  //被选中的卡片的对象数组
  const [selectCards, setSelectCards] = useState([]);
  const [showButton, setShowButton] = useState(false);

  function handleSelect(card) {
    let cards = [];
    let bool = true; //true是添加 false是删除

    cards = selectCards.filter((c) => {
      if (
        c?.cardName === card?.cardName &&
        c?.index === card?.index &&
        c?.from === card?.from
      ) {
        bool = false;
      }
      return !(
        c?.cardName === card?.cardName &&
        c?.index === card?.index &&
        c?.from === card?.from
      );
    });

    if (bool) {
      cards.push(card);
    }

    if (cards.length > owner.characterCardNum) {
      cards.shift();
    }

    if (cards.length >= owner.characterCardNum) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }

    setSelectCards(cards);
  }

  let courtImg = actionRecord.checkCourt.map((court, index) => {
    //court是卡片名称
    return (
      <CheckCourtImg
        card={{ cardName: court, index: index, from: "checkCourt" }}
        selectCards={selectCards}
        setActive={handleSelect}
        imgWidth={courtImgWidth}
      />
    );
  });

  let ownerCourtImg = owner.characterCards.map((cardIndex, index) => {
    const court = characterCards[cardIndex].name;
    return (
      <CheckCourtImg
        card={{ cardName: court, index: index, from: "owner" }}
        selectCards={selectCards}
        setActive={handleSelect}
        imgWidth={courtImgWidth}
      />
    );
  });

  let selectedCourtImg = selectCards.map((card) => {
    return (
      <CheckCourtImg
        card={card}
        selectCards={[]}
        setActive={handleSelect}
        imgWidth={selectedCourtImgWidth}
      />
    );
  });

  const socket=useSocket()
  function handleSubmit(){
    const characterArray=selectCards.map((sc)=>{
      return sc.cardName
    })
    socket.emit(serverMessage.exchangeConclusion,{
      roomId: roomId,
      newCharacterArray: characterArray
    })
  }

  return (
    <>
      <div className="success-mask">
        {background("challenging")}
        <Flex vertical gap={"small"}>
          <div
            style={{
              width: "100vw",
              backgroundColor: "var(--mask-white-color)",
            }}
          >
            <Flex align="center" justify="center" gap={"small"}>
              <span>牌库:</span>
              {courtImg}
              <span>手牌:</span>
              {ownerCourtImg}
            </Flex>
          </div>

          <div
            style={{
              width: "100vw",
              height: "9rem",
            }}
          >
            <Flex
              align="center"
              justify="center"
              gap={"small"}
              style={{
                height: "9rem",
              }}
            >
              <Flex vertical>
                <Avatar src={owner.avatar} />
                <span style={{ color: "white" }}>{owner.name}</span>
              </Flex>

              <Flex style={{ minWidth: "200px" }} gap={"small"}>
                {selectedCourtImg}
              </Flex>
              <div style={{ minWidth: "100px" }}>
                <Button type="primary" disabled={!showButton} onClick={handleSubmit}>
                  确定
                </Button>
              </div>
            </Flex>
          </div>
        </Flex>
      </div>
    </>
  );
}

/**
 * 观看别人手牌,选择是否让其交换手牌
 * @param {*} actionRecord
 * @param {*} owner
 * @param {*} players
 * @param {*} roomId
 * @returns
 */
export function Examine({roomId, actionRecord, owner, players }) {
  //图片宽
  const courtImgWidth = 120;
  const ownerImgWidth = 90;

  let player = null; //被看手牌的玩家
  players.forEach((p) => {
    if (p.id === actionRecord.victimPlayerId) {
      player = p;
    }
  });

  let courtImg = actionRecord.checkCourt.map((court, index) => {
    //court是卡片名称
    return (
      <CheckCourtImg
        card={{ cardName: court, index: index, from: "checkCourt" }}
        imgWidth={courtImgWidth}
      />
    );
  });

  let ownerCourtImg = owner.characterCards.map((cardIndex, index) => {
    const court = characterCards[cardIndex].name;
    return (
      <CheckCourtImg
        card={{ cardName: court, index: index, from: "owner" }}
        imgWidth={ownerImgWidth}
      />
    );
  });

  const socket=useSocket()
  function handleClick(isChange){
    socket.emit(serverMessage.examineConclusion,{
      roomId: roomId,
      isExamine: isChange
    })
  }

  return (
    <>
      <div className="success-mask">
        {background("challenging")}
        <Flex vertical gap={"small"}>
          {/* 白色透明背景板 */}
          <div
            style={{
              width: "100vw",
              backgroundColor: "var(--mask-white-color)",
            }}
          >
            <Flex align="center" justify="center" gap={"small"}>
              <Flex vertical>
                <Avatar src={player.avatar} />
                <span>{player.name}</span>
              </Flex>
              {courtImg}
            </Flex>
          </div>

          {/* 角色牌无色板 */}
          <div
            style={{
              width: "100vw",
              height: "9rem",
            }}
          >
            <Flex
              align="center"
              justify="center"
              gap={"small"}
              style={{
                height: "9rem",
              }}
            >
              <Flex vertical>
                <Avatar src={owner.avatar} />
                <span style={{ color: "white" }}>{owner.name}</span>
              </Flex>

              <Flex style={{ minWidth: "200px" }} gap={"small"}>
                {ownerCourtImg}
              </Flex>
              <Flex style={{ minWidth: "100px" }} gap={"small"}>
                <Button type="primary" onClick={()=>handleClick(true)}>更换</Button>
                <Button type="primary" onClick={()=>handleClick(false)}>不更换</Button>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </div>
    </>
  );
}
