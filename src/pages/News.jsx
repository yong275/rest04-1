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

const EVENT_GRADIENTS = [
  'linear-gradient(135deg, #1a5272 0%, #87CEEB 100%)',
  'linear-gradient(135deg, #5a3a2a 0%, #c4956a 100%)',
  'linear-gradient(135deg, #2a3a4a 0%, #5a7080 100%)',
  'linear-gradient(135deg, #3a1a5a 0%, #a070c0 100%)',
  'linear-gradient(135deg, #1a3a1a 0%, #4a8a4a 100%)',
]

const VISIBLE = 3

export default function News() {
  useScrollToHash()
  const [events, setEvents] = useState([])
  const [eventIdx, setEventIdx] = useState(0)
  const [newsList, setNewsList] = useState([])
  const [notices, setNotices] = useState([])
  const [recruits, setRecruits] = useState([])

  useEffect(() => {
    const fetchPosts = (type, setter, limit = 5) =>
      supabase.from('posts').select('id, title, created_at, image_url')
        .eq('type', type).order('created_at', { ascending: false }).limit(limit)
        .then(({ data }) => setter(data || []))

    fetchPosts('event', setEvents, 20)
    fetchPosts('news', setNewsList)
    fetchPosts('notice', setNotices)
    fetchPosts('recruit', setRecruits)
  }, [])

  const canPrev = eventIdx > 0
  const canNext = eventIdx + VISIBLE < events.length
  const visibleEvents = events.slice(eventIdx, eventIdx + VISIBLE)

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
        <div className="news_board_header">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: 'var(--point)' }}>이벤트</h2>
          <Link to="/board/event">게시글 전체보기</Link>
        </div>
        {events.length === 0 ? (
          <p className="board_empty">등록된 이벤트가 없습니다.</p>
        ) : (
          <div className="event_carousel" style={{ marginTop: 30 }}>
            {canPrev && (
              <button className="carousel_btn prev" onClick={() => setEventIdx(i => i - 1)}>
                <i className="fa-solid fa-chevron-left" />
              </button>
            )}
            <div className="event_banner_wrap">
              {visibleEvents.map((e, i) => (
                <Link
                  key={e.id}
                  to={`/board/event/${e.id}`}
                  className="event_card"
                  style={{ backgroundImage: e.image_url ? `url('${e.image_url}')` : EVENT_GRADIENTS[(eventIdx + i) % EVENT_GRADIENTS.length] }}
                >
                  <div className="event_info">
                    <p>{new Date(e.created_at).toLocaleDateString('ko-KR')}</p>
                    <h3>{e.title}</h3>
                    <span className="event_more_btn">자세히 보기</span>
                  </div>
                </Link>
              ))}
            </div>
            {canNext && (
              <button className="carousel_btn next" onClick={() => setEventIdx(i => i + 1)}>
                <i className="fa-solid fa-chevron-right" />
              </button>
            )}
            {events.length > VISIBLE && (
              <div className="carousel_dots">
                {Array.from({ length: events.length - VISIBLE + 1 }).map((_, i) => (
                  <button
                    key={i}
                    className={`carousel_dot${eventIdx === i ? ' active' : ''}`}
                    onClick={() => setEventIdx(i)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
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
