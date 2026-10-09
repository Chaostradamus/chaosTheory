import { useState, useMemo } from 'react'
import { generateAdditionProblem, generateBasicProblem, calculateAnswer, getProblemString } from '../utils/problemGenerator'

export const useGameLogic = (operation, difficulty) => {
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [showGetReady, setShowGetReady] = useState(true)
  const [problemIndex, setProblemIndex] = useState(0)

  // Derive addends directly on render frame without triggering effect cascading re-renders
  const addends = useMemo(() => {
    if (operation === '+') {
      return generateAdditionProblem(difficulty)
    } else {
      return generateBasicProblem(operation, difficulty)
    }
  }, [operation, difficulty, problemIndex])

  const generateNewProblem = () => {
    setProblemIndex(prev => prev + 1)
  }

  const correctAnswer = useMemo(() => {
    return calculateAnswer(addends, operation)
  }, [addends, operation])

  const problemString = useMemo(() => {
    return getProblemString(addends, operation)
  }, [addends, operation])

  const startGame = () => {
    setIsGameActive(true)
    setShowGetReady(false)
    setScore(0)
    setCorrectCount(0)
    setWrongCount(0)
    generateNewProblem()
  }

  const endGame = () => {
    setIsGameActive(false)
    setShowGetReady(true)
  }

  const resetGame = () => {
    setIsGameActive(false)
    setShowGetReady(true)
    setScore(0)
    setCorrectCount(0)
    setWrongCount(0)
    generateNewProblem()
  }

  const handleCorrectAnswer = () => {
    setScore(prev => prev + 1)
    setCorrectCount(prev => prev + 1)
    generateNewProblem() // Move to next problem on correct answer
  }

  const handleWrongAnswer = () => {
    setWrongCount(prev => prev + 1)
    // Notice: We intentionally do NOT call generateNewProblem() here
  }

  // Calculate dynamic accuracy percentage
  const totalAttempts = correctCount + wrongCount
  const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 100

  return {
    addends,
    score,
    correctCount,
    wrongCount,
    accuracy,
    isGameActive,
    showGetReady,
    correctAnswer,
    problemString,
    startGame,
    endGame,
    resetGame,
    handleCorrectAnswer,
    handleWrongAnswer,
    generateNewProblem
  }
}