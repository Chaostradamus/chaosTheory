import { useState, useMemo, useEffect, useRef } from 'react'

function App() {
  // --- State ---
  const [num1, setNum1] = useState(5)
  const [num2, setNum2] = useState(3)
  const [operation, setOperation] = useState('+')
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isGameActive, setIsGameActive] = useState(false)
  const [showGetReady, setShowGetReady] = useState(true) // New state for "Get Ready" message
  
  // Refs
  const timerRef = useRef(null)

  // --- Pure Calculations ---
  const correctAnswer = useMemo(() => {
    switch(operation) {
      case '+': return num1 + num2
      case '-': return num1 - num2
      case '×': return num1 * num2
      case '÷': return num2 !== 0 ? parseFloat((num1 / num2).toFixed(2)) : 0
      default: return num1 + num2
    }
  }, [num1, num2, operation])

  const getOperationSymbol = () => {
    switch(operation) {
      case '+': return '+'
      case '-': return '−'
      case '×': return '×'
      case '÷': return '÷'
      default: return '+'
    }
  }

  // Generate new random problem based on operation
  const generateNewProblem = () => {
    let newNum1, newNum2
    
    switch(operation) {
      case '+':
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * 13)
        break
      case '-':
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * (newNum1 + 1))
        break
      case '×':
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * 13)
        break
      case '÷':
        newNum2 = Math.floor(Math.random() * 12) + 1
        newNum1 = newNum2 * (Math.floor(Math.random() * 12) + 1)
        break
      default:
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * 13)
    }
    
    setNum1(newNum1)
    setNum2(newNum2)
    setUserAnswer('')
    setFeedback('')
  }

  // Handle operation change
  const handleOperationChange = (newOperation) => {
    if (isGameActive) return
    
    setOperation(newOperation)
    
    let newNum1, newNum2
    
    switch(newOperation) {
      case '+':
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * 13)
        break
      case '-':
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * (newNum1 + 1))
        break
      case '×':
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * 13)
        break
      case '÷':
        newNum2 = Math.floor(Math.random() * 12) + 1
        newNum1 = newNum2 * (Math.floor(Math.random() * 12) + 1)
        break
      default:
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * 13)
    }
    setNum1(newNum1)
    setNum2(newNum2)
    setUserAnswer('')
    setFeedback('')
  }

  // Start the game
  const startGame = () => {
    if (isGameActive) return
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    // Reset game state
    setScore(0)
    setTimeLeft(60)
    setIsGameActive(true)
    setShowGetReady(false) // Hide "Get Ready" message
    setFeedback('')
    setUserAnswer('')
    // DO NOT generate new problem - keep the current displayed question
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
      setScore(prev => prev + 1)
      setFeedback('✅ Correct!')
      generateNewProblem()
    } else {
      setFeedback(`❌ Wrong. The correct answer was ${correctAnswer}`)
      setUserAnswer('')
    }
  }

  const resetGame = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    // Reset all game state
    setScore(0)
    setTimeLeft(60)
    setIsGameActive(false)
    setShowGetReady(true) // Show "Get Ready" message again
    setFeedback('')
    setUserAnswer('')
    
    // Generate initial problem
    let newNum1, newNum2
    switch(operation) {
      case '+':
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * 13)
        break
      case '-':
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * (newNum1 + 1))
        break
      case '×':
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * 13)
        break
      case '÷':
        newNum2 = Math.floor(Math.random() * 12) + 1
        newNum1 = newNum2 * (Math.floor(Math.random() * 12) + 1)
        break
      default:
        newNum1 = Math.floor(Math.random() * 13)
        newNum2 = Math.floor(Math.random() * 13)
    }
    setNum1(newNum1)
    setNum2(newNum2)
  }

  // --- Timer Effect - Starts when isGameActive becomes true ---
  useEffect(() => {
    if (!isGameActive) return
    if (timeLeft <= 0) {
      setIsGameActive(false)
      setShowGetReady(true)
      setFeedback(`⏰ Time's up! Final score: ${score}`)
      return
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up on next tick
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
          setIsGameActive(false)
          setShowGetReady(true)
          setFeedback(`⏰ Time's up! Final score: ${score + 1}`)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isGameActive, timeLeft, score]) // Re-run when game starts or time changes

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '50px auto', 
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1>🔥 chaosTheory Math 🔥</h1>
      
      {/* Operation Selector */}
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '10px'
      }}>
        <label style={{ fontSize: '18px', marginRight: '10px' }}>
          Choose operation:
        </label>
        <select 
          value={operation}
          onChange={(e) => handleOperationChange(e.target.value)}
          disabled={isGameActive}
          style={{
            fontSize: '18px',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: isGameActive ? 'not-allowed' : 'pointer',
            opacity: isGameActive ? 0.6 : 1
          }}
        >
          <option value="+">Addition (+)</option>
          <option value="-">Subtraction (−)</option>
          <option value="×">Multiplication (×)</option>
          <option value="÷">Division (÷)</option>
        </select>
      </div>

      {/* Score and Timer Display */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px'
      }}>
        <div style={{ fontSize: '24px' }}>
          🎯 Score: <strong>{score}</strong>
        </div>
        <div style={{ 
          fontSize: '24px',
          color: timeLeft <= 10 ? 'red' : 'black'
        }}>
          ⏱️ Time: <strong>{timeLeft}</strong>s
        </div>
      </div>

      {/* Math Problem or "Get Ready" Message */}
      <div style={{ fontSize: '48px', margin: '30px', minHeight: '120px' }}>
        {showGetReady && !isGameActive ? (
          <div style={{ color: '#2196F3' }}>
            🎯 Get Ready!<br />
            <span style={{ fontSize: '24px', color: '#666' }}>
              Choose your operation and click Start Round
            </span>
          </div>
        ) : (
          <div>
            {num1} {getOperationSymbol()} {num2} = ?
          </div>
        )}
      </div>

      {/* Input Area */}
      <input
        type="number"
        step={operation === '÷' ? 'any' : '1'}
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type answer"
        disabled={!isGameActive}
        style={{ 
          fontSize: '32px', 
          padding: '15px',
          width: '250px',
          textAlign: 'center',
          borderRadius: '10px',
          border: '2px solid #ccc',
          opacity: !isGameActive ? 0.6 : 1
        }}
        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
      />

      <div style={{ margin: '20px' }}>
        {/* Start Round Button */}
        {!isGameActive && (
          <button 
            onClick={startGame}
            style={{ 
              padding: '12px 24px', 
              fontSize: '18px',
              marginRight: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🎮 Start Round
          </button>
        )}
        
        {/* Check Answer Button */}
        {isGameActive && (
          <button 
            onClick={checkAnswer}
            style={{ 
              padding: '12px 24px', 
              fontSize: '18px',
              marginRight: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Check Answer
          </button>
        )}
        
        <button 
          onClick={resetGame}
          style={{ 
            padding: '12px 24px', 
            fontSize: '18px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Reset
        </button>
      </div>

      {feedback && (
        <div style={{ 
          marginTop: '20px', 
          fontSize: '20px',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: feedback.includes('Correct') ? '#d4edda' : '#f8d7da',
          color: feedback.includes('Correct') ? 'green' : 'red'
        }}>
          {feedback}
        </div>
      )}
    </div>
  )
}

export default App