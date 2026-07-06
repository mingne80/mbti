# PROJECT NOTES

## 프로젝트 개요

유통/서비스실행그룹 구성원이 닉네임으로 MBTI 테스트를 진행하고, 전체 결과를 대시보드에서 확인하는 Next.js 앱입니다.

- 로컬 테스트: 현재 기기 임시 저장 방식
- 배포 운영: Vercel + 공유 저장소 환경변수 사용
- GitHub 저장소: https://github.com/mingne80/mbti

## 주요 기능

- `/` 닉네임 입력 및 테스트 시작
- `/test` 20문항 MBTI 테스트
- `/result` 개인 결과 카드 표시 및 결과 저장
- `/dashboard` 구성원 결과, MBTI 별명, 부서 분포 차트 표시
- `/types/[type]` MBTI별 상세 카드 설명 페이지
- `/admin` 관리자 페이지
  - 비밀번호: `rhksflwk01!`
  - 등록 결과 선택 삭제
  - 페이지 접근 로그 20건 단위 페이징 조회
  - 전체 접근 수 및 닉네임 없음 접근 수 표시

## 저장 방식

로컬에서는 브라우저에 임시 저장합니다. 배포에서는 Vercel 환경변수로 공유 저장소를 연결합니다.

필요 환경변수:

```text
NEXT_PUBLIC_STORAGE_MODE=postgres
DATABASE_URL=발급받은_접속_문자열
ADMIN_PASSWORD=rhksflwk01!
```

사용자 화면에는 기술 용어가 보이지 않도록 `공유 저장소`, `현재 기기 임시 저장` 같은 문구를 사용합니다.

## 접근 로그 기준

모든 페이지 진입 시 로그를 기록합니다.

기록 항목:

- 접근 시간
- 페이지 경로
- 닉네임
- 접속 주소
- 브라우저 정보

닉네임 기준:

- 사용자가 첫 화면에서 닉네임을 입력한 뒤부터 같은 브라우저 세션에서 기록됩니다.
- 첫 방문처럼 아직 닉네임을 입력하지 않은 경우 `닉네임 없음`으로 집계됩니다.

## 주요 파일

- `app/page.tsx`: 닉네임 입력 화면
- `app/test/page.tsx`: 테스트 화면
- `app/result/page.tsx`: 개인 결과 화면
- `app/dashboard/page.tsx`: 대시보드
- `app/admin/page.tsx`: 관리자 페이지
- `app/types/[type]/page.tsx`: MBTI 상세 설명 페이지
- `app/api/results/route.ts`: 결과 저장/조회/삭제 API
- `app/api/stats/route.ts`: 통계 API
- `app/api/access-logs/route.ts`: 접근 로그 API
- `components/AccessLogger.tsx`: 페이지 진입 로그 기록 컴포넌트
- `components/DonutChart.tsx`: 도넛 차트 컴포넌트
- `lib/questions.ts`: 테스트 문항 및 채점 로직
- `lib/mbtiProfiles.ts`: MBTI별 별명, 이미지, 설명
- `lib/clientStore.ts`: 로컬/배포 저장소 분기 클라이언트 로직
- `lib/serverDb.ts`: 공유 저장소 테이블 생성 및 조회/저장 로직
- `lib/types.ts`: 공통 타입

## 검증 명령

```bash
npm.cmd run lint
npm.cmd run build
```

최근 확인 기준으로 둘 다 통과했습니다.

## 최근 작업 커밋

```text
61ecffd Track anonymous access log count
33cb917 Add admin access logs
c6827f3 Add MBTI profile pages
85c94f3 Enhance MBTI result and dashboard labels
7bf1c69 Clarify dashboard chart totals
eefbbb0 Add admin result deletion
```

## 다음에 이어서 작업할 때 참고

새 세션에서 아래처럼 말하면 맥락 복구가 쉽습니다.

```text
C:\DEV\project1\mbti 프로젝트야.
GitHub repo는 mingne80/mbti고, Vercel에 배포된 MBTI 대시보드 앱이야.
PROJECT_NOTES.md를 먼저 읽고 이어서 작업해줘.
```
