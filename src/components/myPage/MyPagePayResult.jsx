import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

export const MyPagePayResult = () => {
  const { search } = useLocation();
  const [localTidId, setLocalTid] = useState("");
  const [result, setResult] = useState([]);
  const currentBasket = useSelector((state) => state.user.basket);

  const { mutate: mutateTid } = useMutation((tid) => {
    return axios.post("http://localhost:4000/tid", tid);
  });

  const { mutate: mutateOrderList } = useMutation((order) => {
    return axios.post("http://localhost:4000/orderlist", order);
  });

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
      tid: localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: search.split("=")[1],
    },
  };

  const { params } = config;

  useEffect(() => {
    // localstorage에서 tid값을 읽어온다.
    setLocalTid(localStorage.getItem("tid"));

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

          // tid 저장
          mutateTid({ tid: params.tid });

          // 주문 내역 저장
          mutateOrderList({
            tid: params.tid,
            created_at: response.data.created_at,
            orderInfo: currentBasket.map((asd) => ({
              amount: asd.amount,
              price: asd.price,
              product: asd.product,
              image: asd.img,
              title: asd.title,
            })),
          });
        })
        .catch((e) => console.log(e));
    };

    postKakaopay();
  }, []);

  return (
    <div>
      <h2>결제가 완료되었습니다.</h2>
      <div>{result.item_name}</div>
      <div>{result?.amount?.total}</div>
    </div>
  );
};
