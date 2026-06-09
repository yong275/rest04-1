import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Company from './pages/Company'
import Menu from './pages/Menu'
import Franchise from './pages/Franchise'
import News from './pages/News'

export default function App() {
  return (
    <div id="sub_wrap">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/news" element={<News />} />
      </Routes>
      <Footer />
    </div>
  )
}
