import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ExchangeRate from './pages/ExchangeRate'
import './App.css'

// Vite 的 base 形如 "/toastduck-tools/"，BrowserRouter 需要去掉结尾斜杠作为 basename
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <BrowserRouter basename={basename}>
      <nav>
        <Link to="/">时区时间</Link>
        <Link to="/exchange-rate">汇率换算</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange-rate" element={<ExchangeRate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
