# test api

## Project Setup

```sh
npm install
```

## Project Start

```sh
npm run dev
```

## DB set

.env 파일의 DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATEBASE를 DB정보에 맞게 수정

## base url : http://localhost:5000/api

## user api

### 회원가입 요청

- 회원가입 요청
- url : /signIn
- methods: post
- body: { userId: string(유저아이디), userPw: string(패스워드) }
- success response: { id: number(idx), mb_id: string(유저아이디), createdAt: string(생성날짜 datatime을 포맷) }
- failure response: { reason: string(실패 사유) }

### 로그인 요청

- 로그인 요청
- url : /signUp
- methods: post
- body: { userId: string(유저아이디), userPw: string(패스워드) }
- success response: { id: number(idx), mb_id: string(유저아이디), createdAt: string(생성날짜 datatime을 포맷), accessToken: string(엑세스토큰), refreshToken: string(리프래시 토큰) }
- failure response: { reason: string(실패 사유) }
