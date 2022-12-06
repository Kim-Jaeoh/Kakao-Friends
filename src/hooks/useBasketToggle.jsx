import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBasket } from "../reducer/user";

export const useBasketToggle = () => {
  const dispatch = useDispatch();
  const currentBasket = useSelector((state) => state.user.basket);

  const toggleIcon = (itemId, quanity) => {
    const finded = currentBasket?.find(
      (item) => item.product === itemId.product
    );
    if (finded === undefined) {
      dispatch(
        setBasket([
          {
            id: itemId.id,
            product: itemId.product,
            title: itemId.title,
            price: itemId.price,
            image: itemId.image,
            quanity: quanity ? quanity : 1,
            check: true,
          },
          ...currentBasket,
        ])
      );
    } else {
      const filter = currentBasket?.filter(
        (item) => item.product !== itemId.product
      );
      dispatch(setBasket(filter));
    }
  };

  return { toggleIcon, currentBasket };
};
