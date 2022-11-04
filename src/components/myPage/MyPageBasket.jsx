import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { IoIosArrowForward, IoMdCloseCircle } from "react-icons/io";
import { BsBag, BsFillPauseFill, BsPlayFill, BsBagFill } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import {
  IoCheckmarkCircleSharp,
  IoCloseOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { useQuery } from "react-query";
import { BestListApi } from "../../apis/dataApi";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { dbService } from "../../fbase";
import {
  CheckItem,
  Decrement,
  Increment,
  InputChange,
  setBasket,
  setBasketCount,
  setCurrentUser,
  UnCheckItem,
} from "../../reducer/user";
import { list } from "firebase/storage";
import { useMemo } from "react";

const Container = styled.div``;

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
  opacity: 0.001;
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
`;

const BasketRecommendBox = styled.div`
  padding-top: 36px;
  border-top: 4px solid #f7f7f7;

  > strong {
    display: block;
    padding: 0 20px 16px;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: -0.017em;
    font-weight: bold;
  }
`;

const BasketRecommendListBox = styled.ul`
  padding: 0 13px 0 12px;

  @media screen and (min-width: 640px) {
    padding: 0 14px;
  }
`;

const BasketRecommendList = styled.li`
  display: inline-block;
  width: 50%;
  padding: 0 7px 40px 8px;
  vertical-align: top;
  box-sizing: border-box;

  @media screen and (min-width: 640px) {
    width: 33.333%;
    padding: 0 6px 40px;
  }
`;

const RecommendListBox = styled(Link)``;

const RecommendListImage = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  padding-top: 100%;

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.02);
    content: "";
  }

  img {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const RecommendListText = styled.div`
  padding-top: 10px;
  position: relative;
  > strong {
    display: block;
    display: -webkit-box;
    overflow: hidden;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #747475;
    max-height: 40px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    padding-right: 30px;
  }
`;

const RecomendListPrice = styled.div`
  display: inline-block;
  padding-top: 4px;
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  vertical-align: top;

  span {
    font-size: 16px;
  }
`;

const BagButton = styled.button`
  color: #909092;
  position: absolute;
  top: 5px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px;
  }

  /* @media screen and (min-width: 640px) {
    right: 6px;
  } */
