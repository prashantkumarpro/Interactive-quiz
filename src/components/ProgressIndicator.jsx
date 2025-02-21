const ProgressIndicator = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className='flex justify-between items-center mb-4 mt-4 px-2 py-2 bg-gray-100 rounded-lg shadow-md'>
      <span className='text-lg font-semibold text-gray-700'>
        Ques  {currentQuestion + 1} / {totalQuestions}
      </span>
      <div className='w-full bg-gray-300 h-2 rounded-lg mx-4'>
        <div
          className='h-2 bg-blue-500 rounded-lg'
          style={{
            width: `${((currentQuestion + 1) / totalQuestions) * 100}%`
          }}
        ></div>
      </div>
    </div>
  )
}
export default ProgressIndicator
