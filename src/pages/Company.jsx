import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const HISTORY = [
  { year: '2010', desc: '서울 강남 1호점 오픈 · 브랜드 론칭' },
  { year: '2012', desc: '전국 50호점 달성 · 프리미엄 원두 라인 출시' },
  { year: '2014', desc: '시그니처 음료 특허 등록 · 브랜드 리뉴얼' },
  { year: '2016', desc: '100호점 돌파 · 한국 서비스 대상 수상' },
  { year: '2018', desc: '일본 도쿄 해외 1호점 오픈' },
  { year: '2020', desc: '베트남 · 태국 진출 · 앱 회원 100만 돌파' },
  { year: '2022', desc: '해외 3개국 50개점 운영 · ESG 우수기업 인증' },
  { year: '2024', desc: '국내 500호점 달성 · 올해의 카페 브랜드 선정' },
]

const VISION = [
  { icon: 'fa-eye',      tag: 'VISION', title: 'Global Café Leader', desc: '2030년까지 전 세계 10개국\n1,000호점을 운영하는\n글로벌 카페 브랜드' },
  { icon: 'fa-heart',    tag: 'VALUE',  title: 'Quality First',      desc: '최상의 원두 · 최고의 바리스타\n최적의 공간이라는 세 가지 가치로\n고객에게 특별한 경험을 제공' },
  { icon: 'fa-bullseye', tag: 'MISSION',title: 'Every Sip, Special', desc: '커피 한 잔이 만드는 특별한 순간.\n일상 속 작은 행복을 드리기 위해\n매일 최선을 다합니다.' },
]

function useScrollToHash() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [hash])
}

export default function Company() {
  useScrollToHash()
  return (
    <section>
      <h2 className="sr-only">회사소개 페이지</h2>
      <div className="sub_banner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="banner_text wow animated">
          <h2>About Us</h2>
          <p>AZURE CAFÉ 브랜드 스토리</p>
        </div>
      </div>

      <article id="ceo" className="sub_content">
        <h2>대표 인사말</h2>
        <div className="ceo_wrap">
          <div className="ceo_img_box" />
          <div className="ceo_text_box">
            <h3>커피 한 잔이 만드는<br />따뜻한 일상의 변화.</h3>
            <p>AZURE CAFÉ를 찾아주신 모든 분께 진심으로 감사드립니다. 저희는 2010년 "한 잔의 커피로 세상을 따뜻하게"라는 작은 꿈에서 출발했습니다.</p>
            <p>14년이 지난 지금, 전국 500여 개 매장과 해외 3개국으로 성장했지만 우리의 철학은 변하지 않았습니다. 최상의 원두, 최고의 바리스타, 최적의 공간이라는 세 가지 가치를 바탕으로 오늘도 고객 한 분 한 분께 특별한 순간을 드리기 위해 노력합니다.</p>
            <p>앞으로도 AZURE CAFÉ는 혁신을 멈추지 않겠습니다. 감사합니다.</p>
            <p className="ceo_name">AZURE CAFÉ 대표이사</p>
            <div className="ceo_sign">Kim Azure</div>
          </div>
        </div>
      </article>
      <hr />

      <article id="history" className="sub_content">
        <h2>브랜드 연혁</h2>
        <div className="history_wrap">
          <div className="history_list">
            {HISTORY.map(h => (
              <div key={h.year} className="history_item">
                <div className="year">{h.year}</div>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
      <hr />

      <div id="vision" className="vision_wrap">
        <div className="sub_content">
          <h2>Vision &amp; Mission</h2>
          <div className="vision_boxes">
            {VISION.map(v => (
              <div key={v.tag} className="vision_box">
                <div className="v_icon"><i className={`fa-solid ${v.icon}`} /></div>
                <h4>{v.tag}</h4>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
