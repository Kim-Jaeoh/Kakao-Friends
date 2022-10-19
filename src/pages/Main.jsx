import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { MainContents } from "../components/main/MainContents";
import beltbannerPc from "../image/belt_banner_pc.jpg";
import beltbannerMo from "../image/belt_banner_mo.jpg";
import { useHandleISize } from "../hooks/useHandleISize";
import { MainSlideContents } from "../components/main/MainSlideContents";
import { MainVideoContents } from "../components/main/MainVideoContents";
import { MainCharacterItem } from "../components/main/MainCharacterItem";
import { MainRecommend } from "../components/main/MainRecommend";
import { MainRestock } from "../components/main/MainRestock";
import { Header } from "../components/header/Header";

const Container = styled.main`
  position: relative;
  /* padding-top: 43px; */
`;

const Article = styled.div`
  overflow: hidden;
  padding-bottom: 100px;
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
  width: ${(props) => (props.resize ? "350px" : "530px")};
  min-width: 320px;
  margin: 0 auto;
  border-radius: 8px;
`;

export const Main = () => {
  const { resize } = useHandleISize(); // 사이즈 체크 커스텀 훅

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
              src={resize ? beltbannerMo : beltbannerPc}
              alt="5만원 이상 구매하고 할로윈 가랜드 득템!"
            />
          </BeltBanner>
          <MainSlideContents />
          <MainVideoContents />
          <MainCharacterItem />
          <MainRecommend />
          <MainRestock />
        </Article>
      </Container>
    </>
  );
};
