import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KakaoLogo from "../../assets/logo_foot_kakao.png";
import { IoCloseOutline } from "react-icons/io5";
import { AuthModal } from "./AuthModal";

const Wrapper = styled.div`
  overflow-y: scroll;
  -ms-overflow-style: none; // 인터넷 익스플로러
  scrollbar-width: none; // 파이어폭스

  ::-webkit-scrollbar {
    display: none;
  }

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
  }
`;

const Container = styled.div`
  position: absolute;
  padding-top: 14px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 310px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  text-align: center;
`;

const ImageBox = styled.div`
  padding: 26px 24px 0;
  display: block;
  width: 128px;
  height: 128px;
  margin: 0 auto;
  /* width: 70px;
  height: 30px;
  margin: 0 auto;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 24px; */
`;

const Image = styled.img`
  display: block;
  width: 100%;
`;

const ListDelete = styled.button`
  position: absolute;
  z-index: 10;
  padding: 9px;
  top: 0px;
  right: 0px;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #bdbdbd;
  }
`;

const Title = styled.strong`
  display: block;
  margin-top: 8px;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.015em;
  text-align: center;
  font-weight: bold;
`;

const SubTitleBox = styled.div`
  padding: 8px 20px 16px;
  text-align: center;

  span {
    font-size: 15px;
    line-height: 22px;
    color: #000;
    letter-spacing: -0.015em;
  }
`;

const LoginButtonBox = styled.div`
  margin: 0;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 48px;
  border-radius: 35px;
  font-size: 15px;
  line-height: 50px;
  color: #3c1e1e;
  border: 0 none;
  background: #ffeb00;
  font-weight: 600;
`;

const LoginButtonLogo = styled.div`
  width: 19px;
  height: 19px;
  margin: 1px 3px 0 0;

  img {
    display: block;
    width: 100%;
  }
`;

export const LoginPopupModal = ({
  popupModal,
  setPopupModal,
  togglePopupModal,
}) => {
  const [signModal, setSignModal] = useState(false);
  const toggleSignModal = () => setSignModal((prev) => !prev);

  return (
    <>
      <Modal open={popupModal} onClose={togglePopupModal}>
        <Wrapper>
          <Container>
            <ListDelete onClick={togglePopupModal}>
              <IoCloseOutline />
            </ListDelete>
            <ImageBox>
              <Image
                src="https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221109/181135/assets/images/m960/img_apeach.png"
                alt="kakao"
              />
            </ImageBox>
            <Title>앗! 로그인</Title>
            <SubTitleBox>
              <span>앗! 깜빡, 로그인하고 이용하기❤️️</span>
            </SubTitleBox>
            <LoginButtonBox>
              <LoginButton onClick={toggleSignModal}>
                <LoginButtonLogo>
                  <img
                    src="https://www.nicepng.com/png/full/388-3888984_open-png.png"
                    alt=""
                  />
                </LoginButtonLogo>
                로그인하기
              </LoginButton>
            </LoginButtonBox>
          </Container>
        </Wrapper>
      </Modal>
      {signModal && (
        <AuthModal
          signModal={signModal}
          toggleSignModal={toggleSignModal}
          toggleModal={toggleSignModal}
        />
      )}
    </>
  );
};