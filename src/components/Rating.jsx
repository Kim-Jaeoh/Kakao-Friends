import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useMutation } from "react-query";
import styled from "styled-components";

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

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #ff477e;
  }

  & svg:hover ~ svg {
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

  useEffect(() => {
    sendReview();
    console.log(rate);
  }, [clicked, rate]); //컨디마 컨디업

  const addTodo = async (newTodo) => {
    const API = "http://localhost:4000/BestListData";
    const { data } = await axios.post(`${API}?id=${productId}`, newTodo);
    return data;
  };

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    addTodo
    // {
    //   onSuccess: (e) => console.log(e),
    // }
  );

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    // mutate({ rate: score });
    // fetch('http://52.78.63.175:8000/movie', {
    //   method: 'POST',
    //   Headers: {
    //     Authroization: 'e7f59ef4b4900fe5aa839fcbe7c5ceb7',
    //   },
    //   body: JSON.stringify({
    //     movie_id:1
    //     star: score,
    //   }),
    // });
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
      <RatingText>(7건)</RatingText>
    </Wrap>
  );
};
