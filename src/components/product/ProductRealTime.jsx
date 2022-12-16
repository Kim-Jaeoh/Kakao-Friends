import { connectStorageEmulator } from "firebase/storage";
import { useEffect } from "react";
import { ProductInnerList } from "./ProductInnerList";

export const ProductRealTime = () => {
  const api =
    "http://localhost:4000/ProductListData?amount_ne=0&_sort=amount&_order=asc&";

  return <ProductInnerList api={api} />;
};
