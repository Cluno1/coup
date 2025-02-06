  # 后端待做：

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
    period: "ChallengeConclusion", //'Act','ActChallenge','ChallengeConclusion','ActConclusion','Block','BlockChallenge',''ChallengeConclusion'','BlockConclusion'
    victimPlayerId: 2, //被攻击玩家id
    character: "Assassin", //行动玩家声明的角色
    actionName: "Assassinate", //行动玩家作的行动
    victimCharacter: "Contessa", //被攻击玩家的声明角色
    victimBlock: "Blocks Assassination", //被攻击玩家所阻止的行动

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

-  ActConclusion 