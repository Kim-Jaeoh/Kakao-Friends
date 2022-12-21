import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { BiMinus, BiPlus } from "react-icons/bi";
import { IoCheckmarkCircleSharp, IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckItem,
  Decrement,
  Increment,
  InputChange,
  setBasket,
  setCartPrice,
  UnCheckItem,
} from "../../reducer/user";
import { useBasketToggle } from "../../hooks/useBasketToggle";
import { NotInfo } from "../utils/NotInfo";
import { usePriceComma } from "../../hooks/usePriceComma";
import { ProductRecommend } from "../utils/ProductRecommend";
import { usePayReady } from "../../hooks/usePayReady";
import { LoginPopupModal } from "../modal/LoginPopupModal";
import useInfinityScroll from "../../hooks/useInfinityScroll";

const Container = styled.div`
  padding-bottom: 80px;
  @media screen and (min-width: 375px) {
    padding-bottom: 80px;
  }
`;

const EmptyBasketBox = styled.div`
  padding: 30% 0;
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

const BestItemViewBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 36px;
  margin: 24px auto 0;
  padding-bottom: 2px;
  background-color: #3c404b;
  border-radius: 8px;
  color: #fff !important;
  cursor: pointer;
`;

const BasketBox = styled.div``;

const BasketList = styled.div``;

const DeliveryInfoBox = styled.div`
  position: relative;
  margin-top: 26px;
  padding: 0 20px;
  white-space: nowrap;
`;

const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeliveryFreeTextBox = styled.strong`
  display: block;
  max-width: 172px;
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;

  span {
    color: #ff447f;
    font-size: 15px;
    line-height: 20px;
  }
`;

const DeliveryPriceSave = styled(Link)`
  font-size: 14px;
  line-height: 16px;
  white-space: nowrap;
  letter-spacing: -0.025em;
  display: flex;
  align-items: center;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const DeliveryPriceGaugebox = styled.div`
  position: relative;
  height: 6px;
  margin: 10px 0;
  border-radius: 3px;
  background-color: #eff0f2;
`;

const DeliveryPriceGaugeBar = styled.div`
  /* overflow: hidden; */
  width: ${(props) => props.totalProgress + "%"};
  max-width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 3px;
  background-color: #ff447f;
  transition: width 0.25s cubic-bezier(0, 0, 0.2, 1);
`;

const DeliveryPriceGaugeCircleBox = styled.div`
  position: absolute;
  right: 0;
  top: 3px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border: 5px solid transparent;
  transform: translate(50%, -50%);
  box-sizing: border-box;
`;

const DeliveryPriceGaugeCircle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);

  div {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 50%;
    transform: translate3d(0px, 0px, 0px);
    content-visibility: visible;
    position: relative;

    ::before {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 4px solid #ff447f;
      box-sizing: border-box;
      animation: fade 1s infinite;
    }

    @keyframes fade {
      0% {
        opacity: 0.3;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.2;
      }
    }
  }
`;

const CheckBox = styled.div`
  position: relative;
  padding: 16px 20px;
  border-bottom: 4px solid #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Check = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-weight: bold;
`;

const CheckIcon = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  cursor: pointer;

  svg {
    color: ${(props) => (props.check ? "#3c404b" : "#d8d9df")};
    width: 24px;
    height: 24px;
  }
`;

const SelectDelete = styled.button`
  position: absolute;
  right: 20px;
  top: 18px;
  line-height: 16px;
  color: #747475;
`;

const ListCart = styled.ul``;

const List = styled.li`
  position: relative;
  padding-bottom: 18px;
  margin: 20px 20px 0;
  min-height: 120px;
  border-bottom: 1px solid #eff0f2;
  box-sizing: border-box;

  @media screen and (min-width: 640px) {
    position: relative;
    padding-bottom: 20px;
  }
`;

const ListContents = styled.div`
  overflow: hidden;
  /* position: relative; */
  padding-left: 29px;
`;

const ListCheckIcon = styled.label`
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;

  svg {
    color: ${(props) => (props.check ? "#3c404b" : "#d8d9df")};
    width: 24px;
    height: 24px;
  }
