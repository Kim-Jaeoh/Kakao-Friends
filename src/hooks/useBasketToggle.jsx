import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBasket } from "../reducer/user";

export const useBasketToggle = () => {
  const dispatch = useDispatch();
  // const [checkItems, setCheckItems] = useState([]);
  const currentBasket = useSelector((state) => state.user.basket);

  const toggleIcon = (itemId, amount) => {
    // dispatch(setBasket([])); // 초기화;

    const finded = currentBasket?.find(
      (item) => item.product === itemId.product
    );
    if (finded === undefined) {
      // setCheckItems([...checkItems, itemId.product]);
      dispatch(
        setBasket([
          {
            id: itemId.id,
            product: itemId.product,
            title: itemId.title,
            price: itemId.price,
            image: itemId.image,
            amount: amount ? amount : 1,
            check: true,
          },
          ...currentBasket,
        ])
      );
    } else {
      // setCheckItems(checkItems.filter((el) => el !== itemId.product));
      const filter = currentBasket?.filter(
        (item) => item.product !== itemId.product
      );
      dispatch(setBasket(filter));
    }
  };

  return { toggleIcon, currentBasket };
};
