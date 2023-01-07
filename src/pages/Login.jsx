import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "../components/utils/Spinner";
import { useKakaoAuth } from "../hooks/useKakaoAuth";
import { setLoginToken } from "../reducer/user";

const Login = () => {
  const dispatch = useDispatch();
  const { userInfo } = useKakaoAuth(); // 카카오 로그인 커스텀 훅

  const code = new URL(window.location.href).searchParams.get("code");

  // 토큰 받기
  const getKakaoToken = async () => {
    await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      data: {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
        code,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        userInfo();
        dispatch(setLoginToken("login"));
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!code) return;
    getKakaoToken();
  }, [code]);

  return <Spinner />;
};

export default Login;
