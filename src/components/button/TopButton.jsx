import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BsArrowUp } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const TopButtonBox = styled.div`
  position: fixed;
  width: 56px;
  right: 24px;
  bottom: ${(props) => (props.btnBottom ? "104px" : "24px")};
  z-index: 100;
  opacity: ${(props) => (props.btnStatus ? 100 : 0)};
  transition: all 0.15s ease-in-out;

  @media screen and (min-width: 640px) {
    right: 50%;
    margin-right: -296px;
  }
`;

const Button = styled.button`
  width: 56px;
  height: 56px;
  border: 1px solid #eff0f2;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgb(0 0 0 / 10%);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 32px;
    height: 32px;
    margin: 0 auto;
    color: #535353;
    font-weight: lighter;
  }
`;

export const TopButton = () => {
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false); // 버튼 상태
  const [btnBottom, setBtnBottom] = useState(false); // 버튼 위치
  const { pathname } = useLocation();

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // scrollY 의 값을 초기화
    if (scrollY === 0) {
      setBtnStatus(false);
    }
  };

  useEffect(() => {
    if (pathname?.includes("detail/") || pathname?.includes("basket")) {
      setBtnBottom(true);
    }
  }, [pathname]);

  useEffect(() => {
    const handleFollow = () => {
      if (window.pageYOffset > 1600) {
        setBtnStatus(true);
      } else {
        setBtnStatus(false);
      }
      setScrollY(window.pageYOffset);
    };

    window.addEventListener("scroll", handleFollow);

    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  }, [scrollY]);

  return (
    <TopButtonBox
      btnBottom={btnBottom}
      btnStatus={btnStatus}
      onClick={handleTop} // 버튼 클릭시 함수 호출
    >
      <Button>
        <BsArrowUp />
      </Button>
    </TopButtonBox>
  );
};
