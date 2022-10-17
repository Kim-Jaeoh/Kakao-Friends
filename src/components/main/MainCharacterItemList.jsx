import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { useHandleISize } from "../../hooks/useHandleISize";

const Wrapper = styled.div`
  max-width: 640px;
  min-width: 320px;
`;

const Title = styled.div`
  position: relative;
  text-align: left;
  display: flex;
  align-items: flex-end;
  height: 56px;
  padding: 64px 20px 20px;
  margin-top: 0;
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 100%;

  strong {
    display: -webkit-inline-box;
    overflow: hidden;
    max-width: 252px;
    max-height: 56px;
    text-overflow: ellipsis;
    word-break: break-all;
    font-size: 22px;
    font-weight: bold;
    line-height: 28px;
    letter-spacing: -0.025em;
    vertical-align: top;
  }
`;

const SlideBox = styled.div`
  margin: 0 20px;
  padding: 4px 10px 0 9px;
  border: 1px solid #dedfe0;
  border-radius: 10px;

  @media screen and (min-width: 640px) {
    padding: 4px 12px 0;
  }
`;

const SliderItemBox = styled.ul`
  padding-bottom: 11px;
  font-size: 0;
`;

const SliderItemList = styled.li`
  display: inline-block;
  width: 50%;
  padding: 13px 7px 13px 8px;
  vertical-align: top;
  box-sizing: border-box;

  @media screen and (min-width: 640px) {
    width: 33.333%;
    padding: 13px 8px;
  }
`;

const SliderItem = styled.div`
  position: relative;
  min-height: 243px;

  @media screen and (min-width: 640px) {
    min-height: 275px;
  }

  a {
    display: block;
  }
`;

const SliderItemInfo = styled.div`
  position: relative;

  a {
    display: block;
    padding-top: 12px;

    strong {
      padding-right: 0;
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
    }

    em {
      display: inline-block;
      padding-top: 4px;
      font-weight: 700;
      font-size: 15px;
      line-height: 24px;
      vertical-align: top;

      span {
        font-size: 16px;
        vertical-align: top;
      }
    }
  }
`;

const SliderImage = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  padding-top: 100%;

  &::before {
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
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`;

const BagButton = styled.button`
  position: absolute;
  z-index: 1;
  top: 2px;
  right: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px;
  border-radius: 4px;

  svg {
    width: 16px;
    height: 16px;
    padding: 6px;
    color: white;
  }
`;

const WrapLink = styled.div`
  margin: 0 8px 0 9px;
  border-top: 1px solid #eff0f2;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 -18px;
    font-size: 16px;
    height: 57px;
    text-align: center;
    color: #535353;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const MainCharacterItemList = ({
  titleBanner,
  titleText,
  subText,
  listData,
}) => {
  const [resizeItem, setResizeItem] = useState([]);
  const [clickIcon, setClickIcon] = useState(false);
  const [clickNumber, setClickNumber] = useState([]);

  const { size } = useHandleISize(); // 사이즈 체크 커스텀 훅

  // 모바일 사이즈 시 리스트 4개만 보이도록 (총 6개)
  useEffect(() => {
    if (size <= 640) {
      const copy = [...listData];
      copy.splice(copy.length - 2, 2);
      setResizeItem(copy);
    }
  }, [listData, size]);

  const toggleIcon = useCallback(
    (index) => {
      setClickNumber((prev) => [...prev, index]);
      setClickIcon(true);

      if (clickIcon && clickNumber.includes(index)) {
        setClickNumber(clickNumber.filter((id) => id !== index));
        setClickIcon(false);
      }
    },
    [clickIcon, clickNumber]
  );

  return (
    <Wrapper style={{ width: size >= 640 ? "640px" : size + "px" }}>
      <Title style={{ backgroundImage: `url(${titleBanner})` }}>
        <strong>
          {titleText} <br /> {subText}
        </strong>
      </Title>

      <SlideBox>
        <SliderItemBox>
          {(size >= 640 ? listData : resizeItem).map((list, index) => (
            <SliderItemList key={list.id}>
              <SliderItem>
                <Link to="/">
                  <SliderImage>
                    <img src={list.image} alt="제품" />
                  </SliderImage>
                </Link>

                <SliderItemInfo>
                  <Link to="/">
                    <strong>{list.title}</strong>
                    <em>
                      <span>{list.price}</span>원
                    </em>
                  </Link>
                </SliderItemInfo>

                <BagButton
                  onClick={(e) => toggleIcon(index, e)}
                  style={{
                    backgroundColor: clickNumber.includes(index)
                      ? "#ff477E"
                      : "#bbb",
                  }}
                >
                  <BsBag />
                </BagButton>
              </SliderItem>
            </SliderItemList>
          ))}
        </SliderItemBox>
        <WrapLink>
          <Link to="/">
            기획전 보러가기
            <span>
              <IoIosArrowForward />
            </span>
          </Link>
        </WrapLink>
      </SlideBox>
    </Wrapper>
  );
};
