import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const EmptyBasketBox = styled.div`
  padding: 30% 0;
  /* margin-bottom: -100px; */
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

const BestItemViewBox = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const BestItemViewBtn = styled(Link)`
  display: inline-block;
  padding: 0 16px;
  border: 1px solid #dedfe0;
  border-radius: 8px;
  box-sizing: border-box;
  height: 36px;
  line-height: 35px;
  min-width: auto;
  border-color: #3c404b;
  background-color: #3c404b;
  color: #fff !important;
`;

export const NotInfo = ({ url, text, text2, btn }) => {
  return (
    <EmptyBasketBox>
      <EmptyBasketCharacter>
        <img src={url} alt="" />
      </EmptyBasketCharacter>
      {!text2 ? (
        <EmptyText>{text}</EmptyText>
      ) : (
        <EmptyText>
          {text}
          <br />
          {text2}
        </EmptyText>
      )}
      {btn && (
        <BestItemViewBox>
          <BestItemViewBtn to="/product">인기 상품 보기</BestItemViewBtn>
        </BestItemViewBox>
      )}
    </EmptyBasketBox>
  );
};
