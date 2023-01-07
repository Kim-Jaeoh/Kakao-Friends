import React, { lazy, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer } from "../components/utils/Footer";
import { LoginPopupModal } from "../components/modal/LoginPopupModal";
// import MyPageSeen from "../components/myPage/MyPageSeen";
// import MyPageBasket from "../components/myPage/MyPageBasket";
// import MyPageOrderList from "../components/myPage/MyPageOrderList";
const MyPageSeen = lazy(() => import("../components/myPage/MyPageSeen"));
const MyPageBasket = lazy(() => import("../components/myPage/MyPageBasket"));
const MyPageOrderList = lazy(() =>
  import("../components/myPage/MyPageOrderList")
);

const Container = styled.main`
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
  position: relative;

  span:first-of-type {
    line-height: 16px;
    color: ${(props) => (props.selected === props.num ? "#000" : "#909092")};
    font-weight: ${(props) => (props.selected === props.num ? 700 : "normal")};
  }
`;

const TabListNumber = styled.span`
  font-size: 12px;
  width: 18px;
  height: 18px;
  padding: 2px;
  margin-left: 5px;
  border-radius: 50%;
  color: #fff;
  background-color: #ff447f;
  white-space: nowrap;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPage = () => {
  const [selected, setSelected] = useState(2);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPopupModal, setLoginPopupModal] = useState(false);
  const { pathname } = useLocation();
  const currentBasket = useSelector((state) => state.user.basket);
  const currentUser = useSelector((state) => state.user.currentUser);
  const loginToken = useSelector((state) => state.user.loginToken);
  const toggleLoginPopupModal = () => setLoginPopupModal((prev) => !prev);

  useEffect(() => {
    if (pathname.includes("/seen")) {
      setSelected(1);
    } else if (pathname.includes("/basket")) {
      setSelected(2);
    } else if (pathname.includes("/orderlist")) {
      setSelected(3);
    }
  }, [pathname]);

  // 로그인 상태 확인
  useEffect(() => {
    if (loginToken === "logout") {
      setIsLoggedIn(false);
    } else if (loginToken === "login") {
      setIsLoggedIn(true);
    }
  }, [loginToken]);

  const click = () => {
    if (isLoggedIn === false) {
      setLoginPopupModal(true);
    }
  };

  return (
    <>
      <Container>
        <TabListBox>
          <TabList>
            <ListLink to="/mypage/seen" num={1} selected={selected}>
              <span>최근 본</span>
            </ListLink>
          </TabList>
          <TabList>
            <ListLink to="/mypage/basket" num={2} selected={selected}>
              <span>장바구니</span>
              {currentBasket.length !== 0 && (
                <TabListNumber>{currentBasket.length}</TabListNumber>
              )}
            </ListLink>
          </TabList>
          <TabList>
            <ListLink
              onClick={click}
              to={isLoggedIn && "/mypage/orderlist"}
              num={3}
              selected={selected}
            >
              <span>주문내역</span>
            </ListLink>
          </TabList>
        </TabListBox>

        <Routes>
          <Route path="/seen" element={<MyPageSeen />} />
          <Route path="/basket" element={<MyPageBasket />} />
          <Route
            path="/orderlist"
            element={<MyPageOrderList isLoggedIn={isLoggedIn} />}
          />
          <Route path="/*" element={<Navigate replace to="/mypage/basket" />} />
        </Routes>

        {!isLoggedIn && (
          <LoginPopupModal
            loginPopupModal={loginPopupModal}
            toggleLoginPopupModal={toggleLoginPopupModal}
          />
        )}
        {!pathname.includes("/basket") && <Footer />}
      </Container>
    </>
  );
};

export default MyPage;
