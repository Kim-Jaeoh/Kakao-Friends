import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import kakaoLogo from "../../assets/logo_foot_kakao.png";
import markLogo from "../../assets/mark_info.png";

export const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Notice>해당 사이트는 클론 사이트입니다.</Notice>
        <ServiceInfo>
          <Link to="https://with.kakao.com/character/proposition">
            제휴문의
          </Link>
          <span>|</span>
          <Link to="https://with.kakao.com/character/proposition">
            고객문의
          </Link>
          <span>|</span>
          <Link to="https://with.kakao.com/character/proposition">
            이용약관
          </Link>
          <span>|</span>
          <Link to="https://with.kakao.com/character/proposition">
            <strong>개인정보처리방침</strong>
          </Link>
          <span>|</span>
          <Link to="https://with.kakao.com/character/proposition">
            지식재산권보호센터
          </Link>
        </ServiceInfo>

        <WrapInfo>
          <AboutInfo>
            <MarkInfo>
              <img src={markLogo} alt="가족친화 우수기업" />
            </MarkInfo>

            <BtnInfo to="/">
              <img src={kakaoLogo} alt="kakao" />
            </BtnInfo>
          </AboutInfo>
          <ListInfo>
            <dt>(주)카카오</dt>
            <dd>대표이사 남궁훈, 홍은택</dd>
            <dt>주소</dt>
            <dd>제주특별자치도 제주시 첨단로 242</dd>
            <dt>사업자등록번호</dt>
            <em to="">
              <dd> 120-81-47521 </dd>
            </em>
            <dt>통신판매업신고번호</dt>
            <dd>제2015 - 제주아라 - 0032호</dd>
            <dt>호스팅서비스사업자</dt>
            <dd>(주)카카오</dd>
            <dt>구매안전서비스</dt>
            <em>
              <dd>신한은행 구매안전서비스 확인</dd>
            </em>
            <dt>이메일</dt>
            <dd>friends.cs@kakaocorp.com </dd>
            <dt>고객센터</dt>
            <dd>
              1577-6263 (통화료발생)
              <br />
              전화상담 (평일 09:00~18:00)
              <br />
              카카오톡 상담 (평일 09:00~18:00)
            </dd>
          </ListInfo>
        </WrapInfo>
      </Wrapper>
    </Container>
  );
};

const Container = styled.footer`
  line-height: 18px;
  font-family: "Nanum Gothic", sans-serif !important;
  background-color: #fafafa;
`;

const Wrapper = styled.div`
  padding: 25px 16px 64px;
`;

const Notice = styled.span`
  font-size: 12px;
  color: #7a7a7a;
`;

const ServiceInfo = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  a {
    margin-right: 6px;
    font-size: 12px;
    line-height: 21px;
    color: #7a7a7a;
    letter-spacing: -0.04em;

    strong {
      color: #666;
      font-weight: bold;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  span {
    float: left;
    width: 1px;
    height: 10px;
    margin: 5px 6px 0 0;
    font-size: 1px;
    line-height: 0;
    background-color: rgba(216, 216, 216, 0.69);
    color: transparent;
  }
`;

const WrapInfo = styled.div``;

const AboutInfo = styled.div`
  overflow: hidden;
  padding-top: 28px;
  line-height: 0;
`;

const ListInfo = styled.dl`
  padding: 10px 0 8px;
  font-size: 11px;
  letter-spacing: -0.045em;
  color: #999;
  display: block;

  dt {
    float: left;
    width: 107px;
  }

  dd {
    overflow: hidden;
    display: block;
    margin-inline-start: 40px;
  }
`;

const MarkInfo = styled.span`
  float: right;
  margin-right: 2px;

  img {
    display: inline-block;
    width: 100px;
    height: 28px;
    vertical-align: top;
    aspect-ratio: auto 100 / 28;
  }
`;

const BtnInfo = styled(Link)`
  float: left;
  height: 28px;
  padding: 0 8px 0 0;

  img {
    display: inline-block;
    width: 36px;
    height: 12px;
    margin-top: 5px;
    vertical-align: top;
  }
`;
