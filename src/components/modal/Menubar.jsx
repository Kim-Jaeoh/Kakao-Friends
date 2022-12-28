import React, { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { SlLock } from "react-icons/sl";
import menuBannerImg from "../../assets/bn_addtalk.png";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useQuery } from "react-query";
import { MenuCharacterListApi } from "../../apis/dataApi";
import { AiOutlineBell } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useModalScrollFixed } from "../../hooks/useModalScrollFixed";
import { LoginPopupModal } from "./LoginPopupModal";
import { useKakaoAuth } from "../../hooks/useKakaoAuth";

const Container = styled.div`
  overflow-y: scroll;

  -ms-overflow-style: none; // 인터넷 익스플로러
  scrollbar-width: none; // 파이어폭스

  ::-webkit-scrollbar {
    display: none;
  }

  width: 304px;
  padding-bottom: 25px;
  background-color: #fff;
  outline: none;

  font-size: 14px;
  line-height: 1.5;
  font-family: Inter, Spoqa Han Sans Neo, Apple SD Gothic Neo, Malgun Gothic,
    \b9d1\c740\ace0\b515, sans-serif;
  color: #000;
  letter-spacing: -0.015em;

  a {
    color: #000;
    text-decoration: none;
  }

  @media screen and (min-width: 640px) {
    width: 400px;
  }
`;

const UserInfoBox = styled.div`
  position: relative;
  overflow: hidden;
  padding: 32px 24px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserLogin = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  user-select: none;

  em {
    border-bottom: 1px solid #000;
  }
`;

const NotUserCheck = styled.div`
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ListMenu = styled.ul`
  padding-top: 16px;
`;

const List = styled.li`
  display: block;
  overflow: hidden;
  width: 100%;
  padding: 0 24px;
  font-size: 16px;
  line-height: 48px;
  text-align: left;
  box-sizing: border-box;

  a {
    span {
      margin: 0 2px;
    }
  }
`;

const ListLast = styled(List)`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eff0f2;
`;

const MenuBanner = styled.div`
  padding-top: 16px;

  div {
    position: relative;
    display: block;
    overflow: hidden;
    margin: 0 16px;
    border-radius: 8px;

    img {
      display: block;
      width: 100%;
    }

    ::after {
      position: absolute;
      overflow: hidden;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: 1px solid rgba(0, 0, 0, 0.02);
      border-radius: 8px;
      content: "";
    }
  }
`;

const LogInBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  padding: 25px 0;
  line-height: 24px;
  color: #909092;
  text-align: center;
  border-top: 1px solid #eff0f2;
  cursor: pointer;

  div {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 16px;
      padding: 0px 0px 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Accordion = styled(MuiAccordion)`
  :before {
    display: none;
  }
`;

const AccordionLast = styled(Accordion)`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eff0f2;
`;

const ListTab = styled(MuiAccordionSummary)`
  display: block;
  overflow: hidden;
  width: 100%;
  padding: 0 24px;
  font-size: 16px;
  line-height: 48px;
  text-align: left;
  box-sizing: border-box;
  border: none;

  div {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    span {
      margin: 0 2px;
    }
  }
`;

const ListContents = styled(MuiAccordionDetails)`
  padding: 0;
`;

const CharacterListBox = styled.ul`
  overflow: hidden;
  display: block;
  padding: 16px 12px 14px;

  @media screen and (min-width: 640px) {
    padding-right: 12px;
    padding-left: 13px;
  }
`;

const CharacterList = styled.li`
  display: inline-block;
  width: 25%;
  padding-bottom: 22px;
  font-size: 16px;
  vertical-align: top;

  @media screen and (min-width: 640px) {
    width: 20%;
  }

  a {
    padding: 0 10px;
    display: block;

    @media screen and (min-width: 640px) {
      padding-right: 12px;
      padding-left: 11px;
    }
  }
`;

const CharacterListImage = styled.span`
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

const CharacterListText = styled.span`
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
  margin: 0 -10px;
  padding: 8px 2px 0;

  @media screen and (min-width: 640px) {
    margin: 0 -12px 0 -11px;
  }
`;

const CategoryListBox = styled.ul`
  overflow: hidden;
  padding: 3px 24px 20px;
  display: block;
`;

const CategoryList = styled.li`
  display: inline-block;
  width: 50%;
  vertical-align: top;

  a {
    display: block;
    padding: 12px 0;
    font-size: 15px;
    line-height: 20px;
    color: #747475;
  }
`;

