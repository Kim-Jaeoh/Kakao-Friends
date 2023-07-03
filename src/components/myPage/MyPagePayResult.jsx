import axios from "axios";
import styled from "@emotion/styled";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { dbService } from "../../fbase";
import character from "../../assets/order_complete_lion.gif";
import { Footer } from "../utils/Footer";
import { useTimeStamp } from "../../hooks/useTimeStamp";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProductListApi } from "../../apis/dataApi";
import { setBasket } from "../../reducer/user";
import { Spinner } from "../utils/Spinner";
import { usePriceComma } from "../../hooks/usePriceComma";
import { BsCheckCircleFill } from "react-icons/bs";

const MyPagePayResult = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [dataType, setDataType] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});
  const [dbRef, setDocRef] = useState("");
  const dispatch = useDispatch();
  const currentOrder = useSelector((state) => state.user.order);
  const currentBasket = useSelector((state) => state.user.basket);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { timeToString } = useTimeStamp();
  const { PriceComma } = usePriceComma();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const params = {
    cid: "TC0ONETIME",
    tid: localStorage.getItem("tid"),
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    pg_token: searchParams.get("pg_token"),
  };

  // 상품 리스트 데이터 가져오기
  const { data: dataList } = useQuery("productList", ProductListApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  // search에 따라 데이터 값 설정
  useEffect(() => {
    const type = searchParams.get("type");
    const currentCheckBasket = currentBasket.filter((item) => item.check);
    setDataType(type === "direct" ? currentOrder : currentCheckBasket);
  }, [currentBasket, currentOrder, searchParams]);

  // Firebase ref 지정
  useEffect(() => {
    if (currentUser.uid) {
      setDocRef(doc(dbService, "userInfo", currentUser.uid.toString()));
    }
  }, [currentUser.uid]);

  // Firebase 본인 정보 가져오기
  useEffect(() => {
    if (dbRef) {
      onSnapshot(dbRef, (doc) => {
        setLoading(true);
        setMyInfo(doc.data());
      });
    }
  }, [dbRef]);

  // 잔여 수량 변경
  const { mutate } = useMutation(
    (amount) =>
      dataType.map((order) => {
        return axios.patch(
          `${process.env.REACT_APP_SERVER_PORT}/api/product/${order.product}`,
          amount
        );
      }),
    {
      onSuccess: () => {
        // queryKey가 'productList'로 시작하는 모든 쿼리 무효화
        queryClient.invalidateQueries("productList");
      },
    }
  );

  // 구매 결과 상태 받아오기
  useEffect(() => {
    if (loading && params.pg_token) {
      const postKakaopay = async () => {
        await axios({
          url: "https://kapi.kakao.com/v1/payment/approve",
          method: "POST",
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          params,
        }).then(async (response) => {
          // 결제 승인에 대한 응답 출력
          setResult(response.data);

          // 상품 잔여 수량 mutation으로 변경
          dataType.map((order) => {
            return mutate({
              amount: dataList?.data[order.id - 1].amount - order.quanity,
            });
          });
        });
      };
      postKakaopay();
    }
  }, [loading]);

  // 주문 내역 firebase 업데이트
  useEffect(() => {
    if (result.length !== 0) {
      const userInfo = async () => {
        await updateDoc(dbRef, {
          orderList: [
            ...myInfo?.orderList,
            {
              tid: result.tid || "",
              created_at: result.created_at || "",
              orderInfo: dataType?.map((order) => ({
                quanity: order.quanity,
                price: order.price,
                product: order.product,
                image: order.image,
                title: order.title,
              })),

              totalPrice: result.amount?.total,
              deliveryPrice:
                result.amount?.total >= 30000 ? "무료" : "+ 3,000원",
              usePoint: result.amount?.point,
              type: result.payment_method_type === "MONEY" ? "현금" : "카드",
            },
          ],
        }).then((res) => {
          let item = [];

          // 구매한 제품 localStorage에 저장
          dataType.map((order) => {
            item.push(order.product);
            return localStorage.setItem("buyItem", JSON.stringify(item));
          });

          // 구매한 제품 장바구니에서 삭제
          orderItemBasketRemove();
        });
      };
      userInfo();
    }
  }, [result]);

  // 구매한 제품 장바구니에서 삭제
  const orderItemBasketRemove = async () => {
    // localStorage 저장된 값 가져오기
    const localBuyItem = localStorage.getItem("buyItem");

    if (localBuyItem) {
      const fbFilter = myInfo?.basket?.filter(
        (info) => !localBuyItem?.includes(info.product)
      );
      const currentFilter = currentBasket?.filter(
        (basket) => !localBuyItem?.includes(basket.product)
      );

      dispatch(setBasket(currentFilter));
      await updateDoc(dbRef, {
        basket: fbFilter,
      }).then(localStorage.removeItem("buyItem"));
    }
  };

  // 업데이트 된 주문 내역 Firebase로부터 데이터 받아오기
  useEffect(() => {
    if (result && loading) {
      setFilterInfo(
        ...myInfo?.orderList.filter((order) => order.tid === result?.tid)
      );
    }
  }, [loading, myInfo?.orderList, result]);

  return (
    <>
      {result.length !== 0 ? (
        <>
          <Container>
            <OrderInfoBox>
              <CharacterBox>
                <img src={character} alt="order lion" loading="lazy" />
              </CharacterBox>
              <OrderInfoText>
                <OrderInfoTitle>
                  <BsCheckCircleFill /> 주문이 완료되었어요!
                </OrderInfoTitle>
                <OrderInfoSub>
                  주문하신 내역은&nbsp;
                  <Link to="/mypage/orderlist">'마이 - 주문내역'</Link>
                  &nbsp;페이지에서도 확인하실 수 있습니다.
                </OrderInfoSub>
              </OrderInfoText>
            </OrderInfoBox>

            <OrderInfoCategory>
              <OrderListBox>
                <OrderCategoryText>주문상품 정보</OrderCategoryText>
                {filterInfo?.orderInfo?.map((list, index) => {
                  return (
                    <OrderList key={index}>
                      <ListContents>
                        <ListImageBox to={`/detail/${list.product}`}>
                          <ListImage>
                            <img
                              src={list.image}
                              alt={list.title}
                              loading="lazy"
                            />
                          </ListImage>
                        </ListImageBox>
                        <ListInfoBox to={`/detail/${list.product}`}>
                          <ListInfo>
                            <ListTitle>{list.title}</ListTitle>
                            <ListPrice>
                              {list.price}
                              &nbsp;|&nbsp;
                              {list.quanity}개
                            </ListPrice>
                          </ListInfo>
                        </ListInfoBox>
                      </ListContents>
                    </OrderList>
                  );
                })}
              </OrderListBox>
            </OrderInfoCategory>

            <OrderInfoCategory>
              <OrderCategoryText>결제 정보</OrderCategoryText>
              <OrderPayInfo>
                <OrderPayBox>
                  <OrderPayTitle>주문번호</OrderPayTitle>&nbsp;
                  <OrderPaySub>{filterInfo?.tid}</OrderPaySub>
                </OrderPayBox>
                <OrderPayBox>
                  <OrderPayTitle>결제일시</OrderPayTitle>&nbsp;
                  <OrderPaySub>
                    {filterInfo && timeToString(filterInfo)}
                  </OrderPaySub>
                </OrderPayBox>
                <OrderPayBox>
                  <OrderPayTitle>결제수단</OrderPayTitle>&nbsp;
                  <OrderPaySub>{filterInfo?.type}</OrderPaySub>
                </OrderPayBox>

                <OrderPayBox>
                  <OrderPayTitle>총 상품금액</OrderPayTitle>&nbsp;
                  <OrderPaySub>
                    {PriceComma(filterInfo?.totalPrice)}
                    <span>원</span>
                  </OrderPaySub>
                </OrderPayBox>
                <OrderPayBox>
                  <OrderPayTitle>배송비</OrderPayTitle>&nbsp;
                  <OrderPaySub>
                    {PriceComma(filterInfo?.deliveryPrice)}
                    {!filterInfo?.deliveryPrice === "무료" ?? <span>원</span>}
                  </OrderPaySub>
                </OrderPayBox>
                <OrderPayBox>
                  <OrderPayTitle>포인트 사용</OrderPayTitle>&nbsp;
                  <OrderPaySub>
                    -&nbsp;{PriceComma(filterInfo?.usePoint)}
                    <span>원</span>
                  </OrderPaySub>
                </OrderPayBox>
              </OrderPayInfo>
            </OrderInfoCategory>

            <OrderInfoCategory>
              <OrderTotalPrice>
                <OrderPayTitle>최종 결제금액</OrderPayTitle>
                <OrderPaySub>
                  {PriceComma(filterInfo?.totalPrice - filterInfo?.usePoint)}
                  <span>원</span>
                </OrderPaySub>
              </OrderTotalPrice>
            </OrderInfoCategory>
          </Container>
          <Footer />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MyPagePayResult;

const Container = styled.main`
  position: relative;
  padding: 20px;
  background-color: #f2f2f2;
`;

const OrderInfoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 4px solid #f2f2f2;
`;

const CharacterBox = styled.div`
  position: absolute;
  right: 0;
  /* bottom: 0; */
  overflow: hidden;
  width: 100px;
  display: none;

  img {
    display: block;
    width: 100%;
  }

  @media screen and (min-width: 640px) {
    display: block;
  }
`;

const OrderInfoText = styled.div`
  padding: 45px 20px;
`;

const OrderInfoTitle = styled.h2`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 6px;

  svg {
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    position: relative;
  }
`;

const OrderInfoSub = styled.p`
  a {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const OrderInfoCategory = styled.div`
  background-color: #fff;
  padding: 20px;
  /* margin-bottom: 25px; */
  :not(:last-of-type) {
    border-bottom: 2px solid #f2f2f2;
  }
`;

const OrderCategoryText = styled.strong`
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #747475;
`;

const OrderTotalPrice = styled.strong`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;

  :last-of-type {
    span {
      font-size: 16px;
    }

    strong {
      font-size: 20px;
    }
  }
`;

const OrderListBox = styled.ul`
  overflow: hidden;
  :not(:last-of-type) {
    margin-bottom: 25px;
  }
`;

const OrderList = styled.li`
  position: relative;
  margin: 20px 0px 0;
  padding: 0 28px 0px 0;

  :not(:last-of-type) {
    padding-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;
  }
`;

const OrderPayInfo = styled.div`
  /* padding: 0 20px; */
`;

const OrderPayBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  :not(:last-of-type) {
    margin-bottom: 8px;
  }

  :nth-of-type(3) {
    padding-bottom: 18px;
    border-bottom: 1px solid #f2f2f2;
  }

  :nth-of-type(4) {
    padding-top: 10px;
  }

  :last-of-type {
    color: #e95555;
  }
`;

const OrderPayTitle = styled.span`
  /* display: inline-block; */
  /* width: 100px; */
  /* margin: 0 8px 0 0; */
`;

const OrderPaySub = styled.strong`
  span {
    font-size: 14px;
    margin-left: 1.6px;
  }
`;

const ListContents = styled.div`
  overflow: hidden;
  /* height: 100px; */
`;

const ListImageBox = styled(Link)`
  float: left;
  position: relative;
  width: 90px;
  height: 90px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  height: 100%;
  padding: 4px 0 0 16px;
  box-sizing: border-box;
`;

const ListInfo = styled(Link)`
  display: block;
`;

const ListTitle = styled.strong`
  display: block;
  display: -webkit-box;
  overflow: hidden;
  line-height: 20px;
  font-size: 14px;
  font-weight: bold;
  max-height: 40px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const ListPrice = styled.div`
  padding-top: 2px;
  font-size: 14px;
  /* line-height: 24px; */
  vertical-align: top;

  strong {
    /* font-weight: 700; */
  }
`;
