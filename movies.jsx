import React, { useState } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${searchTerm}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <div className="row mt-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-md-3 mb-3">
            <div className="card">
              <img
                src={movie.Poster}
                className="card-img-top"
                alt={movie.Title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Year: {movie.Year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
