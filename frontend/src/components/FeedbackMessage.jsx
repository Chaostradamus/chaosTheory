const FeedbackMessage = ({ feedback }) => {
  if (!feedback) return null
  
  return (
    <div style={{ 
      marginTop: '15px', 
      fontSize: '18px',
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: feedback.includes('Correct') ? '#d4edda' : '#f8d7da',
      color: feedback.includes('Correct') ? 'green' : 'red'
    }}>
      {feedback}
    </div>
  )
}

export default FeedbackMessage