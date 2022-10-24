import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { mainContentsSeriesList } from "../../data/mainContentsData";
import videoContents from "../../assets/video_contents_1.mp4";
import { Link } from "react-router-dom";
import { BsBag, BsFillPauseFill, BsPlayFill, BsBagFill } from "react-icons/bs";
import axios from "axios";
import { useQuery } from "react-query";
import { SeriesListApi } from "../../apis/dataApi";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: 0 20px;
`;

const Title = styled.div`
  position: relative;
  margin-top: 58px;
  padding: 0 20px 20px;
  text-align: left;

  strong {
    display: -webkit-inline-box;
    overflow: hidden;
    max-width: 252px;
    max-height: 56px;
    text-overflow: ellipsis;
    word-break: break-all;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.025em;
    vertical-align: top;
  }
`;

const VideoButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);

  opacity: ${(props) => (props.hover ? "0" : "100")};
  transition: opacity 0.6s;

  svg {
    width: 70px;
    height: 70px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const VideoBox = styled.div`
  overflow: hidden;
  position: relative;
  padding-top: 56.25%;
  border-radius: 10px 10px 0 0;
  background-color: rgba(0, 0, 0, 0.1);
  isolation: isolate;
`;

const Video = styled.video`
  position: absolute;
  left: 50%;
  top: 50%;
  min-width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
`;

const InfoBox = styled.div`
  position: relative;

  > strong {
    display: block;
    padding: 16px 16px 0;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.25px;
  }

  > span {
    display: block;
    padding: 6px 16px 0;
    font-size: 14px;
    line-height: 20px;
    color: #535353;
  }

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 1px solid #dedfe0;
    border-top: 0;
    border-radius: 0 0 10px 10px;
    content: "";
  }
`;

const ListBox = styled.ul`
  margin: 16px 16px 0;
  padding-bottom: 16px;
`;

const List = styled.li`
  position: relative;
  display: flex;
  margin-top: 2px;

  :first-of-type {
    margin-top: 0px;
  }
`;

const ListLink = styled(Link)`
  align-items: center;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const ListImage = styled.span`
  overflow: hidden;
  float: left;
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    width: 100%;
    border: 0 none;
  }
`;

const ListText = styled.div`
  overflow: hidden;
  padding: 0 15px;
`;

const ListTitle = styled.strong`
  display: block;
  overflow: hidden;
  font-weight: 400;
  color: #747475;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const ListPrice = styled.strong`
  margin-top: 1px;
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;

  span {
    font-size: 16px;
  }
`;

const BagButton = styled.button`
  margin-left: auto;
  border: 0 none;
  background-color: transparent;
  color: #909092;

  svg {
    width: 20px;
    height: 20px;
    margin: 6px;
  }

  @media screen and (min-width: 640px) {
    right: 6px;
  }
`;

export const MainSeriesContents = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const [clickIcon, setClickIcon] = useState(false);
  const [clickNumber, setClickNumber] = useState([]);
  // const [dataList, setDataList] = useState(null);

  // useEffect(() => {
  //   axios.get("http://localhost:4000/mainContentsSeriesList").then((res) => {
  //     setDataList(res.data);
  //   });
  // }, []);

  const { data: dataList, isLoading } = useQuery("seriesList", SeriesListApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const onMouseOverButton = (e) => {
    if (isPlaying) {
      setHover(false);
    }
  };
  const onMouseOutButton = (e) => {
    if (isPlaying) {
      setHover(true);
    }
  };

  const toggleIcon = useCallback(
    (index) => {
      setClickNumber((prev) => [...prev, index]);
      setClickIcon(true);

      if (clickIcon && clickNumber.includes(index)) {
        setClickNumber(clickNumber.filter((id) => id !== index));
        setClickIcon(false);
      }
    },
    [clickIcon, clickNumber]
  );

  return (
    <Container>
      <Title>
        <strong>춘식이랑 집 꾸미기</strong>
      </Title>
      <Wrapper>
        <VideoBox>
          <VideoButton
            onClick={togglePlay}
            hover={hover}
            onMouseEnter={onMouseOverButton}
          >
            {!isPlaying ? <BsPlayFill /> : <BsFillPauseFill />}
          </VideoButton>
          <Video
            ref={videoRef}
            muted
            loop
            src={videoContents}
            type="video/mp4"
            onMouseOut={onMouseOutButton}
          />
        </VideoBox>
        <InfoBox>
          <strong>프렌즈 에브리 예이</strong>
          <span>
            프렌즈와 힙한 라이프
            <br />
            라이언 춘식이와 EveryYay!
          </span>

          <ListBox>
            {!isLoading &&
              dataList?.data.map((list, index) => (
                <List key={list.id}>
                  <ListLink to={"/"}>
                    <ListImage>
                      <img src={list.image} alt={list.title} />
                    </ListImage>
                    <ListText>
                      <ListTitle>{list.title}</ListTitle>
                      <ListPrice>
                        <span>{list.price}</span>원
                      </ListPrice>
                    </ListText>
                  </ListLink>

                  <BagButton onClick={(e) => toggleIcon(index, e)}>
                    {clickNumber.includes(index) ? <BsBagFill /> : <BsBag />}
                  </BagButton>
                </List>
              ))}
          </ListBox>
        </InfoBox>
      </Wrapper>
    </Container>
  );
};
