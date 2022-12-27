import styled from "@emotion/styled";
import { MainContents } from "../components/main/MainContents";
import beltbannerPc from "../assets/belt_banner_pc.jpg";
import beltbannerMo from "../assets/belt_banner_mo.jpg";
import { useHandleISize } from "../hooks/useHandleISize";
import { MainSlideContents } from "../components/main/MainSlideContents";
import { MainSeriesContents } from "../components/main/MainSeriesContents";
import { MainCharacterItem } from "../components/main/MainCharacterItem";
import { MainRecommend } from "../components/main/MainRecommend";
import { MainRestock } from "../components/main/MainRestock";
import { Footer } from "../components/utils/Footer";
import { Link } from "react-router-dom";

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

const BeltBanner = styled(Link)`
  display: block;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  padding: 0 20px;
  cursor: pointer;

  @media screen and (min-width: 640px) {
    margin-top: 30px;
    padding: 0 55px;
  }
`;

const BennerContents = styled.img`
  display: block;
  width: 100%;
  max-width: 530px;
  min-width: 320px;
  margin: 0 auto;
  border-radius: 8px;
`;

const Main = () => {
  const { resize } = useHandleISize(); // 사이즈 체크 커스텀 훅
  return (
    <>
      <Container>
        <Article>
          <MainBanner>
            <MainContents />
          </MainBanner>
          <BeltBanner to="/promotion/2" state={"카카오페이 12월 즉시할인"}>
            <BennerContents
              // resize={resize}
              // checkSize={size}
              src={resize ? beltbannerMo : beltbannerPc}
              alt="카카오페이로 결제 시 최대 5천원 할인!"
              loading="lazy"
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

export default Main;
