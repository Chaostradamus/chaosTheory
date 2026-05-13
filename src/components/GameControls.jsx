const GameControls = ({ isGameActive, onStartGame, onCheckAnswer, onResetGame }) => {
  const buttonStyle = {
    padding: '10px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 6px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'transform 0.1s ease, opacity 0.2s ease'
  }

  return (
    <div style={{ margin: '15px 0' }}>
      {!isGameActive && (
        <button 
          onClick={onStartGame}
          style={{
            ...buttonStyle,
            backgroundColor: '#4CAF50',
            color: 'white',
            boxShadow: '0 2px 8px rgba(76,175,80,0.3)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          🎮 Start Round
        </button>
      )}
      
      {isGameActive && (
        <button 
          onClick={onCheckAnswer}
          style={{
            ...buttonStyle,
            backgroundColor: '#2196F3',
            color: 'white',
            boxShadow: '0 2px 8px rgba(33,150,243,0.3)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          ✓ Check Answer
        </button>
      )}
      
      <button 
        onClick={onResetGame}
        style={{
          ...buttonStyle,
          backgroundColor: '#ff9800',
          color: 'white',
          boxShadow: '0 2px 8px rgba(255,152,0,0.3)'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        🔄 Reset
      </button>
    </div>
  )
}

export default GameControls