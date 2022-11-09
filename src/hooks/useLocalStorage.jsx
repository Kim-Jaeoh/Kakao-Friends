import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export const useLocalStorage = () => {
  let { id } = useParams();
  const { pathname } = useLocation();
  const [viewed, setViewed] = useState(false);
  const [viewedItems, setViewedItems] = useState([]);

  useEffect(() => {
    setViewed(true);

    // localStorage의 데이터를 꺼낸다.
    let view = localStorage.getItem("viewedItems");

    // 최초 접속시 localStorage에 데이터가 없을 경우 새로운 배열을 생성한다.
    if (view == null) {
      view = [];
    } else {
      // view 자료를 꺼내 따옴표를 제거하고 다시 myArr에 저장한다.
      view = JSON.parse(view);
    }

    // 현재 상품 id를 view 저장한다.
    if (view.length <= 3) {
      view.unshift(+id);
    } else {
      view.pop();
      view.unshift(+id);
    }

    // 중복된 데이터를 넣지 않는 set 자료형에 view를 담아 중복을 제거한다.
    view = new Set(view);

    // 중복 제거된 set 자료형의 view를 일반 배열로 변경한다.
    view = [...view];

    // setViewed(view);
    // localStorage에 데이터를 JSON 자료형으로 저장한다.
    localStorage.setItem("viewedItems", JSON.stringify(view));

    setViewedItems(view);

    return () => setViewed(false);
  }, [id, pathname, viewed]);

  return { viewedItems, setViewedItems };
};
