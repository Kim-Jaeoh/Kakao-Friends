import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import styled from "@emotion/styled";

export const Rating = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];

    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  return (
    <Wrap>
      <Stars>
        {Array.from({ length: 5 }).map((_, idx) => {
          return (
            <AiFillStar
              key={idx}
              size="18"
              onClick={() => handleStarClick(idx)}
              className={clicked[idx] && "yellowStar"}
            />
          );
        })}
      </Stars>
      <RatingText></RatingText>
    </Wrap>
  );
};

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
