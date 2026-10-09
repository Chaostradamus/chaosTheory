const ScoreTimer = ({ 
  accuracy = 100, 
  correctCount = 0, 
  wrongCount = 0, 
  timeLeft, 
  isGameActive 
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      padding: '14px 24px',
      backgroundColor: isGameActive ? '#1a1a2e' : '#f0f0f0',
      borderRadius: '12px',
      color: isGameActive ? 'white' : 'black',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Stacked Stats Column */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '6px', 
        textAlign: 'left',
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        <div style={{ color: '#4caf50' }}>
          ✅ Correct: <strong>{correctCount}</strong>
        </div>
        <div style={{ color: '#ff5252' }}>
          ❌ Wrong: <strong>{wrongCount}</strong>
        </div>
        <div style={{ color: '#448aff' }}>
          📊 Accuracy: <strong>{accuracy}%</strong>
        </div>
      </div>

      {/* Timer Display */}
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: timeLeft <= 10 ? '#ff6b6b' : (isGameActive ? 'white' : 'black')
      }}>
        ⏱️ Time: <strong>{timeLeft}</strong>s
      </div>
    </div>
  )
}

export default ScoreTimer