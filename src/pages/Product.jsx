import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { BsBag, BsBagFill } from "react-icons/bs";
import { Header } from "../components/header/Header";
import { Footer } from "../components/utils/Footer";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useBasketToggle } from "../hooks/useBasketToggle";
import { useSelector } from "react-redux";
import useInfinityScroll from "../hooks/useInfinityScroll";
import { useMemo } from "react";
import useScrollMove from "../hooks/useScrollMove";
import { set } from "lodash";
import { ProductSteady } from "../components/product/ProductSteady";
import { ProductRealTime } from "../components/product/ProductRealTime";

const Container = styled.main`
  position: relative;
  /* padding-top: 43px; */
`;

const Wrapper = styled.article`
  overflow: hidden;
  /* padding-bottom: 100px; */
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

const Product = () => {
  const [clickTabNumber, setClickTabNumber] = useState(1);
  const navigate = useNavigate();

  const toggleTab = (num) => {
    setClickTabNumber(num);
  };

  useEffect(() => {
    if (clickTabNumber === 1) {
      navigate("/product/realtime");
    } else {
      navigate("/product/steady");
    }
  }, [clickTabNumber, navigate]);

  return (
    <>
      <Container>
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

          {clickTabNumber === 1 ? <ProductRealTime /> : <ProductSteady />}
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

export default React.memo(Product);
