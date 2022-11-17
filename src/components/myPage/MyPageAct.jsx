import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NotInfo } from "../utils/NotInfo";

export const MyPageAct = () => {
  return (
    <NotInfo
      url={
        "https://st.kakaocdn.net/commerce_ui/front-friendsshop/real/20221109/181135/assets/images/m960/img_ryan4.png"
      }
      text={"아직 활동 내용이 없어요."}
    />
  );
};
