import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Footer } from "../components/utils/Footer";
import { Link, useLocation } from "react-router-dom";
import ProductInnerList from "../components/product/ProductInnerList";

const Product = () => {
  const [clickTabNumber, setClickTabNumber] = useState(1);
  const { pathname } = useLocation();

  const toggleTab = (num) => {
    setClickTabNumber(num);
  };

  useEffect(() => {
    if (pathname.includes("/realtime")) {
      setClickTabNumber(1);
    } else if (pathname.includes("/steady")) {
      setClickTabNumber(2);
    }
  }, [pathname]);

  const productUrl = `${process.env.REACT_APP_SERVER_PORT}/api/productlist`;

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
              <Link to="realtime">실시간</Link>
            </TabTitle>
            <TabTitle
              onClick={() => toggleTab(2)}
              num={2}
              selected={clickTabNumber}
            >
              <Link to="steady">스테디</Link>
            </TabTitle>
          </TabList>

          {pathname.includes("/realtime") ? (
            <ProductInnerList api={`${productUrl}/realtime?`} />
          ) : (
            <ProductInnerList api={`${productUrl}/steady?`} />
          )}
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

export default Product;

const Container = styled.main`
  position: relative;
`;

const Wrapper = styled.article`
  overflow: hidden;
  padding-bottom: 76px;
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

  a {
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
