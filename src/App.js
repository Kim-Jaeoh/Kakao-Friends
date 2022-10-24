import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import { Header } from "./components/header/Header";
import { Main } from "./pages/Main";
import { Event } from "./pages/Event";
import { Best } from "./pages/Best";
import { Contents } from "./pages/Contents";
import { My } from "./pages/My";
import { Footer } from "./components/Footer";
import { TopButton } from "./components/button/TopButton";

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
  return (
    <>
      <BrowserRouter>
        {/* <Reset /> */}
        {/* <Global styles={GlobalStyle} /> */}
        <Container>
          <TopButton />
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/event" element={<Event />} />
            <Route path="/best" element={<Best />} />
            <Route path="/contents" element={<Contents />} />
            <Route path="/my" element={<My />} />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
