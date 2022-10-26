import styled from "@emotion/styled";
import React, { Suspense, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_halloween.gif";
import { Category } from "./Category";
import { Search } from "../../pages/Search";
import { Menubar } from "../modal/Menubar";
import { Reset } from "styled-reset";
import { useQuery } from "react-query";
import { CategoryListApi, MenuCharacterListApi } from "../../apis/dataApi";
import { AuthModal } from "../modal/AuthModal";
import { useSelector } from "react-redux";

const Container = styled.div`
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
  /* justify-content: space-between; */
  align-items: center;
  height: 46px;
  /* padding: 0 80px; */
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

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Icons = styled.div`
  display: flex;
  position: absolute;
  right: 12px;
`;

const Logo = styled.div`
  display: block;
  width: 167px;
  height: 46px;
  margin: 0 auto;

  img {
    display: block;
    width: 100%;
  }
`;

export const Header = () => {
  const [menuModal, setMemuModal] = useState(false);
  // const [searchModal, setSearchModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleModal = () => {
    setMemuModal((prev) => !prev);
  };

  const loginToken = useSelector((state) => state.user.loginToken);

  useEffect(() => {
    if (loginToken === "logout") {
      setIsLoggedIn(false);
    } else if (loginToken === "login") {
      setIsLoggedIn(true);
    }
  }, [loginToken]);

  return (
    <>
      <Container>
        <HeaderBox>
          <IconBox
            style={{ position: "absolute", left: "12px" }}
            onClick={toggleModal}
          >
            <AiOutlineMenu />
          </IconBox>
          <Logo>
            <img alt="KAKAO FRIENDS" src={logo} />
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
  );
};
