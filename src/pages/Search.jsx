import React, { Suspense, useEffect } from "react";
import styled from "@emotion/styled";
import { createBrowserHistory } from "history";
import { Modal } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdCloseCircle } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

import { Footer } from "../components/Footer";
import { useQuery } from "react-query";
import { CategoryListApi, MenuCharacterListApi } from "../apis/dataApi";

const Wrapper = styled.div`
  width: 100%;
  outline: none;
`;

const Container = styled.div`
  overflow-y: scroll;

  -ms-overflow-style: none; // 인터넷 익스플로러
  scrollbar-width: none; // 파이어폭스

  ::-webkit-scrollbar {
    display: none;
  }

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin: 0 auto;
  background-color: #fff;
  max-width: 640px;
  min-width: 320px;
  height: 100%;
  outline: none;

  @media screen and (min-width: 640px) {
    width: 640px;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 12px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  svg {
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderName = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-weight: 700;

  img {
    display: block;
    width: 100%;
  }
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
  /* top: 6px; */
  width: 30px;
  height: 30px;

  span {
    /* width: 24px; */
    /* height: 24px; */
    /* margin: 0 auto; */
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

export const Search = () => {
  const navigate = useNavigate();
  // const history = createBrowserHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const goHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* <Modal
        open={searchModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ overflowY: "scroll" }}
        hideBackdrop={true}
      > */}
      <Wrapper>
        <Container>
          <HeaderBox>
            <IconBox>
              <Icon onClick={() => navigate(-1)}>
                <IoIosArrowBack />
              </Icon>
              <Icon onClick={goHome}>
                <FiHome />
              </Icon>
            </IconBox>

            <HeaderName>검색</HeaderName>

            <Icon>
              <TbWorld />
            </Icon>
          </HeaderBox>

          <SearchBox>
            <SearchForm>
              <SearchContents>
                <SearchIcon>
                  <div>
                    <CiSearch />
                  </div>
                </SearchIcon>
                <SearchInput />
                <ResetButton>
                  <span>
                    <IoMdCloseCircle />
                  </span>
                </ResetButton>
              </SearchContents>
            </SearchForm>
          </SearchBox>

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
                  dataList2.data.map((list, index) => (
                    <SearchCategoryText key={list.id}>
                      <Link to="/">{list.title}</Link>
                    </SearchCategoryText>
                  ))}
              </SearchCategoryTextList>
            </SearchCategoryTextBox>
          </SearchCategoryBox>
          <Footer />
        </Container>
      </Wrapper>
      {/* </Modal> */}
    </>
  );
};
