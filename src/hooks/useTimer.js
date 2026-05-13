import { useState, useRef, useEffect } from 'react'

export const useTimer = (initialTime = 60, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const timerRef = useRef(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          timerRef.current = null
          if (onTimeUp) onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const resetTimer = () => {
    stopTimer()
    setTimeLeft(initialTime)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => stopTimer()
  }, [])

  return { timeLeft, startTimer, stopTimer, resetTimer, setTimeLeft }
}