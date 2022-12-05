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
import { TopButton } from "./components/button/TopButton";
import { Search } from "./pages/Search";
import { useEffect, useState } from "react";
import { authService } from "./fbase";
import ScrollToTop from "./hooks/useScrollToTop";
import { DetailProduct } from "./pages/DetailProduct";
import Product from "./pages/Product";
import { Header } from "./components/header/Header";
import { MyPagePayResult } from "./components/myPage/MyPagePayResult";
import { Promotion } from "./pages/Promotion";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchResultItem } from "./components/search/SearchResultItem";

const Container = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #111111;
  letter-spacing: -0.015em;

  position: relative;
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px !important;
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

  const queryClient = new QueryClient();

  return (
    <>
      {init && (
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ScrollToTop />
            <Container>
              <TopButton />
              <Header />
              <Routes>
                <Route path="/" element={<Main userObj={userObj} />} />
                {/* <Route path="/event" element={<Event />} /> */}
                <Route path="/promotion/:id" element={<Promotion />} />
                <Route path="/search" element={<Search />}></Route>
                {/* <Route
                  path="/search/keyword/*"
                  element={<SearchResultItem />}
                /> */}
                <Route path="/product" element={<Product />} />
                <Route path="/detail/:id" element={<DetailProduct />} />
                <Route
                  path="/mypage/*"
                  element={<MyPage userObj={userObj} />}
                />
                <Route
                  path="/mypage/payresult/*"
                  element={<MyPagePayResult />}
                />
                <Route path="/*" element={<Navigate replace to="/" />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </QueryClientProvider>
      )}
    </>
  );
}

export default App;
