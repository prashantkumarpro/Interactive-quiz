import React from 'react'
import { Link } from 'react-router'

const Scoreboard = ({ score, totalQuestions }) => {

  
  return (
    <div className='p-6 text-center bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto'>
      <h2 className='text-3xl font-bold text-gray-800'>🎉 Quiz Over! 🎉</h2>
      <p className='text-lg mt-2 mb-5 font-semibold text-gray-700'>
        Your Score: {score} / {totalQuestions}
      </p>
      <Link
        to={'/'}
        className='mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300'
      >
        🔄 Try Again
      </Link>
    </div>
  )
}

export default Scoreboard
