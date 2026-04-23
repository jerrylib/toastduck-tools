import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ExchangeRate from './pages/ExchangeRate'
import './App.css'

function App() {
  return (
    <HashRouter>
      <nav>
        <Link to="/">时区时间</Link>
        <Link to="/exchange-rate">汇率换算</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange-rate" element={<ExchangeRate />} />
      </Routes>
    </HashRouter>
  )
}

export default App
