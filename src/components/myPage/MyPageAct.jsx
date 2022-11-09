import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Header } from "../header/Header";
import { LoginPopupModal } from "../modal/LoginPopupModal";

const EmptyBasketBox = styled.div`
  padding: 30% 0;
  margin-bottom: -100px;
`;

const EmptyBasketCharacter = styled.span`
  display: block;
  width: 192px;
  height: 192px;
  margin: 0 auto 12px;

  img {
    display: block;
    width: 100%;
  }
`;

const EmptyText = styled.span`
  display: block;
  font-size: 16px;
  line-height: 24px;
  color: #aeaeaf;
  text-align: center;
  letter-spacing: -0.025em;
`;

export const MyPageAct = ({ isLoggedIn }) => {
  const [popupModal, setPopupModal] = useState(false);
  const togglePopupModal = () => setPopupModal((prev) => !prev);

  useEffect(() => {
    if (isLoggedIn === false) {
      setPopupModal(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <EmptyBasketBox>
          <EmptyBasketCharacter>
            <img
              src="https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221109/181135/assets/images/m960/img_ryan4.png"
              alt=""
            />
          </EmptyBasketCharacter>
          <EmptyText>아직 활동 내역이 없어요.</EmptyText>
        </EmptyBasketBox>
      ) : (
        <LoginPopupModal
          popupModal={popupModal}
          setPopupModal={setPopupModal}
          togglePopupModal={togglePopupModal}
        />
      )}
    </>
  );
};
