import React from 'react'
import { questions } from './Data'
import { Link } from 'react-router'

const History = ({ attempts }) => {
  return (
    <div className='p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg border border-gray-200 mt-6'>
      <h2 className='text-2xl font-bold text-gray-800 text-center'>
        📜 Attempt History
      </h2>

      {attempts.length === 0 ? (
        <p className='text-center text-gray-500 mt-4'>
          No attempts yet. Take a quiz to see your history!
        </p>
      ) : (
        <ul className='mt-4 space-y-2'>
          {[...attempts].reverse().map((attempt, index) => (
            <li
              key={index}
              className='border p-3 rounded-lg bg-gray-50 text-gray-800 text-center shadow-sm'
            >
              🏆 Attempt {index + 1}:{' '}
              <span className='font-bold'>
                {attempt.score} / {questions.length}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Button to go back to the quiz */}
      <div className='text-center mt-6'>
        <Link to='/'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300'>
            ➡️ Go to Quiz
          </button>
        </Link>
      </div>
    </div>
  )
}

export default History
