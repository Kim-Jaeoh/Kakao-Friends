import axios from "axios";
import styled from "@emotion/styled";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { dbService } from "../../fbase";
import character from "../../assets/order_complete_lion.gif";
import { Footer } from "../utils/Footer";

export const MyPagePayResult = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const currentBasket = useSelector((state) => state.user.basket);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dbRef = doc(dbService, "users", currentUser.email);

  // const { data: dataList } = useQuery("productList", ProductListApi, {
  //   refetchOnWindowFocus: false,
  //   onError: (e) => console.log(e),
  // });

  // const { mutate: mutateOrderList } = useMutation((order) => {
  //   return axios.post("http://localhost:4000/paylist", order);
  //   // return axios.post("https://kakao-friends.herokuapp.com/paylist", order);
  // });

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
      setLoading(true);
      console.log("받아옴");
    });
    return () => setLoading(false);
  }, [currentUser.email]);

  useEffect(() => {
    // 객체 깊은 복사
    // setOrderObj(cloneDeep(myInfo.orderList));
    // console.log([...myInfo.orderList, { tid: 22, asd: 22 }]);
    if (loading) {
      console.log(myInfo);
    }
    // setOrderObj(JSON.stringify(myInfo.orderList));
  }, [loading, myInfo]);

  useEffect(() => {
    if (loading && params.pg_token) {
      // 구매 결과 상태 받아오기
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
          console.log(response);
          setResult(response.data);
        });
      };

      // 주문 내역 업데이트
      const userInfo = async () => {
        await updateDoc(dbRef, {
          orderList: [
            ...myInfo.orderList,
            {
              tid: localStorage.getItem("tid"),
              created_at: result.created_at,
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

      postKakaopay();
      userInfo();
    }
  }, [loading]);

  console.log(myInfo);

  return (
    <Container>
      <OrderInfoBox>
        <CharacterBox>
          <img src={character} alt="" />
        </CharacterBox>
        <OrderInfoText>
          <OrderInfoTitle>주문이 완료되었어요!</OrderInfoTitle>
          <OrderInfoSub>
            주문하신 내역은 '마이' 페이지에서도 확인하실 수 있습니다.
          </OrderInfoSub>
        </OrderInfoText>
      </OrderInfoBox>
      {/* <div>{result?.item_name}</div>
      <div>{result?.amount?.total}</div> */}

      <OrderInfoCategory>
        <OrderListBox>
          <OrderCategoryText>주문상품 정보</OrderCategoryText>
          {currentBasket?.map((list, index) => {
            return (
              <OrderList key={index}>
                <ListContents>
                  <ListImageBox to={`/detail/${list.product}`}>
                    <ListImage>
                      <img src={list.img} alt={list.title} />
                    </ListImage>
                  </ListImageBox>
                  <ListInfoBox to={`/detail/${list.product}`}>
                    <ListInfo>
                      <ListTitle>{list.title}</ListTitle>
                      <ListPrice>
                        <span>{list.price}</span>원&nbsp;/&nbsp;
                        <span>{list.amount}</span>개
                      </ListPrice>
                    </ListInfo>
                  </ListInfoBox>
                </ListContents>
              </OrderList>
            );
          })}
        </OrderListBox>
      </OrderInfoCategory>

      <OrderInfoCategory>
        <OrderCategoryText>주문 정보</OrderCategoryText>
        {myInfo?.orderList?.map((list, index) => {
          return (
            <div key={index}>
              <div>
                주문번호 <span>{list.tid}</span>
              </div>
              <div>
                결제일시 <span>{list.created_at}</span>
              </div>
            </div>
          );
        })}
      </OrderInfoCategory>
      <Footer />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  padding: 20px;
`;

const OrderInfoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 4px solid #f7f7f7;
`;

const CharacterBox = styled.div`
  position: absolute;
  right: 0;
  bottom: -5px;
  overflow: hidden;
  width: 100px;

  img {
    display: block;
    width: 100%;
  }
`;

const OrderInfoText = styled.div`
  padding: 15px 20px;
  margin-bottom: 15px;
`;

const OrderInfoTitle = styled.h2`
  font-weight: bold;
  font-size: 22px;
`;

const OrderInfoSub = styled.p``;

const OrderInfoCategory = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  :not(:last-of-type) {
    border-bottom: 2px solid #f7f7f7;
  }
`;

const OrderCategoryText = styled.strong`
  padding: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #747475;
`;

export const OrderListBox = styled.ul`
  margin-top: 25px;
  margin-bottom: 25px;
  overflow: hidden;
`;

export const OrderList = styled.li`
  position: relative;
  margin: 20px 20px 0;
  padding: 0 28px 0px 0;

  :not(:last-of-type) {
    padding-bottom: 20px;
    border-bottom: 1px solid #f7f7f7;
  }
`;

const ListContents = styled.div`
  overflow: hidden;
  height: 100px;
`;

const ListImageBox = styled(Link)`
  float: left;
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 6px;

  ::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.02);
    content: "";
  }
`;

const ListImage = styled.div`
  display: block;
  overflow: hidden;
  border-radius: 6px;

  img {
    display: block;
    width: 100%;
  }
`;

const ListInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  height: 100%;
  padding: 4px 0 0 16px;
  box-sizing: border-box;
`;

const ListInfo = styled(Link)`
  display: block;
`;

const ListTitle = styled.strong`
  display: block;
  display: -webkit-box;
  overflow: hidden;
  line-height: 20px;
  font-size: 16px;
  font-weight: bold;
  max-height: 40px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const ListPrice = styled.div`
  padding-top: 4px;
  font-size: 15px;
  line-height: 24px;
  vertical-align: top;

  span {
    font-size: 16px;
  }
`;
