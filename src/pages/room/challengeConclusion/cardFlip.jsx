import React, { useState } from "react";
import { Card } from "antd";

import "./cardFlip.css";
import { courtDeckBackgroundUrl } from "../../utl/imgUrl";

const CardFlip = ({
  frontCardImg,
  backCardImg = courtDeckBackgroundUrl,
  imgWidth,
}) => {
  return (
    <>
      <div
        className="card"
        style={{
          width: imgWidth + "px",
        }}
      >
        <div className="just">
          <img
            src={frontCardImg}
            style={{
              width: imgWidth + "px",
            }}
          />
        </div>
        <div className="back">
          <img
            src={backCardImg}
            style={{
              width: imgWidth + "px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CardFlip;
