import { useState, useRef, useEffect } from 'react'

export const useTimer = (initialTime = 60, onTick, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const timerRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  const onTickRef = useRef(onTick)

  // Keep refs updated
  useEffect(() => {
    onCompleteRef.current = onComplete
    onTickRef.current = onTick
  }, [onComplete, onTick])

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1
        if (onTickRef.current) onTickRef.current(newTime)
        
        if (newTime <= 0) {
          clearInterval(timerRef.current)
          timerRef.current = null
          if (onCompleteRef.current) onCompleteRef.current()
          return 0
        }
        return newTime
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