import React, { useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "@mui/material";
import { BiMinus, BiPlus } from "react-icons/bi";
import { usePriceComma } from "../../hooks/usePriceComma";
import { useBasketToggle } from "../../hooks/useBasketToggle";
import { BsBag, BsBagFill } from "react-icons/bs";
import { usePayReady } from "../../hooks/usePayReady";
import { useModalScrollFixed } from "../../hooks/useModalScrollFixed";
import { LoginPopupModal } from "./LoginPopupModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const DetailProductModal = ({
  buttonModal,
  toggleButtonModal,
  products,
  setCount,
}) => {
  const [loginPopupModal, setLoginPopupModal] = useState(false);
  const [productPrice, setProductPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentLoginToken = useSelector((state) => state.user.loginToken);
  const currentTotalPrice = useSelector((state) => state.user.totalPrice);

  const product = products[0];
  const toggleLoginPopupModal = () => setLoginPopupModal((prev) => !prev);

  const { toggleIcon, currentBasket } = useBasketToggle(); //장바구니 커스텀 훅
  const modalFixed = useModalScrollFixed(buttonModal); // 모달 스크롤 픽스
  const { next_redirect_pc_url: payReadyURL } = usePayReady(
    products,
    totalPrice,
    "direct"
  ); // 카카오페이 구매 로직 커스텀 훅
  const { PriceDeleteComma, PriceComma } = usePriceComma(product.price); // 금액 comma

  useEffect(() => {
    setProductPrice(PriceDeleteComma(product.price) * product?.quanity);
  }, [product.price, product?.quanity]);

  // 전체 가격
  useEffect(() => {
    if (productPrice === 0) {
      setTotalPrice("3000");
    } else {
      setTotalPrice(productPrice >= 30000 ? productPrice : productPrice + 3000);
    }
  }, [productPrice]);

  // 제품 수량 변경
  const countValue = (type) => {
    if (type === "minus" && product.quanity > 1) {
      setCount((product.quanity -= 1));
    } else if (type === "plus" && product.quanity < 99) {
      setCount((product.quanity += 1));
    }
  };

  // // 수량 키보드 변경
  // const onChange = useCallback(
  //   (e) => {
  //     const productCount = (product.quanity = e.target.value);
  //     if (isFocus) {
  //       setCount(productCount.replace(/(^0+)/, "1"));
  //     }
  //     // if (isFocus === true) {
  //     // }
  //   },
  //   [isFocus, product, setCount]
  // );

  // 주문하기 새창
  const orderClick = () => {
    if (currentLoginToken === "login") {
      window.location.href = `${payReadyURL}`;
    } else {
      toggleLoginPopupModal();
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
                        quanity={product.quanity}
                        type="button"
                        onClick={() => countValue("minus")}
                      >
                        <BiMinus />
                      </QuanityButton>
                      <ItemQuanityNumber>{product.quanity}</ItemQuanityNumber>
                      {/* <input
                        type="number"
                        value={product.quanity}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        min="1"
                        max="99"
                        // onInput={(e) =>
                        //   e.target.value.replace(
                        //     (/[^0-9.]/g, "").replace(/(\..*)\./g, "$1" | /(^0+)/, "")
                        //   )
                        // }
                        // onChange={onChange}
                        onWheel={(e) => e.target.blur()} // 마우스 휠 막기
                      /> */}
                      <QuanityButton
                        quanity={product.quanity}
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
                <PriceTitle>상품 금액</PriceTitle>
                <PriceText>{PriceComma(productPrice)}원</PriceText>
              </PriceTextBox>
              <PriceTextBox>
                <PriceTitle>배송비</PriceTitle>
                <PriceText>
                  {productPrice >= 30000 ? "무료" : "3,000원"}
                </PriceText>
              </PriceTextBox>
              <PriceTextBox>
                <PriceTitle>총 결제금액</PriceTitle>
                <PriceText>{PriceComma(totalPrice)}원</PriceText>
              </PriceTextBox>
              <BuyButtonBox>
                <BuyButton>
                  <BuyButtonText onClick={orderClick}>바로구매</BuyButtonText>
                  <BagButton
                    onClick={(e) => toggleIcon(product, product.quanity)}
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
      {loginPopupModal && (
        <LoginPopupModal
          loginPopupModal={loginPopupModal}
          toggleLoginPopupModal={toggleLoginPopupModal}
          type={"two modal"}
        />
      )}
    </>
  );
};

const Wrapper = styled.div``;

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
  padding: 32px 20px;
  box-sizing: border-box;
`;

const CountTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 36px;
  background: #fff;
  box-sizing: border-box;

  strong {
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
  }
`;

const ItemCounterBox = styled.div``;

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

const ItemQuanityNumber = styled.div`
  cursor: default;
  user-select: none;
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
      color: ${(props) => (props.quanity > 1 ? "#3c404b" : "#dedfe0")};
    }
    cursor: ${(props) => (props.quanity > 1 ? "pointer" : "default")};
  }

  :last-of-type {
    right: 0;
    svg {
      color: ${(props) => (props.quanity >= 1 ? "#3c404b" : "#dedfe0")};
    }
    cursor: ${(props) => (props.quanity < 99 ? "pointer" : "default")};
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

  &:nth-of-type(4) {
    span {
      font-size: 20px;
      color: #000;
      font-weight: bold;
    }
    strong {
      font-size: 22px;
      line-height: 24px;
      font-weight: bold;
    }
  }
`;

const PriceTitle = styled.span`
  font-size: 14px;
  line-height: 16px;
  color: #747475;
`;

const PriceText = styled.strong`
  font-size: 16px;
  line-height: 22px;

  /* span {
    font-size: 20px;
    line-height: 24px;
  } */
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
