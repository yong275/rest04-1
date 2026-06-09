import { useState } from 'react'
import { Link } from 'react-router-dom'

const FNB = [
  { label: '회사소개', to: '/company', sub: ['대표 인사말', '브랜드 연혁', 'Vision & Mission'] },
  { label: '메뉴소개', to: '/menu',    sub: ['시그니처 음료', '베이커리 & 디저트', '시즌 메뉴'] },
  { label: '창업안내', to: '/franchise', sub: ['창업 파트너십', '창업 프로세스', '창업 비용'] },
  { label: '회사소식', to: '/news',    sub: ['이벤트', '최신 소식', '공지사항', '채용 공고'] },
  { label: 'SNS',      to: '#',        sub: ['Instagram', 'Facebook', 'YouTube'] },
]

export default function Footer() {
  const [open, setOpen] = useState(false)

  return (
    <footer>
      <div className="fnb">
        <button onClick={() => setOpen(o => !o)}>
          <h3 className="title">AZURE CAFÉ SITEMAP<span>{open ? '접기' : '펼쳐보기'}</span></h3>
        </button>
        <ul className={`clearfix ${open ? 'open' : ''}`}>
          {FNB.map(item => (
            <li key={item.label}>
              <Link to={item.to}>{item.label}</Link>
              <ol className="fnb_sub">
                {item.sub.map(s => (
                  <li key={s}><Link to={item.to}>&middot; {s}</Link></li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
      <div className="info">
        <ul className="policy clearfix">
          <li><a href="#">저작권보호정책</a></li>
          <li><a href="#">개인정보처리방침</a></li>
          <li><a href="#">이메일무단수집거부</a></li>
          <li>
            <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              TOP
            </a>
          </li>
        </ul>
        <address>
          고객상담실 : 1588-0000 &nbsp; 월~금 09:00 ~ 18:00, 주말/공휴일 휴무<br />
          &copy; 2024 AZURE CAFÉ. All Rights Reserved.
        </address>
      </div>
    </footer>
  )
}
