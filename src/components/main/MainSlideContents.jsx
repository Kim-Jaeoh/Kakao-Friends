import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "../../styles/swiperModules/swiper.scss";
import "../../styles/swiperModules/pagination.scss";
import "../../styles/swiperModules/navigation.scss";
import { Link } from "react-router-dom";
import { BsBag, BsFillPauseFill, BsPlayFill, BsBagFill } from "react-icons/bs";
import { mainContentsSlideList } from "../../data/mainContentsData";
import Flicking, { SnapControl, StrictControl } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useHandleISize } from "../../hooks/useHandleISize";
import { debounce } from "lodash";
import axios from "axios";

const Container = styled.div`
  /* position: relative; */
`;

const Title = styled.div`
  position: relative;
  margin-top: 58px;
  padding: 0 20px 20px;
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

const SliderBox = styled.div`
  position: relative;

  // 양옆 흰색
  @media screen and (min-width: 640px) {
    &::before,
    &::after {
      position: absolute;
      top: 0;
      z-index: 10;
      height: 100%;
      width: 100px;
      content: "";
      /* user-select: none; */
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, white, rgba(255, 255, 255, 0));
    }

    &::after {
      right: 0;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
    }
  }
`;

const ArrowBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  user-select: none;
`;

const ArrowButton = styled.button`
  background: rgb(255, 255, 255, 0.8);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transform: translateY(-50%);
  z-index: 100;
  position: relative;

  &:first-of-type {
    margin-left: 20px;
  }

  &:last-of-type {
    margin-right: 20px;
  }

  svg {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SliderItem = styled.div`
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 412px;
  margin: 0 6px;
  border-radius: 10px;
  isolation: isolate;
`;

const SlideVideoBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 355px;
`;

const SlideVideo = styled.video`
  /* user-select: none; */
  width: 100%;
`;

const SlideVideoButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);
  opacity: ${(props) => (props.hover ? "0" : "100")};
  transition: opacity 0.6s;

  svg {
    width: 70px;
    height: 70px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SlideInfo = styled.div`
  position: relative;
  padding: 12px 48px 12px 12px;
  height: 56px;
  background-color: #fff;
  box-sizing: border-box;

  ::before {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #dedfe0;
    border-radius: 0 0 10px 10px;
    border-top: 0;
    content: "";
  }
`;

const SlideInfoText = styled.div`
  a {
    display: block;
    position: relative;

    strong {
      display: -webkit-box;
      overflow: hidden;
      max-height: 32px;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #747475;
      letter-spacing: -0.018em;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
`;

const BagButton = styled.button`
  position: absolute;
  z-index: 20;
  right: 8px;
  bottom: 12px;
  color: #909092;

  svg {
    width: 16px;
    height: 16px;
    margin: 6px;
  }
`;

const PaginationButton = styled.div`
  width: 100%;
  height: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  span {
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

export const MainSlideContents = () => {
  const videoRef = useRef([] || null);
  const flickingRef = useRef(null);
  const buttonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [clickIcon, setClickIcon] = useState(false);
  const [clickNumber, setClickNumber] = useState([]);
  const [disableOnInit, setDisableOnInit] = useState(false);
  const [dataList, setDataList] = useState(null);

  const { resize } = useHandleISize(); // 사이즈 체크 커스텀 훅

  useEffect(() => {
    axios.get("http://localhost:4000/mainContentsSlideList").then((res) => {
      setDataList(res.data);
    });
  }, []);

  // 비디오
  const togglePlay = (event) => {
    event.preventDefault();
    // check if video in ref is playing
    if (videoRef?.current[slideIndex].paused) {
      videoRef?.current[slideIndex].play();
      setIsPlaying(true);
      setHover(true); // 플레이 시 아이콘 보이게
    } else {
      videoRef?.current[slideIndex]?.pause();
      setIsPlaying(false);
    }
  };

  // // 이미지 변경 시 state 저장
  // const flickingOnChange = (e) => {
  //   setSlideIndex(e);
  // };

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
      setSlideIndex(mainContentsSlideList.length - 1);
    } else {
      setSlideIndex(slideIndex - 1);
    }
    if (videoRef?.current[slideIndex].played) {
      videoRef?.current[slideIndex].pause();
    }
  };

  const onClickArrowForwardButton = () => {
    // 무분별하게 클릭할 경우 아이콘 엉키는 거 방지
    if (flickingRef.current.animating === true) {
      return;
    }
    // 마지막 장일 경우 첫번째 장 불러오기 (원본 보존으로 인해 전개연산자로 복사)
    if (slideIndex === mainContentsSlideList.length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }

    if (videoRef?.current[slideIndex].played) {
      videoRef?.current[slideIndex]?.pause();
    }
  };

  // 재생/일시정지 버튼 마우스 이벤트
  const onMouseOverButton = (e) => {
    if (isPlaying) {
      setHover(false);
    }
  };
  const onMouseOutButton = (e) => {
    if (isPlaying) {
      setHover(true);
    }
  };

  const toggleIcon = useCallback(
    (index) => {
      setClickNumber((prev) => [...prev, index]);
      setClickIcon(true);

      if (clickIcon && clickNumber.includes(index)) {
        setClickNumber(clickNumber.filter((id) => id !== index));
        setClickIcon(false);
      }
    },
    [clickIcon, clickNumber]
  );

  return (
    <Container>
      <Title>
        <strong>신박한 프렌즈템</strong>
      </Title>

      <SliderBox>
        {!resize && (
          <ArrowBox>
            <ArrowButton onClick={onClickArrowBackButton}>
              <IoIosArrowBack />
            </ArrowButton>
            <ArrowButton onClick={onClickArrowForwardButton}>
              <IoIosArrowForward />
            </ArrowButton>
          </ArrowBox>
        )}

        <Flicking
          circular={true}
          duration={500}
          autoResize={true}
          autoInit={true}
          ref={flickingRef}
          // onChange={flickingOnChange}
          onChanged={(e) => {
            setSlideIndex(e.index);
            setIsPlaying(false);
            videoRef?.current[slideIndex]?.pause();
          }}
          disableOnInit={disableOnInit}
          changeOnHold={false}
          moveType={"strict"}
        >
          {dataList &&
            dataList?.map((list, index) => (
              <SliderItem key={list.id}>
                <SlideVideoBox>
                  {index === slideIndex && (
                    <SlideVideoButton
                      ref={buttonRef}
                      onClick={togglePlay}
                      hover={hover}
                      onMouseEnter={onMouseOverButton}
                    >
                      {!isPlaying ? <BsPlayFill /> : <BsFillPauseFill />}
                    </SlideVideoButton>
                  )}

                  <SlideVideo
                    loop
                    muted
                    ref={(el) => {
                      videoRef.current[index] = el;
                      // console.log(el);
                    }} // index마다 ref.current의 정보를 useRef([])에 담는다 *중요!
                    src={list.video}
                    type="video/mp4"
                    onMouseOut={onMouseOutButton}
                  />
                </SlideVideoBox>
                <SlideInfo>
                  <SlideInfoText>
                    <Link to={list.url}>
                      <strong>{list.title}</strong>
                    </Link>
                  </SlideInfoText>
                  <BagButton onClick={(e) => toggleIcon(index, e)}>
                    {clickNumber.includes(index) ? <BsBagFill /> : <BsBag />}
                  </BagButton>
                </SlideInfo>
              </SliderItem>
            ))}
        </Flicking>

        {/* <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={6}
          slidesPerView={3}
          navigation
          initialSlide={0}
          centeredSlides={true}
          onRealIndexChange={(e) => {
            setSlideIndex(e.realIndex);
            setIsPlaying(false);
          }}
          onActiveIndexChange={(e) => {
            console.log(e);
          }}
          ref={flickingRef}
          loop={true}
          scrollbar={{ draggable: true }}
        >
          {mainContentsSlideList.map((list, index) => {
            return (
              <SwiperSlide key={list.id}>
                <SliderItem>
                  <SlideVideoBox>
                    <SlideVideo
                      loop
                      muted
                      // controls
                      ref={(el) => (videoRef.current[index] = el)}
                      data-list={index}
                      src={list.video}
                      type="video/mp4"
                    />
                    {index === slideIndex && (
                      <SlideVideoButton onClick={togglePlay}>
                        {!isPlaying ? <BsPlayFill /> : <BsFillPauseFill />}
                      </SlideVideoButton>
                    )}
                    <SlideInfo>
                      <SlideInfoText>
                        <Link to={list.url}>
                          <strong>{list.title}</strong>
                        </Link>
                      </SlideInfoText>
                      <BagButton>
                        <BsBag />
                      </BagButton>
                    </SlideInfo>
                  </SlideVideoBox>
                </SliderItem>
              </SwiperSlide>
            );
          })}
        </Swiper> */}
      </SliderBox>
      {resize && (
        <PaginationButton slideIndex={slideIndex}>
          {mainContentsSlideList.map((list, index) => (
            <span key={list.id}>
              <span />
            </span>
          ))}
        </PaginationButton>
      )}
    </Container>
  );
};
