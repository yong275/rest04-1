import { Link } from 'react-router-dom'

const ARTICLES = [
  {
    type: 'bg', cls: 'bg1',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
    hero: true, span: 'CAFÉ',
  },
  { type: 'txt', to: '/company', title: '회사소개', desc: '2010년 설립된 AZURE CAFÉ는\n"한 잔의 여유"라는 철학 아래\n최상의 원두와 정성을 담아\n특별한 경험을 선사합니다.' },
  { type: 'point' },
  {
    type: 'bg', cls: 'bg2', span: 'Interior',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'bg', cls: 'bg3', span: 'Origin',
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
  },
  { type: 'txt', to: '/menu', title: '메뉴소개', desc: '엄선된 원두로 만든 시그니처 음료부터\n계절 한정 스페셜 메뉴까지,\n매일 새로운 발견을 경험하세요.' },
  {
    type: 'bg', cls: 'bg4', span: 'Latte',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'bg', cls: 'bg5', span: 'Dessert',
    img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80',
  },
  { type: 'txt', to: '/franchise', title: '창업안내', desc: 'AZURE CAFÉ와 함께라면\n성공적인 창업이 가능합니다.\n체계적인 교육과 지원으로\n당신의 꿈을 현실로 만들어 드립니다.' },
  {
    type: 'bg', cls: 'bg6', span: 'Startup',
    img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
  },
  { type: 'txt', to: '/news', title: '회사소식', desc: 'AZURE CAFÉ의\n새로운 소식과\n이벤트를 전해드립니다.' },
  {
    type: 'bg', cls: 'bg7', span: 'News',
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Home() {
  return (
    <section id="mainSection">
      {ARTICLES.map((a, i) => (
        <article key={i}>
          {a.type === 'bg' && (
            <div className={`bg ${a.cls}`} style={{ backgroundImage: `url('${a.img}')` }}>
              {a.hero && (
                <div className="hero-overlay">
                  <h2>AZURE CAFÉ</h2>
                  <p>한 잔의 여유, 특별한 순간</p>
                </div>
              )}
              <span>{a.span}</span>
            </div>
          )}
          {a.type === 'txt' && (
            <Link className="txt" to={a.to}>
              <i className="fa-solid fa-arrow-right" />
              <p>
                <strong>{a.title}</strong>
                <em>{a.desc}</em>
              </p>
            </Link>
          )}
          {a.type === 'point' && (
            <div className="txt txt-point">
              <i className="fa-solid fa-mug-hot" />
              <p><strong>Since<br />2010</strong></p>
            </div>
          )}
        </article>
      ))}
    </section>
  )
}
