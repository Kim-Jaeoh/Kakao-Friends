import React, { useEffect, useState } from "react";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { ProductInnerList } from "./ProductInnerList";

export const ProductSteady = () => {
  const [dataItem, setDataItem] = useState([]);

  const api = "http://localhost:4000/ProductListData?";

  const { ref, dataList } = useInfinityScroll(api, 16); // 무한스크롤 커스텀 훅

  useEffect(() => {
    const arr = [...dataList];
    setDataItem(arr);
  }, [dataList]);

  return <ProductInnerList ref={ref} dataItem={dataItem} />;
};
