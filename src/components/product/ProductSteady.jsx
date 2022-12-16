import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { ProductInnerList } from "./ProductInnerList";

export const ProductSteady = () => {
  const api = "http://localhost:4000/ProductListData?";

  const { ref, dataList } = useInfinityScroll(api, 16); // 무한스크롤 커스텀 훅

  return <ProductInnerList api={api} />;
};
