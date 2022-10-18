import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import logo from "../image/logo_halloween.gif";
import GlobalStyle from "../styles/GlobalStyle";
import { Menubar } from "./Menubar";

const Container = styled.div`
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

  return (
    <>
      <Container>
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
      </Container>
      {modalOpen && <Menubar modalOpen={modalOpen} toggleModal={toggleModal} />}
    </>
  );
};
