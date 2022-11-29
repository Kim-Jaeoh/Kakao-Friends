import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setOrder } from "../reducer/user";

export const usePayReady = (list, type) => {
  const [obj, setObj] = useState([]);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const currentOrder = useSelector((state) => state.user.order);
  const currentBasket = useSelector((state) => state.user.basket);

  // const appUrl = "https://kakao-friends.herokuapp.com/mypage/payresult";
  const appUrl = "http://localhost:3000/mypage/payresult";
  const failUrl = "http://localhost:3000";
  const cancelUrl = "http://localhost:3000";

  useEffect(() => {
    let params = {};
    if (!list || null) return;

    if (list?.length !== 0) {
      params = {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name:
          list?.length === 1
            ? `${list[0]?.title}`
            : `${list[0]?.title} 외 ${list?.length - 1}건`,
        quantity: list?.map((item) => item?.amount)?.reduce((a, b) => a + b),
        total_amount: list
          ?.map((item) => item?.price?.split(",").join("") * item?.amount)
          ?.reduce((a, b) => a + b),
        vat_amount: 0,
        tax_free_amount: 0,
        approval_url: appUrl,
        fail_url: failUrl,
        cancel_url: cancelUrl,
        // if (type === "direct") {
        //   params = {
        //     cid: "TC0ONETIME",
        //     partner_order_id: "partner_order_id",
        //     partner_user_id: "partner_user_id",
        //     item_name: list.title,
        //     quantity: list.amount,
        //     total_amount: list.price?.split(",").join("") * list?.amount,
        //     vat_amount: 0,
        //     tax_free_amount: 0,
        //     approval_url: appUrl,
        //     fail_url: failUrl,
        //     cancel_url: cancelUrl,
        //   };
        // } else if (type === "basket") {
        //   params = {
        //     cid: "TC0ONETIME",
        //     partner_order_id: "partner_order_id",
        //     partner_user_id: "partner_user_id",
        //     item_name:
        //       list?.length === 1
        //         ? `${list[0]?.title}`
        //         : `${list[0]?.title} 외 ${list?.length - 1}건`,
        //     quantity: list?.map((item) => item?.amount)?.reduce((a, b) => a + b),
        //     total_amount: list
        //       ?.map((item) => item?.price?.split(",").join("") * item?.amount)
        //       ?.reduce((a, b) => a + b),
        //     vat_amount: 0,
        //     tax_free_amount: 0,
        //     approval_url: appUrl,
        //     fail_url: failUrl,
        //     cancel_url: cancelUrl,
        //   };
      };

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

            list.map((order) =>
              dispatch(
                setOrder([
                  {
                    amount: order.amount,
                    price: order.price,
                    product: order.product,
                    image: order.image,
                    title: order.title,
                  },
                ])
              )
            );

            // dispatch(
            //   setOrder({
            //     tid: response.data.tid,
            //     created_at: response.data.created_at,
            //     orderInfo: list?.map((order) => ({
            //       amount: order.amount,
            //       price: order.price,
            //       product: order.product,
            //       image: order.image,
            //       title: order.title,
            //     })),
            //   })
            // );
            // if (type === "direct") {
            //   dispatch(
            //     setOrder({
            //       tid: response.data.tid,
            //       created_at: response.data.created_at,
            //       orderInfo: {
            //         amount: list.amount,
            //         price: list.price,
            //         product: list.product,
            //         image: list.image,
            //         title: list.title,
            //       },
            //     })
            //   );
            // } else if (type === "basket") {
            //   dispatch(
            //     setOrder({
            //       tid: response.data.tid,
            //       created_at: response.data.created_at,
            //       orderInfo: list?.map((order) => ({
            //         amount: order.amount,
            //         price: order.price,
            //         product: order.product,
            //         image: order.img,
            //         title: order.title,
            //       })),
            //     })
            //   );
            // }

            // 응답 data로 state 갱신
            setObj({ next_redirect_pc_url, tid });
            localStorage.setItem("tid", tid);
          });
      };
      postKakaopay();
    }
  }, [dispatch, list, type]);

  const { next_redirect_pc_url } = obj;

  return { next_redirect_pc_url };
};
