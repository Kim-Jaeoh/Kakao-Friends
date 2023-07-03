import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { RouterHeader } from "../components/header/RouterHeader";
import { PromotionApi } from "../apis/dataApi";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/utils/Footer";

const Promotion = () => {
  const { id } = useParams();

  const { data: dataList, isLoading } = useQuery("promotionApi", PromotionApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

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
                      <img src={list.image} alt="" loading="lazy" />
                    </Link>
                  ) : (
                    <img src={list.image} alt="" loading="lazy" />
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

export default Promotion;

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
