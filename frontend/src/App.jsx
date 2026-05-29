import { useState } from 'react'
import OperationSelector from './components/OperationSelector'
import DifficultySelector from './components/DifficultySelector'
import ScoreTimer from './components/ScoreTimer'
import MathProblem from './components/MathProblem'
import AnswerInput from './components/AnswerInput'
import GameControls from './components/GameControls'
import FeedbackMessage from './components/FeedbackMessage'
import { useTimer } from './hooks/useTimer'
import { useGameLogic } from './hooks/useGameLogic'

function App() {
  const [operation, setOperation] = useState('+')
  const [difficulty, setDifficulty] = useState(1)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  
  const {
    addends,
    score,
    isGameActive,
    showGetReady,
    correctAnswer,
    startGame: startGameLogic,
    endGame,
    resetGame: resetGameLogic,
    incrementScore,
    generateNewProblem,
    updateSettings
  } = useGameLogic(operation, difficulty)
  
  const handleTimeUp = () => {
    endGame()
    setFeedback(`⏰ Time's up! Final score: ${score}`)
  }
  
  const { timeLeft, startTimer, stopTimer, resetTimer, setTimeLeft } = useTimer(60, handleTimeUp)
  
  const handleOperationChange = (newOperation) => {
    if (isGameActive) return
    setOperation(newOperation)
    updateSettings(newOperation, difficulty)
  }
  
  const handleDifficultyChange = (newDifficulty) => {
    if (isGameActive) return
    setDifficulty(newDifficulty)
    updateSettings(operation, newDifficulty)
  }
  
  const startGame = () => {
    if (isGameActive) return
    stopTimer()
    resetTimer()
    setTimeLeft(60)
    setFeedback('')
    setUserAnswer('')
    startGameLogic()
    startTimer()
  }
  
  const resetGame = () => {
    stopTimer()
    resetTimer()
    setFeedback('')
    setUserAnswer('')
    resetGameLogic()
  }
  
  const checkAnswer = () => {
    if (!isGameActive) return
    
    const parsedAnswer = parseFloat(userAnswer)
    if (isNaN(parsedAnswer)) {
      setFeedback('Please enter a number')
      return
    }
    
    const isCorrect = operation === '÷' 
      ? Math.abs(parsedAnswer - correctAnswer) < 0.01
      : parsedAnswer === correctAnswer
    
    if (isCorrect) {
      incrementScore()
      setFeedback('✅ Correct!')
      generateNewProblem()
      setUserAnswer('')
    } else {
      setFeedback(`❌ Wrong. The correct answer was ${correctAnswer}`)
      setUserAnswer('')
    }
  }
  
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '20px auto', 
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '0 20px'
    }}>
      <h1 style={{ marginBottom: '15px', fontSize: '28px' }}>🔥 chaosTheory Math 🔥</h1>
      
      {/* Show settings ONLY when game is NOT active */}
      {!isGameActive && (
        <>
          <OperationSelector 
            operation={operation}
            onOperationChange={handleOperationChange}
            isDisabled={isGameActive}
          />
          
          <DifficultySelector 
            operation={operation}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            isDisabled={isGameActive}
          />
        </>
      )}
      
      {/* Score and Timer - Always visible but styled differently during game */}
      <ScoreTimer score={score} timeLeft={timeLeft} isGameActive={isGameActive} />
      
      {/* Flashcard Area */}
      <MathProblem 
        addends={addends}
        operation={operation}
        showGetReady={showGetReady}
        isGameActive={isGameActive}
      />
      
      {/* Input and Controls */}
      <AnswerInput 
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        isGameActive={isGameActive}
        operation={operation}
        onCheckAnswer={checkAnswer}
      />
      
      <GameControls 
        isGameActive={isGameActive}
        onStartGame={startGame}
        onCheckAnswer={checkAnswer}
        onResetGame={resetGame}
      />
      
      <FeedbackMessage feedback={feedback} />
    </div>
  )
}

export default App