import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function useScrollToHash() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [hash])
}

const BENEFITS = [
  { icon: 'fa-palette',    title: '인테리어 지원',    desc: '전문 디자이너가 설계하는\nAZURE 표준 인테리어.\n브랜드 가이드라인 완벽 적용.' },
  { icon: 'fa-graduation-cap', title: '4주 바리스타 교육', desc: '본사 교육센터에서 진행하는\n체계적인 4주 바리스타 과정.\n이론 + 실습 병행 교육.' },
  { icon: 'fa-bullhorn',   title: '마케팅 지원',      desc: '오픈 이벤트 기획부터\nSNS 콘텐츠 제작, 온라인\n광고 집행까지 전담 지원.' },
  { icon: 'fa-truck',      title: '원부자재 공급',    desc: '원두·시럽·포장재 등 모든\n원부자재를 본사에서 안정적으로\n공급. 품질 균일성 보장.' },
  { icon: 'fa-headset',    title: '상시 CS 지원',     desc: '본사 전담 매니저 배정.\n운영 중 발생하는 모든 문제를\n신속하게 해결해 드립니다.' },
  { icon: 'fa-chart-line', title: '수익 관리 지원',   desc: '매출 분석 리포트 월 제공.\nPOS 시스템 무료 설치.\n수익성 개선 컨설팅.' },
]

const STEPS = [
  { num: '01', title: '창업 상담',    desc: '전화·방문 상담으로\n창업 가능 여부 및\n조건 확인' },
  { num: '02', title: '가맹 계약',    desc: '계약서 검토 후\n정식 가맹 계약\n체결' },
  { num: '03', title: '입지 선정',    desc: '상권 분석 후\n최적 입지\n함께 선정' },
  { num: '04', title: '인테리어 공사', desc: 'AZURE 표준 디자인\n적용 공사 진행\n(약 3~4주)' },
  { num: '05', title: '바리스타 교육', desc: '4주 집중 교육\n이론·실습\n자격증 취득' },
  { num: '06', title: '그랜드 오픈',  desc: '본사 오픈 지원팀\n파견 · 오픈 이벤트\n진행' },
]

const COSTS = [
  { item: '가맹비',     sm: '500만 원', md: '500만 원', lg: '500만 원' },
  { item: '교육비',     sm: '200만 원', md: '200만 원', lg: '200만 원' },
  { item: '인테리어비', sm: '3,000만 원~', md: '5,000만 원~', lg: '8,000만 원~' },
  { item: '장비비',     sm: '1,500만 원~', md: '2,500만 원~', lg: '4,000만 원~' },
  { item: '보증금',     sm: '300만 원', md: '300만 원', lg: '300만 원' },
]

export default function Franchise() {
  useScrollToHash()
  return (
    <section>
      <h2 className="sr-only">창업안내 페이지</h2>
      <div className="sub_banner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="banner_text wow animated">
          <h2>Franchise</h2>
          <p>함께 만드는 성공 창업</p>
        </div>
      </div>

      <article id="partnership" className="sub_content">
        <h2>창업 파트너십</h2>
        <div className="menu_intro"><p>AZURE CAFÉ 가맹은 단순한 사업이 아닌 파트너십입니다.<br />14년간 검증된 시스템과 지속적인 본사 지원으로 성공을 함께 만들어 갑니다.</p></div>
        <div className="benefit_grid">
          {BENEFITS.map(b => (
            <div key={b.title} className="benefit_card">
              <div className="b_icon"><i className={`fa-solid ${b.icon}`} /></div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </article>
      <hr />

      <article id="process" className="sub_content">
        <div className="process_wrap">
          <h3>창업 프로세스</h3>
          <div className="process_list">
            {STEPS.map(s => (
              <div key={s.num} className="process_step">
                <div className="step_num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
      <hr />

      <div id="cost" className="cost_wrap">
        <div className="sub_content">
          <h2>창업 비용 안내</h2>
          <div className="menu_intro" style={{ marginBottom: 0 }}>
            <p>모든 비용은 투명하게 공개됩니다. 규모에 따라 소규모 창업도 가능합니다.</p>
          </div>
          <table className="cost_table">
            <thead>
              <tr><th>항목</th><th>소규모 (15평)</th><th>표준 (25평)</th><th>대형 (40평 이상)</th></tr>
            </thead>
            <tbody>
              {COSTS.map(c => (
                <tr key={c.item}>
                  <td>{c.item}</td><td>{c.sm}</td><td>{c.md}</td><td>{c.lg}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: 20, fontSize: 13, color: '#888', textAlign: 'center' }}>
            * 위 금액은 참고용이며 실제 비용은 입지·규모에 따라 달라질 수 있습니다. 자세한 상담 : 1588-0000
          </p>
        </div>
      </div>
    </section>
  )
}
