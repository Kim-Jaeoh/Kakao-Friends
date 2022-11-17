import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const MyPagePayReady = () => {
  const [obj, setObj] = useState([]);
  const currentBasket = useSelector((state) => state.user.basket);

  useEffect(() => {
    if (currentBasket.length === 0 || null) return;

    if (currentBasket.length !== 0) {
      const config = {
        next_redirect_pc_url: "",
        tid: "",
        params: {
          cid: "TC0ONETIME",
          partner_order_id: "partner_order_id",
          partner_user_id: "partner_user_id",
          item_name:
            currentBasket?.length === 1
              ? `${currentBasket[0]?.title}`
              : `${currentBasket[0]?.title} 외 ${currentBasket?.length - 1}건`,
          quantity: currentBasket
            ?.map((item) => item?.amount)
            ?.reduce((a, b) => a + b),
          total_amount: currentBasket
            ?.map((item) => item?.price?.split(",").join("") * item?.amount)
            ?.reduce((a, b) => a + b),
          vat_amount: 0,
          tax_free_amount: 0,
          approval_url: "http://localhost:3000/mypage/payresult",
          fail_url: "http://localhost:3000",
          cancel_url: "http://localhost:3000",
        },
      };

      const { params } = config;

      const postKakaopay = async () => {
        await axios
          // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 넣기
          .post("/v1/payment/ready", null, {
            // 설정한 매개변수들
            params,
            headers: {
              // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          })
          .then((response) => {
            // 응답에서 필요한 data만 뽑는다.
            const {
              data: { next_redirect_pc_url, tid },
            } = response;

            // 응답 data로 state 갱신
            setObj({ next_redirect_pc_url, tid });
            localStorage.setItem("tid", tid);
          });
      };
      postKakaopay();
    }
  }, [currentBasket]);

  const { next_redirect_pc_url } = obj;

  return { next_redirect_pc_url };
};
