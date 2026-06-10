import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const CONFIG = {
  event:   { label: '이벤트' },
  news:    { label: '최신소식' },
  notice:  { label: '공지사항' },
  recruit: { label: '채용공고' },
}

export default function BoardWrite() {
  const { type } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const config = CONFIG[type]
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setError('')
    const { error } = await supabase.from('posts').insert({
      type,
      title,
      content,
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
