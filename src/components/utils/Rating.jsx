import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useMutation } from "react-query";
import styled from "@emotion/styled";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
`;

const RatingText = styled.span`
  color: #787878;
  display: inline-block;
  padding: 1px 0 0 5px;
  font-size: 14px;
  line-height: 15px;
  vertical-align: top;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;

  svg:not(:first-of-type) {
    margin: 0 1px;
  }

  svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #ff477e;
  }

  svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #ff477e;
  }
`;

export const Rating = ({ productId, rate }) => {
  const ARRAY = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    // if (rate < 5) {
    //   clickStates[rate] = rate <= index ? true : false;
    // }
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  return (
    <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <AiFillStar
              key={idx}
              size="18"
              onClick={() => handleStarClick(el)}
              className={clicked[el] && "yellowStar"}
            />
          );
        })}
      </Stars>
      <RatingText></RatingText>
    </Wrap>
  );
};
