import { lazy } from "react";
const ProductInnerList = lazy(() => import("./ProductInnerList"));

export const ProductRealTime = () => {
  const api = `${process.env.REACT_APP_SERVER_PORT}/api/productlist/realtime?`;

  return <ProductInnerList api={api} />;
};
