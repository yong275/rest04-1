import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const CONFIG = {
  event:   { label: '이벤트',   tagClass: 'event',   tagLabel: 'EVENT' },
  news:    { label: '최신소식', tagClass: 'new',     tagLabel: 'NEW' },
  notice:  { label: '공지사항', tagClass: 'notice',  tagLabel: '공지' },
  recruit: { label: '채용공고', tagClass: 'recruit', tagLabel: '채용' },
}

export default function BoardDetail() {
  const { type, id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const config = CONFIG[type]
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) navigate(`/board/${type}`)
        else setPost(data)
        setLoading(false)
      })
  }, [id])

  async function handleDelete() {
    if (!window.confirm('게시물을 삭제하시겠습니까?')) return
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (!error) navigate(`/board/${type}`)
  }

  if (loading) return <section><p className="board_empty">불러오는 중...</p></section>
  if (!post) return null

  return (
    <section>
      <article className="sub_content board_detail_wrap">
        <div className="board_detail_header">
          <span className={`news_tag ${config?.tagClass}`}>{config?.tagLabel}</span>
          <h2 className="board_detail_title">{post.title}</h2>
          <div className="board_detail_info">
            <span>{post.author_email}</span>
            <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
          </div>
        </div>
        <div className="board_detail_body">{post.content}</div>
        <div className="board_detail_footer">
          <Link to={`/board/${type}`} className="btn_back">목록</Link>
          {user?.id === post.author_id && (
            <button className="btn_delete" onClick={handleDelete}>삭제</button>
          )}
        </div>
      </article>
    </section>
  )
}
