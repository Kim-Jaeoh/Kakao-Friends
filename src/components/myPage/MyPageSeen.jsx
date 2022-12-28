import React, { useEffect, useState, lazy } from "react";
import styled from "@emotion/styled";
import { VscTrash } from "react-icons/vsc";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { ProductListApi } from "../../apis/dataApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
const NotInfo = lazy(() => import("../utils/NotInfo"));

const Container = styled.div``;

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  z-index: 10;
  height: 48px;
  margin: 0 auto;
  padding: 0 16px 0 20px;
  border-bottom: 1px solid #eff0f2;
  background-color: #fff;
  max-width: 640px;
  min-width: 320px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DescRecent = styled.p`
  font-size: 13px;
  line-height: 48px;
  color: #909092;
  letter-spacing: -0.02em;
`;

const AllDelete = styled.button`
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #747475;
`;

const DeleteIconBox = styled.div`
  margin-left: 4px;
  cursor: pointer;

  svg {
    color: #c9c9ca;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
`;

const ListCart = styled.ul`
  overflow: hidden;
  /* padding-top: 48px; */
`;

const List = styled.li`
  position: relative;
  margin: 20px 20px 0;
  padding: 0 28px 20px 0;
  border-bottom: 1px solid #f7f7f7;
`;

const ListContents = styled.div`
  overflow: hidden;
  /* position: relative; */
  /* padding-left: 29px; */
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

const ListInfoBox = styled(Link)`
  display: block;
  overflow: hidden;
  position: relative;
  height: 100%;
  padding: 4px 0 0 16px;
  /* padding: 0 28px 0 12px; */
  box-sizing: border-box;
`;

const ListTitle = styled.strong`
  display: block;
  display: -webkit-box;
  overflow: hidden;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #747475;
  max-height: 40px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const ListPriceBox = styled.div`
  display: inline-block;
  padding-top: 4px;
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  vertical-align: top;
`;

const ListPrice = styled.strong`
  display: inline-block;
  height: 24px;
  font-size: 15px;
  line-height: 24px;
  vertical-align: top;
  font-weight: bold;

  span {
    font-size: 16px;
  }
`;

const ListDelete = styled.button`
  position: absolute;
  z-index: 10;
  top: -3px;
  right: -7px;
  width: 30px;
  height: 30px;

  svg {
    font-size: 24px;
    color: #bdbdbd;
  }
`;

const MyPageSeen = () => {
  const [seenArray, setSeenArray] = useState([]);
  const { viewedItems } = useLocalStorage(); // 로컬 저장 커스텀 훅

  const { data: dataList, isLoading } = useQuery(
    "ProductList",
    ProductListApi,
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e.message),
    }
  );

  useEffect(() => {
    // 본 순서대로 나열되게 새로 map을 이용하여 저장함
    let arr = viewedItems?.map((item) => dataList?.data[item - 1]);
    setSeenArray(arr);
  }, [dataList?.data, viewedItems]);

  const deleteViewedItem = (item) => {
    const stateFilter = seenArray?.filter((arr) => arr.id !== item);
    setSeenArray(stateFilter);

    const localFilter = viewedItems?.filter((arr) => arr !== item);
    localStorage.setItem("viewedItems", JSON.stringify(localFilter));
  };

  const allDeleteViewedItem = () => {
    setSeenArray([]);
    localStorage.setItem("viewedItems", JSON.stringify([]));
  };

  return (
    <Container>
      {seenArray && seenArray?.length !== 0 ? (
        <>
          <Wrapper>
            <DescRecent>최대 20개까지 저장됩니다.</DescRecent>
            <AllDelete onClick={allDeleteViewedItem}>
              전체삭제
              <DeleteIconBox>
                <VscTrash />
              </DeleteIconBox>
            </AllDelete>
          </Wrapper>

          <ListCart>
            {!isLoading
              ? seenArray?.map((list, index) => {
                  return (
                    <List key={index}>
                      <ListContents>
                        <ListImageBox to={`/detail/${list?.product}`}>
                          <ListImage>
                            <img
                              src={list?.image}
                              alt={list?.title}
                              loading="lazy"
                            />
                          </ListImage>
                        </ListImageBox>
                        <ListInfoBox to={`/detail/${list?.product}`}>
                          <ListTitle>{list?.title}</ListTitle>
                          <ListPriceBox>
                            <ListPrice>
                              <span>{list?.price}</span>원
                            </ListPrice>
                          </ListPriceBox>
                        </ListInfoBox>
                        <ListDelete onClick={() => deleteViewedItem(list?.id)}>
                          <IoCloseOutline />
                        </ListDelete>
                      </ListContents>
                    </List>
                  );
                })
              : null}
          </ListCart>
        </>
      ) : (
        <NotInfo
          url={
            "https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221109/101144/assets/images/m960/ico_empty_ryan.png"
          }
          text={"최근 본 상품이 없어요."}
        />
      )}
    </Container>
  );
};

export default MyPageSeen;
