import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('이메일 또는 비밀번호가 올바르지 않습니다.'); setLoading(false) }
    else navigate('/')
  }

  async function handleKakao() {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: window.location.origin + import.meta.env.BASE_URL },
    })
  }

  return (
    <section>
      <div className="auth_wrap">
        <h2 className="auth_title">LOGIN</h2>
        {error && <p className="auth_error">{error}</p>}
        <form className="auth_form" onSubmit={handleSubmit}>
          <div className="form_group">
            <input type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form_group">
            <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn_submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div className="auth_divider"><span>또는</span></div>
        <button className="kakao_btn" onClick={handleKakao}>
          <i className="fa-solid fa-comment" /> 카카오로 로그인
        </button>
        <p className="auth_link">
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </section>
  )
}
