import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const CONFIG = {
  event:   { label: '이벤트',   table: 'event_posts',   banner: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1600&q=80', tagClass: 'event',   tagLabel: 'EVENT' },
  news:    { label: '최신소식', table: 'news_posts',    banner: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=1600&q=80', tagClass: 'new',     tagLabel: 'NEW' },
  notice:  { label: '공지사항', table: 'notice_posts',  banner: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80', tagClass: 'notice',  tagLabel: '공지' },
  recruit: { label: '채용공고', table: 'recruit_posts', banner: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1600&q=80', tagClass: 'recruit', tagLabel: '채용' },
}

export default function Board() {
  const { type } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const config = CONFIG[type]
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!config) { navigate('/news'); return }
    setLoading(true)
    supabase
      .from(config.table)
      .select('id, title, author_email, created_at')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setPosts(data || []); setLoading(false) })
  }, [type])

  if (!config) return null

  return (
    <section>
      <div className="sub_banner" style={{ backgroundImage: `url('${config.banner}')` }}>
        <div className="banner_text">
          <h2>{config.label}</h2>
          <p>AZURE CAFÉ {config.label}</p>
        </div>
      </div>
      <article className="sub_content">
        <div className="news_board_header">
          <h3>{config.label}</h3>
          {user && <Link to={`/board/${type}/write`} className="btn_write">글쓰기</Link>}
        </div>
        {loading ? (
          <p className="board_empty">불러오는 중...</p>
        ) : posts.length === 0 ? (
          <p className="board_empty">등록된 게시물이 없습니다.</p>
        ) : (
          <ul className="news_list">
            {posts.map((post, i) => (
              <li key={post.id}>
                <Link to={`/board/${type}/${post.id}`}>
                  <span className="board_num">{posts.length - i}</span>
                  <span className={`news_tag ${config.tagClass}`}>{config.tagLabel}</span>
                  <span className="news_title">{post.title}</span>
                  <span className="news_date">{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="board_nav_back">
          <Link to="/news">← 목록으로</Link>
        </div>
      </article>
    </section>
  )
}
