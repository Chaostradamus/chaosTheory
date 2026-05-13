const MathProblem = ({ addends, operation, showGetReady, isGameActive }) => {
  const getOperatorSymbol = () => {
    switch(operation) {
      case '+': return '+'
      case '-': return '−'
      case '×': return '×'
      case '÷': return '÷'
      default: return '+'
    }
  }

  const operatorSymbol = getOperatorSymbol()

  return (
    <div style={{ 
      margin: '10px auto',
      padding: '5px',
      minHeight: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {showGetReady && !isGameActive ? (
        <div style={{ 
          color: '#2196F3',
          fontSize: '22px',
          textAlign: 'center'
        }}>
          🎯 Get Ready!<br />
          <span style={{ fontSize: '14px', color: '#666' }}>
            Choose operation & difficulty, then click Start Round
          </span>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '15px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
          width: '220px',
          fontFamily: 'monospace'
        }}>
          {/* All addends EXCEPT the last one, stacked vertically */}
          <div style={{ textAlign: 'right', fontSize: '32px', fontWeight: 'bold' }}>
            {addends && addends.slice(0, -1).map((num, idx) => (
              <div key={idx} style={{ 
                marginBottom: '5px',
                lineHeight: '1.2'
              }}>
                {num}
              </div>
            ))}
          </div>
          
          {/* Last addend row with plus sign on the left */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            marginTop: addends && addends.length > 1 ? '0px' : '0px'
          }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{operatorSymbol}</span>
            <span>{addends && addends[addends.length - 1]}</span>
          </div>
          
          {/* Black line with space above and below */}
          <div style={{ 
            marginTop: '12px',
            marginBottom: '5px'
          }}>
            <div style={{ 
              borderTop: '3px solid #333',
              width: '100%'
            }}></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MathProblem