import { lazy } from "react";
const ProductInnerList = lazy(() => import("./ProductInnerList"));

export const ProductSteady = () => {
  const api = `${process.env.REACT_APP_SERVER_PORT}/api/productlist/steady?`;

  return <ProductInnerList api={api} />;
};
