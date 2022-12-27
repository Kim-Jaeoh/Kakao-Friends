import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import listImage1 from "../../assets/category_list_1.png";
import listImage2 from "../../assets/category_list_2.png";
import listImage3 from "../../assets/category_list_3.png";
import listImage4 from "../../assets/category_list_4.png";

const Container = styled.div`
  /* position: relative; */
`;

const Title = styled.div`
  position: relative;
  margin-top: 58px;
  padding: 0 20px;
  text-align: left;

  strong {
    display: -webkit-inline-box;
    overflow: hidden;
    max-width: 252px;
    max-height: 56px;
    text-overflow: ellipsis;
    word-break: break-all;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.025em;
    vertical-align: top;
  }
`;

const CategoryBox = styled.ul`
  display: flex;
  padding: 20px 16px 0 15px;

  @media screen and (min-width: 640px) {
    padding: 20px 12px 0;
  }
`;

const CategoryList = styled.li`
  width: 25%;
  min-height: 100px;
  padding: 0 4px 0 5px;
  vertical-align: top;
  box-sizing: border-box;

  @media screen and (min-width: 640px) {
    min-height: 156px;
    padding: 0 8px;
  }

  /* div {
    display: block;
    overflow: hidden;
    height: 100%;
    padding: 16px 0 10px;
    border-radius: 8px;
    text-align: center;
    background-color: rgba(245, 245, 245, 0.77);
    box-sizing: border-box;

    @media screen and (min-width: 640px) {
      padding: 28px 0 18px;
    }
  } */
`;

const ListImageBox = styled.div`
  display: block;
  overflow: hidden;
  height: 100%;
  padding: 16px 0 10px;
  border-radius: 8px;
  text-align: center;
  background-color: rgba(245, 245, 245, 0.77);
  box-sizing: border-box;

  @media screen and (min-width: 640px) {
    padding: 28px 0 18px;
  }
`;

const ListImage = styled.div`
  display: inline-block;
  width: 44px;
  height: 44px;
  vertical-align: top;

  @media screen and (min-width: 640px) {
    width: 64px;
    height: 64px;
  }

  img {
    display: block;
    width: 100%;
  }
`;

const ListTitle = styled.span`
  display: block;
  display: -webkit-box;
  overflow: hidden;
  max-height: 32px;
  max-width: 60px;
  margin: 8px auto 0;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #747475;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;

  @media screen and (min-width: 640px) {
    max-width: 75px;
    max-height: 40px;
    margin-top: 16px;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const MainRecommend = () => {
  return (
    <Container>
      <Title>
        <strong>추천하는 카테고리</strong>
      </Title>

      <CategoryBox>
        <CategoryList>
          <ListImageBox>
            <ListImage>
              <img src={listImage1} alt="미니인형" loading="lazy" />
            </ListImage>
            <ListTitle>미니인형</ListTitle>
          </ListImageBox>
        </CategoryList>

        <CategoryList>
          <ListImageBox>
            <ListImage>
              <img src={listImage2} alt="생활소품" loading="lazy" />
            </ListImage>
            <ListTitle>생활소품</ListTitle>
          </ListImageBox>
        </CategoryList>

        <CategoryList>
          <ListImageBox>
            <ListImage>
              <img src={listImage3} alt="데스크 소품" loading="lazy" />
            </ListImage>
            <ListTitle>데스크 소품</ListTitle>
          </ListImageBox>
        </CategoryList>

        <CategoryList>
          <ListImageBox>
            <ListImage>
              <img src={listImage4} alt="소형 전자" loading="lazy" />
            </ListImage>
            <ListTitle>소형 전자</ListTitle>
          </ListImageBox>
        </CategoryList>
      </CategoryBox>
    </Container>
  );
};
