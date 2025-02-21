import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { questions } from './Data'
import Timer from './Timer'

const Quiz = ({ quizEnd }) => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion()
      return
    }
  }, [timeLeft])

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      quizEnd(score)
      navigate('/scoreboard')
    }
  }, [currentQuestion])

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setUserInput('')
      setTimeLeft(30)
    } else {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handleIntegerSubmit = () => {
    if (!userInput.trim()) {
      alert('Enter a valid number')
      return
    }
    const userAnswer = parseInt(userInput, 10)
    if (userAnswer === questions[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1)
    }
    setTimeout(() => handleNextQuestion(), 1000)
  }

  const handleAnswerClick = option => {
    setSelectedAnswer(option)
    if (option === questions[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1)
    }
    setTimeout(() => handleNextQuestion(), 1000)
  }

  if (currentQuestion >= questions.length) {
    return null
  }

  return (
    <div className='p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200'>
      <Link to='/history'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300'>
          ➡️ Attempted Quiz
        </button>
      </Link>
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <h2 className='text-2xl font-bold text-gray-800 text-center'>
        {questions[currentQuestion].question}
      </h2>

      {questions[currentQuestion].type === 'integer' ? (
        <div className='mt-4 text-center'>
          <input
            type='number'
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            className='border p-2 rounded w-1/2'
          />
          <button
            onClick={handleIntegerSubmit}
            className='ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Submit
          </button>
        </div>
      ) : (
        <ul className='mt-6 space-y-3'>
          {questions[currentQuestion].options.map((option, index) => (
            <li
              key={index}
              className={`p-3 border rounded-lg text-center cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white ${
                selectedAnswer === option
                  ? option === questions[currentQuestion].answer
                    ? 'bg-green-400 text-white'
                    : 'bg-red-400 text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Quiz
