import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { BsBag, BsBagFill } from "react-icons/bs";
import { Header } from "../components/header/Header";
import { Footer } from "../components/utils/Footer";
import { Link, useLocation, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useBasketToggle } from "../hooks/useBasketToggle";
import { useSelector } from "react-redux";
import useInfinityScroll from "../hooks/useInfinityScroll";
import { useMemo } from "react";
import useScrollMove from "../hooks/useScrollMove";

const Container = styled.main`
  position: relative;
  /* padding-top: 43px; */
`;

const ContentArticle = styled.article``;

const Wrapper = styled.article`
  overflow: hidden;
  padding-bottom: 100px;
`;

const WrapperTitle = styled.div`
  position: relative;
  padding: 0 20px 20px;
  font-size: 0;
  margin-top: 40px;
  text-align: center;

  strong {
    display: inline-block;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: -0.025em;
    vertical-align: top;
    font-weight: bold;
  }
`;

const TabList = styled.ul`
  overflow: hidden;
  margin-top: 16px;
  font-size: 0;
  text-align: center;
  user-select: none;
  cursor: pointer;
`;

const TabTitle = styled.li`
  display: inline-block;
  margin: 0 2px;
  vertical-align: top;

  p {
    display: block;
    padding: 0 14px;
    border: 1px solid;
    border-radius: 15px;
    font-size: 14px;
    line-height: 28px;
    letter-spacing: -0.025em;
    color: #aeaeaf;
    transition: color, 0.1s ease;

    // active 값
    border-color: ${(props) =>
      props.num === props.selected ? "#3c404b" : "transparent"};
    color: ${(props) => (props.num === props.selected ? "#3c404b" : "#aeaeaf")};
    font-weight: ${(props) =>
      props.num === props.selected ? "700" : "normarl"};
  }
`;

const ListBox = styled.ol`
  margin: 2px 14px 0 13px;
  font-size: 0;

  @media screen and (min-width: 640px) {
    margin: 10px 12px 0;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  position: relative;
  width: 50%;
  padding: 20px 7px 20px 6px;
  vertical-align: top;
  box-sizing: border-box;

  @media screen and (min-width: 640px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const ListItemNumberBox = styled.div`
  position: absolute;
  left: 13px;
  top: 27px;
  z-index: 1;
  width: 24px;
  font-size: 16px;
  height: 24px;
  text-align: center;
  font-weight: bold;

  @media screen and (min-width: 640px) {
    left: 19px;
    top: 31px;
  }
`;

const ListItemNumber = styled.span`
  display: block;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  color: #fff;
  background-color: #aeaeaf;
`;

const ListItemRank = styled(ListItemNumber)`
  background-color: #3c404b;
`;

const ProductBox = styled.div`
  min-height: 260px;
`;

const ProductImage = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  padding-top: 100%;
  cursor: pointer;

  ::after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: rgba(0, 0, 0, 0.04);
  }

  img {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ProductTextBox = styled.div`
  position: relative;
`;

const ProductText = styled.div`
  padding-top: 10px;
  strong {
    padding-right: 32px;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #747475;
    max-height: 40px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
`;

const ProductPrice = styled.em`
  display: inline-block;
  padding-top: 4px;
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  vertical-align: top;

  span {
    font-size: 16px;
  }
`;

const ProductBag = styled.button`
  position: absolute;
  top: 5px;
  right: -4px;
  bottom: auto;
  padding: 6px;

  svg {
    width: 20px;
    height: 20px;
    color: #909092;
  }
`;

const Product = () => {
  const [clickTabNumber, setClickTabNumber] = useState(1);
  const [dataItem, setDataItem] = useState([]);
  const [isRandom, setIsRandom] = useState(false);

  const { id } = useParams();
  const domRef = useRef([]);

  // const api = "https://kakao-friends.herokuapp.com/ProductListData";
  const api = "http://localhost:4000/ProductListData";

  const { ref, dataList } = useInfinityScroll(api, 8); // 무한스크롤 커스텀 훅
  const { toggleIcon, currentBasKet } = useBasketToggle(); // 장바구니 커스텀 훅

  const toggleTab = (num) => {
    setClickTabNumber(num);
  };

  const randomArray = (array) => {
    for (let index = array?.length - 1; index > 0; index--) {
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index + 1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] = temporary;
    }
  };

  useEffect(() => {
    const arr = [...dataList];
    setDataItem(arr);
    // // 가격순
    // const price = arr.sort((a, b) => {
    //   return b.price.split(",").join("") - a.price.split(",").join("");
    // });
    // setDataItem(price);

    // randomArray(arr);
    // setDataItem(arr);
    // return () => randomArray();
  }, [dataList]);

  return (
    <>
      <Container>
        {/* <Header /> */}
        <Wrapper>
          <WrapperTitle>
            <strong>지금 인기있는</strong>
          </WrapperTitle>
          <TabList>
            <TabTitle
              onClick={() => toggleTab(1)}
              num={1}
              selected={clickTabNumber}
            >
              <p>실시간</p>
            </TabTitle>
            <TabTitle
              onClick={() => toggleTab(2)}
              num={2}
              selected={clickTabNumber}
            >
              <p>스테디</p>
            </TabTitle>
          </TabList>

          <ListBox>
            {dataItem &&
              dataItem?.map((list, index) => (
                <ListItem key={index} ref={(e) => (domRef.current[index] = e)}>
                  <ListItemNumberBox>
                    {index + 1 < 4 ? (
                      <ListItemRank>{index + 1}</ListItemRank>
                    ) : (
                      <ListItemNumber>{index + 1}</ListItemNumber>
                    )}
                  </ListItemNumberBox>
                  <ProductBox>
                    <Link to={`/detail/${list.product}`}>
                      <ProductImage>
                        <img src={list.image} alt={list.title} />
                      </ProductImage>
                    </Link>
                    <ProductTextBox>
                      <ProductText>
                        <strong>{list.title}</strong>
                      </ProductText>
                      <ProductPrice>
                        <span>{list.price}</span>원
                      </ProductPrice>
                      <ProductBag onClick={() => toggleIcon(list, index)}>
                        {currentBasKet?.filter(
                          (obj) => obj.product === list.product
                        ).length > 0 ? (
                          <BsBagFill />
                        ) : (
                          <BsBag />
                        )}
                      </ProductBag>
                    </ProductTextBox>
                  </ProductBox>
                </ListItem>
              ))}
            <div ref={ref} style={{ position: "absolute", bottom: "250px" }} />
          </ListBox>
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

export default React.memo(Product);
