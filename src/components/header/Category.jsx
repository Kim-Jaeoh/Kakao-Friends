import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import CategoryMenuBtn from "./CategoryMenuBtn";

const Container = styled.nav`
  border-bottom: 1px solid #e3e5e8;
`;

const Inner = styled.ul`
  display: flex;
  padding: 0 5px;
  box-sizing: border-box;
`;

export const Category = () => {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    if (pathname === "/") {
      setSelected(1);
    } else if (pathname.includes("/promotion")) {
      setSelected(2);
    } else if (pathname.includes("/product")) {
      setSelected(3);
    } else if (pathname.includes("/my")) {
      setSelected(4);
    }
  }, [pathname]);

  const onSelected = (num) => {
    setSelected(num);
  };

  return (
    <Container>
      <Inner>
        <CategoryMenuBtn
          num={1}
          selected={selected}
          url={"/"}
          text={"홈"}
          onSelected={onSelected}
        />
        {/* <CategoryMenuBtn
          num={2}
          selected={selected}
          url={"/event"}
          onSelected={onSelected}
          text={"할로윈이벤트"}
        /> */}
        <CategoryMenuBtn
          num={2}
          selected={selected}
          url={"/promotion/1"}
          onSelected={onSelected}
          text={"크리스마스"}
        />
        <CategoryMenuBtn
          num={3}
          selected={selected}
          url={"/product"}
          text={"상품"}
          onSelected={onSelected}
        />
        <CategoryMenuBtn
          num={4}
          selected={selected}
          url={"/mypage/basket"}
          text={"마이"}
          onSelected={onSelected}
        />
      </Inner>
    </Container>
  );
};
