import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "../../styles/swiperModules/swiper.scss";
import "../../styles/swiperModules/pagination.scss";
import "../../styles/swiperModules/navigation.scss";
import { Link } from "react-router-dom";
import { BsBag, BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { mainContentsSlideList } from "../../data/mainContentsSlideList";
// import Flicking from "@egjs/react-flicking";
// import "@egjs/react-flicking/dist/flicking.css";
// import { Pagination } from "@egjs/flicking-plugins";
// import "@egjs/flicking-plugins/dist/pagination.css";

const Container = styled.div``;

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
  width: 100%;
`;

const SlideVideoButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);

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

export const MainSlideContents = () => {
  const videoRef = useRef(null);
  const buttonRef = useRef(null);
  const flickingRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // // 이미지 변경 시 state 저장 (원본 보존으로 인해 전개연산자로 복사)
  // const flickingOnChange = (e) => {
  //   setSlideIndex({ ...flickingIndex, currentIndex: e });
  // };

  // // 이미지 변경 시마다 리렌더링
  // useEffect(() => {
  //   moveToFlicking(flickingIndex.currentIndex);
  // }, [flickingIndex]);

  // // 이미지 변경 (주어진 인덱스에 해당하는 패널로 이동)
  // const moveToFlicking = (index) => {
  //   const flicking = flickingRef.current;
  //   if (!flicking) {
  //     return;
  //   }
  //   flicking.moveTo(index);
  //   flicking.disableInput();
  // };

  // const onClickArrowBackButton = () => {
  //   // 첫번째 장일 경우 마지막 장 불러오기 (원본 보존으로 인해 전개연산자로 복사)
  //   if (flickingIndex.currentIndex === 0) {
  //     setFlcikingIndex({
  //       ...flickingIndex,
  //       currentIndex: mainContentsSlideList.length - 1,
  //     });
  //   } else {
  //     setFlcikingIndex({
  //       ...flickingIndex,
  //       currentIndex: flickingIndex.currentIndex - 1,
  //     });
  //   }
  // };

  // const onClickArrowForwardButton = () => {
  //   // 마지막 장일 경우 첫번째 장 불러오기 (원본 보존으로 인해 전개연산자로 복사)
  //   if (flickingIndex.currentIndex === mainContentsSlideList.length - 1) {
  //     setFlcikingIndex({
  //       ...flickingIndex,
  //       currentIndex: 0,
  //     });
  //   } else {
  //     setFlcikingIndex({
  //       ...flickingIndex,
  //       currentIndex: flickingIndex.currentIndex + 1,
  //     });
  //   }
  // };

  useEffect(() => {
    console.log(videoRef.current);
    console.log(slideIndex);
  }, [slideIndex]);

  // 비디오
  const togglePlay = (index) => {
    videoRef.current?.play();
    setIsPlaying(true);
    // if (index === slideIndex) {
    // }
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };
  return (
    <Container>
      <Title>
        <strong>신박한 프렌즈템</strong>
      </Title>
      <SliderBox>
        <Swiper
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
                      // controls
                      muted
                      ref={videoRef}
                      data-list={index}
                    >
                      <source src={list.video} type="video/mp4" />
                    </SlideVideo>
                    {index === slideIndex && (
                      <SlideVideoButton
                        ref={buttonRef}
                        onClick={() => togglePlay(index)}
                      >
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
        </Swiper>
      </SliderBox>
    </Container>
  );
};
