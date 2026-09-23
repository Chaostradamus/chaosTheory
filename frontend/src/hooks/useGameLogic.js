import { useState, useMemo } from 'react'
import { generateAdditionProblem, generateBasicProblem, calculateAnswer, getProblemString } from '../utils/problemGenerator'

export const useGameLogic = (operation, difficulty) => {
  const [score, setScore] = useState(0)
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
    generateNewProblem()
  }

  const incrementScore = () => {
    setScore(prev => prev + 1)
  }

  return {
    addends,
    score,
    isGameActive,
    showGetReady,
    correctAnswer,
    problemString,
    startGame,
    endGame,
    resetGame,
    incrementScore,
    generateNewProblem
  }
}