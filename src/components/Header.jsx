import { Link, NavLink } from 'react-router-dom'

const NAV = [
  {
    label: '회사소개', to: '/company',
    sub: [
      { label: '대표 인사말', to: '/company#ceo' },
      { label: '브랜드 연혁',  to: '/company#history' },
      { label: 'Vision & Mission', to: '/company#vision' },
    ],
    desc: '2010년 설립, 전국 500호점.\n한 잔의 여유로\n세상을 따뜻하게.',
  },
  {
    label: '메뉴소개', to: '/menu',
    sub: [
      { label: '시그니처 음료',     to: '/menu#signature' },
      { label: '베이커리 & 디저트', to: '/menu#bakery' },
      { label: '시즌 메뉴',         to: '/menu#season' },
    ],
    desc: '아라비카 100%\n엄선된 원두로 만드는\nAZURE 시그니처.',
  },
  {
    label: '창업안내', to: '/franchise',
    sub: [
      { label: '창업 파트너십', to: '/franchise#partnership' },
      { label: '창업 프로세스', to: '/franchise#process' },
      { label: '창업 비용',     to: '/franchise#cost' },
    ],
    desc: '검증된 시스템과\n지속적인 지원으로\n성공을 함께.',
  },
  {
    label: '회사소식', to: '/news',
    sub: [
      { label: '이벤트',   to: '/news#event' },
      { label: '최신 소식', to: '/news#latest' },
      { label: '공지사항', to: '/news#notice' },
      { label: '채용 공고', to: '/news#recruit' },
    ],
    desc: 'AZURE CAFÉ의\n새로운 소식과\n이벤트를 전해드립니다.',
  },
]

export default function Header() {
  return (
    <header>
      <h1 className="logo">
        <Link to="/">AZURE<em>CAFÉ</em></Link>
      </h1>
      <nav className="clearfix">
        <ul className="gnb clearfix">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {item.label}
              </NavLink>
              <div className="sub clearfix">
                <ol>
                  {item.sub.map((s, i) => (
                    <li key={s.to} className={i === item.sub.length - 1 ? 'last' : ''}>
                      <Link to={s.to}>{s.label}</Link>
                    </li>
                  ))}
                </ol>
                <div className="sub_img">
                  <p>{item.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <ul className="lnb clearfix">
          <li><a href="#" className="language">ENGLISH</a></li>
          <li><a href="#" className="sitemap">SITEMAP</a></li>
        </ul>
      </nav>
    </header>
  )
}
