import React, { useEffect, useState } from "react";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { ProductInnerList } from "./ProductInnerList";

export const ProductRealTime = () => {
  const [dataItem, setDataItem] = useState([]);

  const api =
    "http://localhost:4000/ProductListData?amount_ne=0&_sort=amount&_order=asc&_limit=16";

  const { ref, dataList } = useInfinityScroll(api, 16); // 무한스크롤 커스텀 훅

  useEffect(() => {
    const arr = [...dataList];
    setDataItem(arr);
  }, [dataList]);

  return <ProductInnerList ref={ref} dataItem={dataItem} />;
};
