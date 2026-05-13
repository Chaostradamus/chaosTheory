import { useState, useMemo } from 'react'
import { generateAdditionProblem, generateBasicProblem, calculateAnswer, getProblemString } from '../utils/problemGenerator'

export const useGameLogic = (operation, difficulty) => {
  // Generate initial problem based on operation and difficulty
  const getInitialAddends = () => {
    if (operation === '+') {
      return generateAdditionProblem(difficulty)
    } else {
      return generateBasicProblem(operation)
    }
  }

  const [addends, setAddends] = useState(getInitialAddends)
  const [score, setScore] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [showGetReady, setShowGetReady] = useState(true)

  // Generate a new problem (called from event handlers only)
  const generateNewProblem = () => {
    let newAddends
    if (operation === '+') {
      newAddends = generateAdditionProblem(difficulty)
    } else {
      newAddends = generateBasicProblem(operation)
    }
    setAddends(newAddends)
  }

  // Update settings when operation or difficulty changes (called from App.jsx event handlers)
  const updateSettings = (newOperation, newDifficulty) => {
    if (!isGameActive) {
      let newAddends
      if (newOperation === '+') {
        newAddends = generateAdditionProblem(newDifficulty)
      } else {
        newAddends = generateBasicProblem(newOperation)
      }
      setAddends(newAddends)
    }
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
    generateNewProblem,
    updateSettings
  }
}