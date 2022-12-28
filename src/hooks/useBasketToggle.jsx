import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbService } from "../fbase";
import { setBasket } from "../reducer/user";

export const useBasketToggle = () => {
  const dispatch = useDispatch();
  const [myInfo, setMyInfo] = useState({});
  const [docRef, setDocRef] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const currentBasket = useSelector((state) => state.user.basket);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser.uid) {
      setDocRef(doc(dbService, "userInfo", currentUser.uid.toString()));
    }
  }, [currentUser.uid]);

  // Firebase 본인 정보 가져오기
  useEffect(() => {
    if (docRef) {
      onSnapshot(docRef, (doc) => {
        setMyInfo(doc.data());
        setIsLogin(true);
      });
    }
    // return () => setIsLogin(false);
  }, [docRef]);

  const toggleIcon =
    // useCallback(
    async (itemId, quanity) => {
      const currentFinded = currentBasket?.find(
        (item) => item.product === itemId.product
      );

      if (currentFinded === undefined) {
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
        const currentFilter = currentBasket?.filter(
          (item) => item.product !== itemId.product
        );
        dispatch(setBasket(currentFilter));
      }

      if (currentUser.uid) {
        const fbFinded = myInfo?.basket?.find(
          (item) => item.product === itemId.product
        );
        if (fbFinded === undefined) {
          await updateDoc(docRef, {
            basket: [
              ...myInfo?.basket,
              {
                id: itemId.id,
                product: itemId.product,
                title: itemId.title,
                price: itemId.price,
                image: itemId.image,
                quanity: quanity ? quanity : 1,
                check: true,
              },
            ],
          });
        } else {
          const fbFilter = myInfo?.basket?.filter(
            (item) => item.product !== itemId.product
          );
          await updateDoc(docRef, {
            basket: fbFilter,
          });
        }
      }
    };
  // [currentBasket, dispatch, docRef, isLogin, myInfo?.basket]
  // );

  return { toggleIcon, currentBasket, docRef, myInfo };
};
