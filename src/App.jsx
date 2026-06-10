import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Company from './pages/Company'
import Menu from './pages/Menu'
import Franchise from './pages/Franchise'
import News from './pages/News'
import Login from './pages/Login'
import Register from './pages/Register'
import Board from './pages/Board'
import BoardDetail from './pages/BoardDetail'
import BoardWrite from './pages/BoardWrite'
import ProtectedRoute from './components/ProtectedRoute'

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board/:type" element={<Board />} />
        <Route path="/board/:type/write" element={<ProtectedRoute><BoardWrite /></ProtectedRoute>} />
        <Route path="/board/:type/:id" element={<BoardDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}
