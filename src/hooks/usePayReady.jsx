import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOrder, setTotalPrice } from "../reducer/user";

export const usePayReady = (list, currentTotalPrice, type) => {
  const [obj, setObj] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const dispatch = useDispatch();

  // 요청 단계 완료 시 승인 단계로 넘어가지는 URL (search 타입 지정)
  const appUrl = `http://localhost:3000/mypage/payresult?type=${
    type === "direct" ? "direct" : "basket"
  }`;
  const failUrl = "http://localhost:3000";
  const cancelUrl = "http://localhost:3000";

  // console.log(
  // list
  //   ?.map((item) => item?.price?.split(",").join("") * item?.quanity)
  //   ?.reduce((a, b) => a + b, 0)
  // );

  // useEffect(() => {
  //   setTotalPrice(
  //     list
  //       ?.map((item) => item?.price?.split(",").join("") * item?.quanity)
  //       ?.reduce((a, b) => a + b, 0)
  //   );
  // }, [list]);

  // useEffect(() => {
  //   console.log(currentTotalPrice);
  // }, [currentTotalPrice]);

  useEffect(() => {
    let params = {};
    // if (!currentTotalPrice) return (currentTotalPrice = 3000);

    if (list?.length !== 0) {
      params = {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name:
          list?.length === 1
            ? `${list[0]?.title}`
            : `${list[0]?.title} 외 ${list?.length - 1}건`,
        quantity: list
          ?.map((item) => item?.quanity)
          ?.reduce((a, b) => a + b, 0),
        total_amount: currentTotalPrice || 3000,
        vat_amount: 0,
        tax_free_amount: 0,
        approval_url: appUrl,
        fail_url: failUrl,
        cancel_url: cancelUrl,
      };

      const postKakaopay = async () => {
        await axios(
          // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 넣기
          {
            // 설정한 매개변수들
            method: "POST",
            url: "https://kapi.kakao.com/v1/payment/ready",
            params,
            headers: {
              // 카카오 developers에 등록한 admin키 주기
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        ).then((response) => {
          // 응답에서 필요한 data 구조분해
          const {
            data: { next_redirect_pc_url, tid },
          } = response;

          if (type === "direct") {
            list.map((order) =>
              dispatch(
                setOrder([
                  {
                    id: order.id,
                    quanity: order.quanity,
                    price: order.price,
                    product: order.product,
                    image: order.image,
                    title: order.title,
                  },
                ])
              )
            );
          }

          // 응답 data로 state 갱신
          setObj({ next_redirect_pc_url, tid });
          localStorage.setItem("tid", tid);
        });
      };
      postKakaopay();
      // return () => localStorage.setItem("tid", "");
    }
  }, [appUrl, currentTotalPrice, list, type]);

  const { next_redirect_pc_url } = obj;

  return { next_redirect_pc_url };
};
