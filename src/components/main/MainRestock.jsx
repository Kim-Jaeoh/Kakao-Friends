import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { useHandleISize } from "../../hooks/useHandleISize";
import { AiOutlineBell, AiFillBell } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useQuery } from "react-query";
import { RestockListApi } from "../../apis/dataApi";
import { useBasketToggle } from "../../hooks/useBasketToggle";

const Container = styled.div`
  /* position: relative; */
`;

const Title = styled.div`
  position: relative;
  margin-top: 58px;
  padding: 0 20px 20px;
  text-align: left;
  font-size: 0;

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

  a {
    position: absolute;
    right: 20px;
    font-size: 14px;
    line-height: 16px;
    padding: 7px 0;
    color: #747475;

    svg {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-top: 1px;
      vertical-align: top;
    }
  }
`;

const SliderBox = styled.div`
  position: relative;
  padding: 0 14px;
  box-sizing: border-box;

  ::after {
    @media screen and (min-width: 640px) {
      display: ${(props) => (props.visible2 ? "block" : "none")};
      position: absolute;
      right: 0;
      top: 0;
      z-index: 10;
      width: 100px;
      height: 100%;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
      content: "";
    }
  }

  ::before {
    @media screen and (min-width: 640px) {
      display: ${(props) => (props.visible ? "block" : "none")};

      position: absolute;
      left: -20px;
      top: 0;
      z-index: 10;
      width: 100px;
      height: 100%;
      background: linear-gradient(to right, white, rgba(255, 255, 255, 0));
      content: "";
    }
  }
`;

const ListBox = styled.div`
  overflow: hidden;
  position: relative;
  width: 186px;
  height: 248px;
  margin: 0 6px;
  border: 1px solid #dedfe0;
  border-radius: 10px;
  box-sizing: border-box;
  user-select: none;

  @media screen and (min-width: 640px) {
    margin: 0 7px;
  }

  a {
    display: block;
    padding-bottom: 13px;

    img {
    }
  }
`;

const ListImage = styled.img`
  display: block;
  width: 100%;
`;

const ListTitle = styled.span`
  display: block;
  display: -webkit-box;
  overflow: hidden;
  max-height: 40px;
  margin: 8px 43px 0 13px;
  font-size: 16px;
  line-height: 20px;
  color: #747475;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const BellButton = styled.button`
  position: absolute;
  bottom: 0;
  height: 62px;
  right: 0;
  z-index: 1;
  width: 44px;

  svg {
    width: 24px;
    height: 24px;
    margin: 0 12px 5px 8px;
    color: #909092;
  }
`;

const ArrowBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 -12px;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  user-select: none;
`;

const ArrowButton = styled.button`
  background: rgb(255, 255, 255, 0.8);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transform: translateY(-50%);
  z-index: 100;
  position: relative;
  transition: all 0.2s ease;

  &:first-of-type {
    opacity: ${(props) => (props.visible ? "1" : "0")};
    display: ${(props) => (props.visible ? "1" : "0")};
    margin-left: 20px;
  }

  &:last-of-type {
    opacity: ${(props) => (props.visible2 ? "1" : "0")};
    display: ${(props) => (props.visible ? "1" : "0")};
    margin-right: 20px;
  }

  svg {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MainRestock = () => {
  const flickingRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [clickIcon, setClickIcon] = useState(false);
  const [clickNumber, setClickNumber] = useState([]);
  // const [dataList, setDataList] = useState(null);

  // useEffect(() => {
  //   axios.get("http://localhost:4000/mainRestockList").then((res) => {
  //     setDataList(res.data);
  //   });
  // }, []);

  const { data: dataList, isLoading } = useQuery("restock", RestockListApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  const { resize } = useHandleISize(); // 사이즈 체크 커스텀 훅

  const flickingOnChange = (e) => {
    setSlideIndex(e);
  };

  // 이미지 변경 시마다 리렌더링
  useEffect(() => {
    moveToFlicking(slideIndex);
    // console.log(flickingRef.current.threshold);
  }, [slideIndex]);

  // 슬라이드 변경 (주어진 인덱스에 해당하는 패널로 이동)
  const moveToFlicking = async (index) => {
    const flicking = flickingRef.current;
    if (!flicking) {
      return;
    }

    // 무분별하게 이동 시 "Animation is already playing." 에러 뜨는 거 방지
    await flicking.moveTo(index).catch((e) => {
      return;
    });
  };

  const onClickArrowBackButton = () => {
    // 무분별하게 클릭할 경우 아이콘 엉키는 거 방지
    if (flickingRef.current.animating === true) {
      return;
    }
    if (slideIndex !== 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const onClickArrowForwardButton = () => {
    // 무분별하게 클릭할 경우 아이콘 엉키는 거 방지
    if (flickingRef.current.animating === true) {
      return;
    }
    if (slideIndex !== dataList?.data.length - 3) {
      setSlideIndex(slideIndex + 1);
    }
  };

  useEffect(() => {
    if (slideIndex === 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    if (slideIndex === dataList?.data.length - 3) {
      setVisible2(false);
    } else {
      setVisible2(true);
    }
  }, [dataList?.data, slideIndex]);

  const { toggleIcon, currentBasKet } = useBasketToggle();

  return (
    <Container>
      <Title>
        <strong>다시 놓치지 않을 거예요</strong>
        <Link to="/">
          더보기
          <IoIosArrowForward />
        </Link>
      </Title>
      <SliderBox visible={visible} visible2={visible2}>
        {!resize && (
          <ArrowBox>
            <ArrowButton onClick={onClickArrowBackButton} visible={visible}>
              <IoIosArrowBack />
            </ArrowButton>
            <ArrowButton
              onClick={onClickArrowForwardButton}
              visible2={visible2}
            >
              <IoIosArrowForward />
            </ArrowButton>
          </ArrowBox>
        )}
        <Flicking
          duration={500}
          autoResize={true}
          autoInit={true}
          ref={flickingRef}
          changeOnHold={false}
          moveType={"strict"}
          onChange={flickingOnChange}
          onChanged={(e) => {
            setSlideIndex(e.index);
          }}
          bound={true}
          align={"prev"}
        >
          {!isLoading &&
            dataList?.data.map((list, index) => (
              <div key={list.id}>
                <ListBox>
                  <Link to={`/detail/${list.product}`}>
                    <ListImage src={list.image} alt={list.title} />
                    <ListTitle>{list.title}</ListTitle>
                  </Link>
                  <BellButton onClick={(e) => toggleIcon(list, index)}>
                    {currentBasKet?.filter(
                      (obj) => obj.product === list.product
                    ).length > 0 ? (
                      <AiFillBell />
                    ) : (
                      <AiOutlineBell />
                    )}
                  </BellButton>
                </ListBox>
              </div>
            ))}
        </Flicking>
      </SliderBox>
    </Container>
  );
};
