import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export const useLocalStorage = () => {
  let { id } = useParams();
  const { pathname } = useLocation();
  const [viewedItems, setViewedItems] = useState([]);

  useEffect(() => {
    // localStorage의 데이터를 꺼냄
    let view = localStorage.getItem("viewedItems");

    // 최초 접속시 localStorage에 데이터가 없을 경우 새로운 배열을 생성
    if (view == null) {
      view = [];
    } else {
      // view 자료를 꺼내 배열로 파싱 후 다시 view에 저장
      view = JSON.parse(view);
    }

    if (id) {
      // 현재 상품 id를 view 저장
      if (view.length <= 20) {
        view.unshift(+id);
      } else {
        view.pop();
        // view.unshift(+id);
      }

      // 중복된 데이터를 넣지 않는 set 자료형에 view를 담아 중복을 제거
      view = new Set(view);

      // 중복 제거된 set 자료형의 view를 일반 배열로 변경
      view = [...view];
    }

    // localStorage에 데이터를 JSON 자료형으로 저장
    localStorage.setItem("viewedItems", JSON.stringify(view));
    setViewedItems(view);
  }, [id, pathname]);

  return { viewedItems, setViewedItems };
};
