import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { BsBag, BsBagFill } from "react-icons/bs";
import { useBasketToggle } from "../../hooks/useBasketToggle";
import { Link, useSearchParams } from "react-router-dom";
import { usePriceComma } from "../../hooks/usePriceComma";
import useInfinityScroll from "../../hooks/useInfinityScroll";

import { NotInfo } from "../utils/NotInfo";
import { useQuery } from "react-query";
import axios from "axios";

const BasketRecommendBox = styled.div`
  position: relative;

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
  padding: 0 13px 100px 12px;

  @media screen and (min-width: 640px) {
    padding: 0 14px 100px;
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
`;

const SearchResultBox = styled.div`
  overflow: hidden;
  padding: 20px 20px 12px;

  > span {
    strong {
      font-weight: bold;
    }
  }
`;

export const SearchResultItem = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const { toggleIcon, currentBasket } = useBasketToggle(); //장바구니 커스텀 훅
  const { PriceComma } = usePriceComma(); // 가격 콤마 커스텀 훅

  const api = `http://localhost:4000/ProductListData?q=${keyword}&`;
  const { ref, dataList } = useInfinityScroll(api, 9); // 무한스크롤 커스텀 훅

  const DataLength = useCallback(async () => {
    return await axios.get(
      `http://localhost:4000/ProductListData?q=${keyword}`
    );
  }, [keyword]);

  const { data: dataLength } = useQuery("productList", DataLength, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log("이거임", e.message),
  });

  return (
    <BasketRecommendBox>
      {keyword && (
        <>
          <SearchResultBox>
            <span>
              총 <strong>{dataLength?.data.length}</strong> 개
            </span>
          </SearchResultBox>
          {keyword && dataList?.pages?.flat().length !== 0 ? (
            <BasketRecommendListBox>
              {dataList?.pages?.flat().map((list, index) => (
                <BasketRecommendList key={list.id}>
                  <RecommendListBox>
                    <RecommendListImage to={`/detail/${list.product}`}>
                      <img src={list.image} alt={list.title} loading="lazy" />
                    </RecommendListImage>
                    <RecommendListText>
                      <strong>{list.title}</strong>
                      <RecomendListPrice>
                        <span>{PriceComma(list.price)}</span>원
                      </RecomendListPrice>
                      <BagButton onClick={(e) => toggleIcon(list)}>
                        {currentBasket?.filter(
                          (obj) => obj.product === list.product
                        ).length > 0 ? (
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
          ) : (
            <NotInfo
              url={
                "https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221202/101742/assets/images/m960/ico_empty_ryan.png"
              }
              title={"검색 결과가 없습니다."}
              text={"다른 검색어를 입력하시거나, "}
              text2={"철자 및 띄어쓰기를 확인해주세요."}
            />
          )}
        </>
      )}
      <div
        ref={ref}
        style={{
          position: "absolute",
          bottom: "200px",
        }}
      />
    </BasketRecommendBox>
  );
};
