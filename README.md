# API 연동하기 연습

- JSONPlaceholder 에서 제공해주는 연습용 API를 사용해서 이번 토이프로젝트를 진행하겠습니다.

## 사용 할 라이브러리

- Axios : Rest API를 요청하게 될 때 이를 Promise 기반으로 처리할 수 있게 해주는 라이브러리

* 간단한 사용 예시

- import axios from 'axios';
- axios get('/users/1');

- axios post('/users', {
  username : 'sangcheol LEE',
  name: 'Ian'
  })

## 작업 진행

- npx create-react-app
- npm add axios

# 작업 간 알게 된 내용들

## REST API

- 클라이언트와 서버가 소통하는 방식

* 소통방식은 여러가지이고 이걸 HTTP 메서드라고 합니다.

- GET : 데이터 조회
- POST : 데이터 등록
- PUT : 데이터 수정
- DELETE : 데이터 제거

## 컴포넌트에서 API를 요청하는 가장 기본적인 방법

- useState 와 useEffect 로 데이터 로딩하기

* API를 요청해야 할 때는 3가지 종류의 상태를 관리해야 합니다.

1.  요청의 결과
2.  로딩 상태
3.  에러

## API 통신 간 개발자 도구 Network Tab 꼭 잘 확인 할 것

- 와이파이버튼 옆 드롭다운을 누르면 인터넷 속도를 조절 할 수 있다.
- 에러의 status code를 보고싶을 땐, error쪽에 console.log(e.response.status)로 확인이 가능함.

## useReducer로 요청 상태 관리하기 !

- 기본적인 API를 요청하는 방법에선 useState를 3번이나 사용해서 요청에 관련된 상태들을 관리했는데 useReducer를 이용해서 구현 해보도록 하겠습니다.
- 코드가 좀 더 길어질 순 있으나 이렇게 했을 때 요청 관리에 대한 로직을 따로 분리해서 나중에 재사용 할 수 있다는 장점이 있다.
