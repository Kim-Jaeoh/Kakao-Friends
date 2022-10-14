import { css } from "@emotion/react";

const GlobalStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&family=Nanum+Gothic:wght@400;700&display=swap");

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

  @font-face {
    font-family: "SpoqaHanSansNeo-Regular";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: "SpoqaHanSansNeo-Regular", "Montserrat", "sans-serif" !important;
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
