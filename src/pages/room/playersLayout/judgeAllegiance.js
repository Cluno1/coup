//判断阵营
export  const judgeAllegiance=(allegiance)=>{
    const loyalist={
      name:'loyalist',
      img:'https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/loyalist.jpg',
    }
    const reformist={
      name:'reformist',
      img:'https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/reformist.jpg',
    }
  
    if(allegiance){
      return loyalist
    }else{
      return reformist
    }
  }
  