import React, { useCallback } from "react";

// JSON Array 내 금액에 콤마가 있어서 인식하지 못하기에 split으로 콤마를 없앤 뒤 문자열로 변환 후 다시 콤마 생성
export const usePriceComma = () => {
  const PriceReComma = useCallback((price) => {
    // if (totalPrice || cartPrice !== 0) {
    return price
      ?.split(",")
      .join("")
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // } else return;
  }, []);

  const PriceDeleteComma = useCallback((price) => {
    // if (totalPrice || cartPrice !== 0) {
    return price?.split(",").join("");
    // } else return;
  }, []);

  const PriceComma = useCallback((price) => {
    // if (totalPrice || cartPrice !== 0) {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // } else return;
  }, []);

  return { PriceReComma, PriceDeleteComma, PriceComma };
};
