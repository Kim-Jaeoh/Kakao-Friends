import axios from "axios";
import styled from "@emotion/styled";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { dbService } from "../../fbase";
import character from "../../assets/order_complete_lion.gif";
import { Footer } from "../utils/Footer";
import { useTimeStamp } from "../../hooks/useTimeStamp";
import { cloneDeep } from "lodash";
import { setOrder } from "../../reducer/user";

export const MyPagePayResult = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [filterInfo, setFilterInfo] = useState({});
  const currentBasket = useSelector((state) => state.user.basket);
  const currentOrder = useSelector((state) => state.user.order);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dbRef = doc(dbService, "users", currentUser.email);
  const { timeToString } = useTimeStamp();
  const dispatch = useDispatch();

  const params = {
    // item_info: currentBasket?.map((item) => ({
    //   title: item.title,
    //   amount: item.amount,
    //   image: item.img,
    //   product: item.product,
    //   price: item.price,
    // })),
    cid: "TC0ONETIME",
    tid: localStorage.getItem("tid"),
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    pg_token: search.split("=")[1],
  };

  useEffect(() => {
    if (result && loading) {
      setFilterInfo(
        ...myInfo?.orderList.filter((order) => order.tid === result?.tid)
      );
    }
  }, [loading, myInfo?.orderList, result]);

  useEffect(() => {
    // if (loading) {
    if (result && loading) {
      // 주문 내역 업데이트
      const userInfo = async () => {
        await updateDoc(dbRef, {
          orderList: [
            ...myInfo?.orderList,
            {
              tid: result.tid || "",
              created_at: result.created_at || "",
              orderInfo: currentOrder?.map((order) => ({
                amount: order.amount,
                price: order.price,
                product: order.product,
                image: order.image,
                title: order.title,
              })),
              // orderInfo: currentBasket?.map((order) => ({
              //   amount: order.amount,
              //   price: order.price,
              //   product: order.product,
              //   image: order.img,
              //   title: order.title,
              // })),
              type: result.payment_method_type === "MONEY" ? "현금" : "카드",
            },
          ],
        });
        console.log("흠");
      };
      userInfo();
    }
  }, [result]);

  useEffect(() => {
    console.log(myInfo);
    console.log(currentOrder);
  }, []);

  useEffect(() => {
    if (loading && params.pg_token) {
      // 구매 결과 상태 받아오기
      const postKakaopay = async () => {
        await axios({
          url: "/v1/payment/approve",
          method: "POST",
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          params,
        }).then(async (response) => {
          // 결제 승인에 대한 응답 출력
          console.log(response.data);
          setResult(response.data);
        });
      };
      postKakaopay();
    }
  }, [loading]);

  // 본인 정보 가져오기
  useEffect(() => {
    onSnapshot(doc(dbService, "users", currentUser.email), (doc) => {
      setLoading(true);
      setMyInfo(doc.data());
    });
  }, [currentUser.email]);

  return (
    <Container>
      {myInfo && (
        <>
          <OrderInfoBox>
            <CharacterBox>
              <img src={character} alt="" />
            </CharacterBox>
            <OrderInfoText>
              <OrderInfoTitle>주문이 완료되었어요!</OrderInfoTitle>
              <OrderInfoSub>
                주문하신 내역은&nbsp;
                <Link to="/mypage/orderlist">'마이 - 주문내역'</Link>{" "}
                페이지에서도 확인하실 수 있습니다.
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
                          <img src={list.image} alt={list.title} />
                        </ListImage>
                      </ListImageBox>
                      <ListInfoBox to={`/detail/${list.product}`}>
                        <ListInfo>
                          <ListTitle>{list.title}</ListTitle>
                          <ListPrice>
                            <span>{list.price}</span>원&nbsp;/&nbsp;
                            <span>{list.amount}</span>개
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
            <OrderCategoryText>주문 정보</OrderCategoryText>
            <OrderPayInfo>
              <OrderPayText>
                주문번호&nbsp;<span>{filterInfo?.tid}</span>
              </OrderPayText>
              <OrderPayText>
                결제일시&nbsp;<span>{timeToString(filterInfo)}</span>
              </OrderPayText>
              <OrderPayText>
                결제수단&nbsp;<span>{filterInfo?.type}</span>
              </OrderPayText>
            </OrderPayInfo>
          </OrderInfoCategory>
          <Footer />
        </>
      )}
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  padding: 20px;
`;

const OrderInfoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 4px solid #f7f7f7;
`;

const CharacterBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 10px;
  overflow: hidden;
  width: 100px;

  img {
    display: block;
    width: 100%;
  }
`;

const OrderInfoText = styled.div`
  padding: 15px 20px;
  margin-bottom: 15px;
`;

const OrderInfoTitle = styled.h2`
  font-weight: bold;
  font-size: 22px;
`;

const OrderInfoSub = styled.p`
  a {
    text-decoration: underline;
  }
`;

const OrderInfoCategory = styled.div`
  /* margin-bottom: 25px; */
  :not(:last-of-type) {
    border-bottom: 2px solid #f7f7f7;
  }
`;

const OrderCategoryText = styled.strong`
  display: block;
  padding: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #747475;
`;

export const OrderListBox = styled.ul`
  margin-bottom: 25px;
  overflow: hidden;
`;

export const OrderList = styled.li`
  position: relative;
  margin: 0px 20px;
  padding: 0 28px 0px 0;

  :not(:last-of-type) {
    padding-bottom: 20px;
    border-bottom: 1px solid #f7f7f7;
  }
`;

const ListContents = styled.div`
  overflow: hidden;
  height: 100px;
`;

const ListImageBox = styled(Link)`
  float: left;
  position: relative;
  width: 100px;
  height: 100px;
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
  font-size: 16px;
  font-weight: bold;
  max-height: 40px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const ListPrice = styled.div`
  padding-top: 4px;
  font-size: 15px;
  line-height: 24px;
  vertical-align: top;

  span {
    font-size: 16px;
  }
`;

const OrderPayInfo = styled.div`
  padding: 0 20px;
`;

const OrderPayText = styled.span`
  display: block;
  margin-bottom: 5px;

  span {
    margin-left: 4px;
  }
`;
