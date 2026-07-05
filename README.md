# 유통/서비스실행그룹 MBTI 대시보드

유통/서비스실행그룹 구성원이 닉네임으로 MBTI 테스트를 진행하고 전체 결과를 대시보드에서 확인하는 Next.js 앱입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

로컬 기본값은 `NEXT_PUBLIC_STORAGE_MODE=local`입니다. 이 모드에서는 브라우저 `localStorage`가 테스트용 DB처럼 동작하므로 별도 DB가 필요 없습니다.

## 무료 호스팅 + 중앙 DB 배포

Vercel 무료 호스팅과 Neon, Supabase, Vercel Postgres 같은 무료 Postgres DB를 사용할 수 있습니다.

1. 무료 Postgres 프로젝트를 만들고 접속 문자열을 발급합니다.
2. Vercel 프로젝트 환경변수에 아래 값을 등록합니다.

```bash
NEXT_PUBLIC_STORAGE_MODE=postgres
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB?sslmode=require
```

3. 배포하면 API 라우트가 `results` 테이블을 자동 생성합니다.

닉네임은 `UNIQUE`로 처리됩니다. 같은 닉네임이 다시 제출되면 기존 결과를 새 결과로 갱신합니다.
