import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const CONFIG = {
  event:   { label: '이벤트',   table: 'event_posts' },
  news:    { label: '최신소식', table: 'news_posts' },
  notice:  { label: '공지사항', table: 'notice_posts' },
  recruit: { label: '채용공고', table: 'recruit_posts' },
}

export default function BoardWrite() {
  const { type } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const config = CONFIG[type]
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setError('')
    const { error } = await supabase.from(config.table).insert({
      title,
      content,
      image_url: imageUrl || null,
      author_id: user.id,
      author_email: user.email,
    })
    if (error) { setError('저장 중 오류가 발생했습니다.'); setLoading(false) }
    else navigate(`/board/${type}`)
  }

  return (
    <section>
      <article className="sub_content board_write_wrap">
        <div className="news_board_header">
          <h3>{config?.label} 글쓰기</h3>
        </div>
        {error && <p className="auth_error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="write_group">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              maxLength={200}
            />
          </div>
          {type === 'event' && (
            <div className="write_group">
              <input
                type="url"
                placeholder="이미지 URL (선택) — 이벤트 카드 배경으로 사용됩니다"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
            </div>
          )}
          <div className="write_group">
            <textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              rows={16}
            />
          </div>
          <div className="board_detail_footer">
            <Link to={`/board/${type}`} className="btn_back">취소</Link>
            <button type="submit" className="btn_submit_sm" disabled={loading}>
              {loading ? '저장 중...' : '등록'}
            </button>
          </div>
        </form>
      </article>
    </section>
  )
}
