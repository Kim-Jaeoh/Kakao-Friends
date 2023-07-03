import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/main_logo.gif";
import { Category } from "./Category";
import { Menubar } from "../modal/Menubar";
import { useSelector } from "react-redux";

export const Header = () => {
  const { pathname } = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [menuModal, setMemuModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginToken = useSelector((state) => state.user.loginToken);

  const toggleModal = () => {
    setMemuModal((prev) => !prev);
  };

  useEffect(() => {
    if (loginToken === "logout") {
      setIsLoggedIn(false);
    } else if (loginToken === "login") {
      setIsLoggedIn(true);
    }
  }, [loginToken]);

  // 이벤트, 상세 페이지에서는 헤더 안 보이게
  useEffect(() => {
    if (
      pathname.includes("detail") ||
      pathname.includes("search") ||
      pathname.includes("event") ||
      pathname.includes("promotion") ||
      pathname.includes("login")
    ) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [pathname]);

  return (
    <>
      {showHeader && (
        <>
          <Container>
            <HeaderBox>
              <IconBox
                style={{ position: "absolute", left: "12px" }}
                onClick={toggleModal}
              >
                <AiOutlineMenu />
              </IconBox>
              <Logo to="/">
                <img alt="KAKAO FRIENDS" src={logo} loading="lazy" />
              </Logo>
              <Icons>
                <Link to="/search">
                  <IconBox>
                    <FiSearch />
                  </IconBox>
                </Link>
                <IconBox>
                  <TbWorld />
                </IconBox>
              </Icons>
            </HeaderBox>
            <Category />
          </Container>

          <Menubar
            menuModal={menuModal}
            toggleModal={toggleModal}
            isLoggedIn={isLoggedIn}
          />
        </>
      )}
    </>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin: 0 auto;
  background-color: #fff;
  max-width: 640px;
  min-width: 320px;

  @media screen and (min-width: 640px) {
    width: 640px;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const IconBox = styled.div`
  width: 24px;
  height: 24px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Icons = styled.div`
  display: flex;
  position: absolute;
  right: 12px;

  > div {
    cursor: default;
  }
`;

const Logo = styled(Link)`
  display: block;
  width: 167px;
  height: 46px;
  margin: 0 auto;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }
`;
