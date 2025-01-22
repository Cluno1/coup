
import { judgeAllegiance} from './judgeAllegiance'
import {Image } from "antd";
import { Flex } from "antd";
import React from "react";
import characterCards from '../character';

/**const owner={
    id:2,
    img:'/public/logo192.png',
    name:'cluno',
    characterCardNum:2,
    characterCards:[1,3],
    coin:4,
    allegiance:true,//reformist==false or loyalist==true
  }  */
 export default   function ownerLayout(owner){

  

        const cards = owner.characterCards.map((cardIndex,index) => {
          if (cardIndex > 0) {
            return (
              <Flex vertical align="center" justify="center" key={index}>
                <Image
                  preview={false}
                  width={100}
                  src={characterCards[cardIndex].img}
                />
                <b>{characterCards[cardIndex].name}</b>
              </Flex>
            );
          } else {
            return null;
          }
        });
      return (
        <>
        
        <Flex gap={'small'} align="center" justify="center">
    
        <Flex  vertical align="center" justify="center">
          <Image
            preview={false}
            width={60}
            src={owner.avatar}
          />
          <b>{owner.name}</b>
          <span>player<b>{owner.id}</b></span>
          
        </Flex>
        
        {cards}
        <Flex  vertical align="center" justify="center">
        <Image
            preview={false}
            width={60}
            src={judgeAllegiance(owner.allegiance).img}
          />
          <span>coin:<b>{owner.coin}</b></span>
          
        </Flex>
    
    
        </Flex>
        </>
      )
    }
    