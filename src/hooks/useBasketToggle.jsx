import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBasket } from "../reducer/user";

export const useBasketToggle = () => {
  const dispatch = useDispatch();
  const [checkItems, setCheckItems] = useState([]);
  const currentBasKet = useSelector((state) => state.user.basket);

  // 장바구니 dispatch
  const toggleIcon = useCallback(
    async (itemId, index) => {
      // dispatch(setBasket([])); // 초기화;

      const finded = currentBasKet?.find(
        (item) => item.product === itemId.product
      );
      if (finded === undefined) {
        setCheckItems((prev) => [...prev, itemId.product]);
        dispatch(
          setBasket([
            ...currentBasKet,
            {
              id: itemId.id,
              product: itemId.product,
              title: itemId.title,
              price: itemId.price,
              img: itemId.img,
              amount: 1,
              check: true,
            },
          ])
        );
      } else {
        setCheckItems(checkItems.filter((el) => el !== itemId.id));
        const filter = currentBasKet?.filter(
          (item) => item.product !== itemId.product
        );
        dispatch(setBasket(filter));
      }
    },
    [checkItems, currentBasKet, dispatch]
  );

  return { toggleIcon, checkItems, setCheckItems, currentBasKet };
};