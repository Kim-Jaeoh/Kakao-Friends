import axios from "axios";
import React, { useEffect, useState } from "react";

export const MyPageOrderItem = ({ tid }) => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = { cid: "TC0ONETIME", tid: tid };

  useEffect(() => {
    // const postKakaopay = async () => {
    //   await axios({
    //     // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
    //     url: "/v1/payment/order",
    //     // 결제 준비 API는 POST 메소드라고 한다.
    //     method: "GET",
    //     headers: {
    //       // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
    //       Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
    //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //     },
    //     // 설정한 매개변수들
    //     params,
    //   }).then((response) => {
    //     // 응답 data로 state 갱신
    //     setOrderList(response.data);
    //   });
    // };

    const postKakaopay = async () => {
      await axios
        .get("/v1/payment/order", {
          params, // config 설정에 데이터를 담아 넘겨준다.
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
        .then((r) => {
          // console.log(
          //   r.data.sort(
          //     (a, b) => new Date(b.created_at) - new Date(a.created_at)
          //   )
          // );

          setOrderList(r.data);
          // setOrderList([...orderList, r.data]);
          setIsLoading(true);
        })
        .catch((e) => console.log(e, "에러"));
    };

    postKakaopay();
  }, []);

  useEffect(() => {
    console.log(orderList);
  }, [orderList]);

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

  // useEffect(() => {
  //   orderList?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  // }, [orderList]);

  // console.log(
  //   orderList?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  // );

  return (
    <>
      {isLoading && (
        <>
          <div>{orderList?.item_name}</div>
          <div>{orderList?.amount?.total}</div>
          <div>{dateString}</div>
        </>
      )}
    </>
  );
};
