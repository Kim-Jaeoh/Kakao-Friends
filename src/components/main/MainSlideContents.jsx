import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "../../styles/swiperModules/swiper.scss";
import "../../styles/swiperModules/pagination.scss";
import "../../styles/swiperModules/navigation.scss";
import { Link } from "react-router-dom";
import { BsBag, BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { mainContentsSlideList } from "../../data/mainContentsSlideList";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useHandleISize } from "../../hooks/useHandleISize";

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
  -webkit-box-direction: normal;
  -webkit-box-orient: horizontal;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
  width: 100%;
  will-change: transform;
  z-index: 1;

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
      user-select: none;
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
  isolation: isolate;
  margin: 0 6px;
  border-radius: 10px;
`;

const SlideVideoBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 355px;
`;

const SlideVideo = styled.video`
  user-select: none;
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
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 56px;
  padding: 12px;
  background-color: #fff;
  box-sizing: border-box;
  cursor: pointer;

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
  margin-top: 24px;
  width: 140px;
  height: inherit;
  a {
    display: block;
    overflow: hidden;
    max-height: 32px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #747475;
    letter-spacing: -0.018em;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const BagButton = styled.button`
  position: absolute;
  z-index: 20;
  right: 8px;

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

  button {
    /* width: 28px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center; */

    div {
      cursor: pointer;
      border-radius: 50%;
      display: inline-block;
      font-size: 1rem;
      width: 8px;
      height: 8px;
      background-color: #0a0a0a1a;
      transition: all 0.3s;
      margin: 0 5px;
    }
  }

  button:nth-of-type(${(props) => props.slideIndex + 1}) {
    div {
      background-color: #f2a65e;
      transform: scaleX(30px);
      width: 20px;
      height: 8px;
      border-radius: 9999px;
    }
  }
`;

export const MainSlideContents = () => {
  const videoRef = useRef([] || null);
  const flickingRef = useRef(null);
  const buttonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [changeSize, setChangeSize] = useState(false);
  const [hover, setHover] = useState(false);

  const { resize } = useHandleISize(); // 사이즈 체크 커스텀 훅

  // // 리사이징 드래그 안 됨 해결 중;;
  // useEffect(() => {
  //   if (resize) {
  //     setSlideIndex((prev) => ({ ...prev, slideIndex }));
  //   }
  // }, []);

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

  // 이미지 변경 시 state 저장 (원본 보존으로 인해 전개연산자로 복사)
  const flickingOnChange = (e) => {
    setSlideIndex(e);
  };

  // 이미지 변경 시마다 리렌더링
  useEffect(() => {
    moveToFlicking(slideIndex);
  }, [slideIndex]);

  // 슬라이드 변경 (주어진 인덱스에 해당하는 패널로 이동)
  const moveToFlicking = (index) => {
    const flicking = flickingRef.current;
    if (!flicking) {
      return;
    }

    flicking.moveTo(index);
  };

  // 페이지 아이콘
  const onPageButton = (index) => {
    const flicking = flickingRef.current;
    if (!flicking) {
      return;
    }
    flicking.moveTo(index);
  };

  const onClickArrowBackButton = () => {
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
          duration={100}
          autoResize={true}
          autoInit={true}
          ref={flickingRef}
          onChange={flickingOnChange}
          onChanged={(e) => {
            setSlideIndex(e.index);
            setIsPlaying(false);
            videoRef?.current[slideIndex]?.pause();
          }}
          onAfterResize={(e) => {
            setChangeSize(e.sizeChanged);
            window.location.reload();
          }}
          // plugins={plugins}
        >
          {mainContentsSlideList.map((list, index) => (
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
                  data-list={index}
                  src={list.video}
                  type="video/mp4"
                  onMouseOut={onMouseOutButton}
                />

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
            <button key={list.id} onClick={() => onPageButton(index)}>
              <div />
            </button>
          ))}
        </PaginationButton>
      )}
    </Container>
  );
};
