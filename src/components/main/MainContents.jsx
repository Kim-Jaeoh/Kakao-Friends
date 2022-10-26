/** @jsxImportSource @emotion/react */
import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { mainContentsBannerList } from "../../data/mainContentsData.js";
// import mainContentsBannerList from "../../../server/db.json";
import axios from "axios";
import { useQuery } from "react-query";
import { BannerListApi } from "../../apis/dataApi.js";

const Container = styled.div`
  display: block;
  overflow: hidden;
  position: relative;
  margin-top: 16px;
  border-radius: 10px;
  isolation: isolate;

  a::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 190px;
    /* background: linear-gradient(rgba(255, 255, 255, 0), white); */
    background: linear-gradient(rgba(0, 0, 0, 0), black);
    opacity: 0.5;
    content: "";

    @media screen and (min-width: 640px) {
      height: 160px;
    }
  }
`;

const MainContentsImage = styled.img`
  display: block;
  /* border: 0 none; */
  position: relative;
  left: 50%;
  width: 600px;
  transform: translate(-50%);
  height: ${(props) => (props.height ? props.height : "auto")};
`;

const MainContentsVideo = styled.video`
  display: block;
  /* border: 0 none; */
  position: relative;
  left: 50%;
  width: 600px;
  transform: translate(-50%);
  height: auto;
`;

const MainContentsText = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  padding: 0 20px 26px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);

  strong {
    white-space: normal;
    display: block;
    overflow: hidden;
    max-height: 72px;
    font-size: 28px;
    line-height: 36px;
    white-space: pre-line;
    text-overflow: ellipsis;
    word-break: break-all;
    font-weight: bold;
  }

  span {
    display: block;
    overflow: hidden;
    max-height: 44px;
    margin-top: 6px;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.025em;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
`;

export const MainContents = () => {
  const { data: dataList, isLoading } = useQuery("banner", BannerListApi, {
    refetchOnWindowFocus: false,
    // suspense: true,
    onError: (e) => console.log(e.message),
  });

  return (
    <>
      {!isLoading &&
        dataList?.data.map((list) => (
          <Container key={list.id}>
            <Link to={"/"}>
              {list.video ? (
                <MainContentsVideo
                  height={list.height}
                  loop
                  autoPlay
                  playsinline
                  muted
                >
                  <source src={list.video} type="video/mp4" />
                </MainContentsVideo>
              ) : (
                <MainContentsImage src={list.img} height={list.height} />
              )}
              <MainContentsText>
                <strong>{list.title}</strong>
                <span>
                  {list.sub1}
                  <br />
                  {list.sub2}
                </span>
              </MainContentsText>
            </Link>
          </Container>
        ))}
    </>
  );
};
