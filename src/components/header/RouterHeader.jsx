import React from "react";
import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiHome, FiSearch } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";

const Header = styled.div`
  width: 100%;
  position: relative;
  z-index: 20;
  position: sticky;
  top: 0;
  background-color: #fff;
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

export const RouterHeader = ({ title }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Header>
      <HeaderBox>
        <IconBox>
          <Icon onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </Icon>
          <Icon onClick={goHome}>
            <FiHome />
          </Icon>
        </IconBox>

        <HeaderName>{title}</HeaderName>

        <IconBox>
          {!pathname.includes("/search") && (
            <Link to="/search">
              <Icon>
                <FiSearch />
              </Icon>
            </Link>
          )}
          <Icon>
            <TbWorld />
          </Icon>
        </IconBox>
      </HeaderBox>
    </Header>
  );
};
