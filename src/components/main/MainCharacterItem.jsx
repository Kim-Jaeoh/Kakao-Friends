import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useHandleISize } from "../../hooks/useHandleISize";
import { MainCharacterItemList } from "./MainCharacterItemList";
import TitleBanner1 from "../../assets/main_character_1.png";
import TitleBanner2 from "../../assets/main_character_2.png";
import TitleBanner3 from "../../assets/main_character_3.png";
import { useQuery } from "react-query";
import {
  CharacterList1Api,
  CharacterList2Api,
  CharacterList3Api,
} from "../../apis/dataApi";
import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";

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
`;

const PaginationSpan = styled.span`
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

  &:nth-of-type(${(props) => props.slideIndex + 1}) {
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

  const { resize } = useHandleISize(); // ????????? ?????? ????????? ???

  // ????????? ?????? ????????? ????????????
  useEffect(() => {
    moveToFlicking(slideIndex);
  }, [slideIndex]);

  // ???????????? ?????? (????????? ???????????? ???????????? ????????? ??????)
  const moveToFlicking = async (index) => {
    const flicking = flickingRef.current;
    if (!flicking) {
      return;
    }

    // ??????????????? ?????? ??? "Animation is already playing." ?????? ?????? ??? ??????
    await flicking.moveTo(index).catch((e) => {
      return;
    });
  };

  // // ????????? ?????????
  // const onPageButton = async (index) => {
  //   const flicking = flickingRef.current;
  //   if (!flicking) {
  //     return;
  //   }

  //   // ??????????????? ?????? ??? "Animation is already playing." ?????? ?????? ??? ??????
  //   await flicking.moveTo(index).catch((e) => {
  //     return;
  //   });
  // };

  const onClickArrowBackButton = () => {
    // ??????????????? ????????? ?????? ????????? ????????? ??? ??????
    if (flickingRef.current.animating === true) {
      return;
    }
    if (slideIndex === 0) {
      setSlideIndex(2);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };

  const onClickArrowForwardButton = () => {
    // ??????????????? ????????? ?????? ????????? ????????? ??? ??????
    if (flickingRef.current.animating === true) {
      return;
    }
    if (slideIndex === 2) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const { data: data1, isLoading } = useQuery("character1", CharacterList1Api, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  const { data: data2 } = useQuery("character2", CharacterList2Api, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  const { data: data3 } = useQuery("character3", CharacterList3Api, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  const plugins = [new Pagination({ type: "bullet" })];

  return (
    <Container>
      <Flicking
        circular={true}
        duration={500}
        autoResize={true}
        autoInit={true}
        ref={flickingRef}
        onChanged={(e) => {
          setSlideIndex(e.index);
        }}
        changeOnHold={false}
        moveType={"strict"}
      >
        {!isLoading && (
          <>
            <div>
              <MainCharacterItemList
                titleBanner={TitleBanner1}
                titleText={"???????????? ?????????"}
                subText={"???????????? ?????????"}
                listData={data1 && data1?.data}
              />
            </div>
            <div>
              <MainCharacterItemList
                titleBanner={TitleBanner2}
                titleText={"?????? ????????????"}
                subText={"????????? ???????????? ??????"}
                listData={data2 && data2?.data}
              />
            </div>
            <div>
              <MainCharacterItemList
                titleBanner={TitleBanner3}
                titleText={"???????????? ?????????"}
                subText={"???????????? ?????????"}
                listData={data3 && data3?.data}
              />
            </div>
          </>
        )}
      </Flicking>
      <PageInfoBox>
        <PageInfo>
          {!resize && (
            <ArrowButton onClick={onClickArrowBackButton}>
              <IoIosArrowBack />
            </ArrowButton>
          )}
          <PaginationButton>
            {Array.from({ length: 3 }, (value, index) => (
              <PaginationSpan key={index} slideIndex={slideIndex}>
                <span />
              </PaginationSpan>
            ))}
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
