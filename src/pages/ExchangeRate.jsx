import { useState, useEffect } from 'react'

const CURRENCIES = ['USD', 'EUR', 'JPY']

function ExchangeRate() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('CNY')
  const [toCurrency, setToCurrency] = useState('USD')
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [queryTime, setQueryTime] = useState('')
  const [error, setError] = useState('')
  const [inputSide, setInputSide] = useState('from')

  const fetchRates = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch('https://open.er-api.com/v6/latest/CNY')
      if (!response.ok) throw new Error('获取汇率失败')
      const data = await response.json()
      setRates(data.rates)
      setQueryTime(new Date().toLocaleString('zh-CN'))
    } catch (err) {
      setError('获取汇率失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

  const getRate = (from, to) => {
    if (!rates) return 0
    if (from === 'CNY') return rates[to]
    if (to === 'CNY') return 1 / rates[from]
    return rates[to] / rates[from]
  }

  const convert = (value, from, to) => {
    const num = parseFloat(value) || 0
    const rate = getRate(from, to)
    return (num * rate).toFixed(4)
  }

  const handleFromChange = (value) => {
    setAmount(value)
    setInputSide('from')
  }

  const handleToChange = (value) => {
    setAmount(value)
    setInputSide('to')
  }

  const getFromValue = () => {
    if (!amount || !rates) return ''
    if (inputSide === 'from') return amount
    const num = parseFloat(amount) || 0
    const rate = getRate(toCurrency, fromCurrency)
    return (num * rate).toFixed(4)
  }

  const getToValue = () => {
    if (!amount || !rates) return ''
    if (inputSide === 'to') return amount
    const num = parseFloat(amount) || 0
    const rate = getRate(fromCurrency, toCurrency)
    return (num * rate).toFixed(4)
  }

  return (
    <div className="page">
      <h1>汇率换算</h1>
      {loading ? (
        <p className="loading">加载中...</p>
      ) : error ? (
        <div>
          <p className="error">{error}</p>
          <button onClick={fetchRates} className="retry-btn">重试</button>
        </div>
      ) : (
        <>
          <p className="query-time">汇率查询时间：{queryTime}</p>
          <div className="dual-converter">
            <div className="currency-input">
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                <option value="CNY">CNY</option>
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="number"
                value={getFromValue()}
                onChange={(e) => handleFromChange(e.target.value)}
                placeholder="输入金额"
              />
            </div>
            <span className="arrow">↔</span>
            <div className="currency-input">
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                <option value="CNY">CNY</option>
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="number"
                value={getToValue()}
                onChange={(e) => handleToChange(e.target.value)}
                placeholder="输入金额"
              />
            </div>
          </div>
          <p className="rate-info">
            1 {fromCurrency} = {getRate(fromCurrency, toCurrency).toFixed(4)} {toCurrency} &nbsp;|&nbsp;
            1 {toCurrency} = {getRate(toCurrency, fromCurrency).toFixed(4)} {fromCurrency}
          </p>
          <button onClick={fetchRates} className="refresh-btn">刷新汇率</button>
        </>
      )}
    </div>
  )
}

export default ExchangeRate
