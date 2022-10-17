import { css } from "@emotion/react";
import thin from "./fonts/SpoqaHanSansNeo-Thin.otf";
import Light from "./fonts/SpoqaHanSansNeo-Light.otf";
import Regular from "./fonts/SpoqaHanSansNeo-Regular.otf";
import Medium from "./fonts/SpoqaHanSansNeo-Medium.otf";
import Bold from "./fonts/SpoqaHanSansNeo-Bold.otf";

const GlobalStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700&family=Nanum+Gothic:wght@400;700&display=swap");

  /* @font-face {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-weight: 100;
    src: url("./fonts/SpoqaHanSansNeo-Thin.otf");
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-weight: 300;
    src: url("./fonts/SpoqaHanSansNeo-Light.otf");
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-weight: 400;
    src: url("./fonts/SpoqaHanSansNeo-Regular.otf");
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-weight: 500;
    src: url("./fonts/SpoqaHanSansNeo-Medium.otf");
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-weight: 700;
    src: url("./fonts/SpoqaHanSansNeo-Bold.otf");
  } */

  * {
    @font-face {
      font-family: "SpoqaHanSansNeo-Regular";
      src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff")
        format("woff");
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: "SpoqaHanSansNeo-Thin", "sans-serif";
      font-weight: 100;
      src: url({thin});
    }
    @font-face {
      font-family: "SpoqaHanSansNeo-Light", "sans-serif";
      font-weight: 300;
      src: url({Light});
    }
    @font-face {
      font-family: "SpoqaHanSansNeo-Regular", "sans-serif";
      font-weight: 400;
      src: url({Regular});
    }
    @font-face {
      font-family: "SpoqaHanSansNeo-Medium", "sans-serif";
      font-weight: 500;
      src: url({Medium});
    }
    @font-face {
      font-family: "SpoqaHanSansNeo-Bold", "sans-serif";
      font-weight: 700;
      src: url({Bold});
    }
    /* font-family: "Inter", "SpoqaHanSansNeo-Thin", "SpoqaHanSansNeo-Light",
      "SpoqaHanSansNeo-Medium", "SpoqaHanSansNeo-Bold", Apple SD Gothic Neo, */
    font-family: "Inter", "SpoqaHanSansNeo-Regular", Apple SD Gothic Neo,
      Malgun Gothic, "sans-serif" !important;
    font-weight: 300;
  }
  button {
    border: 0 none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }
`;

export default GlobalStyle;
