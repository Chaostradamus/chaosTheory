const AnswerInput = ({ userAnswer, setUserAnswer, isGameActive, operation, onCheckAnswer }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isGameActive) {
      onCheckAnswer()
    }
  }

  return (
    <input
      type="number"
      step={operation === '÷' ? 'any' : '1'}
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
      placeholder="Type your answer here..."
      disabled={!isGameActive}
      style={{ 
        fontSize: '20px', 
        padding: '10px 20px',
        width: '260px',
        textAlign: 'center',
        borderRadius: '50px',
        border: isGameActive ? '2px solid #2196F3' : '2px solid #ccc',
        backgroundColor: isGameActive ? 'white' : '#f0f0f0',
        color: '#333',
        outline: 'none',
        transition: 'all 0.2s ease',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        cursor: isGameActive ? 'text' : 'not-allowed'
      }}
      onKeyDown={handleKeyDown}
      onFocus={(e) => {
        if (isGameActive) {
          e.target.style.borderColor = '#4CAF50'
          e.target.style.boxShadow = '0 0 8px rgba(76,175,80,0.3)'
        }
      }}
      onBlur={(e) => {
        e.target.style.borderColor = isGameActive ? '#2196F3' : '#ccc'
        e.target.style.boxShadow = 'none'
      }}
    />
  )
}

export default AnswerInput