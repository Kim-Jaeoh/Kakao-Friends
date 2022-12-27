import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Footer } from "../components/utils/Footer";
import { RouterHeader } from "../components/header/RouterHeader";
import { debounce } from "lodash";
import { useRef } from "react";
import { SearchResultItem } from "../components/search/SearchResultItem";
import { SearchResultList } from "../components/search/SearchResultList";
import { SearchMain } from "../components/search/SearchMain";

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

const Search = () => {
  const [focus, setFocus] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const keyword = searchParams.get("keyword");

  // 검색어 디바운스
  const onChangeText = debounce((e) => {
    setSearchText(e.target.value);
  }, 200);

  // 검색어 지우기
  const searchDelete = () => {
    setSearchText("");
    inputRef.current.value = "";
  };

  // 검색(form enter)했는지 체크
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setFocus(false);
      navigate({
        pathname: "/search/result",
        search: `?keyword=${searchText}`,
      });
      inputRef.current.blur();
      setIsSubmit(true);
    },
    [navigate, searchText]
  );

  const onClick = () => {
    setFocus(true);
    setIsSubmit(false);
    // navigate({
    //   // pathname: "/search",
    //   pathname: "/search/input",
    //   // search: `?keyword=${searchText}`,
    // });
  };

  useEffect(() => {
    if (!focus && keyword) {
      setIsSubmit(true);
      inputRef.current.value = keyword;
    }
    return () => setIsSubmit(false);
  }, [focus, keyword, setIsSubmit]);

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
              onClick={onClick}
              onChange={onChangeText}
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

      {!isSubmit ? (
        <>
          {focus && searchText.length >= 1 ? (
            <SearchResultList setFocus={setFocus} searchText={searchText} />
          ) : (
            <SearchMain />
          )}
        </>
      ) : (
        <Routes>
          {/* <Route path={"/"} element={<SearchMain />} />
        <Route
        path={"/input"}
          element={<SearchResultList focus={focus} searchText={searchText} />}
        /> */}
          <Route path={"/result"} element={<SearchResultItem />} />
        </Routes>
      )}
      <Footer />
    </Container>
  );
};

export default Search;
