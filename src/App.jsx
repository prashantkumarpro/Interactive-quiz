import React, { useEffect, useState } from 'react'
import Quiz from '../src/components/Quiz'
import Scoreboard from './components/Scoreboard'
import { BrowserRouter, Route, Routes } from 'react-router'
import History from './components/History'

const App = () => {
  const [finalScore, setFinalScore] = useState(0)
  const [attempts, setAttempts] = useState([])
  const [err, setErr] = useState('')

  useEffect(() => {
    // create an IndexedDB database named 'QuizDB' with version 1
    const request = indexedDB.open('QuizDB', 1)

    // Handle errors while opening IndexedDB
    request.onerror = event => {
      setErr(event.target.error)
      console.error('IndexedDB Error:', event.target.error)
    }

    // If IndexedDB opens successfully, fetch past attempts
    request.onsuccess = event => {
      const db = event.target.result
      console.log('IndexedDB Opened Successfully:', db)
      fetchAttempts(db) // Load saved quiz attempts
    }

    // This event runs only when the database is newly created or upgraded
    request.onupgradeneeded = event => {
      const db = event.target.result

      // Create a new object store for storing quiz attempts if it doesn’t already exist
      if (!db.objectStoreNames.contains('quizAttempts')) {
        const objectStore = db.createObjectStore('quizAttempts', {
          keyPath: 'id',
          autoIncrement: true
        })

        // Create indexes to allow easy querying
        objectStore.createIndex('score', 'score', { unique: false })
        objectStore.createIndex('date', 'date', { unique: false })
      }
    }
  }, [])

  // Function to save the user's final score in IndexedDB
  const saveScoreToDB = score => {
    // Open IndexedDB
    const request = indexedDB.open('QuizDB', 1)

    request.onsuccess = event => {
      const db = event.target.result

      // Start a new transaction with 'readwrite' access
      const transaction = db.transaction('quizAttempts', 'readwrite')

      // Access the 'quizAttempts' object store
      const store = transaction.objectStore('quizAttempts')

      // Create a new attempt object with score and timestamp
      const newAttempt = {
        score: score,
        date: new Date().toLocaleString()
      }

      // Save the new attempt in IndexedDB
      store.add(newAttempt)

      // When the transaction is complete, fetch all attempts again to update UI
      transaction.oncomplete = () => {
        // console.log('Score saved successfully in IndexedDB')
        fetchAttempts(db)
      }
    }
  }

  // Function to fetch all past attempts from IndexedDB
  const fetchAttempts = db => {
    const transaction = db.transaction('quizAttempts', 'readonly')
    const store = transaction.objectStore('quizAttempts')
    const getAllRequest = store.getAll()

    // When data is retrieved successfully, update the attempts state
    getAllRequest.onsuccess = () => {
      setAttempts(getAllRequest.result)
    }
  }

  const handleQuizEnd = totalScore => {
    setFinalScore(totalScore)
    saveScoreToDB(totalScore)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Quiz quizEnd={handleQuizEnd} />} />
        <Route
          path='/scoreboard'
          element={<Scoreboard score={finalScore} totalQuestions={10} />}
        />
        <Route path='/history' element={<History attempts={attempts} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
