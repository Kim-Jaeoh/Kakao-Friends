import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import logo from "../image/logo_halloween.gif";
import GlobalStyle from "../styles/GlobalStyle";
import { Category } from "./Category";
import { Menubar } from "./Menubar";

const Container = styled.div`
  position: fixed;
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
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
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
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => console.log("머지");
  }, []);

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
            <IconBox>
              <FiSearch />
            </IconBox>
            <IconBox>
              <TbWorld />
            </IconBox>
          </Icons>
        </HeaderBox>

        <Category />
      </Container>

      <Menubar modalOpen={modalOpen} toggleModal={toggleModal} />
    </>
  );
};
