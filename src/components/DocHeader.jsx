import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Category } from "./header/Category";
import { Menubar } from "./modal/Menubar";

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

const Icon = styled.div`
  width: 24px;
  height: 24px;
  font-size: 24px;
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

const IconBox = styled.div`
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

export const DocHeader = ({ toggleSearch }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <Container>
        <HeaderBox>
          <Icon style={{ position: "absolute", left: "12px" }}>
            <IoIosArrowBack />
          </Icon>
          <Logo>검색</Logo>
          <IconBox>
            <Icon onClick={toggleSearch}>
              <TbWorld />
            </Icon>
          </IconBox>
        </HeaderBox>
      </Container>
    </>
  );
};
