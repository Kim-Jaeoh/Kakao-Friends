import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KakaoLogo from "../../assets/logo_foot_kakao.png";
import { IoCloseOutline } from "react-icons/io5";
import { AuthModal } from "./AuthModal";
import { BiMinus, BiPlus } from "react-icons/bi";
import { usePriceComma } from "../../hooks/usePriceComma";
import { useBasketToggle } from "../../hooks/useBasketToggle";
import { BsBag, BsBagFill } from "react-icons/bs";
import { usePayReady } from "../../hooks/usePayReady";
import { useModalScrollFixed } from "../../hooks/useModalScrollFixed";
import { LoginPopupModal } from "./LoginPopupModal";
import { useSelector } from "react-redux";

export const DetailProductModal = ({
  buttonModal,
  toggleButtonModal,
  products,
  setCount,
}) => {
  const [popupModal, setPopupModal] = useState(false);
  const { toggleIcon, currentBasket } = useBasketToggle(); //장바구니 커스텀 훅
  const currentUser = useSelector((state) => state.user.currentUser);

  const togglePopupModal = () => setPopupModal((prev) => !prev);

  const product = products[0];

  const modalFixed = useModalScrollFixed(buttonModal); // 모달 스크롤 픽스

  const { next_redirect_pc_url: payReadyURL } = usePayReady(products, "direct");
  const { PriceDeleteComma, PriceComma } = usePriceComma(product.price);

  // 제품 수량 변경
  const countValue = (type) => {
    if (type === "minus" && product.amount > 1) {
      setCount((product.amount -= 1));
    } else if (type === "plus" && product.amount < 99) {
      setCount((product.amount += 1));
    }
  };

  // 주문하기 새창
  const orderClick = () => {
    if (currentUser.email) {
      window.location.href = `${payReadyURL}`;
    } else {
      togglePopupModal();
    }
  };

  return (
    <>
      <Modal
        open={buttonModal}
        onClose={toggleButtonModal}
        disableScrollLock={true}
      >
        <Wrapper>
          <Container>
            <Box>
              <CountBox>
                <CountTextBox>
                  <strong>수량 선택</strong>
                  <ItemCounterBox>
                    <ItemCounter>
                      <QuanityButton
                        amount={product.amount}
                        type="button"
                        onClick={() => countValue("minus")}
                      >
                        <BiMinus />
                      </QuanityButton>
                      <input
                        type="number"
                        value={product.amount}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        min="1"
                        max="99"
                        onChange={(e) => setCount((prev) => (prev += 1))}
                        onWheel={(e) => e.target.blur()} // 마우스 휠 막기
                      />
                      <QuanityButton
                        amount={product.amount}
                        type="button"
                        onClick={() => countValue("plus")}
                      >
                        <BiPlus />
                      </QuanityButton>
                    </ItemCounter>
                  </ItemCounterBox>
                </CountTextBox>
              </CountBox>
              <PriceTextBox>
                <PriceTitle>총 제품금액</PriceTitle>
                <PriceText>
                  <span>
                    {PriceComma(
                      PriceDeleteComma(product.price) * product?.amount
                    )}
                  </span>
                  원
                </PriceText>
              </PriceTextBox>
              <BuyButtonBox>
                <BuyButton>
                  <BuyButtonText onClick={orderClick}>바로구매</BuyButtonText>
                  <BagButton
                    onClick={(e) => toggleIcon(product, product.amount)}
                  >
                    {currentBasket?.filter(
                      (obj) => obj.product === product.product
                    ).length > 0 ? (
                      <BsBagFill style={{ color: "#fff" }} />
                    ) : (
                      <BsBag />
                    )}
                  </BagButton>
                </BuyButton>
              </BuyButtonBox>
            </Box>
          </Container>
        </Wrapper>
      </Modal>
      {popupModal && !currentUser.email && (
        <LoginPopupModal
          popupModal={popupModal}
          setPopupModal={setPopupModal}
          togglePopupModal={togglePopupModal}
          type={"two modal"}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  /* height: 100vh;
  overflow-y: scroll;
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
  } */
`;

const Container = styled.div`
  display: flex;
  -webkit-box-pack: end;
  align-items: flex-end;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-width: 320px;
  margin: 0 auto;

  @media screen and (min-width: 640px) {
    width: 640px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 82vh;
  /* padding-top: 32px; */
  border-radius: 16px 16px 0 0;
  background-color: #fff;
  box-sizing: border-box;

  @media screen and (min-width: 1024px) {
    max-height: 87vh;
  }
`;

const CountBox = styled.div`
  min-height: 0;
  padding-bottom: 24px;
  overflow-y: auto;
  /* min-height: 283px; */
  padding: 32px 20px;
  box-sizing: border-box;
`;

const CountTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 36px;
  /* padding-right: 1px; */
  /* padding-bottom: 24px; */
  background: #fff;
  box-sizing: border-box;

  strong {
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
  }
`;

const ItemCounterBox = styled.div`
  /* margin-top: 10px; */
`;

const ItemCounter = styled.div`
  display: block;
  position: relative;
  width: 114px;
  padding: 0 28px;
  box-sizing: border-box;

  input,
  div {
    display: block;
    width: 58px;
    height: 36px;
    border: 1px solid #dedfe0;
    border-radius: 8px;
    line-height: 20px;
    background-color: #fff;
    box-sizing: border-box;
    outline: none;
    resize: none;
    box-shadow: none;
    letter-spacing: -0.035em;
    text-align: center;
    font-size: 14px;
    padding: 8px 15px;

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const QuanityButton = styled.button`
  position: absolute;
  top: 6px;
  border: 1px solid #dedfe0;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  :first-of-type {
    left: 0;
    svg {
      color: ${(props) => (props.amount > 1 ? "#3c404b" : "#dedfe0")};
    }
  }

  :last-of-type {
    right: 0;
    svg {
      color: ${(props) => (props.amount >= 1 ? "#3c404b" : "#dedfe0")};
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const PriceTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 66px;
  padding: 0 21px 0 20px;
  border-top: 1px solid #eff0f2;
  background: #fff;
  box-sizing: border-box;
`;

const PriceTitle = styled.span`
  font-size: 14px;
  line-height: 16px;
  color: #747475;
`;

const PriceText = styled.strong`
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  span {
    font-size: 20px;
    line-height: 24px;
  }
`;

const BuyButtonBox = styled.div`
  position: relative;
`;

const BuyButton = styled.button`
  display: block;
  width: 100%;
  height: 80px;
`;

const BuyButtonText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: #fb2e45;
  color: #fff;
`;

const BagButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
  height: 100%;
  display: flex;
  height: 100%;
  padding: 0 20px 0 15px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: #fff;

  svg {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px;
  }
`;
