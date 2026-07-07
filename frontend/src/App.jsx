import { useState, useEffect } from 'react'
import OperationSelector from './components/OperationSelector'
import DifficultySelector from './components/DifficultySelector'
import ScoreTimer from './components/ScoreTimer'
import MathProblem from './components/MathProblem'
import AnswerInput from './components/AnswerInput'
import GameControls from './components/GameControls'
import FeedbackMessage from './components/FeedbackMessage'
import AuthModal from './components/AuthModal'
import Leaderboard from './components/Leaderboard'
import { useGameLogic } from './hooks/useGameLogic'
import { useTimer } from './hooks/useTimer'
import { getAuthToken, saveScore, saveGuestScore, removeAuthToken } from './services/api'

function App() {
  // Auth state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isTokenLoaded, setIsTokenLoaded] = useState(false)

  // Game state
  const [operation, setOperation] = useState('+')
  const [difficulty, setDifficulty] = useState(1)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showSavePrompt, setShowSavePrompt] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [isGameActive, setIsGameActive] = useState(false)

  const {
    addends,
    score,
    showGetReady,
    correctAnswer,
    startGame: startGameLogic,
    resetGame: resetGameLogic,
    incrementScore,
    generateNewProblem,
  } = useGameLogic(operation, difficulty)

  // --- Helper Functions ---

  const checkAndSaveScore = async (finalScore) => {
    try {
      const response = await fetch(`http://localhost:5000/api/scores/leaderboard/${operation}/${difficulty}`)
      const leaderboard = await response.json()
      
      if (leaderboard.length < 10 || finalScore > (leaderboard[leaderboard.length - 1]?.score || 0)) {
        if (token) {
          await saveScore(operation, difficulty, finalScore, token)
          setFeedback(`✅ Score saved! You're in the top 10!`)
        } else {
          setShowSavePrompt(true)
        }
      }
    } catch (error) {
      console.error('Error checking leaderboard:', error)
    }
  }

  const handleTimerComplete = () => {
    setIsGameActive(false)
    const finalScore = score
    setFeedback(`⏰ Time's up! Final score: ${finalScore}`)
    setUserAnswer('')  // Clear input
    checkAndSaveScore(finalScore)
  }

  // --- Timer ---
  const { timeLeft, startTimer, stopTimer, resetTimer, setTimeLeft } = useTimer(
    60,
    null,
    handleTimerComplete
  )

  // --- Effects ---

  useEffect(() => {
    const savedToken = getAuthToken()
    if (savedToken && !isTokenLoaded) {
      setTimeout(() => {
        setToken(savedToken)
        setIsTokenLoaded(true)
      }, 0)
    }
  }, [isTokenLoaded])

  // --- Event Handlers ---

  const handleGuestSave = async () => {
    if (!guestName.trim()) {
      alert('Please enter a name')
      return
    }
    try {
      await saveGuestScore(operation, difficulty, score, guestName.trim())
      setShowSavePrompt(false)
      setGuestName('')
      setFeedback(`✅ Score saved as "${guestName.trim()}"! You're in the top 10!`)
    } catch (error) {
      console.error('Error saving guest score:', error)
    }
  }

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setToken(getAuthToken())
  }

  const handleLogout = () => {
    removeAuthToken()
    setUser(null)
    setToken(null)
    setIsTokenLoaded(false)
  }

  const handleOperationChange = (newOperation) => {
    if (isGameActive) return
    setOperation(newOperation)
  }

  const handleDifficultyChange = (newDifficulty) => {
    if (isGameActive) return
    setDifficulty(newDifficulty)
  }

  const startGame = () => {
    if (isGameActive) return
    setTimeLeft(60)
    setIsGameActive(true)
    setFeedback('')
    setUserAnswer('')
    startGameLogic()
    startTimer()
  }

  const resetGame = () => {
    setIsGameActive(false)
    setTimeLeft(60)
    setFeedback('')
    setUserAnswer('')
    setShowSavePrompt(false)
    stopTimer()
    resetTimer()
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

  // --- Render ---

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '20px auto', 
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '0 20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>🔥 chaosTheory Math 🔥</h1>
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>👤 {user.username}</span>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                padding: '8px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Login / Register
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
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
          
          <ScoreTimer score={score} timeLeft={timeLeft} isGameActive={isGameActive} />
          
          <MathProblem 
            addends={addends}
            operation={operation}
            showGetReady={showGetReady}
            isGameActive={isGameActive}
          />
          
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

        <div style={{ width: '280px', flexShrink: 0 }}>
          <Leaderboard operation={operation} difficulty={difficulty} />
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {showSavePrompt && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h3>🏆 Top 10 Score!</h3>
            <p>Enter a name to save your score:</p>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your name"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginBottom: '15px',
                boxSizing: 'border-box'
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleGuestSave()}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={handleGuestSave}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Save Score
              </button>
              <button 
                onClick={() => {
                  setShowSavePrompt(false)
                  setGuestName('')
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ccc',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App