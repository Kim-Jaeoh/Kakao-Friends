import React from "react";
import styled from "@emotion/styled";
import { Header } from "../header/Header";

const Container = styled.div``;

const EmptyBasketBox = styled.div`
  padding: 30% 0;
`;

const EmptyBasketCharacter = styled.span`
  display: block;
  width: 192px;
  height: 192px;
  margin: 0 auto 12px;

  img {
    display: block;
    width: 100%;
  }
`;

const EmptyText = styled.span`
  display: block;
  font-size: 16px;
  line-height: 24px;
  color: #aeaeaf;
  text-align: center;
  letter-spacing: -0.025em;
`;

const BestItemViewBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 36px;
  margin: 24px auto 0;
  padding-bottom: 2px;
  background-color: #3c404b;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
`;

export const MyPageBasket = () => {
  return (
    <Container>
      <EmptyBasketBox>
        <EmptyBasketCharacter>
          <img
            src="https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221026/104605/assets/images/m960/ico_cart_empty.png"
            alt=""
          />
        </EmptyBasketCharacter>
        <EmptyText>
          아직 관심 상품이 없네요!
          <br />
          귀여운 프렌즈 상품을 추천드릴게요
        </EmptyText>
        <BestItemViewBtn>인기 상품 보기</BestItemViewBtn>
      </EmptyBasketBox>
    </Container>
  );
};
