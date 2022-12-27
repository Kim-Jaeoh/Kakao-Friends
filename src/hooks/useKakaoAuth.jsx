import React, { useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBasket, setCurrentUser, setLoginToken } from "../reducer/user";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { dbService } from "../fbase";

export const useKakaoAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  // 카카오 로그인
  const KakaoAutoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;

  const onLogInClick = () => (window.location.href = KakaoAutoUrl);

  // 카카오 계정 정보
  const userInfo = async () => {
    await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (user) => {
      const docRef = doc(dbService, "userInfo", user.data.id.toString());
      const docSnap = await getDoc(docRef);
      const usersRef = collection(dbService, "userInfo");
      dispatch(setBasket([]));

      if (docSnap.exists()) {
        dispatch(
          setCurrentUser({
            ...docSnap.data(),
          })
        );
        dispatch(setBasket([...docSnap.data().basket]));
      } else {
        await setDoc(doc(usersRef, user.data.id.toString()), {
          uid: user.data.id,
          displayName: user.data.properties.nickname,
          createdAtId: user.data.connected_at,
          orderList: [],
          basket: [],
        });
        dispatch(
          setCurrentUser({
            uid: user.data.id,
            displayName: user.data.properties.nickname,
            createdAtId: user.data.connected_at,
            orderList: [],
            basket: [],
          })
        );
        dispatch(setBasket([]));
      }
      navigate(-1);
    });
  };

  // 카카오 로그아웃
  const userLogOut = async () => {
    await axios({
      method: "POST",
      url: "https://kapi.kakao.com/v1/user/logout",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      localStorage.removeItem("token");
      dispatch(setBasket([]));
      navigate(0);
    });
  };

  const onLogOutClick = () => {
    const ok = window.confirm("로그아웃 하시겠어요?");
    if (ok) {
      userLogOut();
      dispatch(setLoginToken("logout"));
      dispatch(
        setCurrentUser({
          uid: "",
          displayName: "",
          createdAtId: "",
          orderList: [],
          basket: [],
        })
      );
      dispatch(setBasket([]));
    }
  };

  return { onLogInClick, userInfo, onLogOutClick };
};
