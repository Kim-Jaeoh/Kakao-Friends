import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import videoContents from "../../image/video_contents_1.mp4";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import { Link } from "react-router-dom";
import { BsBag, BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { mainContentsSlideList } from "../../data/mainContentsSlideList";
import itemList1 from "../../image/list_item_1.jpg";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: 0 20px;
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

const VideoBox = styled.div`
  overflow: hidden;
  position: relative;
  padding-top: 56.25%;
  border-radius: 10px 10px 0 0;
  background-color: rgba(0, 0, 0, 0.1);
  isolation: isolate;
`;

const Video = styled.video`
  position: absolute;
  left: 50%;
  top: 50%;
  min-width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
`;

const InfoBox = styled.div`
  position: relative;

  strong {
    display: block;
    padding: 16px 16px 0;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.25px;
  }

  span {
    display: block;
    padding: 6px 16px 0;
    font-size: 14px;
    line-height: 20px;
    color: #535353;
  }
`;

const ListBox = styled.ul`
  margin: 16px 16px 0;
  padding-bottom: 16px;
`;

const List = styled.li`
  position: relative;

  @media screen and (min-width: 640px) {
    /* padding-right: 52px; */
  }
`;

const ListLink = styled(Link)`
  align-items: center;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const ListImage = styled.span`
  overflow: hidden;
  float: left;
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 4px;

  img {
    display: block;
    width: 100%;
    border: 0 none;
  }
`;

const ListText = styled.div`
  overflow: hidden;
`;

const ListTitle = styled.strong`
  display: block;
  overflow: hidden;
  font-weight: 400;
  color: #747475;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const ListPrice = styled.strong`
  margin-top: 1px;
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
`;

const BagButton = styled.button`
  margin-left: auto;
  border: 0 none;
  background-color: transparent;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    margin: 6px;
  }

  @media screen and (min-width: 640px) {
    right: 6px;
  }
`;

export const MainVideoContents = () => {
  return (
    <Container>
      <Wrapper>
        <Title>
          <strong>춘식이랑 집 꾸미기</strong>
        </Title>
        <VideoBox>
          <Video>
            <source src={videoContents} type="video/mp4" />
          </Video>
        </VideoBox>
        <InfoBox>
          <strong>프렌즈 에브리 예이</strong>
          <span>
            프렌즈와 힙한 라이프
            <br />
            라이언 춘식이와 EveryYay!
          </span>
        </InfoBox>

        <ListBox>
          <List>
            <ListLink to={"/"}>
              <ListImage>
                <img
                  src={itemList1}
                  alt={"EveryYay 납작 필로우_트민냥춘식이"}
                />
              </ListImage>
              <ListText>
                <ListTitle>EveryYay 납작 필로우_트민냥춘식이</ListTitle>
                <ListPrice>22,000원</ListPrice>
              </ListText>
              <BagButton>
                <BsBag />
              </BagButton>
            </ListLink>
          </List>
        </ListBox>
      </Wrapper>
    </Container>
  );
};
