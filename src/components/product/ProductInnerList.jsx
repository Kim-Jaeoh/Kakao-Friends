import React, { forwardRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useBasketToggle } from "../../hooks/useBasketToggle";
import { BsBag, BsBagFill } from "react-icons/bs";
import { useQueryClient } from "react-query";

export const ProductInnerList = forwardRef(({ dataItem }, ref) => {
  const { toggleIcon, currentBasket } = useBasketToggle(); // 장바구니 커스텀 훅

  useEffect(() => {
    if (dataItem) {
    }
  }, []);

  return (
    <ListBox>
      {dataItem &&
        dataItem?.pages?.map((page, idx) => {
          return (
            <React.Fragment key={idx}>
              {page.map((list, index) => (
                <ListItem key={list.id}>
                  <ListItemNumberBox>
                    {index + 1 < 4 ? (
                      <ListItemRank>{index + 1}</ListItemRank>
                    ) : (
                      <ListItemNumber>{index + 1}</ListItemNumber>
                    )}
                  </ListItemNumberBox>
                  <ProductBox>
                    <Link to={`/detail/${list.product}`}>
                      <ProductImage>
                        <img src={list.image} alt={list.title} />
                      </ProductImage>
                    </Link>
                    <ProductTextBox>
                      <ProductText>
                        <strong>{list.title}</strong>
                      </ProductText>
                      <ProductPrice>
                        <span>{list.price}</span>원
                      </ProductPrice>
                      <ProductBag onClick={() => toggleIcon(list)}>
                        {currentBasket?.filter(
                          (obj) => obj.product === list.product
                        ).length > 0 ? (
                          <BsBagFill />
                        ) : (
                          <BsBag />
                        )}
                      </ProductBag>
                    </ProductTextBox>
                  </ProductBox>
                </ListItem>
              ))}
            </React.Fragment>
          );
        })}
      <div
        ref={ref}
        style={{
          position: "absolute",
          bottom: "450px",
        }}
      />
    </ListBox>
  );
});

const ListBox = styled.ol`
  margin: 2px 14px 0 13px;
  font-size: 0;

  @media screen and (min-width: 640px) {
    margin: 10px 12px 0;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  position: relative;
  width: 50%;
  padding: 20px 7px 20px 6px;
  vertical-align: top;
  box-sizing: border-box;

  @media screen and (min-width: 640px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const ListItemNumberBox = styled.div`
  position: absolute;
  left: 13px;
  top: 27px;
  z-index: 1;
  width: 24px;
  font-size: 16px;
  height: 24px;
  text-align: center;
  font-weight: bold;

  @media screen and (min-width: 640px) {
    left: 19px;
    top: 31px;
  }
`;

const ListItemNumber = styled.span`
  display: block;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  color: #fff;
  background-color: #aeaeaf;
`;

const ListItemRank = styled(ListItemNumber)`
  background-color: #3c404b;
`;

const ProductBox = styled.div`
  min-height: 260px;
`;

const ProductImage = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  padding-top: 100%;
  cursor: pointer;

  ::after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: rgba(0, 0, 0, 0.04);
  }

  img {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ProductTextBox = styled.div`
  position: relative;
`;

const ProductText = styled.div`
  padding-top: 10px;
  strong {
    padding-right: 32px;
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
  }
`;

const ProductPrice = styled.em`
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

const ProductBag = styled.button`
  position: absolute;
  top: 5px;
  right: -4px;
  bottom: auto;
  padding: 6px;

  svg {
    width: 20px;
    height: 20px;
    color: #909092;
  }
`;
