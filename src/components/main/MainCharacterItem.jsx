import React, { useEffect, useRef, useState } from "react";
// import {
//   mainCharacterList1,
//   mainCharacterList2,
//   mainCharacterList3,
// } from "../../data/mainContentsData";
import styled from "@emotion/styled";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useHandleISize } from "../../hooks/useHandleISize";
import { MainCharacterItemList } from "./MainCharacterItemList";
import TitleBanner1 from "../../image/main_character_1.png";
import TitleBanner2 from "../../image/main_character_2.png";
import TitleBanner3 from "../../image/main_character_3.png";
import { debounce, throttle } from "lodash";
import axios from "axios";

const Container = styled.div`
  position: relative;
`;

const PageInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  margin-top: 20px;

  @media screen and (min-width: 640px) {
    margin-top: 16px;
  }
`;

const PageInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowButton = styled.button`
  background: rgb(255, 255, 255, 0.8);
  border: 1px solid #eee;
  border-radius: 50%;

  svg {
    /* width: 100%; */
    font-size: 16px;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PaginationButton = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  @media screen and (min-width: 640px) {
    margin: 0 30px;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      border-radius: 100%;
      display: inline-block;
      font-size: 1rem;
      width: 4px;
      height: 4px;
      background-color: #dedfe0;
      margin: 0 2px;
    }
  }

  span:nth-of-type(${(props) => props.slideIndex + 1}) {
    span {
      background-color: #000;
      transform: scaleX(30px);
      width: 12px;
      border-radius: 3px;
    }
  }
`;

export const MainCharacterItem = () => {
  const flickingRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const { resize } = useHandleISize(); // 사이즈 체크 커스텀 훅

  const flickingOnChange = (e) => {
    setSlideIndex(e);
  };

  // 이미지 변경 시마다 리렌더링
  useEffect(() => {
    moveToFlicking(slideIndex);
  }, [slideIndex]);

  // 슬라이드 변경 (주어진 인덱스에 해당하는 패널로 이동)
  const moveToFlicking = async (index) => {
    const flicking = flickingRef.current;
    if (!flicking) {
      return;
    }

    // 무분별하게 이동 시 "Animation is already playing." 에러 뜨는 거 방지
    await flicking.moveTo(index).catch((e) => {
      return;
    });
  };

  // // 페이지 아이콘
  // const onPageButton = async (index) => {
  //   const flicking = flickingRef.current;
  //   if (!flicking) {
  //     return;
  //   }

  //   // 무분별하게 이동 시 "Animation is already playing." 에러 뜨는 거 방지
  //   await flicking.moveTo(index).catch((e) => {
  //     return;
  //   });
  // };

  const onClickArrowBackButton = () => {
    // 무분별하게 클릭할 경우 아이콘 엉키는 거 방지
    if (flickingRef.current.animating === true) {
      return;
    }
    // 첫번째 장일 경우 마지막 장 불러오기 (원본 보존으로 인해 전개연산자로 복사)
    if (slideIndex === 0) {
      setSlideIndex(2);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };

  const onClickArrowForwardButton = () => {
    // 무분별하게 클릭할 경우 아이콘 엉키는 거 방지
    if (flickingRef.current.animating === true) {
      return;
    }
    // 마지막 장일 경우 첫번째 장 불러오기 (원본 보존으로 인해 전개연산자로 복사)
    if (slideIndex === 2) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const [dataList1, setDataList1] = useState(null);
  const [dataList2, setDataList2] = useState(null);
  const [dataList3, setDataList3] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/mainCharacterList1").then((res) => {
      setDataList1(res.data);
    });
    axios.get("http://localhost:4000/mainCharacterList2").then((res) => {
      setDataList2(res.data);
    });
    axios.get("http://localhost:4000/mainCharacterList3").then((res) => {
      setDataList3(res.data);
    });
  }, []);

  return (
    <Container>
      {dataList1 && dataList2 && dataList3 && (
        <Flicking
          circular={true}
          duration={500}
          autoResize={true}
          autoInit={true}
          ref={flickingRef}
          onChange={flickingOnChange}
          onChanged={(e) => {
            setSlideIndex(e.index);
          }}
          changeOnHold={false}
          moveType={"strict"}
        >
          <div>
            <MainCharacterItemList
              titleBanner={TitleBanner1}
              titleText={"핑크핑크 어피치"}
              subText={"예쁘기도 하지요"}
              listData={dataList1}
            />
          </div>
          <div>
            <MainCharacterItemList
              titleBanner={TitleBanner2}
              titleText={"오직 여기서만"}
              subText={"온라인 전용상품 보기"}
              listData={dataList2}
            />
          </div>
          <div>
            <MainCharacterItemList
              titleBanner={TitleBanner3}
              titleText={"핑크핑크 어피치"}
              subText={"예쁘기도 하지요"}
              listData={dataList3}
            />
          </div>
        </Flicking>
      )}
      <PageInfoBox>
        <PageInfo>
          {!resize && (
            <ArrowButton onClick={onClickArrowBackButton}>
              <IoIosArrowBack />
            </ArrowButton>
          )}
          <PaginationButton slideIndex={slideIndex}>
            <span>
              <span />
            </span>
            <span>
              <span />
            </span>
            <span>
              <span />
            </span>
          </PaginationButton>
          {!resize && (
            <ArrowButton onClick={onClickArrowForwardButton}>
              <IoIosArrowForward />
            </ArrowButton>
          )}
        </PageInfo>
      </PageInfoBox>
    </Container>
  );
};
