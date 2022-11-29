import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { BsBag, BsBagFill } from "react-icons/bs";
import { useBasketToggle } from "../../hooks/useBasketToggle";
import { Link } from "react-router-dom";
import { usePriceComma } from "../../hooks/usePriceComma";
import { useQuery } from "react-query";
import { ProductListApi } from "../../apis/dataApi";
import axios from "axios";
import { cloneDeep } from "lodash";

const BasketRecommendBox = styled.div`
  padding-top: 36px;
  border-top: 4px solid #f7f7f7;

  > strong {
    display: block;
    padding: 0 20px 16px;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: -0.017em;
    font-weight: bold;
  }
`;

const BasketRecommendListBox = styled.ul`
  padding: 0 13px 0 12px;

  @media screen and (min-width: 640px) {
    padding: 0 14px;
  }
`;

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

const RecommendListBox = styled.div``;

const RecommendListImage = styled(Link)`
  display: block;
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

export const ProductRecommend = ({ productId }) => {
  const [randomItem, setRandomItem] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { data: dataList, isLoading } = useQuery(
    "ProductList",
    ProductListApi,
    {
      refetchOnWindowFocus: false,
      // onSuccess: (e) => setRefresh(!refresh), // useEffect 의존성 배열에 dataList를 넣지 않아서 새로고침 시 목록이 뜨지 않기에 state 변경 함수를 넣어 렌더링 되게 함 (dataList를 의존성 배열에 넣을 경우 렌더링 때마다 2번씩 실행되기 때문)
      onError: (e) => console.log(e.message),
    }
  );

  const { toggleIcon, checkItems, currentBasket } = useBasketToggle(); //장바구니 커스텀 훅

  const { PriceComma } = usePriceComma(); // 가격 콤마 커스텀 훅

  // 추천 목록 랜덤화
  useEffect(() => {
    // 객체 깊은 복사
    let arr = cloneDeep(dataList?.data);

    if (productId) {
      arr = arr.filter((obj) => obj?.product !== productId);
    }

    const randomArray = (array) => {
      // - 방법 1
      // array?.sort(() => Math.floor(Math.random() - 0.5));

      // - ✔ 방법 2 (피셔-예이츠)
      for (let index = array?.length - 1; index > 0; index--) {
        // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
        const randomPosition = Math.floor(Math.random() * (index + 1));

        // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
      }
    };

    randomArray(arr);
    setRandomItem(arr);
    // setRandomItem(arr.filter((asd) => !checkItems.includes(asd.product)));
  }, [isLoading]);

  return (
    <BasketRecommendBox>
      <strong>잠깐만, 이 제품은 어때요?</strong>
      <BasketRecommendListBox>
        {randomItem?.slice(0, 8).map((list, index) => (
          <BasketRecommendList key={list.product}>
            <RecommendListBox>
              <RecommendListImage to={`/detail/${list.product}`}>
                <img src={list.image} alt={list.title} />
              </RecommendListImage>
              <RecommendListText>
                <strong>{list.title}</strong>
                <RecomendListPrice>
                  <span>{PriceComma(list.price)}</span>원
                </RecomendListPrice>
                <BagButton onClick={(e) => toggleIcon(list)}>
                  {currentBasket?.filter((obj) => obj.product === list.product)
                    .length > 0 ? (
                    <BsBagFill style={{ color: "#ff447f" }} />
                  ) : (
                    <BsBag />
                  )}
                </BagButton>
              </RecommendListText>
            </RecommendListBox>
          </BasketRecommendList>
        ))}
      </BasketRecommendListBox>
    </BasketRecommendBox>
  );
};
