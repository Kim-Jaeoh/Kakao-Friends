import { lazy } from "react";
const ProductInnerList = lazy(() => import("./ProductInnerList"));

export const ProductSteady = () => {
  const api = "http://localhost:4000/ProductListData?";

  return <ProductInnerList api={api} />;
};
