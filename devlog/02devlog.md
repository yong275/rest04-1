# DEVLOG 02 — AZURE CAFÉ React 버전

---

## 2026.06.10 — DB 테이블 분리 / 이벤트 캐러셀 / 카카오 로그인 수정

### DB 테이블 분리
- 기존 `posts` 단일 테이블(type 컬럼 구분) → 게시판별 테이블로 분리
  - `event_posts`, `news_posts`, `notice_posts`, `recruit_posts`
- 각 테이블 RLS 정책 적용: 전체 읽기 / 로그인 사용자 작성 / 작성자 삭제
- 기존 데이터 마이그레이션 후 `posts` 테이블 삭제
- `image_url` 컬럼 추가 (이벤트 카드 배경 이미지용)
- `Board.jsx`, `BoardDetail.jsx`, `BoardWrite.jsx`, `News.jsx` 테이블명 매핑 처리

### 시드 데이터 삽입
- 기존 프론트엔드 하드코딩 데이터를 Supabase에 실제 데이터로 이전
  - 이벤트 3건 (이미지 URL 포함)
  - 최신소식 5건
  - 공지사항 4건
  - 채용공고 4건

### 이벤트 캐러셀
- `News.jsx` 이벤트 섹션 — 좌우 화살표 버튼으로 슬라이드 이동
- 3개씩 표시, 이벤트 3개 초과 시 화살표 및 dot 인디케이터 노출
- 이미지 URL 없을 시 그라디언트 배경 fallback 적용
- `BoardWrite.jsx` 이벤트 글쓰기 시 이미지 URL 입력 필드 추가

### News 페이지 실데이터 연동
- 기존 하드코딩 데이터 제거 → Supabase 실데이터 페치로 전환
- 각 섹션(이벤트/최신소식/공지사항/채용공고) 최신 5건 표시
- 게시글 클릭 시 `/board/:type/:id` 상세 페이지 이동

### 카카오 로그인 수정
- `scopes` 옵션 대신 `queryParams: { scope: 'profile' }` 방식으로 변경
- `account_email` 스코프 요청 제거 → 비즈니스 인증 없이 카카오 로그인 동작

### 배포 환경 개선
- GitHub Secrets에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 등록
- GitHub Actions 워크플로우에 환경변수 주입 설정
- 배포 전 빌드 확인 및 번들 내 환경변수 주입 여부 검증 프로세스 수립
