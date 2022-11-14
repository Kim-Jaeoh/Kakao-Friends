import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

export const MyPagePayResult = () => {
  const { search } = useLocation();
  const [result, setResult] = useState([]);
  const currentBasket = useSelector((state) => state.user.basket);

  const config = {
    params: {
      item_info: currentBasket?.map((item) => ({
        title: item.title,
        amount: item.amount,
        image: item.img,
        product: item.product,
        price: item.price,
      })),
      cid: "TC0ONETIME",
      // localstorage에서 tid값을 읽어온다.
      tid: localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: "",
    },
  };

  const { params } = config;
  params.pg_token = search.split("=")[1];

  console.log(params);

  useEffect(() => {
    const postKakaopay = async () => {
      await axios({
        url: "/v1/payment/approve",
        method: "POST",
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params,
      })
        .then((response) => {
          // 결제 승인에 대한 응답 출력
          setResult(response.data);
          console.log(response);
        })
        .catch((e) => console.log(e));
    };
    postKakaopay();
  }, []);

  // const date = new Date(result.created_at);

  return (
    <div>
      <h2>결제가 완료되었습니다.</h2>
      <div>{result.item_name}</div>
      <div>{result?.amount?.total}</div>
    </div>
  );
};
