  # 后端待做：

### 房间信息
    const [roomBase, setRoomBase] = useState({
    playerNum: 6, //玩家人数
    time: "3:20",
    round: 5, //第几回合
    treasuryReserve: 3, //国库里的金币数量
    courtDeckNum: 15, //牌数
    courtDeck: [2, 2, 2, 2, 2, 5], //牌堆牌数

    gameOver: false, //是否游戏结束
    winnerId: 1,
    });
    
### 角色信息
    const Inquisitor={
        img:'https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/inquisitor.jpg',
        name:character[5],
        actions:[actions[4],actions[5]],
        explain:['从牌库抽取一张牌,并返回牌库一张牌','检查一名玩家手牌,并决定他是否与牌库交换手牌'],
        act:[exchange1,examine],
        blocks:blocks[1],
    };
    const Ambassador={
        img:'https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/ambassador.jpg',
        name:character[3],
        actions:actions[3],
        explain:'从牌库抽取两张牌,并返回牌库两张牌',
        act:exchange2,
        blocks:blocks[1],
    };
    const characterCards=[Duke,Assassin,Captain,Ambassador,Contessa,Inquisitor];
    const actions=['Tax','Assassinate','Steal','Exchange 2 cards','Exchange 1 card','Examine'];

#### 玩家信息
    const player2 = {
    id: 1,
    avatar: "https://test-1328751369.cos.ap-guangzhou.myqcloud.com/cluno.jpg", //头像
    name: "jason",
    characterCardNum: 1,
    characterCards: null,
    coin: 2,
    allegiance: false,
    //对局信息
    isDead: false,
    assists:2, //助攻
    kill:1,//击杀数
    challenge:1,//提出质疑数
    assistsKilledId:1,// 被助攻杀的人的id，即被人砍半条命的人的id
    Killed:1,//被最后一击的人的id
  };

----
#### 回合信息

     //后端更改    单回合对局信息
    const [actionRecord, setActionRecord] = useState({
    actionPlayerId: 3, //行动玩家id
    period: "ChallengeConclusion", //'Act','ActChallenge','ChallengeConclusion','ActConclusion','Block','BlockChallenge',''ChallengeConclusion'','ActConclusion'
    victimPlayerId: 2, //被攻击玩家id
    character: "Assassin", //行动玩家声明的角色
    actionName: "Assassinate", //行动玩家作的行动
    victimCharacter: "Contessa", //被攻击玩家的声明角色
    victimBlock: "Blocks Assassination", //被攻击玩家所阻止的行动
    actConclusion: true, //行动是否要成功执行
    checkCourt:['Assassin'],//如果是执行交换牌或看牌的行动,该数组里面是牌的名称
    //'ChallengeConclusion'时候需要更新质疑结果
    challengeConclusion: {
      challenger: owner, //质疑的玩家
      actor: player2, //行动的玩家
      actorCharacter: "Assassin", //行动玩家声明的角色
      isSuccess: true, //是否成功质疑
     },
    });

- Act  
- ActChallenge 后端接收质疑请求, 把质疑返回给每个人
  - case: 无人质疑: 跳过ChallengeConclusion阶段
- ChallengeConclusion 把质疑成功结果返回每一个人,type=ChallengeConclusion
  - case:接收人的放弃一点势力,更新player,进入下一个阶段; 
  - case: 如果那个人放弃势力后就会死亡,更新player,手牌降为0

  
- Block  等待接收block,如果有,进入阶段,无则跳过
- BlockChallenge  接收质疑
  
- ChallengeConclusion 把质疑成功结果返回每一个人,type=ChallengeConclusion
  - case:接收人的放弃一点势力,进入下一个阶段; 
  - case: 如果那个人放弃势力后死亡,更新player,手牌降为0

-  ActConclusion  返回更新好的player