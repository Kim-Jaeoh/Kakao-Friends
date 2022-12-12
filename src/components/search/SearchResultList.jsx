import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ProductListApi } from "../../apis/dataApi";
import axios from "axios";

const ResultBox = styled.div`
  padding: 0 0 80px;
`;

const ResultListBox = styled.ul`
  padding-top: 16px;
`;

const ResultList = styled.li`
  a {
    display: block;
    padding: 6px 20px;
    font-size: 16px;

    /* :hover, */
    :active {
      background-color: #f7f7f7;
    }
  }
`;

const NotResultBox = styled.div`
  padding: 22px 20px;

  p {
    font-size: 16px;
    line-height: 20px;
    color: #aeaeaf;
  }
`;

export const SearchResultList = ({ focus, searchText }) => {
  const [resultItem, setResultItem] = useState([]);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  // const api = useCallback(
  //   async () =>
  //     await axios.get(
  //       `http://localhost:4000/ProductListData?title_like=${searchText}&`
  //     ),
  //   [searchText]
  // );

  const { data: dataList } = useQuery("productList", ProductListApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  useEffect(() => {
    const filter = dataList?.data.filter((list) =>
      list.title.includes(searchText)
    );
    setResultItem(filter);
  }, [dataList?.data, searchText]);

  return (
    <>
      {searchText && (
        <ResultBox>
          {resultItem?.length !== 0 ? (
            <ResultListBox>
              {resultItem?.map((list, index) => {
                const parts = list.title.split(
                  new RegExp(`(${searchText})`, "gi")
                );

                return (
                  <ResultList key={index}>
                    <Link to={`/detail/${list.product}`}>
                      {parts.map((part, index) =>
                        part.toLowerCase() === searchText.toLowerCase() ? (
                          <em style={{ color: "#ff447f" }} key={index}>
                            {part}
                          </em>
                        ) : (
                          part
                        )
                      )}
                    </Link>
                  </ResultList>
                );
              })}
            </ResultListBox>
          ) : (
            <NotResultBox>
              <p>검색 결과가 없습니다.</p>
            </NotResultBox>
          )}
        </ResultBox>
      )}
    </>
  );
};
