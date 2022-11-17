import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { RouterHeader } from "../components/header/RouterHeader";
import { PromotionApi } from "../apis/dataApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
  position: relative;
`;

const ImageBox = styled.div`
  background-color: #fff;

  img {
    display: block;
    width: 100%;
  }
`;

export const Promotion = () => {
  const [aaa, setAaa] = useState(null);
  const { data: dataList, isLoading } = useQuery("promotionApi", PromotionApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  useEffect(() => {
    console.log(dataList?.data);
  }, []);

  const navigate = useNavigate();

  const onClick = () => {
    navigate("");
  };

  return (
    <Container>
      <RouterHeader title={"마이 쿠키 크리스마스 기획전"} />
      <ImageBox>
        <img src={dataList?.data[0].image1} alt="" />
        <img src={dataList?.data[0].image2} alt="" />
        <img src={dataList?.data[0].image3} alt="" />
        <Link to="/detail/51">
          <img src={dataList?.data[0].image4} alt="" />
        </Link>
        <img src={dataList?.data[0].image5} alt="" />
        <Link to="/detail/52">
          <img src={dataList?.data[0].image6} alt="" />
        </Link>
        <img src={dataList?.data[0].image7} alt="" />
        <Link to="/detail/55">
          <img src={dataList?.data[0].image8} alt="" />
        </Link>
        <Link to="/detail/56">
          <img src={dataList?.data[0].image9} alt="" />
        </Link>
        <img src={dataList?.data[0].image10} alt="" />
        <Link to="/detail/57">
          <img src={dataList?.data[0].image11} alt="" />
        </Link>
        <img src={dataList?.data[0].image12} alt="" />
        <Link to="/detail/58">
          <img src={dataList?.data[0].image13} alt="" />
        </Link>
      </ImageBox>
    </Container>
  );
};
