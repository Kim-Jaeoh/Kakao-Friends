import styled from "@emotion/styled";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import logo from "../image/logo_halloween.gif";

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

const Icon = styled.div`
  width: 24px;
  height: 24px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
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
  return (
    <Container>
      <Icon style={{ position: "absolute", left: "12px" }}>
        <AiOutlineMenu />
      </Icon>
      <Logo>
        <img alt="KAKAO FRIENDS" src={logo} />
      </Logo>
      <Icons>
        <Icon>
          <FiSearch />
        </Icon>
        <Icon>
          <TbWorld />
        </Icon>
      </Icons>
    </Container>
  );
};
