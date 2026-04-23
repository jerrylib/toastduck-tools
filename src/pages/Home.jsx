import { useState, useEffect } from 'react'

const CITIES = [
  { name: '中国', timezone: 'Asia/Shanghai' },
  { name: '孟加拉国（达卡）', timezone: 'Asia/Dhaka' },
  { name: '尼日利亚（拉各斯）', timezone: 'Africa/Lagos' },
  { name: '阿联酋（迪拜）', timezone: 'Asia/Dubai' },
]

function Home() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (timezone) => {
    return new Intl.DateTimeFormat('zh-CN', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(time)
  }

  const formatDate = (timezone) => {
    return new Intl.DateTimeFormat('zh-CN', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    }).format(time)
  }

  return (
    <div className="page">
      <div className="world-time">
        {CITIES.map((city) => (
          <div key={city.timezone} className={`time-card${city.timezone === 'Asia/Shanghai' ? ' china' : ''}`}>
            <h3>{city.name}</h3>
            <p className="time">{formatTime(city.timezone)}</p>
            <p className="date">{formatDate(city.timezone)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