`;

const CheckInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  border: 0;
  background: none;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  opacity: 0;
  cursor: pointer;
`;

const ListImageBox = styled(Link)`
  float: left;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 6px;

  ::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.02);
    content: "";
  }
`;

const ListImage = styled.div`
  display: block;
  overflow: hidden;
  border-radius: 6px;

  img {
    display: block;
    width: 100%;
  }
`;

const ListInfoBox = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
  padding: 0 28px 0 12px;
  box-sizing: border-box;
`;

const ListTitle = styled(Link)`
  display: block;
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 4px;
  font-size: 15px;
  line-height: 20px;
  max-height: 40px;
  letter-spacing: -0.02em;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const ListPriceBox = styled.div``;

const ListPrice = styled.strong`
  display: inline-block;
  height: 24px;
  font-size: 15px;
  line-height: 24px;
  vertical-align: top;
  font-weight: bold;

  span {
    font-size: 16px;
  }
`;

const ItemCounterBox = styled.div`
  margin-top: 10px;
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
  }

  :last-of-type {
    right: 0;
    svg {
      color: ${(props) => (props.quanity >= 1 ? "#3c404b" : "#dedfe0")};
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ListDelete = styled.button`
  position: absolute;
  z-index: 10;
  top: -3px;
  right: -7px;
  width: 30px;
  height: 30px;

  svg {
    font-size: 24px;
    color: #bdbdbd;
  }
`;

const BasketBillBox = styled.div`
  font-style: normal;
  font-weight: 400;
`;

const BasketListTotalPrice = styled.ul`
  position: relative;
  z-index: 1;
  padding: 28px 20px 0;
  border-top: 1px solid #eff0f2;
`;

const BasketListPrice = styled.li`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 15px;
  line-height: 20px;

  strong {
    font-weight: bold;
  }
`;

const DescCart = styled.p`
  margin-top: 31px;
  padding: 0 20px 16px;
  font-size: 13px;
  line-height: 18px;
  color: #aeaeaf;
  letter-spacing: -0.035em;
`;

const BasketBottomButton = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 90;
  width: 100%;

  @media screen and (min-width: 640px) {
    width: 640px;
    left: 50%;
    margin-left: -320px;
  }
`;

const OrderButton = styled.button`
  display: block;
  width: 100%;
  height: 80px;
  color: #fff;
  background-color: ${(props) => (props.noChecked ? "#d4d7e1" : "#fb2e45")};
  cursor: ${(props) => (props.noChecked ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-lines: multiple;
  flex-wrap: wrap;
  padding: 0 20px;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.014em;

  a {
    color: #fff;
  }
`;

