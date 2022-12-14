import React, { useRef, lazy } from "react";
import styled from "@emotion/styled";
import { RouterHeader } from "../components/header/RouterHeader";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Rating } from "../components/utils/Rating";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AiOutlineBell } from "react-icons/ai";
import { DetailProductModal } from "../components/modal/DetailProductModal";
import axios from "axios";
const ProductRecommend = lazy(() =>
  import("../components/utils/ProductRecommend")
);
const ProductSeen = lazy(() => import("../components/utils/ProductSeen"));

const Container = styled.main`
  position: relative;
  padding-bottom: 70px;
`;

const SliderBox = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  isolation: isolate;
`;

const SliderItem = styled.div`
  position: relative;
  width: 390px;
  padding-top: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);

  img {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
  }

  @media screen and (min-width: 640px) {
    width: 638px;
  }
`;

// const PaginationButton = styled.div`
//   position: absolute;
//   z-index: 10;
//   bottom: 0px;
//   width: 100%;
//   height: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   user-select: none;

//   span {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     span {
//       border-radius: 100%;
//       display: inline-block;
//       font-size: 1rem;
//       width: 4px;
//       height: 4px;
//       background-color: #dedfe0;
//       margin: 0 2px;
//     }
//   }

//   span:nth-of-type(${(props) => props.slideIndex + 1}) {
//     span {
//       background-color: #000;
//       transform: scaleX(30px);
//       width: 12px;
//       border-radius: 3px;
//     }
//   }
// `;

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

const DetailProduct = () => {
  // const [slideIndex, setSlideIndex] = useState(0); // ?????? ????????? ??? ?????? ???
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [buttonModal, setbuttonModal] = useState(false);
  const flickingRef = useRef(null);
  const { id } = useParams();
  const { viewedItems } = useLocalStorage(); // ?????? ?????? ????????? ???

  const _plugins = [
    new AutoPlay({ duration: 3000, direction: "NEXT", stopOnHover: true }),
  ];

  const api = async () => {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_PORT}/api/product/${id}`
    );
  };

  const { data, isLoading } = useQuery(["producList", id], api, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  useEffect(() => {
    if (data) {
      const dataList = data?.data;

      setProduct([
        {
          id: dataList?.id,
          product: dataList?.product,
          title: dataList?.title,
          price: dataList?.price,
          image: dataList?.image,
          amount: dataList?.amount, // ?????? ??????
          quanity: count, // ????????? ??????
        },
      ]);
    }
  }, [count, data, id]);

  // ????????? ?????? ??? clean up?????? ?????? ?????? ??????
  useEffect(() => {
    return () => setCount(1);
  }, [id]);

  const toggleButtonModal = () => {
    setbuttonModal((prev) => !prev);
  };

  return (
    <>
      {product &&
        product.map((item) => (
          <Container key={item.id}>
            <RouterHeader title={"?????? ??????"} />

            <SliderBox>
              <Flicking
                circular={true}
                duration={500}
                autoResize={true}
                defaultIndex={0}
                autoInit={true}
                ref={flickingRef}
                // onChanged={(e) => {
                //   setSlideIndex(e.index);
                // }}
                changeOnHold={false}
                moveType={"strict"}
                plugins={_plugins}
              >
                <SliderItem>
                  <img src={item.image} alt="" loading="lazy" />
                </SliderItem>
                {/* {item.detailImage.map((item, index) => (
                <SliderItem key={index}>
                  <img src={item} alt="" />
                </SliderItem>
              ))} */}
              </Flicking>
              {/* {item?.detailImage ? (
                <PaginationButton slideIndex={slideIndex}>
                  {!isLoading &&
                    item?.detailImage?.map((list, index) => (
                      <span key={index}>
                        <span />
                      </span>
                    ))}
                </PaginationButton>
              ) : null} */}
            </SliderBox>
            <ProductInfoBox>
              <ProductInfo>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPrice>
                  <span>{item.price}???</span>
                </ProductPrice>
                <Rating id={item.id} rate={3} />
              </ProductInfo>
              <ProductDetail></ProductDetail>
            </ProductInfoBox>
            <BasketBottomButton>
              {item.amount !== 0 ? (
                <OrderButton onClick={toggleButtonModal}>????????????</OrderButton>
              ) : (
                <OrderButton style={{ backgroundColor: "#3396ff" }}>
                  <AiOutlineBell size="24" /> ????????? ??????
                </OrderButton>
              )}
            </BasketBottomButton>
            <ProductRecommend productId={item.product} />
            {viewedItems.length > 1 && <ProductSeen productId={item.product} />}
            {buttonModal && (
              <DetailProductModal
                products={product}
                setCount={setCount}
                buttonModal={buttonModal}
                toggleButtonModal={toggleButtonModal}
              />
            )}
          </Container>
        ))}
    </>
  );
};

export default DetailProduct;
