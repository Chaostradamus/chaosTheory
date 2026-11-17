import { useState, useRef, useEffect } from 'react'

export const useTimer = (initialTime = 60, onTick, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const timerRef = useRef(null)
  const isRunningRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  const onTickRef = useRef(onTick)

  // Keep refs updated
  useEffect(() => {
    onCompleteRef.current = onComplete
    onTickRef.current = onTick
  }, [onComplete, onTick])

  // Handle tick and completion side effects cleanly outside state updaters
  useEffect(() => {
    if (!isRunningRef.current) return

    if (onTickRef.current) {
      onTickRef.current(timeLeft)
    }

    if (timeLeft <= 0) {
      isRunningRef.current = false
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      if (onCompleteRef.current) {
        onCompleteRef.current()
      }
    }
  }, [timeLeft])

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    isRunningRef.current = true

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
  }

  const stopTimer = () => {
    isRunningRef.current = false
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