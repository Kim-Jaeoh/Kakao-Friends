import axios from "axios";
import styled from "@emotion/styled";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { dbService } from "../../fbase";
import character from "../../assets/order_complete_lion.gif";
import { Footer } from "../utils/Footer";
import { useTimeStamp } from "../../hooks/useTimeStamp";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProductListApi } from "../../apis/dataApi";

export const MyPagePayResult = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [dataType, setDataType] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});
  const currentOrder = useSelector((state) => state.user.order);
  const currentBasket = useSelector((state) => state.user.basket);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dbRef = doc(dbService, "users", currentUser.email);
  const { timeToString } = useTimeStamp();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const params = {
    cid: "TC0ONETIME",
    tid: localStorage.getItem("tid"),
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    pg_token: searchParams.get("pg_token"),
  };

  // search에 따라 데이터 값 설정
  useEffect(() => {
    const type = searchParams.get("type");
    setDataType(type === "direct" ? currentOrder : currentBasket);
  }, [currentBasket, currentOrder, searchParams]);

  // Firebase 본인 정보 가져오기
  useEffect(() => {
    onSnapshot(doc(dbService, "users", currentUser.email), (doc) => {
      setLoading(true);
      setMyInfo(doc.data());
    });
  }, [currentUser.email]);

  // 상품 리스트 데이터 가져오기
  const { data: dataList } = useQuery("productList", ProductListApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  // 잔여 수량 변경
  const { mutate } = useMutation(
    (amount) =>
      dataType.map((order) => {
        return axios.patch(
          `http://localhost:4000/productListData/${order.product}`,
          amount
        );
      }),
    {
      onSuccess: () => {
        // queryKey가 'productList'로 시작하는 모든 쿼리 무효화
        queryClient.invalidateQueries("productList");
      },
    }
  );

  // 구매 결과 상태 받아오기
  useEffect(() => {
    if (loading && params.pg_token) {
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

          // 상품 잔여 수량 mutation으로 변경
          dataType.map((order) => {
            return mutate({
              amount: dataList?.data[order.id - 1].amount - order.quanity,
            });
          });
        });
      };
      postKakaopay();
    }
  }, [loading]);

  // 주문 내역 firebase 업데이트
  useEffect(() => {
    if (result && loading) {
      const userInfo = async () => {
        await updateDoc(dbRef, {
          orderList: [
            ...myInfo?.orderList,
            {
              tid: result.tid || "",
              created_at: result.created_at || "",
              orderInfo: dataType?.map((order) => ({
                quanity: order.quanity,
                price: order.price,
                product: order.product,
                image: order.image,
                title: order.title,
              })),
              type: result.payment_method_type === "MONEY" ? "현금" : "카드",
            },
          ],
        }).then((res) => console.log(res));
      };
      userInfo();
    }
  }, [result]);

  // 업데이트 된 주문 내역 Firebase로부터 데이터 받아오기
  useEffect(() => {
    if (result && loading) {
      setFilterInfo(
        ...myInfo?.orderList.filter((order) => order.tid === result?.tid)
      );
    }
  }, [loading, myInfo?.orderList, result]);

  return (
    <>
      <Container>
        {filterInfo && (
          <>
            <OrderInfoBox>
              <CharacterBox>
                <img src={character} alt="order lion" />
              </CharacterBox>
              <OrderInfoText>
                <OrderInfoTitle>주문이 완료되었어요!</OrderInfoTitle>
                <OrderInfoSub>
                  주문하신 내역은&nbsp;
                  <Link to="/mypage/orderlist">'마이 - 주문내역'</Link>
                  &nbsp;페이지에서도 확인하실 수 있습니다.
                </OrderInfoSub>
              </OrderInfoText>
            </OrderInfoBox>

            <OrderInfoCategory>
              <OrderListBox>
                <OrderCategoryText>주문상품 정보</OrderCategoryText>
                {filterInfo?.orderInfo?.map((list, index) => {
                  return (
                    <OrderList key={index}>
                      <ListContents>
                        <ListImageBox to={`/detail/${list.product}`}>
                          <ListImage>
                            <img src={list.image} alt={list.title} />
                          </ListImage>
                        </ListImageBox>
                        <ListInfoBox to={`/detail/${list.product}`}>
                          <ListInfo>
                            <ListTitle>{list.title}</ListTitle>
                            <ListPrice>
                              <span>{list.price}</span>원&nbsp;/&nbsp;
                              <span>{list.quanity}</span>개
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
              <OrderPayInfo>
                <OrderPayText>
                  주문번호&nbsp;<span>{filterInfo?.tid}</span>
                </OrderPayText>
                <OrderPayText>
                  결제일시&nbsp;<span>{timeToString(filterInfo)}</span>
                </OrderPayText>
                <OrderPayText>
                  결제수단&nbsp;<span>{filterInfo?.type}</span>
                </OrderPayText>
              </OrderPayInfo>
            </OrderInfoCategory>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.main`
  position: relative;
  padding: 20px;
  background-color: #f2f2f2;
`;

const OrderInfoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 4px solid #f2f2f2;
`;

const CharacterBox = styled.div`
  position: absolute;
  right: 0;
  /* bottom: 0; */
  overflow: hidden;
  width: 100px;

  img {
    display: block;
    width: 100%;
  }
`;

const OrderInfoText = styled.div`
  padding: 40px 20px;
  /* margin-bottom: 15px; */
`;

const OrderInfoTitle = styled.h2`
  font-weight: bold;
  font-size: 22px;
`;

const OrderInfoSub = styled.p`
  a {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const OrderInfoCategory = styled.div`
  background-color: #fff;
  padding: 20px;
  /* margin-bottom: 25px; */
  :not(:last-of-type) {
    border-bottom: 2px solid #f2f2f2;
  }
`;

const OrderCategoryText = styled.strong`
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #747475;
`;

export const OrderListBox = styled.ul`
  overflow: hidden;
  :not(:last-of-type) {
    margin-bottom: 25px;
  }
`;

export const OrderList = styled.li`
  position: relative;
  margin: 20px 0px 0;
  padding: 0 28px 0px 0;

  :not(:last-of-type) {
    padding-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;
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

const OrderPayInfo = styled.div`
  /* padding: 0 20px; */
`;

const OrderPayText = styled.span`
  display: block;
  margin-bottom: 5px;

  span {
    margin-left: 4px;
  }
`;
