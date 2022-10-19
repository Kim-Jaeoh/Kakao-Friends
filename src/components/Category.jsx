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
    } else if (pathname.includes("/event")) {
      setSelected(2);
    } else if (pathname.includes("/best")) {
      setSelected(3);
    } else if (pathname.includes("/contents")) {
      setSelected(4);
    } else if (pathname.includes("/my")) {
      setSelected(5);
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
        <CategoryMenuBtn
          num={2}
          selected={selected}
          url={"/event"}
          onSelected={onSelected}
          text={"할로윈이벤트"}
        />
        <CategoryMenuBtn
          num={3}
          selected={selected}
          url={"/best"}
          text={"베스트"}
          onSelected={onSelected}
        />
        <CategoryMenuBtn
          num={4}
          selected={selected}
          url={"/contents"}
          text={"콘텐츠"}
          onSelected={onSelected}
        />
        <CategoryMenuBtn
          num={5}
          selected={selected}
          url={"/my"}
          text={"마이"}
          onSelected={onSelected}
        />
      </Inner>
    </Container>
  );
};
