import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { RouterHeader } from "../components/header/RouterHeader";
import { PromotionApi } from "../apis/dataApi";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Footer } from "../components/utils/Footer";

const Container = styled.div`
  position: relative;
  margin-bottom: -60px;
`;

const ImageBox = styled.div`
  background-color: #fff;

  img {
    display: block;
    width: 100%;
  }
`;

export const Promotion = () => {
  const { id } = useParams();
  // const {state} = useLocation();

  const { data: dataList, isLoading } = useQuery("promotionApi", PromotionApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  // const { data: dataList, isLoading } = useQuery(
  //   "proApi",
  //   async () => await axios.get(`http://localhost:4000/promotionlist/${id}`),
  //   // promotionApi,
  //   {
  //     refetchOnMount: "always",
  //     refetchOnWindowFocus: false,
  //     onError: (e) => console.log(e.message),
  //   }
  // );

  return (
    <>
      <Container>
        <RouterHeader title={dataList?.data[id - 1].text} />
        {!isLoading && (
          <ImageBox>
            {dataList?.data[id - 1]?.list.map((list, index) => {
              return (
                // url 있으면 Link 태그 활성화
                <div key={index}>
                  {list.url ? (
                    <Link to={list.url}>
                      <img src={list.image} alt="" />
                    </Link>
                  ) : (
                    <img src={list.image} alt="" />
                  )}
                </div>
              );
            })}
          </ImageBox>
        )}
      </Container>
      <Footer />
    </>
  );
};
