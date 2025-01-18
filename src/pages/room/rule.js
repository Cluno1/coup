


    
    //const character=['Duke','Assassin','Captain','Ambassador','Contessa','Inquisitor'];
    //牌库：
    //let courtDeck=[2,2,2,2,2,5];
    //国库：
    //let treasuryReserve=3;

    
function getRandomCardsIndex(courtDeck) {
    // 计算总牌数
    let totalCards = courtDeck.reduce((acc, count) => acc + count, 0);
    
    // 生成一个0到总牌数-1的随机索引
    let randomIndex = Math.floor(Math.random() * totalCards);
    
    // 根据随机索引找到对应的牌
    let card = 0;
    for (let i = 0; i < courtDeck.length; i++) {
      if (randomIndex < courtDeck[i]) {
        card = i;
        //牌库-1
        courtDeck[i]--;
        break;
      }
      randomIndex -= courtDeck[i];
  
      
    }
    
    
    return  card;
  }
  
  
  
  
  /**
   * const player={
   *  characterCardNum:2,
      characterCards:[1,3],
      coin:4,
      allegiance:true,//reformist==false or loyalist==true
      
    } */
  export function income(player){
    player.coin++;
  }
  export function foreignAid(player){
      player.coin+=2;
  }
  export function coup(attacker,victim){
      attacker.coin-=7;
      //victim选择一个被杀的  TODO  把该卡置为0
      victim.cardNum--;
      victim.cards[1]=0;
  
      //如果cardNum==0;该玩家淘汰
  }
  export function conversion(player,choose){
    //付钱1 or 2转换阵营

    if(choose===1){
        player.coin-=1;
        
    }else if(choose===2){
        player.coin-=2;
    };
    player.allegiance=!player.allegiance;

  }
  export function embezzlement(player,treasuryReserve){
    player.coin+=treasuryReserve;
    treasuryReserve=0;
  }

  /**
   * const actions=['Tax','Assassinate','Steal','Exchange 2 cards','Exchange 1 card','Examine'];
   */
  export function tax(player){
      player.coin+=3;
  }
  export function assassinate(attacker,victim){
      attacker.coin-=3;
      //TODO
      //刺杀一个人的卡 TODO
      victim.cardNum--;
      victim.cards[1]=0;
  
      //如果cardNum==0;该玩家淘汰
  }
  export function steal(attacker,victim){
      attacker+=2;
      victim-=2;
  }
  export function exchange1(player){
      const newCardIndex=getRandomCardsIndex()
      
      //TODO 新的和旧的选择一张放弃  ，更新角色牌
  }
  
  export function exchange2(player){
      const newCardIndex1=getRandomCardsIndex()
      const newCardIndex2=getRandomCardsIndex()
      
      //TODO 新的和旧的选择2张放弃  ，更新角色牌
  }
  export function examine(){
      //查看一名玩家手牌 ，决定是否更换手牌
  }
  
  const act=[income,foreignAid,coup,conversion,embezzlement,tax,assassinate,steal,exchange2,exchange1,examine];
  export default act;





