import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const EmptyBasketBox = styled.div`
  padding: 30% 0;
  margin-bottom: -100px;
  /* background-color: #f2f2f2; */
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

export const MyPageOrderList = () => {
  const [db, setDb] = useState(true);
  const [orderList, setOrderList] = useState([]);

  const params = {
    cid: "TC0ONETIME",
    tid: localStorage.getItem("tid"),
  };

  useEffect(() => {
    const postKakaopay = async () => {
      await axios({
        // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
        url: "/v1/payment/order",
        // 결제 준비 API는 POST 메소드라고 한다.
        method: "GET",
        headers: {
          // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        // 설정한 매개변수들
        params,
      }).then((response) => {
        // 응답 data로 state 갱신
        setOrderList(response.data);
        console.log(response);
      });
    };
    postKakaopay();

    // const postKakaopay = async () => {
    //   const data = await axios
    //     .post("/v1/payment/ready", null, {
    //       headers: {
    //         Authorization: `KakaoAK ${process.env.KAKAO_APP_ADMIN_KEY}`,
    //         // Authorization: "KakaoAK de0e3076b485b703b1f1a40123456789",
    //         "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //       },
    //       params, // config 설정에 데이터를 담아 넘겨준다.
    //     })
    //     .catch((e) => console.log(e, "에러"));

    //   console.log(data);
    // };
    // postKakaopay();
  }, []);

  const orderDay = new Date(orderList?.created_at);

  const year = orderDay.getFullYear();
  const month = ("0" + (orderDay.getMonth() + 1)).slice(-2);
  const day = ("0" + orderDay.getDate()).slice(-2);
  const hours = ("0" + orderDay.getHours()).slice(-2);
  const minutes = ("0" + orderDay.getMinutes()).slice(-2);
  const seconds = ("0" + orderDay.getSeconds()).slice(-2);

  const ampm = hours < 12 ? "am" : "pm";

  const dateString =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    ampm;

  return (
    <>
      {db ? (
        <>
          <div>{orderList?.item_name}</div>
          <div>{orderList?.amount?.total}</div>
          <div>{dateString}</div>
          {/* <div>{orderList?.created_at}</div> */}
        </>
      ) : (
        <EmptyBasketBox>
          <EmptyBasketCharacter>
            <img
              src="https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221109/181135/assets/images/m960/ico_empty_ryan.png"
              alt=""
            />
          </EmptyBasketCharacter>
          <EmptyText>아직 주문 내역이 없어요.</EmptyText>
        </EmptyBasketBox>
      )}
    </>
  );
};
