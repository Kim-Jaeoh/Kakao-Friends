import React, { Suspense, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { createBrowserHistory } from "history";
import { Modal } from "@mui/material";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IoIosArrowBack, IoMdCloseCircle } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

import { Footer } from "../components/utils/Footer";
import { useQuery } from "react-query";
import {
  CategoryListApi,
  MenuCharacterListApi,
  ProductListApi,
} from "../apis/dataApi";
import { RouterHeader } from "../components/header/RouterHeader";
import { debounce } from "lodash";
import { useRef } from "react";
import axios from "axios";
import { SearchResultItem } from "../components/search/SearchResultItem";
import { SearchResultItem2 } from "../components/search/SearchResultItem2";

const Wrapper = styled.div``;

const Container = styled.div`
  width: 100%;
  outline: none;
`;

const SearchBox = styled.div`
  position: relative;
  padding: 14px 20px 13px;
  border-bottom: 1px solid #dedfe0;
  background-color: #fff;
`;

const SearchForm = styled.form``;

const SearchContents = styled.div`
  position: relative;
  height: 25px;
  padding: 9px 40px 9px 10px;
  border-radius: 21px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.label`
  width: 24px;
  height: 24px;
  font-size: 23px;
  /* margin-left: 10px; */
  text-align: center;
  margin-right: 6px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: 0;
  font-size: 16px;
  line-height: 25px;
  background-color: transparent;
  outline: none;
  resize: none;
`;

const ResetButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 7px;
  cursor: pointer;
  width: 30px;
  height: 30px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #cacbcc;
      font-size: 22px;
    }
  }
`;

const SearchCategoryBox = styled.div`
  padding: 0 0 80px;
`;

const SearchCharacterListBox = styled.ul`
  overflow: hidden;
  padding: 24px 10px 0 10px;

  @media screen and (min-width: 640px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const SearchCharacterList = styled.li`
  display: inline-block;
  font-size: 16px;
  vertical-align: top;

  width: 25%;
  margin-bottom: 14px;

  @media screen and (min-width: 640px) {
    width: 104px;
    margin-bottom: 18px;
  }

  > div {
    display: block;
    padding: 0 10px 0 10px;
    @media screen and (min-width: 640px) {
      padding: 0 12px;
    }
  }
`;

const SearchCharacterImage = styled.span`
  display: block;
  width: 100%;
  padding-top: 100%;
  border-radius: 100%;
  background-image: url(${(props) => props.image});
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    background-image: url(${(props) => props.imageH});
  }
`;

const SearchCharacterText = styled.span`
  display: block;
  display: -webkit-box;
  overflow: hidden;
  padding-top: 8px;
  font-size: 12px;
  line-height: 16px;
  color: #747475;
  text-align: center;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  margin: 0 -11px 0 -10px;

  @media screen and (min-width: 640px) {
    margin: 0 -12px;
  }
`;

const SearchCategoryTextBox = styled.div`
  span {
    display: block;
    margin: 10px 20px 0;
    padding-top: 22px;
    border-top: 1px solid #eff0f2;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
  }
`;

const SearchCategoryTextList = styled.ul`
  overflow: hidden;
  padding: 4px 17px 0;
`;

const SearchCategoryText = styled.li`
  float: left;
  margin: 8px 3px 0;

  a {
    display: block;
    height: 30px;
    padding: 0 14px;
    border: 1px solid #dedfe0;
    border-radius: 15px;
    line-height: 28px;
    box-sizing: border-box;
    font-size: 14px;
  }
