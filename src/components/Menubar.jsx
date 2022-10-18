import React from "react";
import { Modal } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Global } from "@emotion/react";
import GlobalStyle from "../styles/GlobalStyle";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Wrapper = styled.div`
  z-index: 12002;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  position: fixed;
  inset: 0px;
  background: rgba(0, 0, 0, 0.4);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const Container = styled.div`
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 304px;
  padding-bottom: 25px;
  background-color: #fff;
  outline: none;

  font-size: 14px;
  line-height: 1.5;
  font-family: Inter, Spoqa Han Sans Neo, Apple SD Gothic Neo, Malgun Gothic,
    \b9d1\c740\ace0\b515, sans-serif;
  color: #000;
  letter-spacing: -0.015em;

  a {
    color: #000;
    text-decoration: none;
    font-weight: bold;
  }

  @media screen and (min-width: 640px) {
    width: 400px;
  }
`;

const UserInfoBox = styled.div`
  position: relative;
  overflow: hidden;
  padding: 32px 24px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserLogin = styled(Link)`
  float: left;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;

  em {
    text-decoration: underline;
  }
`;

const NotUserCheck = styled(Link)`
  float: right;
  height: 24px;
  line-height: 23px;

  span {
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
  }
`;

export const Menubar = ({ modalOpen, toggleModal }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <UserInfoBox>
          <UserLogin to="/">
            <em>로그인</em>이 필요해요!
          </UserLogin>
          <NotUserCheck to="/">
            비회원 주문조회
            <span>
              <IoIosArrowForward />
            </span>
          </NotUserCheck>
        </UserInfoBox>
      </Container>
    </Modal>
  );
};
