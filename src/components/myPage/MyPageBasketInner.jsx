import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { dbService } from "../../fbase";
import { doc, updateDoc } from "firebase/firestore";
import { BsBag, BsBagFill } from "react-icons/bs";

const BasketRecommendList = styled.li`
  display: inline-block;
  width: 50%;
  padding: 0 7px 40px 8px;
  vertical-align: top;
  box-sizing: border-box;

  @media screen and (min-width: 640px) {
    width: 33.333%;
    padding: 0 6px 40px;
  }
`;

const RecommendListBox = styled(Link)``;

const RecommendListImage = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  padding-top: 100%;

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.02);
    content: "";
  }

  img {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const RecommendListText = styled.div`
  padding-top: 10px;
  position: relative;
  > strong {
    display: block;
    display: -webkit-box;
    overflow: hidden;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #747475;
    max-height: 40px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    padding-right: 30px;
  }
`;

const RecomendListPrice = styled.div`
  display: inline-block;
  padding-top: 4px;
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  vertical-align: top;

  span {
    font-size: 16px;
  }
`;

const BagButton = styled.button`
  color: #909092;
  position: absolute;
  top: 5px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px;
  }

  /* @media screen and (min-width: 640px) {
    right: 6px;
  } */
`;

export const MyPageBasketInner = ({ list, myInfo, dataList }) => {
  const [clickIcon, setClickIcon] = useState(false);
  const [clickNumber, setClickNumber] = useState([]);

  useEffect(() => {
    setClickIcon(myInfo?.cart?.filter((asd) => asd.id === list.id));
  }, [list.id, myInfo?.cart]);

  const toggleIcon = useCallback(
    async (index) => {
      // console.log(myInfo.cart.map((asd) => asd.id === index + 1));
      // console.log(myInfo.cart.filter((asd) => asd.id === index + 1));

      if (myInfo.cart.filter((asd) => asd.id !== index + 1)) {
        const userRef = doc(dbService, "users", myInfo.email);
        await updateDoc(userRef, {
          cart: [...myInfo.cart, dataList?.data[index]],
        });
        setClickNumber((prev) => [...prev, index]);
        setClickIcon(true);
      } else {
        setClickNumber(clickNumber.filter((id) => id !== index));
        setClickIcon(false);
        const copy = [...myInfo.cart];
        const filter = copy.filter((cart) => cart.id !== index + 1);

        const userRef = doc(dbService, "users", myInfo.email);
        await updateDoc(userRef, {
          cart: filter,
        });
      }
    },
    [clickNumber, dataList?.data, myInfo.cart, myInfo.email]
  );

  return (
    <>
      <BasketRecommendList>
        <RecommendListBox>
          <RecommendListImage>
            <img src={list.image} alt={list.title} />
          </RecommendListImage>
          <RecommendListText>
            <strong>{list.title}</strong>
            <RecomendListPrice>
              <span>{list.price}</span>원
            </RecomendListPrice>
            <BagButton onClick={(e) => toggleIcon(list.id, e)}>
              {clickIcon ? <BsBagFill /> : <BsBag />}
            </BagButton>
          </RecommendListText>
        </RecommendListBox>
      </BasketRecommendList>
    </>
  );
};
