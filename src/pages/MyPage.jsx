import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Header } from "../components/header/Header";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { MyPageSeen } from "../components/myPage/MyPageSeen";
import { MyPageAct } from "../components/myPage/MyPageAct";
import MyPageBasket from "../components/myPage/MyPageBasket";
import { MyPageOrderList } from "../components/myPage/MyPageOrderList";
import { doc, onSnapshot } from "firebase/firestore";
import { dbService } from "../fbase";
import { useSelector } from "react-redux";
import { Footer } from "../components/utils/Footer";
import { LoginPopupModal } from "../components/modal/LoginPopupModal";

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
  font-size: 11px;
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

export const MyPage = ({ userObj }) => {
  const [selected, setSelected] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();
  const currentBasket = useSelector((state) => state.user.basket);
  const loginToken = useSelector((state) => state.user.loginToken);

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

  const [popupModal, setPopupModal] = useState(false);
  const togglePopupModal = () => setPopupModal((prev) => !prev);

  useEffect(() => {
    if (loginToken === "logout") {
      setIsLoggedIn(false);
    } else if (loginToken === "login") {
      setIsLoggedIn(true);
    }
  }, [loginToken]);

  const click = () => {
    if (isLoggedIn === false) {
      setPopupModal(true);
    }
  };

  return (
    <>
      <Container>
        {/* <Header /> */}
        <TabListBox>
          <TabList>
            <ListLink to="/mypage/seen" num={1} selected={selected}>
              <span>최근 본</span>
            </ListLink>
          </TabList>
          {/* <TabList>
            <ListLink
              onClick={click}
              to={isLoggedIn && "/mypage/act"}
              num={2}
              selected={selected}
            >
              <span>내 활동</span>
            </ListLink>
          </TabList> */}
          <TabList>
            <ListLink to="/mypage/basket" num={3} selected={selected}>
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
              num={4}
              selected={selected}
            >
              <span>주문내역</span>
            </ListLink>
          </TabList>
        </TabListBox>

        <Routes>
          <Route path="/seen" element={<MyPageSeen />} />
          <Route path="/act" element={<MyPageAct isLoggedIn={isLoggedIn} />} />
          <Route path="/basket" element={<MyPageBasket userObj={userObj} />} />
          <Route path="/orderlist" element={<MyPageOrderList />} />
        </Routes>

        {!isLoggedIn && (
          <LoginPopupModal
            popupModal={popupModal}
            setPopupModal={setPopupModal}
            togglePopupModal={togglePopupModal}
          />
        )}
        {!pathname.includes("/basket") && <Footer />}
      </Container>
    </>
  );
};
