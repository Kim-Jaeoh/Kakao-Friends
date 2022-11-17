import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { MainContents } from "../components/main/MainContents";
import beltbannerPc from "../assets/belt_banner_pc.jpg";
import beltbannerMo from "../assets/belt_banner_mo.jpg";
import { useHandleISize } from "../hooks/useHandleISize";
import { MainSlideContents } from "../components/main/MainSlideContents";
import { MainSeriesContents } from "../components/main/MainSeriesContents";
import { MainCharacterItem } from "../components/main/MainCharacterItem";
import { MainRecommend } from "../components/main/MainRecommend";
import { MainRestock } from "../components/main/MainRestock";
import { Header } from "../components/header/Header";
import { Footer } from "../components/utils/Footer";

const Container = styled.main`
  position: relative;
  /* padding-top: 43px; */
`;

const Article = styled.div`
  overflow: hidden;
  /* padding-bottom: 100px; */
`;

const MainBanner = styled.article`
  padding: 4px 20px 0;
`;

const BeltBanner = styled.div`
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  cursor: pointer;
`;

const BennerContents = styled.img`
  display: block;
  width: ${(props) =>
    props.resize ? `calc(${props.checkSize}px - 32px)` : "530px"};
  max-width: 530px;
  min-width: 320px;
  margin: 0 auto;
  border-radius: 8px;
`;

export const Main = () => {
  const { size, resize } = useHandleISize(); // 사이즈 체크 커스텀 훅
  return (
    <>
      {/* <Header /> */}
      <Container>
        <Article>
          <MainBanner>
            <MainContents />
          </MainBanner>
          <BeltBanner>
            <BennerContents
              resize={resize}
              checkSize={size}
              src={resize ? beltbannerMo : beltbannerPc}
              alt="5만원 이상 구매하고 할로윈 가랜드 득템!"
            />
          </BeltBanner>
          <MainSlideContents />
          <MainSeriesContents />
          <MainCharacterItem />
          <MainRecommend />
          <MainRestock />
        </Article>
        <Footer />
      </Container>
    </>
  );
};
