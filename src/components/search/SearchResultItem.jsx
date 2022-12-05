import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { BsBag, BsBagFill } from "react-icons/bs";
import { useBasketToggle } from "../../hooks/useBasketToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePriceComma } from "../../hooks/usePriceComma";
import { useQuery } from "react-query";
import { ProductListApi } from "../../apis/dataApi";
import axios from "axios";
import { cloneDeep, debounce } from "lodash";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { RouterHeader } from "../header/RouterHeader";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { Footer } from "../utils/Footer";

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

const BasketRecommendBox = styled.div`
  /* padding-top: 36px; */
  /* border-top: 4px solid #f7f7f7; */

  > strong {
    display: block;
    padding: 0 20px 16px;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: -0.017em;
    font-weight: bold;
  }
`;

const BasketRecommendListBox = styled.ul`
  padding: 0 13px 0 12px;

  @media screen and (min-width: 640px) {
    padding: 0 14px;
  }
`;

const BasketRecommendList = styled.li`
  display: inline-block;
  width: 50%;
  padding: 0 7px 40px 8px;
  vertical-align: top;
  box-sizing: border-box;

  @media screen and (min-width: 640px) {
    width: 33.333%;
    padding: 0 6px 40px;
  }
`;

const RecommendListBox = styled.div``;

const RecommendListImage = styled(Link)`
  display: block;
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  padding-top: 100%;

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.02);
    content: "";
  }

  img {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const RecommendListText = styled.div`
  padding-top: 10px;
  position: relative;
  > strong {
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
    padding-right: 30px;
  }
`;

const RecomendListPrice = styled.div`
  display: inline-block;
  padding-top: 4px;
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  vertical-align: top;

  span {
    font-size: 16px;
  }
`;

const BagButton = styled.button`
  color: #909092;
  position: absolute;
  top: 5px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px;
  }

  /* @media screen and (min-width: 640px) {
    right: 6px;
  } */
`;

const SearchResultBox = styled.div`
  overflow: hidden;
  padding: 20px 20px 12px;

  > span {
    strong {
      font-weight: bold;
    }
  }
`;

export const SearchResultItem = ({ searchValue }) => {
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [resultItem, setResultItem] = useState([]);
  const [color, setColor] = useState([]);
  const inputRef = useRef();

  const navigate = useNavigate();

  const api = "http://localhost:4000/ProductListData";

  // const { ref, dataList } = useInfinityScroll(api, 8); // 무한스크롤 커스텀 훅
  const { toggleIcon, currentBasket } = useBasketToggle(); //장바구니 커스텀 훅

  const { PriceComma } = usePriceComma(); // 가격 콤마 커스텀 훅

  const { state } = useLocation();

  const { result: dataList } = state;

  useEffect(() => {
    if (focus && searchText !== "") {
      const filter = dataList?.data.filter((obj) =>
        obj.title.includes(searchText)
      );
      setLoading(true);
      setResultItem(filter);
    } else {
      setLoading(false);
      setResultItem([]);
    }
  }, [dataList, focus, searchText]);

  // 검색어 디바운스
  const onChangeText = debounce((e) => {
    setSearchText(e.target.value);
  }, 200);

  const searchDelete = () => {
    setSearchText("");
    inputRef.current.value = "";
  };

  const noEnter = (e) => {
    console.log(`/search/keyword/${searchText}`);
    navigate(`/search/keyword/${searchText}`, {
      state: { result: resultItem },
    });
  };

  return (
    <Container>
      <RouterHeader title={"검색"} />

      <SearchBox>
        <SearchForm onSubmit={noEnter}>
          {/* <SearchForm onSubmit={(e) => e.preventDefault()}> */}
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

      <BasketRecommendBox>
        <SearchResultBox>
          <span>
            총 <strong>{dataList.length}</strong> 개
          </span>
        </SearchResultBox>
        <BasketRecommendListBox>
          {dataList?.map((list, index) => (
            <BasketRecommendList key={list.product}>
              <RecommendListBox>
                <RecommendListImage to={`/detail/${list.product}`}>
                  <img src={list.image} alt={list.title} />
                </RecommendListImage>
                <RecommendListText>
                  <strong>{list.title}</strong>
                  <RecomendListPrice>
                    <span>{PriceComma(list.price)}</span>원
                  </RecomendListPrice>
                  <BagButton onClick={(e) => toggleIcon(list)}>
                    {currentBasket?.filter(
                      (obj) => obj.product === list.product
                    ).length > 0 ? (
                      <BsBagFill style={{ color: "#ff447f" }} />
                    ) : (
                      <BsBag />
                    )}
                  </BagButton>
                </RecommendListText>
              </RecommendListBox>
            </BasketRecommendList>
          ))}
        </BasketRecommendListBox>
      </BasketRecommendBox>
      <Footer />
    </Container>
  );
};
