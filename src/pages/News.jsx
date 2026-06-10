import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

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

export default function News() {
  useScrollToHash()
  const [events, setEvents] = useState([])
  const [newsList, setNewsList] = useState([])
  const [notices, setNotices] = useState([])
  const [recruits, setRecruits] = useState([])

  useEffect(() => {
    const fetch = (type, setter) =>
      supabase.from('posts').select('id, title, created_at').eq('type', type)
        .order('created_at', { ascending: false }).limit(5)
        .then(({ data }) => setter(data || []))

    fetch('event', setEvents)
    fetch('news', setNewsList)
    fetch('notice', setNotices)
    fetch('recruit', setRecruits)
  }, [])

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
                <Link to="/board/event">자세히 보기</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="news_board_header" style={{ marginTop: 40 }}>
          <h3>최근 이벤트</h3>
          <Link to="/board/event">게시글 전체보기</Link>
        </div>
        <ul className="news_list">
          {events.length === 0
            ? <li style={{ padding: '20px 10px', color: '#aaa', fontSize: 14 }}>등록된 이벤트가 없습니다.</li>
            : events.map(p => (
              <li key={p.id}>
                <Link to={`/board/event/${p.id}`}>
                  <span className="news_tag event">EVENT</span>
                  <span className="news_title">{p.title}</span>
                  <span className="news_date">{new Date(p.created_at).toLocaleDateString('ko-KR')}</span>
                </Link>
              </li>
            ))}
        </ul>
      </article>
      <hr />

      <article id="latest" className="sub_content news_section">
        <div className="news_board_header">
          <h3>최신 소식</h3>
          <Link to="/board/news">게시글 전체보기</Link>
        </div>
        <ul className="news_list">
          {newsList.length === 0
            ? <li style={{ padding: '20px 10px', color: '#aaa', fontSize: 14 }}>등록된 소식이 없습니다.</li>
            : newsList.map(p => (
              <li key={p.id}>
                <Link to={`/board/news/${p.id}`}>
                  <span className="news_tag new">NEW</span>
                  <span className="news_title">{p.title}</span>
                  <span className="news_date">{new Date(p.created_at).toLocaleDateString('ko-KR')}</span>
                </Link>
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
              {notices.length === 0
                ? <li style={{ padding: '20px 10px', color: '#aaa', fontSize: 14 }}>등록된 공지가 없습니다.</li>
                : notices.map(p => (
                  <li key={p.id}>
                    <Link to={`/board/notice/${p.id}`}>
                      <span className="news_tag notice">공지</span>
                      <span className="news_title">{p.title}</span>
                      <span className="news_date">{new Date(p.created_at).toLocaleDateString('ko-KR')}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div style={{ flex: 1 }} id="recruit">
            <div className="news_board_header"><h3>채용 공고</h3><Link to="/board/recruit">전체보기</Link></div>
            <ul className="news_list">
              {recruits.length === 0
                ? <li style={{ padding: '20px 10px', color: '#aaa', fontSize: 14 }}>등록된 채용공고가 없습니다.</li>
                : recruits.map(p => (
                  <li key={p.id}>
                    <Link to={`/board/recruit/${p.id}`}>
                      <span className="news_tag recruit">채용</span>
                      <span className="news_title">{p.title}</span>
                      <span className="news_date">{new Date(p.created_at).toLocaleDateString('ko-KR')}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </article>
    </section>
  )
}
