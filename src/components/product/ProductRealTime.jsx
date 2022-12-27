import { lazy } from "react";
const ProductInnerList = lazy(() => import("./ProductInnerList"));

export const ProductRealTime = () => {
  const api =
    "http://localhost:4000/ProductListData?amount_ne=0&_sort=amount&_order=asc&";

  return <ProductInnerList api={api} />;
};
