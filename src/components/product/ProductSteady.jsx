import { useEffect } from "react";
import { ProductInnerList } from "./ProductInnerList";

export const ProductSteady = () => {
  const api = "http://localhost:4000/ProductListData?";

  return <ProductInnerList api={api} />;
};
