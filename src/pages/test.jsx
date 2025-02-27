import { deepCompareEntities } from "./room";
import CardFlip from "./room/challengeConclusion/cardFlip";

export default function Test() {



  
  return (
    <>
      <h1>测试</h1>
      <div style={{ width: "40px" }}>
        <CardFlip
          frontCardImg={
            "https://coup-1328751369.cos.ap-guangzhou.myqcloud.com/role/duke.jpg"
          }
          imgWidth={25}
        />
      </div>
    </>
  );
}