`;

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

export const Search = () => {
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [resultItem, setResultItem] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  // const [resultSubmit, setResultSubmit] = useState(false);
  const inputRef = useRef();
  const { pathname } = useLocation();
  const keyword = pathname.split("/search")[1];

  const { data: dataList1, isLoading1 } = useQuery(
    "character",
    MenuCharacterListApi,
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e.message),
    }
  );

  const { data: dataList2, isLoading2 } = useQuery(
    "category",
    CategoryListApi,
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e.message),
    }
  );

  const { data: dataList3, isLoading3 } = useQuery(
    "productList",
    ProductListApi,
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e.message),
    }
  );

  useEffect(() => {
    if (focus && searchText !== "") {
      const filter = dataList3.data.filter((obj) =>
        obj.title.includes(searchText)
      );
      setLoading(true);
      setResultItem(filter);
    } else {
      setLoading(false);
      setResultItem([]);
    }
  }, [dataList3, focus, searchText]);

  // 검색어 디바운스
  const onChangeText = debounce((e) => {
    setIsSubmit(false);
    setSearchText(e.target.value);
  }, 100);

  // 검색어 지우기
  const searchDelete = () => {
    setIsSubmit(false);
    setSearchText("");
    inputRef.current.value = "";
  };

  // // 검색(form enter)했는지 체크
  // useEffect(() => {
  //   if (isSubmit) {
  //     setResultSubmit(true);
  //   } else {
  //     setResultSubmit(false);
  //   }
  // }, [isSubmit]);

  // 검색(form enter)했는지 체크
  const onSubmit = (e) => {
    e.preventDefault();
    // navigate(`/search/${searchText}`);
    setIsSubmit(true);
    inputRef.current.value = "";
  };

  return (
    <Container>
      <RouterHeader title={"검색"} />

      <SearchBox>
        <SearchForm onSubmit={onSubmit}>
          <SearchContents>
            <SearchIcon>
              <div>
                <CiSearch />
              </div>
            </SearchIcon>
            <SearchInput
              type="text"
              ref={inputRef}
              onChange={onChangeText}
              onFocus={() => setFocus(true)}
              // onBlur={() => setFocus(false)}
            />
            {searchText && (
              <ResetButton onClick={searchDelete}>
                <span>
                  <IoMdCloseCircle />
                </span>
              </ResetButton>
            )}
          </SearchContents>
        </SearchForm>
      </SearchBox>

      {isSubmit ? (
        <SearchResultItem2 dataList={resultItem} />
      ) : (
        <>
          {loading && resultItem ? (
            <ResultBox>
              {resultItem.length !== 0 ? (
                <ResultListBox>
                  {resultItem?.map((list, index) => {
                    const parts = list.title.split(
                      new RegExp(`(${searchText})`, "gi")
                    );

                    return (
                      <ResultList key={index}>
                        <Link to={`/detail/${list.product}`}>
                          {/* 1. split 방법 */}
                          {/* {searchText !== "" &&
                          list.title.includes(searchText) ? (
                            <>
                              {list.title.split(searchText)[0]}
                              <em style={{ color: "#ff447f" }}>{searchText}</em>
                              {list.title.split(searchText)[1]}
                            </>
                          ) : (
                            list.title
                          )} */}

                          {/* ✔ 2. 정규식 방법 */}
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
          ) : (
            <SearchCategoryBox>
              <SearchCharacterListBox>
                {!isLoading1 &&
                  dataList1?.data.map((list, index) => (
                    <SearchCharacterList key={list.id}>
                      <div>
                        <SearchCharacterImage
                          image={list.image}
                          imageH={list.imageHover}
                        />
                        <SearchCharacterText>{list.title}</SearchCharacterText>
                      </div>
                    </SearchCharacterList>
                  ))}
              </SearchCharacterListBox>
              <SearchCategoryTextBox>
                <span>카테고리</span>
                <SearchCategoryTextList>
                  {!isLoading2 &&
                    dataList2?.data.map((list, index) => (
                      <SearchCategoryText key={list.id}>
                        <Link>{list.title}</Link>
                      </SearchCategoryText>
                    ))}
                </SearchCategoryTextList>
              </SearchCategoryTextBox>
            </SearchCategoryBox>
          )}
        </>
      )}
      <Footer />
    </Container>
  );
};
