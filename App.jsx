import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList';

function App() {

  return (
    <>
      <div className="App">
            <h1>Movie-Browser</h1>
      </div>
      <div className="App">
      <MovieList />
    </div>
    </>
  )
}

export default App
