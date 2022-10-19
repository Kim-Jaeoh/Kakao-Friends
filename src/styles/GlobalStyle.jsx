import { css } from "@emotion/react";
import thin from "./fonts/SpoqaHanSansNeo-Thin.otf";
import Light from "./fonts/SpoqaHanSansNeo-Light.otf";
import Regular from "./fonts/SpoqaHanSansNeo-Regular.otf";
import Medium from "./fonts/SpoqaHanSansNeo-Medium.otf";
import Bold from "./fonts/SpoqaHanSansNeo-Bold.otf";

const GlobalStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700&family=Nanum+Gothic:wght@400;700&display=swap");

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 100;
    src: url(${thin}) format("opentype");
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 300;
    src: url(${Light}) format("opentype");
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 400;
    src: url(${Regular}) format("opentype");
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 500;
    src: url(${Medium}) format("opentype");
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 700;
    src: url(${Bold}) format("opentype");
  }

  * {
    /* @font-face {
      font-family: "SpoqaHanSansNeo-Regular";
      src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff")
        format("woff");
      font-weight: normal;
      font-style: normal;
    } */

    font-family: "Inter", "Spoqa Han Sans Neo", Apple SD Gothic Neo,
      Malgun Gothic, "sans-serif" !important;
    font-style: normal;
    font-weight: normal;
  }
  button {
    border: 0 none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }
`;

export default GlobalStyle;
