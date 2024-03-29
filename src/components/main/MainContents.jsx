import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { BannerListApi } from "../../apis/dataApi.js";

export const MainContents = () => {
  const { data: dataList, isLoading } = useQuery("banner", BannerListApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  return (
    <>
      {!isLoading &&
        dataList?.data.map((list) => (
          <Container key={list.id}>
            <MainContentsImageBox to={list.url}>
              {list.video ? (
                <MainContentsVideo
                  height={list.height}
                  loop
                  autoPlay
                  playsInline
                  muted
                  poster={list.image}
                >
                  <source src={list.video} type="video/mp4" />
                </MainContentsVideo>
              ) : (
                <MainContentsImage
                  src={list.image}
                  height={list.height}
                  alt={list.title}
                  loading="lazy"
                />
              )}
              <MainContentsText>
                {list.title2 ? (
                  <strong>
                    {list.title} <br /> {list.title2}
                  </strong>
                ) : (
                  <strong>{list.title}</strong>
                )}
                <span>
                  {list.sub1}
                  <br />
                  {list.sub2}
                </span>
              </MainContentsText>
            </MainContentsImageBox>
          </Container>
        ))}
    </>
  );
};

const Container = styled.div`
  display: block;
  overflow: hidden;
  position: relative;
  margin-top: 16px;
  border-radius: 10px;
  isolation: isolate;

  a::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 190px;
    background: linear-gradient(rgba(0, 0, 0, 0), black);
    opacity: 0.5;
    content: "";

    @media screen and (min-width: 640px) {
      height: 160px;
    }
  }
`;

const MainContentsImageBox = styled(Link)`
  display: block;
  position: relative;
`;

const MainContentsImage = styled.img`
  display: block;
  position: relative;
  left: 50%;
  width: 600px;
  transform: translate(-50%);
  object-fit: cover;
  height: ${(props) => (props.height ? props.height : "auto")};
`;

const MainContentsVideo = styled.video`
  display: block;
  position: relative;
  left: 50%;
  width: 600px;
  transform: translate(-50%);
  height: auto;
`;

const MainContentsText = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  padding: 0 20px 26px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);

  strong {
    white-space: normal;
    display: block;
    overflow: hidden;
    max-height: 72px;
    font-size: 28px;
    line-height: 36px;
    white-space: pre-line;
    text-overflow: ellipsis;
    word-break: break-all;
    font-weight: bold;
  }

  span {
    display: block;
    overflow: hidden;
    max-height: 44px;
    margin-top: 6px;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.025em;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
`;
