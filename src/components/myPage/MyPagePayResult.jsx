import axios from "axios";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ProductListApi } from "../../apis/dataApi";
import { dbService } from "../../fbase";

export const MyPagePayResult = () => {
  const { search } = useLocation();
  const [localTidId, setLocalTid] = useState("");
  const [result, setResult] = useState([]);
  const [orderObj, setOrderObj] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const currentBasket = useSelector((state) => state.user.basket);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dbRef = doc(dbService, "users", currentUser.email);

  const { data: dataList } = useQuery("productList", ProductListApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e),
  });

  const { mutate: mutateOrderList } = useMutation((order) => {
    return axios.post("http://localhost:4000/paylist", order);
    // return axios.post("https://kakao-friends.herokuapp.com/paylist", order);
  });

  const params = {
    // item_info: currentBasket?.map((item) => ({
    //   title: item.title,
    //   amount: item.amount,
    //   image: item.img,
    //   product: item.product,
    //   price: item.price,
    // })),
    cid: "TC0ONETIME",
    tid: localStorage.getItem("tid"),
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    pg_token: search.split("=")[1],
  };

  // 본인 정보 가져오기
  useEffect(() => {
    onSnapshot(doc(dbService, "users", currentUser.email), (doc) => {
      setMyInfo(doc.data());
    });
  }, [currentUser.email]);

  useEffect(() => {
    console.log(typeof myInfo.orderList);
    // myInfo?.orderList.map((asd) => console.log(asd));
  }, [myInfo]);

  const userInfo = async () => {
    await updateDoc(dbRef, {
      orderList: [
        ...myInfo.orderList,
        {
          tid: localStorage.getItem("tid"),
          created_at: Date.now() || result.created_at,
          orderInfo: currentBasket?.map((order) => ({
            amount: order.amount,
            price: order.price,
            product: order.product,
            image: order.img,
            title: order.title,
          })),
        },
      ],
    });
    console.log("흠");
  };

  useEffect(() => {
    if (params.pg_token) {
      const postKakaopay = async () => {
        await axios({
          url: "/v1/payment/approve",
          method: "POST",
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          params,
        }).then(async (response) => {
          // 결제 승인에 대한 응답 출력
          setResult(response.data);

          // // 주문 내역 저장
          // await updateDoc(dbRef, {
          //   orderList: [
          //     ...myInfo?.orderList,
          //     {
          //       tid: params?.tid,
          //       created_at: response?.data?.created_at,
          //       orderInfo: currentBasket?.map((order) => ({
          //         amount: order.amount,
          //         price: order.price,
          //         product: order.product,
          //         image: order.img,
          //         title: order.title,
          //       })),
          //     },
          //   ],
          // }).then((e) => console.log(e));
        });
      };
      postKakaopay();
      // userInfo();
    }
  }, []);

  return (
    <div>
      <h2 onClick={userInfo}>결제가 완료되었습니다.</h2>
      <div>{result?.item_name}</div>
      <div>{result?.amount?.total}</div>
    </div>
  );
};