`;

export const MyPageBasket = ({ userObj }) => {
  const { data: dataList } = useQuery("BestList", BestListApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  const [isFocus, setIsFocus] = useState(false);
  const [checkItems, setCheckItems] = useState([]);
  const [CheckBasketList, setCheckBasketList] = useState();
  const [cartPrice, setCartPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [totalProgress, setTotalProgress] = useState(0);
  const dispatch = useDispatch();
  const currentBasKet = useSelector((state) => state.user.basket);

  // const userRef = doc(dbService, "users", currentUser.email);

  // // 유저 정보 있을 때
  // useEffect(() => {
  //   if (userObj === undefined || null) return;

  //   if (userObj) {
  //     onSnapshot(doc(dbService, "users", userObj?.email), (doc) => {
  //       setMyInfo(doc.data());
  //       setLogIn(true);
  //     });
  //   }
  // }, [userObj]);

  // JSON Array 내 금액에 콤마가 있어서 인식하지 못하기에 split으로 콤마를 없앤 뒤 문자열로 변환 후 다시 콤마 생성
  const PriceReComma = useCallback(
    (price) => {
      if (totalPrice || cartPrice !== 0) {
        return price
          ?.split(",")
          .join("")
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else return;
    },
    [cartPrice, totalPrice]
  );

  const PriceDeleteComma = useCallback(
    (price) => {
      if (totalPrice || cartPrice !== 0) {
        return price?.split(",").join("");
      } else return;
    },
    [cartPrice, totalPrice]
  );

  const PriceComma = useCallback(
    (price) => {
      if (totalPrice || cartPrice !== 0) {
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else return;
    },
    [cartPrice, totalPrice]
  );

  // 상품 가격
  useEffect(() => {
    if (currentBasKet?.length === 0) return;

    // 체크된 것들만 계산
    const checkItem = currentBasKet.filter((item) => item.check);

    if (checkItem.length !== 0) {
      setCartPrice(
        checkItem
          ?.map((item) => PriceDeleteComma(item.price) * item.amount)
          ?.reduce((l, r) => l + r)
      );
    } else {
      setCartPrice(0);
    }
  }, [currentBasKet]);

  // 전체 가격
  useEffect(() => {
    if (cartPrice === 0) {
      setTotalPrice("3,000");
    } else {
      setTotalPrice(
        PriceComma(cartPrice >= 30000 ? cartPrice : cartPrice + 3000)
      );
    }
  }, [cartPrice]);

  // 배송 금액 바
  useEffect(() => {
    setTotalProgress(Math.round((cartPrice / 30000) * 100));
  }, [cartPrice, totalProgress]);

  // 페이지 이탈 시 전체 체크 활성화
  useEffect(() => {
    // 첫 렌더링 시 체크됐던 목록 담기
    setCheckItems(currentBasKet.map((obj) => obj.id));

    return () => {
      console.log("리셋");
      currentBasKet.map((obj) => {
        return dispatch(CheckItem(obj));
      });
    };
  }, []);

  // 체크된 목록 숫자
  useEffect(() => {
    setCheckBasketList(currentBasKet.filter((item) => item.check).length);
  }, [currentBasKet]);

  const toggleIcon = useCallback(
    async (itemId, index) => {
      // dispatch(setBasket([])) // 초기화;

      const finded = currentBasKet?.find((item) => item.id === itemId);
      if (finded === undefined) {
        setCheckItems((prev) => [...prev, itemId]);
        dispatch(
          setBasket([
            ...currentBasKet,
            {
              id: dataList?.data[index].id,
              title: dataList?.data[index].title,
              price: dataList?.data[index].price,
              image: dataList?.data[index].image,
              amount: 1,
              check: true,
            },
          ])
        );
      } else {
        setCheckItems(checkItems.filter((el) => el !== itemId));
        const filter = currentBasKet?.filter((item) => item.id !== itemId);
        dispatch(setBasket(filter));
      }
    },
    [checkItems, currentBasKet, dataList?.data, dispatch]
  );

  // 장바구니 개별 삭제
  const BasketDeleteItem = (itemId) => {
    const filter = currentBasKet?.filter((item) => item.id !== itemId);
    dispatch(setBasket(filter));
  };

  // 선택 삭제
  const selectDelete = () => {
    const filter = currentBasKet?.filter(
      (item) => !checkItems.includes(item.id)
    );
    setCheckItems(filter);
    dispatch(setBasket(filter));
  };

  const onChange = useCallback(
    (list, value) => {
      if (isFocus === true) {
        dispatch(InputChange(list, +value.replace(/(^0+)/, "")));
      }
    },
    [dispatch, isFocus]
  );

  // 개별 선택
  const checkHandler = (check, itemId) => {
    if (check) {
      dispatch(CheckItem(itemId));
      setCheckItems((prev) => [...prev, itemId.id]);
    } else {
      dispatch(UnCheckItem(itemId));
      setCheckItems(checkItems.filter((item) => item !== itemId.id));
    }
  };

  // 전체 선택
  const checkAllHandler = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      currentBasKet.map((obj) => {
        idArray.push(obj.id);
        return dispatch(CheckItem(obj));
      });
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      currentBasKet.map((obj) => {
        return dispatch(UnCheckItem(obj));
      });
      setCheckItems([]);
    }
  };

  return (
    <>
      <Container>
        {currentBasKet?.length === 0 ? (
          <EmptyBasketBox>
            <EmptyBasketCharacter>
              <img
                src="https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221026/104605/assets/images/m960/ico_cart_empty.png"
                alt=""
              />
            </EmptyBasketCharacter>
            <EmptyText>
              아직 관심 상품이 없네요!
              <br />
              귀여운 프렌즈 상품을 추천드릴게요
            </EmptyText>
            <BestItemViewBtn to="/best">인기 상품 보기</BestItemViewBtn>
          </EmptyBasketBox>
        ) : (
          <BasketBox>
            <BasketList>
              <DeliveryInfoBox>
                <DeliveryInfo>
                  <DeliveryFreeTextBox>
                    {PriceDeleteComma(totalPrice) >= 30000 ? (
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
                  <DeliveryPriceSave>
                    배송비 절약하기
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </DeliveryPriceSave>
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
              </DeliveryInfoBox>
              <CheckBox>
                <Check>
                  <CheckIcon
                    htmlFor="AllcheckBox"
                    name="AllcheckBox"
                    check={
                      checkItems.length === currentBasKet.length &&
                      CheckBasketList > 0
                        ? true
                        : false
                    }
                  >
                    <CheckInput
                      id="AllcheckBox"
                      type="checkBox"
                      checked={
                        checkItems.length === currentBasKet.length &&
                        CheckBasketList > 0
                          ? true
                          : false
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
                {currentBasKet?.map((list, index) => {
                  return (
                    <List key={list.id}>
                      <ListContents>
                        <ListCheckIcon
                          htmlFor={`checkItem-${list.id}`}
                          name={`select-${list.id}`}
                          check={list.check}
                        >
                          <CheckInput
                            id={`checkItem-${list.id}`}
                            name={`select-${list.id}`}
                            type="checkbox"
                            checked={
                              checkItems.includes(list.id) ? true : false
                            }
                            onChange={(e) => {
                              checkHandler(e.target.checked, list);
                            }}
                          />
                          <IoCheckmarkCircleSharp />
                        </ListCheckIcon>
                        <ListImageBox>
                          <ListImage>
                            <img src={list.image} alt={list.title} />
                          </ListImage>
                        </ListImageBox>
                        <ListInfoBox>
                          <ListTitle>{list.title}</ListTitle>
                          <ListPriceBox>
                            <ListPrice>
                              <span>{PriceReComma(list.price)}</span>원
                            </ListPrice>
                          </ListPriceBox>
                          <ItemCounterBox>
                            <ItemCounter>
                              <QuanityButton
                                amount={list.amount}
                                type="button"
                                onClick={(e) => dispatch(Decrement(list))}
                              >
                                <BiMinus />
                              </QuanityButton>
                              <input
                                type="number"
                                value={list.amount}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                min="1"
                                max="99"
                                onChange={(e) => onChange(list, e.target.value)}
                                onWheel={(e) => e.target.blur()}
                              />
                              <QuanityButton
                                amount={list.amount}
                                type="button"
                                onClick={(e) => dispatch(Increment(list))}
                              >
                                <BiPlus />
                              </QuanityButton>
                            </ItemCounter>
                          </ItemCounterBox>
                        </ListInfoBox>
                        <ListDelete onClick={() => BasketDeleteItem(list.id)}>
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
                  <span>{cartPrice && PriceComma(cartPrice)}원</span>
                </BasketListPrice>
                <BasketListPrice>
                  <span>배송비</span>
                  <span>
                    {PriceDeleteComma(totalPrice) >= 30000 ? "무료" : "3,000원"}
                  </span>
                </BasketListPrice>
                <BasketListPrice>
                  <strong>총 결제금액</strong>
                  <strong>{totalPrice}원</strong>
                </BasketListPrice>
              </BasketListTotalPrice>
              <DescCart>장바구니 상품은 최대 90일까지 보관됩니다.</DescCart>
            </BasketBillBox>
            <BasketBottomButton>
              <OrderButton noChecked={cartPrice === 0}>
                {cartPrice === 0 ? "주문하기" : `${totalPrice}원 주문하기`}
              </OrderButton>
            </BasketBottomButton>
          </BasketBox>
        )}
        <BasketRecommendBox>
          <strong>잠깐만, 이 제품은 어때요?</strong>
          <BasketRecommendListBox>
            {dataList?.data?.slice(0, 8).map((list, index) => (
              <BasketRecommendList key={list.id}>
                <RecommendListBox>
                  <RecommendListImage>
                    <img src={list.image} alt={list.title} />
                  </RecommendListImage>
                  <RecommendListText>
                    <strong>{list.title}</strong>
                    <RecomendListPrice>
                      <span>{PriceComma(list.price)}</span>원
                    </RecomendListPrice>
                    <BagButton onClick={(e) => toggleIcon(list.id, index)}>
                      {currentBasKet?.filter((obj) => obj.id === list.id)
                        .length > 0 ? (
                        <BsBagFill />
                      ) : (
                        <BsBag />
                      )}
                    </BagButton>
                  </RecommendListText>
                </RecommendListBox>
              </BasketRecommendList>
            ))}
          </BasketRecommendListBox>
        </BasketRecommendBox>
      </Container>
    </>
  );
};
