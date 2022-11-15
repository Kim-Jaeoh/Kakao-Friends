import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { orderListApi, TidApi } from "../../apis/dataApi";
import { MyPageOrderItem } from "./MyPageOrderItem";

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
  const { data: dataList } = useQuery("orderList", orderListApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e),
  });
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortList, setSortList] = useState([]);
  // const data = dataList?.data.sort((a, b) => b.created_at - a.created_at);

  // const daa = () => {
  //   dataList?.data?.map(
  //     async (obj) =>
  //       await axios
  //         .get("/v1/payment/order", {
  //           params: { cid: "TC0ONETIME", tid: obj.tid },
  //           // params, // config 설정에 데이터를 담아 넘겨준다.
  //           headers: {
  //             Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
  //             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //           },
  //         })
  //         .then((r) => {
  //           // console.log(r.data.sort((a, b) => b.created_at - a.created_at));
  //           // console.log([r.data, ...orderList]);
  //           setOrderList([r.data, ...orderList]);
  //           // setIsLoading(true);
  //         })
  //   );
  // };

  useEffect(() => {
    // dataList?.data.map((asd) => console.log(asd.orderInfo.map((aa) => aa)));
    console.log(dataList?.data.map((asd) => asd.orderInfo));
    // dataList?.data.map((asd) => console.log(asd));
  }, [dataList?.data]);

  // useEffect(() => {
  //   setSortList(
  //     orderList?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  //   );
  // }, [orderList]);

  useEffect(() => {
    dataList?.data?.map(
      async (obj) =>
        await axios
          .get("/v1/payment/order", {
            // config 설정에 데이터를 담아 넘겨준다.
            params: { cid: "TC0ONETIME", tid: obj.tid },
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          })
          .then((r) => {
            // setOrderList((prev) => [r.data, ...new Set(prev)]);
            setIsLoading(true);
          })
    );
    // daa();
  }, [dataList?.data]);

  return (
    <>
      {dataList?.data.length !== 0 ? (
        <>
          {dataList?.data.map((asd, index) => {
            const order = asd.orderInfo;
            const orderDay = new Date(asd?.created_at);

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
              <div key={asd.tid}>
                <div>주문번호 {asd.tid}</div>
                {order.map((zxc, index) => {
                  // console.log(zxc);
                  return (
                    <div key={asd.title}>
                      <div>{zxc?.title}</div>
                      <img src={zxc.image} alt="" />
                    </div>
                  );
                })}
              </div>
            );
          })}
          {/* {dataList?.data.map((obj) => (
            <MyPageOrderItem key={obj.id} tid={obj.tid} />
          ))} */}
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
