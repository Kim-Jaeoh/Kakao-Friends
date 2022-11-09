import React, { useRef } from "react";
import styled from "@emotion/styled";
import { RouterHeader } from "../components/header/RouterHeader";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { Arrow, AutoPlay, Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import { useState } from "react";
import { useQuery } from "react-query";
import { ProductListApi } from "../apis/dataApi";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";
import { Rating } from "../components/Rating";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AiOutlineBell } from "react-icons/ai";

const Container = styled.main`
  padding-bottom: 40px;
`;

const SliderBox = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  isolation: isolate;
`;

const SliderItem = styled.div`
  position: relative;
  width: 638px;

  img {
    display: block;
    width: 100%;
  }
`;

const PaginationButton = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 0px;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

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

const ProductInfoBox = styled.div`
  border-bottom: 1px solid #e6e6e6;
`;

const ProductInfo = styled.div`
  position: relative;
  margin: 25px 0 30px;
  padding: 0 117px 0 20px;
`;

const ProductTitle = styled.div`
  display: block;
  font-size: 28px;
  line-height: 36px;
  font-weight: bold;
`;

const ProductPrice = styled.div`
  padding-top: 10px;

  span {
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
  }
`;

const ProductDetail = styled.div`
  padding-top: 50px;
`;

const BasketBottomButton = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 90;
  width: 100%;

  @media screen and (min-width: 640px) {
    width: 640px;
    left: 50%;
    margin-left: -320px;
  }
`;

const OrderButton = styled.button`
  display: block;
  width: 100%;
  height: 80px;
  color: #fff;
  background-color: #fb2e45;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-lines: multiple;
  flex-wrap: wrap;
  padding: 0 20px;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.014em;

  svg {
    margin-right: 4px;
  }
`;

export const Product = () => {
  const { id } = useParams();
  const [slideIndex, setSlideIndex] = useState(0);
  const flickingRef = useRef(null);
  const { viewedItems } = useLocalStorage();

  const { data: dataList, isLoading } = useQuery(
    "ProductList",
    ProductListApi,
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e.message),
    }
  );

  const _plugins = [
    new AutoPlay({ duration: 3000, direction: "NEXT", stopOnHover: true }),
  ];

  const product = dataList?.data[id - 1];

  return (
    <>
      <Container>
        <RouterHeader title={"제품 상세"} />
        {!isLoading && (
          <>
            <SliderBox>
              <Flicking
                circular={true}
                duration={500}
                autoResize={true}
                defaultIndex={0}
                autoInit={true}
                ref={flickingRef}
                onChanged={(e) => {
                  setSlideIndex(e.index);
                }}
                changeOnHold={false}
                moveType={"strict"}
                plugins={_plugins}
              >
                <SliderItem>
                  <img src={product.img} alt="" />
                </SliderItem>
                {/* {product.detailImage.map((item, index) => (
                <SliderItem key={index}>
                  <img src={item} alt="" />
                </SliderItem>
              ))} */}
              </Flicking>
              {product?.detailImage ? (
                <PaginationButton slideIndex={slideIndex}>
                  {!isLoading &&
                    product?.detailImage?.map((list, index) => (
                      <span key={index}>
                        <span />
                      </span>
                    ))}
                </PaginationButton>
              ) : null}
            </SliderBox>
            <ProductInfoBox>
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>
                  <span>{product.price}원</span>
                </ProductPrice>
                <Rating id={product.id} rate={3} />
              </ProductInfo>
              <ProductDetail></ProductDetail>
            </ProductInfoBox>
            <BasketBottomButton>
              {product.amount !== 0 ? (
                <OrderButton>구매하기</OrderButton>
              ) : (
                <OrderButton style={{ backgroundColor: "#3396ff" }}>
                  <AiOutlineBell size="24" /> 재입고 알림
                </OrderButton>
              )}
            </BasketBottomButton>
          </>
        )}
      </Container>
    </>
  );
};