export const Menubar = ({ menuModal, toggleModal, isLoggedIn }) => {
  const [expanded, setExpanded] = useState("");
  const [loginPopupModal, setLoginPopupModal] = useState(false);
  const toggleLoginPopupModal = () => setLoginPopupModal((prev) => !prev);
  const currentUser = useSelector((state) => state.user.currentUser);
  const modalFixed = useModalScrollFixed(menuModal); // 모달 스크롤 픽스
  const { onLogInClick, onLogOutClick } = useKakaoAuth(); // 카카오 auth 커스텀 훅

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

  const { data: dataList, isLoading } = useQuery(
    "character",
    MenuCharacterListApi,
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e.message),
    }
  );

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // 모달창 닫힐 때 아코디언 확장 x
  useEffect(() => {
    if (menuModal === false) {
      setTimeout(() => {
        setExpanded(false);
      }, [200]);
    }
    return () => clearTimeout();
  }, [menuModal]);

  return (
    <>
      <Drawer
        style={{ position: "relative" }}
        anchor={"left"}
        open={menuModal}
        onClose={toggleModal}
        transitionDuration={400}
        disableScrollLock={true}
      >
        <Container role="presentation">
          <UserInfoBox>
            {isLoggedIn ? (
              <>
                <UserLogin>
                  <em>{currentUser.displayName}</em>님 반가워요!
                </UserLogin>
                <NotUserCheck>
                  <span style={{ fontSize: "24px" }}>
                    <AiOutlineBell />
                  </span>
                </NotUserCheck>
              </>
            ) : (
              <UserLogin onClick={onLogInClick}>
                <em>로그인</em>이 필요해요!
              </UserLogin>
            )}
          </UserInfoBox>

          <ListMenu>
            <List onClick={toggleModal}>
              <Link to="/mypage/basket">장바구니 내역</Link>
            </List>
            <ListLast
              onClick={isLoggedIn ? toggleModal : toggleLoginPopupModal}
            >
              <Link to={isLoggedIn && "/mypage/orderlist"}>
                주문<span>·</span>배송 내역
              </Link>
            </ListLast>

            {/* 구분선 */}

            <Accordion
              disableGutters
              elevation={0}
              square
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <ListTab aria-controls="panel1d-content" id="panel1d-header">
                <div>
                  캐릭터
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
              </ListTab>
              <ListContents>
                <CharacterListBox>
                  {!isLoading &&
                    dataList?.data.map((list, index) => (
                      <CharacterList key={list.id}>
                        <Link
                          onClick={toggleModal}
                          to={`/search/result?keyword=${list.title}`}
                        >
                          <CharacterListImage
                            image={list.image}
                            imageH={list.imageHover}
                          />
                          <CharacterListText>{list.title}</CharacterListText>
                        </Link>
                      </CharacterList>
                    ))}
                </CharacterListBox>
              </ListContents>
            </Accordion>

            <AccordionLast
              disableGutters
              elevation={0}
              square
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <ListTab aria-controls="panel1d-content" id="panel1d-header">
                <div>
                  카테고리
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
              </ListTab>
              <ListContents>
                <CategoryListBox>
                  {!isLoading &&
                    category.map((list, index) => (
                      <CategoryList key={index}>
                        <Link>{list}</Link>
                      </CategoryList>
                    ))}
                </CategoryListBox>
              </ListContents>
            </AccordionLast>

            {/* 구분선 */}

            <List>프렌즈 별다꾸</List>
            <ListLast>배경화면</ListLast>

            {/* 구분선 */}

            <List>공지사항</List>
            <List>고객센터</List>
            <ListLast>
              기프트카드 조회<span>·</span>환불
            </ListLast>

            {/* 구분선 */}

            <List>카카오프렌즈샵 안내</List>
            <MenuBanner>
              <div>
                <img
                  src={menuBannerImg}
                  alt="카톡 추가하고 프렌즈 소식을 받아보세요!"
                  loading="lazy"
                />
              </div>
            </MenuBanner>

            {!isLoggedIn ? (
              <LogInBox onClick={onLogInClick}>
                <div>
                  <SlLock />
                </div>
                로그인
              </LogInBox>
            ) : (
              <LogInBox onClick={onLogOutClick}>
                <div>
                  <SlLock />
                </div>
                로그아웃
              </LogInBox>
            )}
          </ListMenu>
        </Container>

        {!isLoggedIn && (
          <LoginPopupModal
            loginPopupModal={loginPopupModal}
            toggleLoginPopupModal={toggleLoginPopupModal}
          />
        )}
      </Drawer>
    </>
  );
};
