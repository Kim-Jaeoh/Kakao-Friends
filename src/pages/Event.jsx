import React from "react";
import styled from "@emotion/styled";
import { FiHome } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { HalloweenApi } from "../apis/dataApi";
import { useQuery } from "react-query";
import { RouterHeader } from "../components/header/RouterHeader";

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  position: relative;
  z-index: 20;
  position: sticky;
  top: 0;
  background-color: #fff;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 12px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  svg {
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderName = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-weight: 700;

  img {
    display: block;
    width: 100%;
  }
`;

const VideoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #000;
`;

const Video = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ImageBox = styled.div`
  background-color: #fff;

  img {
    display: block;
    width: 100%;
  }
`;

const InfoTextBox = styled.div`
  padding: 26px 20px 29px;
  background-color: #f6f6f6;

  strong {
    display: block;
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.021em;
    color: #000;
  }
`;

const InfoText = styled.ul`
  padding-top: 9px;
`;

export const Event = () => {
  const { data: dataList, isLoading } = useQuery("halloween", HalloweenApi, {
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e.message),
  });

  return (
    <>
      <Container>
        <RouterHeader title={"이벤트"} />

        {dataList && (
          <>
            <VideoBox>
              <Video
                loop
                autoPlay
                muted
                playsInline
                src={dataList?.data[0].video}
                type="video/mp4"
              />
            </VideoBox>
            <ImageBox>
              <img
                src={dataList?.data[0].img1}
                alt="라이언과 춘식이 할로윈캠핑 브릭피규어세트"
              />
              <img src={dataList?.data[0].btn1} alt="구매하기" />
              <img
                src={dataList?.data[0].img2}
                alt="온라인 전용 할로윈 유령 춘식이 피규어 키링"
              />
              <img src={dataList?.data[0].btn2} alt="구매하기" />
              <img
                src={dataList?.data[0].img3}
                alt="카카오프렌즈 할로윈 기프트 할로윈 LED 가랜드 증정"
              />
              <img src={dataList?.data[0].btn3} alt="더 많은 상품 보러가기" />
              <img src={dataList?.data[0].img4} alt="별다꾸 스티커" />
              <img src={dataList?.data[0].btn4} alt="자세히 알아보기" />
            </ImageBox>
            <InfoTextBox>
              <strong>유의사항</strong>
              <InfoText>
                {"<"}할로윈 LED 가랜드 증정 이벤트 유의사항{">"}
                <li>∙ 증정 기간 : 2022.10. 07 ~ 기프트 소진 시</li>
                <li>
                  ∙ 할로윈 스페셜 기프트 ‘카카오프렌즈 LED 가랜드’는 주문 건당
                  합산 금액 5만 원 이상 시 증정됩니다.
                </li>
                <li>
                  ∙ 본 이벤트는 카카오프렌즈 온라인 스토어 및 17개 오프라인
                  스토어 구매 시 적용됩니다.
                </li>
                <li>
                  ∙ 할로윈 LED 가랜드 이벤트 적용 오프라인 스토어 : 카카오프렌즈
                  강남 플래그십 스토어, 카카오프렌즈 홍대 플래그십 스토어, 홍대
                  팩토리 스토어, 카카오프렌즈 부산 플래그십 스토어, 롯데월드몰
                  잠실점, 롯데 영플라자 명동점, 롯데 프리미엄 아울렛 기흥점,
                  신세계 백화점 동대구점, 스타필드 코엑스점, 스타필드 고양점,
                  DDP 동대문점, 영등포 타임스퀘어점, 수원 AK점, 대전 갤러리아
                  타임월드점, 전주 한옥마을점, JPC 제주 프리미엄 전문점, 판교
                  사내 스토어
                </li>
                <li>∙ 본 이벤트는 카카오쇼핑 회원 대상에게만 적용됩니다.</li>
                <li>
                  ∙ 기프트 증정 적용된 주문 건 반품 시 기프트도 함께 회수 조치
                  됩니다.
                </li>
                <li>∙ 사은품에 건전지는 포함되어 있지 않습니다.</li>
                <li>
                  ∙ 사은품 구성 중 '종이 가랜드'는 여분으로 1세트가 추가
                  증정됩니다.
                </li>
              </InfoText>
            </InfoTextBox>
          </>
        )}
      </Container>
    </>
  );
};
