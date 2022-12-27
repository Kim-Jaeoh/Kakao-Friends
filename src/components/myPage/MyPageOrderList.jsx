import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { NotInfo } from "../utils/NotInfo";
import { useTimeStamp } from "../../hooks/useTimeStamp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { dbService } from "../../fbase";

const MyPageOrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [myInfo, setMyInfo] = useState([]);
  // const [docRef, setDocRef] = useState("");
  const [payStatus, setPayStatus] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentBasket = useSelector((state) => state.user.basket);

  const { timeToString } = useTimeStamp(); // 시간 포멧 커스텀 훅

  // 결제 상태 로직
  const paymentMap = {
    SUCCESS_PAYMENT: "결제 완료",
    PART_CANCEL_PAYMENT: "부분 취소",
    CANCEL_PAYMENT: "모두 취소",
    QUIT_PAYMENT: "결제 중단",
    FAIL_PAYMENT: "결제 승인 실패",
  };

  const executePayment = (paymentType) => {
    return setPayStatus(paymentMap[paymentType]);
  };

  // // docRef state 설정
  // useEffect(() => {
  //   if (currentUser.uid) {
  //     setDocRef(doc(dbService, "userInfo", currentUser.uid.toString()));
  //   }
  // }, [currentUser.uid]);

  // Firebase 본인 정보 가져오기
  useEffect(() => {
    const docRef = doc(dbService, "userInfo", currentUser.uid.toString());
    if (docRef) {
      onSnapshot(docRef, (doc) => {
        setMyInfo(doc.data());
      });
    }
  }, [currentUser.uid]);

  // 시간 순서별
  useEffect(() => {
    setOrderList(
      myInfo?.orderList
        ?.map((list) => list)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    );
  }, [myInfo?.orderList]);

  // 결제 상태
  useEffect(() => {
    myInfo?.orderList?.map(
      async (obj) =>
        await axios({
          method: "GET",
          url: "https://kapi.kakao.com/v1/payment/order",
          params: { cid: "TC0ONETIME", tid: obj.tid },
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }).then((r) => {
          executePayment(r.data.status);
        })
    );
  }, [myInfo?.orderList]);

  return (
    <Container>
      {orderList?.length !== 0 ? (
        <>
          {payStatus &&
            orderList?.map((order) => {
              const orderInfo = order.orderInfo;
              return (
                <Orderbox key={order.tid}>
                  <OrderInfo>
                    <span>주문번호 {order.tid}</span>
                    <p>{timeToString(order)}</p>
                  </OrderInfo>

                  <OrderListBox>
                    {orderInfo?.map((list, index) => {
                      return (
                        <OrderList key={index}>
                          <ListContents>
                            <ListImageBox to={`/detail/${list.product}`}>
                              <ListImage>
                                <img src={list.image} alt={list.title} />
                              </ListImage>
                            </ListImageBox>
                            <ListInfoBox>
                              <ListInfo to={`/detail/${list.product}`}>
                                <ListTitle>{list.title}</ListTitle>
                                <ListPrice>
                                  <span>{list.price}</span>원&nbsp;/&nbsp;
                                  <span>{list.quanity}</span>개
                                </ListPrice>
                              </ListInfo>
                              <ListStatus>
                                {payStatus}
                                &nbsp;|&nbsp;
                                {order.type}
                              </ListStatus>
                            </ListInfoBox>
                          </ListContents>
                        </OrderList>
                      );
                    })}
                  </OrderListBox>
                </Orderbox>
              );
            })}
        </>
      ) : (
        <NotInfo
          url={
            "https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221109/181135/assets/images/m960/ico_empty_ryan.png"
          }
          text={"아직 주문 내역이 없어요."}
        />
      )}
    </Container>
  );
};

export default MyPageOrderList;

const Container = styled.div`
  padding: 20px;
  /* margin-bottom: -100px; */
  background-color: #f2f2f2;
`;

const Orderbox = styled.div`
  position: relative;
  background-color: #fff;

  :not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

const OrderInfo = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f2f2f2;

  > a {
    display: flex;
    align-items: center;
    margin-bottom: 1.5px;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    svg {
      font-weight: bold;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5px;
      margin-left: 2px;
    }
  }

  > p {
    font-size: 13px;
    color: #747475;
  }
`;

const OrderListBox = styled.ul`
  overflow: hidden;
`;

const OrderList = styled.li`
  position: relative;
  margin: 20px 20px 0;
  padding: 0 28px 20px 0;

  :not(:last-of-type) {
    border-bottom: 1px solid #f2f2f2;
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

  /* span {
    font-size: 15px;
  } */
`;

const ListStatus = styled.p`
  color: #747475;
  user-select: none;
`;
