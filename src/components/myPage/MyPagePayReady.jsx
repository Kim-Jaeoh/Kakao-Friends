import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const MyPagePayReady = () => {
  const [obj, setObj] = useState([]);
  const currentBasket = useSelector((state) => state.user.basket);

  console.log(currentBasket);

  // const config = {
  //   next_redirect_pc_url: "",
  //   tid: "",
  //   params: {
  //     cid: "TC0ONETIME",
  //     partner_order_id: "partner_order_id",
  //     partner_user_id: "partner_user_id",
  //     item_name: "초코파이",
  //     quantity: 1,
  //     total_amount: 2200,
  //     vat_amount: 0,
  //     tax_free_amount: 0,
  //     approval_url: "http://localhost:3000/mypage/payresult",
  //     fail_url: "http://localhost:3000",
  //     cancel_url: "http://localhost:3000",
  //   },
  // };

  const config = {
    next_redirect_pc_url: "",
    tid: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: `${currentBasket[0]?.title} 외 ${currentBasket?.length - 1}건`,
      item_info: currentBasket?.map((item) => ({
        title: item.title,
        amount: item.amount,
        image: item.img,
        product: item.product,
        price: item.price,
      })),
      quantity: currentBasket
        ?.map((item) => item?.amount)
        .reduce((a, b) => a + b),
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

  useEffect(() => {
    const postKakaopay = async () => {
      await axios({
        // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
        url: "/v1/payment/ready",
        // 결제 준비 API는 POST 메소드라고 한다.
        method: "POST",
        headers: {
          // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        // 설정한 매개변수들
        params,
      }).then((response) => {
        // 응답에서 필요한 data만 뽑는다.
        const {
          data: { next_redirect_pc_url, tid },
        } = response;

        // 응답 data로 state 갱신
        setObj({ next_redirect_pc_url, tid });
        localStorage.setItem("tid", tid);
        localStorage.getItem("tid");

        // console.log(tid);
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

  const { next_redirect_pc_url } = obj;

  return (
    <div>
      <h2>Pay page</h2>
      <a href={next_redirect_pc_url}>{next_redirect_pc_url}</a>
    </div>
  );
};
