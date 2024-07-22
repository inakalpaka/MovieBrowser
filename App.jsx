import { useState } from 'react'
import './App.css'
import TextInputButton from './components/browser';
import MovieList from './components/movies';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
            <h1>Movie-Browser</h1>
            <TextInputButton />
      </div>
      <div className="App">
      <MovieList />
    </div>
    </>
  )
}

export default App
