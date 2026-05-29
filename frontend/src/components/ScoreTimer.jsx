const ScoreTimer = ({ score, timeLeft, isGameActive }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      marginBottom: '15px',
      padding: '12px 20px',
      backgroundColor: isGameActive ? '#1a1a2e' : '#f0f0f0',
      borderRadius: '12px',
      color: isGameActive ? 'white' : 'black',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
        🎯 Score: <strong>{score}</strong>
      </div>
      <div style={{ 
        fontSize: '22px', 
        fontWeight: 'bold',
        color: timeLeft <= 10 ? '#ff6b6b' : (isGameActive ? 'white' : 'black')
      }}>
        ⏱️ Time: <strong>{timeLeft}</strong>s
      </div>
    </div>
  )
}

export default ScoreTimer