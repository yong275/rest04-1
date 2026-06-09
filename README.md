# AZURE CAFÉ — React 버전

> React + Vite로 재구현한 카페 브랜드 소개 사이트

🌐 **배포 주소**: https://yong275.github.io/rest04-react/

---

## 개발일지

### 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | AZURE CAFÉ React 버전 |
| 개발 기간 | 2024.06 |
| 사용 기술 | React 18, Vite, React Router v6 |
| 원본 참고 | rest04-1 (HTML/CSS/JS 버전) |
| 배포 방법 | GitHub Actions → GitHub Pages |

---

### HTML 버전 → React 전환 비교

| 항목 | HTML 버전 | React 버전 |
|------|-----------|------------|
| 라우팅 | 파일별 `.html` | React Router HashRouter |
| 헤더/푸터 | 5개 파일에 중복 작성 | 컴포넌트 1개 재사용 |
| active 상태 | `class="active"` 수동 | `NavLink` 자동 처리 |
| 데이터 관리 | HTML에 하드코딩 | 배열/객체로 분리 |
| 페이지 이동 | `<a href>` 새로고침 | `<Link>` SPA 이동 |
| 빌드 | 없음 | `npm run build` |

---

### 컴포넌트 구조

```
src/
├── main.jsx              # 진입점 (HashRouter)
├── App.jsx               # Routes 설정
├── styles/global.css     # 전체 CSS
├── components/
│   ├── Header.jsx        # GNB 드롭다운, NavLink 활성화
│   └── Footer.jsx        # 사이트맵 toggle (useState)
└── pages/
    ├── Home.jsx          # 모자이크 그리드
    ├── Company.jsx       # 대표 인사말, 연혁, Vision
    ├── Menu.jsx          # 음료/디저트 카드, 시즌 메뉴 표
    ├── Franchise.jsx     # 혜택 카드, 프로세스, 비용 표
    └── News.jsx          # 이벤트 카드, 게시판, 공지/채용
```

---

### 컬러 시스템

| 역할 | HEX |
|------|-----|
| 주 컬러 (라이트 블루) | `#87CEEB` |
| 포인트 (웜 코랄) | `#E8956D` |
| 배경 (크림) | `#FFF8F0` |
| 보조 (딥 블루) | `#4A90A4` |
| 보조 (커피 브라운) | `#8B6355` |

---

### 개발 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

---

*본 프로젝트는 포트폴리오 목적으로 제작되었습니다.*
