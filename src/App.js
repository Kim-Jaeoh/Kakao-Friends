import styled from "@emotion/styled";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Main } from "./pages/Main";
import { Event } from "./pages/Event";
import { Contents } from "./pages/Contents";
import { MyPage } from "./pages/MyPage";
import { Footer } from "./components/utils/Footer";
import { TopButton } from "./components/button/TopButton";
import { Search } from "./pages/Search";
import { useEffect, useState } from "react";
import { authService } from "./fbase";
import ScrollToTop from "./hooks/useScrollToTop";
import { DetailProduct } from "./pages/DetailProduct";
import Product from "./pages/Product";
import { Header } from "./components/header/Header";
import { MyPagePayReady } from "./components/myPage/MyPagePayReady";
import { MyPagePayResult } from "./components/myPage/MyPagePayResult";
import { Promotion } from "./pages/Promotion";

const Container = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #111111;
  letter-spacing: -0.015em;

  position: relative;
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  min-height: 100vh;
  background-color: #fff;
  box-sizing: border-box;

  a {
    color: #111111;
    text-decoration: none;
  }
`;

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // 유저 상태 변화 추적(로그인, 로그아웃, 어플리케이션 초기화 시)
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true); // 어플리케이션이 언제 시작해도 onAuthStateChanged가 실행돼야 하기 때문에 true
    });
  }, []);

  return (
    <>
      {/* {init && ( */}
      <BrowserRouter>
        <ScrollToTop />
        <Container>
          <TopButton />
          <Header />
          <Routes>
            <Route path="/" element={<Main userObj={userObj} />} />
            {/* <Route path="/event" element={<Event />} /> */}
            <Route path="/promotion/*" element={<Promotion />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product" element={<Product />} />
            <Route path="/detail/:id" element={<DetailProduct />} />
            <Route path="/mypage/*" element={<MyPage userObj={userObj} />} />
            <Route path="/mypage/payready/*" element={<MyPagePayReady />} />
            <Route path="/mypage/payresult/*" element={<MyPagePayResult />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
          </Routes>
        </Container>
      </BrowserRouter>
      {/* // )} */}
    </>
  );
}

export default App;
