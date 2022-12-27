import { lazy, useEffect } from "react";
import styled from "@emotion/styled";
import { authService } from "./fbase";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { TopButton } from "./components/button/TopButton";
import ScrollToTop from "./hooks/useScrollToTop";
import { Suspense } from "react";
import { Spinner } from "./components/utils/Spinner";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
// const Main = lazy(() =>
//   import("./pages/Main").then((module) => ({ default: module.Main })) // export 함수 시
// );
const Main = lazy(
  () => import("./pages/Main") // export default 시
);
const MyPage = lazy(() => import("./pages/MyPage"));
const DetailProduct = lazy(() => import("./pages/DetailProduct"));
const Product = lazy(() => import("./pages/Product"));
const MyPagePayResult = lazy(() =>
  import("./components/myPage/MyPagePayResult")
);
const Search = lazy(() => import("./pages/Search"));
const Promotion = lazy(() => import("./pages/Promotion"));
const Login = lazy(() => import("./pages/Login"));

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
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ScrollToTop />
        <Container>
          <TopButton />
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/promotion/:id" element={<Promotion />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/product/*" element={<Product />} />
            <Route path="/detail/:id" element={<DetailProduct />} />
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="/mypage/payresult" element={<MyPagePayResult />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
          </Routes>
        </Container>
      </Suspense>
    </>
  );
}

export default App;
