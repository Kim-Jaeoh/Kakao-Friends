import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { MenuCharacterListApi } from "../../apis/dataApi";
import { Link } from "react-router-dom";

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

  > a {
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

export const SearchMain = () => {
  const { data: dataList1, isLoading1 } = useQuery(
    "character",
    MenuCharacterListApi,
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e.message),
    }
  );

  const category = [
    "전체",
    "토이",
    "리빙",
    "잡화",
    "문구",
    "의류",
    "디지털",
    "여행/레져",
    "식품",
    "테마 기획전",
  ];

  return (
    <SearchCategoryBox>
      <SearchCharacterListBox>
        {!isLoading1 &&
          dataList1?.data.map((list, index) => (
            <SearchCharacterList key={list.id}>
              <Link to={`/search/result?keyword=${list.title}`}>
                <SearchCharacterImage
                  image={list.image}
                  imageH={list.imageHover}
                />
                <SearchCharacterText>{list.title}</SearchCharacterText>
              </Link>
            </SearchCharacterList>
          ))}
      </SearchCharacterListBox>
      <SearchCategoryTextBox>
        <span>카테고리</span>
        <SearchCategoryTextList>
          {category.map((list, index) => (
            <SearchCategoryText key={index}>
              <Link>{list}</Link>
            </SearchCategoryText>
          ))}
        </SearchCategoryTextList>
      </SearchCategoryTextBox>
    </SearchCategoryBox>
  );
};