const MyPageBasket = () => {
  const [CheckBasketList, setCheckBasketList] = useState(0);
  const [totalPrice, setTotalPrice] = useState("");
  const [totalProgress, setTotalProgress] = useState(0);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentPrice = useSelector((state) => state.user.cartPrice);

  const [popupModal, setPopupModal] = useState(false); // 구매 팝업 상태 값
  const togglePopupModal = () => setPopupModal((prev) => !prev); // 구매 팝업

  const { currentBasket } = useBasketToggle(); //장바구니 커스텀 훅
  const { PriceReComma, PriceDeleteComma, PriceComma } = usePriceComma(); // 금액 콤마 커스텀 훅

  const { next_redirect_pc_url: payReadyURL } = usePayReady(
    currentBasket,
    "basket"
  ); // 카카오페이 구매 커스텀 훅

  // 상품 가격
  useEffect(() => {
    // 체크된 것들만 계산
    const checkItem = currentBasket.filter((item) => item.check);

    if (checkItem.length !== 0) {
      dispatch(
        setCartPrice(
          checkItem
            ?.map((item) => PriceDeleteComma(item.price) * item.quanity)
            ?.reduce((l, r) => l + r)
        )
      );
    } else {
      dispatch(setCartPrice(0));
    }
  }, [PriceDeleteComma, currentBasket, dispatch]);

  // 전체 가격
  useEffect(() => {
    if (currentPrice === 0) {
      setTotalPrice("3,000");
    } else {
      setTotalPrice(
        PriceComma(currentPrice >= 30000 ? currentPrice : currentPrice + 3000)
      );
    }
  }, [PriceComma, currentPrice]);

  // 배송 금액 바
  useEffect(() => {
    setTotalProgress(Math.round((currentPrice / 30000) * 100));
  }, [currentPrice, totalProgress]);

  // 페이지 이탈 시 전체 체크 활성화
  useEffect(() => {
    return () => {
      currentBasket.map((obj) => dispatch(CheckItem(obj)));
    };
  }, []);

  // 체크된 목록 숫자
  useEffect(() => {
    setCheckBasketList(currentBasket.filter((item) => item.check).length);
  }, [currentBasket]);

  // 장바구니 개별 삭제
  const BasketDeleteItem = (itemId) => {
    const filter = currentBasket?.filter((item) => item.product !== itemId);
    dispatch(setBasket(filter));
  };

  // 선택 삭제
  const selectDelete = () => {
    const filter = currentBasket?.filter((item) => item.check === false);
    dispatch(setBasket(filter));
  };

  // // 수량 키보드 변경
  // const onChange = useCallback(
  //   (list, value) => {
  //     if (isFocus === true) {
  //       dispatch(InputChange(list, +value));
  //     }
  //   },
  //   [dispatch, isFocus]
  // );

  // 전체 선택
  const checkAllHandler = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      currentBasket.map((obj) => {
        return dispatch(CheckItem(obj));
      });
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      currentBasket.map((obj) => {
        return dispatch(UnCheckItem(obj));
      });
    }
  };

  // 개별 선택
  const checkHandler = (check, itemId) => {
    if (check) {
      dispatch(CheckItem(itemId));
    } else {
      dispatch(UnCheckItem(itemId));
    }
  };

  // 주문하기 새창
  const orderClick = () => {
    if (currentUser.email) {
      if (currentBasket.find((item) => item.check === true)) {
        window.location.href = `${payReadyURL}`;
      }
    } else {
      togglePopupModal();
    }
  };

  return (
    <>
      <Container>
        {currentBasket?.length === 0 ? (
          <NotInfo
            url={
              "https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221026/104605/assets/images/m960/ico_cart_empty.png"
            }
            text={"아직 관심 상품이 없네요!"}
            text2={"귀여운 프렌즈 상품을 추천드릴게요"}
            btn={true}
          />
        ) : (
          <BasketBox>
            <BasketList>
              <DeliveryInfoBox>
                {currentPrice && totalPrice && (
                  <>
                    <DeliveryInfo>
                      <DeliveryFreeTextBox>
                        {currentPrice >= 30000 ? (
                          <span>무료 배송</span>
                        ) : (
                          <>
                            <span>
                              {PriceComma(33000 - PriceDeleteComma(totalPrice))}
                            </span>
                            원 추가 시 무료 배송
                          </>
                        )}
                      </DeliveryFreeTextBox>
                      {!currentPrice >= 30000 && (
                        <DeliveryPriceSave to="/product/realtime">
                          배송비 절약하기
                          <span>
                            <IoIosArrowForward />
                          </span>
                        </DeliveryPriceSave>
                      )}
                    </DeliveryInfo>
                    <DeliveryPriceGaugebox>
                      <DeliveryPriceGaugeBar totalProgress={totalProgress}>
                        <DeliveryPriceGaugeCircleBox>
                          <DeliveryPriceGaugeCircle>
                            <div />
                          </DeliveryPriceGaugeCircle>
                        </DeliveryPriceGaugeCircleBox>
                      </DeliveryPriceGaugeBar>
                    </DeliveryPriceGaugebox>
                  </>
                )}
              </DeliveryInfoBox>
              <CheckBox>
                <Check>
                  <CheckIcon
                    htmlFor="AllcheckBox"
                    name="AllcheckBox"
                    check={
                      CheckBasketList === currentBasket.length ? true : false
                    }
                  >
                    <CheckInput
                      id="AllcheckBox"
                      type="checkBox"
                      checked={
                        CheckBasketList === currentBasket.length ? true : false
                      }
                      onChange={(e) => {
                        checkAllHandler(e.target.checked);
                      }}
                    />
                    <IoCheckmarkCircleSharp />
                  </CheckIcon>
                  전체 {CheckBasketList}
                </Check>
                <SelectDelete type="button" onClick={selectDelete}>
                  선택 삭제
                </SelectDelete>
              </CheckBox>
              <ListCart>
                {currentBasket?.map((list, index) => {
                  return (
                    <List key={list.product}>
                      <ListContents>
                        <ListCheckIcon
                          htmlFor={`checkItem-${list.product}`}
                          name={`select-${list.product}`}
                          check={list.check}
                        >
                          <CheckInput
                            id={`checkItem-${list.product}`}
                            name={`select-${list.product}`}
                            type="checkbox"
                            checked={list.check === true ? true : false}
                            onChange={(e) => {
                              checkHandler(e.target.checked, list);
                            }}
                          />
                          <IoCheckmarkCircleSharp />
                        </ListCheckIcon>
                        <ListImageBox to={`/detail/${list.product}`}>
                          <ListImage>
                            <img src={list.image} alt={list.title} />
                          </ListImage>
                        </ListImageBox>
                        <ListInfoBox>
                          <ListTitle to={`/detail/${list.product}`}>
                            {list.title}
                          </ListTitle>
                          <ListPriceBox>
                            <ListPrice>
                              <span>{PriceReComma(list.price)}</span>원
                            </ListPrice>
                          </ListPriceBox>
                          <ItemCounterBox>
                            <ItemCounter>
                              <QuanityButton
                                quanity={list.quanity}
                                type="button"
                                onClick={(e) => dispatch(Decrement(list))}
                              >
                                <BiMinus />
                              </QuanityButton>
                              <ItemQuanityNumber>
                                {list.quanity}
                              </ItemQuanityNumber>
                              {/* <input
                                type="number"
                                value={list.quanity}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                min="1"
                                max="99"
                                onChange={(e) => onChange(list, e.target.value)}
                                onWheel={(e) => e.target.blur()} // 마우스 휠 막기
                              /> */}
                              <QuanityButton
                                quanity={list.quanity}
                                type="button"
                                onClick={(e) => dispatch(Increment(list))}
                              >
                                <BiPlus />
                              </QuanityButton>
                            </ItemCounter>
                          </ItemCounterBox>
                        </ListInfoBox>
                        <ListDelete
                          onClick={() => BasketDeleteItem(list.product)}
                        >
                          <IoCloseOutline />
                        </ListDelete>
                      </ListContents>
                    </List>
                  );
                })}
              </ListCart>
            </BasketList>
            <BasketBillBox>
              <BasketListTotalPrice>
                <BasketListPrice>
                  <span>상품 금액</span>
                  <span>{PriceComma(currentPrice)}원</span>
                </BasketListPrice>
                <BasketListPrice>
                  <span>배송비</span>
                  <span>{currentPrice >= 30000 ? "무료" : "3,000원"}</span>
                </BasketListPrice>
                <BasketListPrice>
                  <strong>총 결제금액</strong>
                  <strong>{totalPrice}원</strong>
                </BasketListPrice>
              </BasketListTotalPrice>
              <DescCart>장바구니 상품은 최대 90일까지 보관됩니다.</DescCart>
            </BasketBillBox>
            <BasketBottomButton>
              <OrderButton noChecked={currentPrice === 0} onClick={orderClick}>
                {currentPrice === 0 ? "주문하기" : `${totalPrice}원 주문하기`}
              </OrderButton>
            </BasketBottomButton>
          </BasketBox>
        )}
        <ProductRecommend />
        {popupModal && !currentUser.email && (
          <LoginPopupModal
            popupModal={popupModal}
            setPopupModal={setPopupModal}
            togglePopupModal={togglePopupModal}
          />
        )}
      </Container>
    </>
  );
};

export default MyPageBasket;
