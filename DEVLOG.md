# DEVLOG — AZURE CAFÉ React 버전

---

## 2026.06.10

### 리포지토리 및 폴더명 변경

- 기존 HTML/CSS/JS 버전(`rest04-1`) 리포 및 로컬 폴더 삭제
- React 버전 리포명 변경: `rest04-react` → `rest04-1`
- 로컬 폴더명 변경: `rest04-react` → `rest04-01`
- git remote URL 업데이트: `https://github.com/yong275/rest04-1.git`
- 배포 URL 변경: `yong275.github.io/rest04-react` → `yong275.github.io/rest04-1`
- `README.md`, `package.json`, `package-lock.json` 내 `rest04-react` 참조 → `rest04-1` 일괄 수정

---

## 2026.06.10 — Supabase 연동 / 로그인 / 게시판 구현

### 기술 스택 추가
- `@supabase/supabase-js` 설치
- Supabase 프로젝트 연결 (zlmzsmjkdkrbolgqnumu)
- 인증 방식: PKCE flow (GitHub Pages + HashRouter 호환)

### 인증 (Auth)
- `src/lib/supabase.js` — Supabase 클라이언트 생성
- `src/contexts/AuthContext.jsx` — 전역 로그인 상태 관리 (useContext)
- `src/pages/Login.jsx` — 이메일/비밀번호 로그인 + 카카오 OAuth 로그인
- `src/pages/Register.jsx` — 이메일 회원가입 (가입 후 자동 로그인)
- `src/components/ProtectedRoute.jsx` — 비로그인 시 /login 리다이렉트
- 헤더 lnb에 LOGIN / LOGOUT 버튼 추가 (로그인 상태에 따라 전환)

### 게시판 (Board)
- Supabase `posts` 테이블 생성 (type, title, content, author_id, author_email, created_at)
- RLS 정책: 전체 읽기 허용 / 로그인 사용자만 작성 / 작성자만 삭제
- `src/pages/Board.jsx` — 게시판 목록 (이벤트 / 최신소식 / 공지사항 / 채용공고)
- `src/pages/BoardDetail.jsx` — 게시글 상세 + 작성자 본인 삭제 기능
- `src/pages/BoardWrite.jsx` — 게시글 작성 (로그인 필요)
- `src/pages/News.jsx` — 전체보기 링크를 게시판 페이지로 연결
- 헤더 회사소식 드롭다운 서브메뉴를 각 게시판 페이지로 연결

### 라우팅 추가
- `/login`, `/register`
- `/board/:type` — 게시판 목록
- `/board/:type/write` — 글쓰기 (보호된 라우트)
- `/board/:type/:id` — 게시글 상세
