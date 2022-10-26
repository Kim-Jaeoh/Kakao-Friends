import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Header } from "../components/header/Header";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { MyPageSeen } from "../components/myPage/MyPageSeen";
import { MyPageAct } from "../components/myPage/MyPageAct";
import { MyPageBasket } from "../components/myPage/MyPageBasket";
import { MyPageOrderList } from "../components/myPage/MyPageOrderList";

const Container = styled.div`
  position: relative;
`;

const TabListBox = styled.ul`
  display: flex;
  padding: 0 5px;
  box-sizing: border-box;
  position: sticky;
  top: 90px;
  left: 0;
  right: 0;
  z-index: 20;
  margin: 0 auto;
  background-color: #f9f9fa;
  max-width: 640px;
  min-width: 320px;

  @media screen and (min-width: 640px) {
    width: 640px;
  }
`;

const TabList = styled.li`
  flex: 1 auto;
`;

const ListLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 44px;
  padding: 13px 0;
  box-sizing: border-box;

  span {
    position: relative;
    line-height: 16px;
    color: ${(props) => (props.selected === props.num ? "#000" : "#909092")};
    font-weight: ${(props) => (props.selected === props.num ? 700 : "normal")};
  }
`;

console.log("test");

export const MyPage = () => {
  const [selected, setSelected] = useState(3);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("/seen")) {
      setSelected(1);
    } else if (pathname.includes("/act")) {
      setSelected(2);
    } else if (pathname.includes("/basket")) {
      setSelected(3);
    } else if (pathname.includes("/orderlist")) {
      setSelected(4);
    }
  }, [pathname]);

  return (
    <>
      <Container>
        <Header />
        <TabListBox>
          <TabList>
            <ListLink to="/mypage/seen" num={1} selected={selected}>
              <span>최근 본</span>
            </ListLink>
          </TabList>
          <TabList>
            <ListLink to="/mypage/act" num={2} selected={selected}>
              <span>내 활동</span>
            </ListLink>
          </TabList>
          <TabList>
            <ListLink to="/mypage/basket" num={3} selected={selected}>
              <span>장바구니</span>
            </ListLink>
          </TabList>
          <TabList>
            <ListLink to="/mypage/orderlist" num={4} selected={selected}>
              <span>주문내역</span>
            </ListLink>
          </TabList>
        </TabListBox>

        <Routes>
          <Route path="/seen" element={<MyPageSeen />} />
          <Route path="/act" element={<MyPageAct />} />
          <Route path="/basket" element={<MyPageBasket />} />
          <Route path="/orderlist" element={<MyPageOrderList />} />
        </Routes>
      </Container>
    </>
  );
};
