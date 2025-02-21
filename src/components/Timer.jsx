import React, { useEffect } from 'react'

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer) 
    }
  }, [timeLeft]) 

  return (
    <p className='text-red-600 font-bold text-center text-lg'>
      ⏳ Time Left: {timeLeft}
    </p>
  )
}

export default Timer
