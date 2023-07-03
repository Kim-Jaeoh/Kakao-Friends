# Kakao-Friends clone

<br>

![](https://velog.velcdn.com/images/rlawodh123/post/c5c8f447-cdc6-41bc-bd1e-0e0c5ee8bedb/image.png)

<br>

> 😎 [클론 사이트 바로가기](https://kakao-friend-dev.netlify.app/)<br>
> [🔍 자세한 내용 보러가기 (velog 포스팅)](https://velog.io/@rlawodh123/series/%EC%B9%B4%EC%B9%B4%EC%98%A4-%ED%94%84%EB%A0%8C%EC%A6%88%EC%83%B5-%ED%81%B4%EB%A1%A0)<br>
> [📌 카카오 프렌즈샵](https://store.kakaofriends.com/home)

<br>

## 📋 프로젝트

>

- 장바구니, 구매 (결제)가 가능한 스토어샵을 목표로 카카오 프렌즈샵을 클론하여 코딩해보았습니다. 모바일 기준으로 제작된 웹앱과 깔끔한 UI로 구성되어 있었고, 장바구니와 구매 api를 통해 온라인 스토어를 구현해보면 재미있을 것 같은 생각이 들어서 작업하게 되었습니다.
  - 현재 카카오 프렌즈샵 사이트의 레이아웃이 변경되어 클론된 사이트와 차이가 있을 수 있습니다.

<br>

## 🛠️ 사용 기술

- `React`, `Emotion-Styled`
- `Redux`, `React-Query`, `Axios`, `Mui`, `Flicking`
- `Express (제품 리스트)`, `Firebase (장바구니, 주문 내역)`, `Kakao Api (계정, 카카오페이)`
- Deploy : `Netlify (Front)`, `CloudType (Back)`

<br>

## **✨ 전체 기능 및 특징**

- `Mui` 사용해 햄버거 메뉴 모달 및 아코디언 카테고리 구현
- `Kakao API` 사용하여 로그인/로그아웃, 카카오페이 구현
- 제품 리스트 기존 `JSON-SERVER`에서 배포를 위해 `Express`로 마이그레이션
- 검색창
  - 검색(타이핑)하는 텍스트의 색상을 표시
  - 검색된 목록 클릭 시 해당 제품으로 이동
  - 쿼리 스트링 사용하여 필요한 데이터 받음
- 캐러셀(슬라이드) 라이브러리 `Flicking` 사용
- video 태그의 controls 사용이 아닌 커스텀으로 구현 (간단하게 재생/정지만 구현)
- `Redux`, `Firebase` 사용해 장바구니 추가/삭제 및 상품 구매 구현
  - 수량 변경 가능
  - 부분/전체 체크 및 삭제 가능
- 무한 스크롤
- `useMutation`을 사용해 상품 구매 과정을 거치고 나면 구매된 수량만큼 잔여 수량 조정
- 추천 상품 랜덤으로 노출
- `localStorage` 사용하여 최근 본 상품 노출

<br>

## 💫 페이지별 기능 및 특징

<details>
<summary>홈</summary>
<div markdown="1">

[홈 링크](https://velog.io/@rlawodh123/React-%EC%B9%B4%EC%B9%B4%EC%98%A4-%ED%94%84%EB%A0%8C%EC%A6%88%EC%83%B5-%ED%81%B4%EB%A1%A0-%EC%BD%94%EB%94%A9-2#span-stylecolor-ff2f6e-%EA%B8%B0%EB%8A%A5-%EB%B0%8F-%ED%8A%B9%EC%A7%95span)

- 햄버거 메뉴 모달 `[mui-Drawer](https://mui.com/material-ui/react-drawer/)` 사용
  - 아코디언 카테고리는 `[mui-Accordion](https://mui.com/material-ui/react-accordion/)`을 사용
- 카카오 계정 로그인/로그아웃
- 검색창
  - 검색(타이핑)하는 텍스트의 색상을 표시
  - 검색된 목록 클릭 시 해당 제품으로 이동
  - 쿼리 스트링 사용하여 필요한 데이터 받기
- 캐러셀(슬라이드) 라이브러리 `[flicking](https://naver.github.io/egjs-flicking/ko/docs/next)` 사용
- video 태그의 controls 사용이 아닌 커스텀으로 구현 (간단하게 재생/정지만 구현함)
- 장바구니 추가/삭제
  - 수량 변경 가능 (다른 글에서 설명 예정)
- 사이즈에 따라 레이아웃 변경

</div>
</details>

<details>
<summary>프로모션</summary>
<div markdown="2">

[프로모션 링크](https://velog.io/@rlawodh123/React-%EC%B9%B4%EC%B9%B4%EC%98%A4-%ED%94%84%EB%A0%8C%EC%A6%88%EC%83%B5-%ED%81%B4%EB%A1%A0-%EC%BD%94%EB%94%A9-%ED%94%84%EB%A1%9C%EB%AA%A8%EC%85%98)

- 배너 클릭 시 해당 배너의 id 값을 url에 담고, 그 값에 맞는 프로모션 노출

</div>
</details>

<details>
<summary>상품</summary>
<div markdown="3">

[상품 링크](https://velog.io/@rlawodh123/React-%EC%B9%B4%EC%B9%B4%EC%98%A4-%ED%94%84%EB%A0%8C%EC%A6%88%EC%83%B5-%ED%81%B4%EB%A1%A0-%EC%BD%94%EB%94%A9-%EC%83%81%ED%92%88)

- 무한 스크롤 적용
- 실시간 / 스테디 탭으로 구분
  - '실시간' 탭은 사용자가 구매 과정을 거치고 나면 구매된 수량만큼 잔여 수량을 조정하여 인기순처럼 정렬
- 장바구니 추가/삭제

</div>
</details>

<details>
<summary>상세 페이지</summary>
<div markdown="4">

[상세 페이지 링크](https://velog.io/@rlawodh123/React-%EC%B9%B4%EC%B9%B4%EC%98%A4-%ED%94%84%EB%A0%8C%EC%A6%88%EC%83%B5-%ED%81%B4%EB%A1%A0-%EC%BD%94%EB%94%A9-%EC%83%81%EC%84%B8-%ED%8E%98%EC%9D%B4%EC%A7%80)

- 클릭된 상품으로 라우터 이동
- 추천 상품 랜덤으로 노출
- 최근 본 상품 노출
- 상품 구매 및 수량 선택 가능
  - 카카오페이 API를 사용하여 구매 구현
- 장바구니 추가/삭제

</div>
</details>

<details>
<summary>마이</summary>
<div markdown="5">

[상세 페이지 링크](https://velog.io/@rlawodh123/React-%EC%B9%B4%EC%B9%B4%EC%98%A4-%ED%94%84%EB%A0%8C%EC%A6%88%EC%83%B5-%ED%81%B4%EB%A1%A0-%EC%BD%94%EB%94%A9-%EB%A7%88%EC%9D%B4)

- 최근 본 상품 노출
  - 부분/전체 삭제 가능
- 장바구니 추가/삭제
  - 부분/전체 체크 및 삭제 가능
  - 수량 변경 가능
  - 장바구니에 담긴 금액이 3만원 이하 시 배송비 포함
- 상품 구매
  - 구매 시 장바구니에 담겨져 있던 상품 제거
- 추천 상품 랜덤으로 노출
- 주문내역에서 구매한 상품들 확인 가능

</div>
</details>
