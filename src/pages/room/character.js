//角色

import {
  assassinate,
  conversion,
  coup,
  embezzlement,
  examine,
  exchange1,
  exchange2,
  foreignAid,
  income,
  steal,
  tax,
} from "./rule";

const actions = [
  "Tax",
  "Assassinate",
  "Steal",
  "Exchange 2 cards",
  "Exchange 1 card",
  "Examine",
];
const blocks = [
  "Blocks Foreign Aid",
  "Blocks Stealing",
  "Blocks Assassination",
];
const character = [
  "Duke",
  "Assassin",
  "Captain",
  "Ambassador",
  "Contessa",
  "Inquisitor",
];
const Duke = {
  img: "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/duke.jpg",
  name: character[0],
  actions: actions[0],
  explain: "从银行获取3块钱",
  act: tax,
  blocks: blocks[0],
};
const Assassin = {
  img: "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/assassin.jpg",
  name: character[1],
  actions: actions[1],
  explain: "支付3块钱,使一名玩家失去一点势力",
  act: assassinate,
  blocks: null,
};
const Captain = {
  img: "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/captain.jpg",
  name: character[2],
  actions: actions[2],
  explain: "从一名玩家手里偷走两块钱",
  act: steal,
  blocks: blocks[1],
};
const Ambassador = {
  img: "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/ambassador.jpg",
  name: character[3],
  actions: actions[3],
  explain: "从牌库抽取两张牌,并返回牌库两张牌",
  act: exchange2,
  blocks: blocks[1],
};
const Contessa = {
  img: "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/contessa.jpg",
  name: character[4],
  actions: null,
  explain: null,
  act: null,
  blocks: blocks[2],
};
const Inquisitor = {
  img: "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/inquisitor.jpg",
  name: character[5],
  actions: [actions[4], actions[5]],
  explain: [
    "从牌库抽取一张牌,并返回牌库一张牌",
    "检查一名玩家手牌,并决定他是否与牌库交换手牌",
  ],
  act: [exchange1, examine],
  blocks: blocks[1],
};

const incomeCharacter = {
  img: null,
  name: null,
  actions: "Income",
  explain: "从银行获取1块钱",
  act: income,
  blocks: null,
};
const foreignAidCharacter = {
  img: null,
  name: null,
  actions: "Foreign Aid",
  explain: "从银行获取2块钱",
  act: foreignAid,
  blocks: null,
};
const coupCharacter = {
  img: null,
  name: null,
  actions: "Coup",
  explain: "支付7块钱,强制让一个玩家失去一点势力(金钱达到10或以上仅有政变选项)",
  act: coup,
  blocks: null,
};
const conversionCharacter = {
  img: null,
  name: null,
  actions: "Conversion",
  explain: "支付1块钱,改变自己阵营;或支付2块钱,改变一名玩家阵营",
  act: conversion,
  blocks: null,
};
const embezzlementCharacter = {
  img: null,
  name: null,
  actions: "Embezzlement",
  explain: "从国库获取所有钱(男爵除外)",
  act: embezzlement,
  blocks: null,
};

const characterCards = [
  Duke,
  Assassin,
  Captain,
  Ambassador,
  Contessa,
  Inquisitor,
];
export default characterCards;
const commonActions = [
  incomeCharacter,
  foreignAidCharacter,
  coupCharacter,
  conversionCharacter,
  embezzlementCharacter,
];
export { commonActions };


