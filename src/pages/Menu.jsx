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

const DRINKS = [
  { img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80', name: 'AZURE Espresso', desc: '에티오피아 예가체프 원두를 베이스로 한 더블 샷 에스프레소. 과일향과 밸런스 잡힌 산미.', price: '3,500원' },
  { img: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=600&q=80', name: 'Sky Latte', desc: '부드러운 스팀 밀크와 AZURE 에스프레소가 만나는 시그니처 라떼. 라떼아트 제공.', price: '5,500원' },
  { img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80', name: 'Iced Azure', desc: '진하게 추출한 콜드브루에 블루마운틴 우유를 더한 AZURE 대표 아이스 음료.', price: '6,000원' },
]

const BAKERY = [
  { img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', name: '버터 크루아상', desc: '프랑스산 AOP 버터를 사용해 36겹으로 접어 만든 정통 크루아상.', price: '3,800원' },
  { img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80', name: '베리 쇼트케이크', desc: '제주산 딸기와 블루베리로 장식한 시그니처 쇼트케이크.', price: '7,500원' },
  { img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80', name: 'AZURE 마카롱', desc: '파리 정통 레시피로 만든 아몬드 마카롱. 12가지 맛 선택 가능.', price: '2,500원' },
]

const SEASONS = [
  { badge: 'spring', season: '봄', name: '벚꽃 라떼',       ingredient: '벚꽃 추출물, 딸기 시럽', price: '6,500원', period: '3월 ~ 5월' },
  { badge: 'spring', season: '봄', name: '딸기 스무디',     ingredient: '국내산 설향 딸기',       price: '7,000원', period: '3월 ~ 5월' },
  { badge: 'summer', season: '여름', name: '망고 프라푸치노', ingredient: '알폰소 망고 퓨레',       price: '7,500원', period: '6월 ~ 8월' },
  { badge: 'summer', season: '여름', name: '코코넛 라떼',    ingredient: '태국산 코코넛 밀크',     price: '6,500원', period: '6월 ~ 8월' },
  { badge: 'autumn', season: '가을', name: '고구마 라떼',    ingredient: '해남산 황금 고구마',     price: '6,000원', period: '9월 ~ 11월' },
  { badge: 'winter', season: '겨울', name: '페퍼민트 모카',  ingredient: '벨기에 다크 초콜릿, 유기농 민트', price: '6,500원', period: '12월 ~ 2월' },
]

function MenuGrid({ items }) {
  return (
    <div className="menu_grid">
      {items.map(item => (
        <div key={item.name} className="menu_card">
          <div className="card_img" style={{ backgroundImage: `url('${item.img}')` }} />
          <div className="card_body">
            <h4>{item.name}</h4>
            <p>{item.desc}</p>
            <span className="price">{item.price}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Menu() {
  useScrollToHash()
  return (
    <section>
      <h2 className="sr-only">메뉴소개 페이지</h2>
      <div className="sub_banner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="banner_text wow animated">
          <h2>Our Menu</h2>
          <p>시그니처 음료 &amp; 베이커리</p>
        </div>
      </div>

      <article id="signature" className="sub_content">
        <h2>시그니처 음료</h2>
        <div className="menu_intro"><p>아라비카 100% 단일 원산지 원두를 직접 블렌딩한 AZURE 에스프레소.<br />부드러운 크레마와 깊은 여운으로 커피 본연의 풍미를 전달합니다.</p></div>
        <MenuGrid items={DRINKS} />
      </article>
      <hr />

      <div className="menu_divider_banner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="banner_inner">
          <h3>Bakery &amp; Dessert</h3>
          <p>매일 아침 갓 구운 신선한 베이커리</p>
        </div>
      </div>

      <article id="bakery" className="sub_content">
        <h2>베이커리 &amp; 디저트</h2>
        <div className="menu_intro"><p>국내산 유기농 밀가루와 버터를 사용해 매일 직접 굽는 AZURE 베이커리.<br />비건 옵션도 함께 준비되어 있습니다.</p></div>
        <MenuGrid items={BAKERY} />
      </article>
      <hr />

      <article id="season" className="sub_content">
        <h2>시즌 메뉴</h2>
        <div className="menu_intro"><p>계절마다 새롭게 출시되는 한정 음료. 제철 재료만을 사용해 시즌에만 만날 수 있습니다.</p></div>
        <table className="season_table">
          <thead>
            <tr><th>시즌</th><th>메뉴명</th><th>주재료</th><th>가격</th><th>판매기간</th></tr>
          </thead>
          <tbody>
            {SEASONS.map(s => (
              <tr key={s.name}>
                <td><span className={`season_badge ${s.badge}`}>{s.season}</span></td>
                <td>{s.name}</td><td>{s.ingredient}</td><td>{s.price}</td><td>{s.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}
