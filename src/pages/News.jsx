import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

function useScrollToHash() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [hash])
}

const EVENTS = [
  { img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80', tag: '2024 SUMMER EVENT', title: '여름 신메뉴 출시\n20% 할인' },
  { img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80', tag: 'ANNIVERSARY EVENT', title: '창립 14주년\n기념 쿠폰 증정' },
  { img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80', tag: 'NEW STORE OPEN', title: '강남 플래그십\n스토어 오픈' },
]

const NEWS_LIST = [
  { tag: 'new',    title: '[신메뉴] 2024 여름 시그니처 5종 출시 — 망고 스무디, 코코넛 라떼 외', date: '2024.06.01', day: 'D-14' },
  { tag: 'event',  title: '[이벤트] 창립 14주년 기념 전 음료 20% 할인 · 앱 쿠폰 증정',           date: '2024.05.28', day: 'D-7' },
  { tag: 'notice', title: '[공지] 하절기 일부 매장 영업시간 연장 안내 (08:00 ~ 23:00)',          date: '2024.05.20', day: 'D-1' },
  { tag: 'new',    title: '[신규 오픈] 강남 플래그십 스토어 6월 15일 그랜드 오픈',               date: '2024.05.15', day: 'D-28' },
  { tag: 'event',  title: '[이벤트] SNS 인증샷 이벤트 — 음료 1잔 무료 증정',                    date: '2024.05.10', day: 'D-30' },
]

const NOTICES = [
  { text: '하절기 영업시간 변경 안내',        date: '2024.05.20' },
  { text: '앱 정기점검 안내 (6/5 새벽 2~4시)', date: '2024.05.18' },
  { text: '일부 매장 리뉴얼 오픈 공지',       date: '2024.05.10' },
  { text: '개인정보 처리방침 개정 안내',       date: '2024.04.30' },
]

const RECRUITS = [
  { text: '[바리스타] 강남 플래그십 바리스타 모집 (경력·신입)', date: '~2024.06.30' },
  { text: '[홀서빙] 전국 매장 파트타임 홀 직원 모집',           date: '~2024.06.30' },
  { text: '[본사] 마케팅팀 디지털 마케터 경력직 모집',          date: '~2024.06.15' },
  { text: '[해외] 일본 도쿄 매장 한국어 가능 바리스타 모집',    date: '~2024.07.31' },
]

const TAG_LABEL = { notice: '공지', event: 'EVENT', new: 'NEW', recruit: '채용' }

export default function News() {
  useScrollToHash()
  return (
    <section>
      <h2 className="sr-only">회사소식 페이지</h2>
      <div className="sub_banner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="banner_text wow animated">
          <h2>News &amp; Event</h2>
          <p>AZURE CAFÉ 새로운 소식</p>
        </div>
      </div>

      <article id="event" className="sub_content">
        <h2>이벤트</h2>
        <div className="event_banner_wrap">
          {EVENTS.map(e => (
            <div key={e.tag} className="event_card" style={{ backgroundImage: `url('${e.img}')` }}>
              <div className="event_info">
                <p>{e.tag}</p>
                <h3>{e.title}</h3>
                <a href="#">자세히 보기</a>
              </div>
            </div>
          ))}
        </div>
      </article>
      <hr />

      <article id="latest" className="sub_content news_section">
        <div className="news_board_header">
          <h3>최신 소식</h3>
          <Link to="/board/news">게시글 전체보기</Link>
        </div>
        <ul className="news_list">
          {NEWS_LIST.map(n => (
            <li key={n.title}>
              <a href="#">
                <span className={`news_tag ${n.tag}`}>{TAG_LABEL[n.tag]}</span>
                <span className="news_title">{n.title}</span>
                <span className="news_date">{n.date}</span>
                <span className="news_day">{n.day}</span>
              </a>
            </li>
          ))}
        </ul>
      </article>
      <hr />

      <article className="sub_content" style={{ paddingTop: 60 }}>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }} id="notice">
            <div className="news_board_header"><h3>공지사항</h3><Link to="/board/notice">전체보기</Link></div>
            <ul className="news_list">
              {NOTICES.map(n => (
                <li key={n.text}>
                  <a href="#">
                    <span className="news_tag notice">공지</span>
                    <span className="news_title">{n.text}</span>
                    <span className="news_date">{n.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: 1 }} id="recruit">
            <div className="news_board_header"><h3>채용 공고</h3><Link to="/board/recruit">전체보기</Link></div>
            <ul className="news_list">
              {RECRUITS.map(r => (
                <li key={r.text}>
                  <a href="#">
                    <span className="news_tag recruit">채용</span>
                    <span className="news_title">{r.text}</span>
                    <span className="news_date">{r.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </section>
  )
}
