const OperationSelector = ({ operation, onOperationChange, isDisabled }) => {
  const operations = [
    { value: '+', label: 'Addition (+)' },
    { value: '-', label: 'Subtraction (−)' },
    { value: '×', label: 'Multiplication (×)' },
    { value: '÷', label: 'Division (÷)' }
  ]

  return (
    <div style={{ 
      marginBottom: '15px',
      padding: '15px',
      backgroundColor: '#e3f2fd',
      borderRadius: '10px'
    }}>
      <label style={{ fontSize: '18px', marginRight: '10px' }}>
        Operation:
      </label>
      <select 
        value={operation}
        onChange={(e) => onOperationChange(e.target.value)}
        disabled={isDisabled}
        style={{
          fontSize: '18px',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: isDisabled ? 'not-allowed' : 'pointer'
        }}
      >
        {operations.map(op => (
          <option key={op.value} value={op.value}>{op.label}</option>
        ))}
      </select>
    </div>
  )
}

export default OperationSelector