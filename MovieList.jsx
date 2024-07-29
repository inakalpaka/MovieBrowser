import React, { useState, useEffect } from 'react';
import './MovieSearch.css';

// Clave de API para OMDB
const API_KEY = '2b15963e';

const MovieSearch = () => {
  // Estado para mantener la consulta de búsqueda
  const [query, setQuery] = useState('');
  // Estado para mantener la lista de películas de los resultados de búsqueda
  const [movies, setMovies] = useState([]);
  // Estado para mantener la lista de películas fijadas (guardadas), inicializadas desde el almacenamiento local
  const [fixedMovies, setFixedMovies] = useState(() => JSON.parse(localStorage.getItem('fixedMovies')) || []);

  // Efecto para actualizar el almacenamiento local siempre que fixedMovies cambie
  useEffect(() => {
    localStorage.setItem('fixedMovies', JSON.stringify(fixedMovies));
  }, [fixedMovies]);

  // Función para manejar la búsqueda de películas
  const handleSearch = async () => {
    if (!query) return; // Salir si la consulta está vacía
    const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await response.json();
    // Actualizar el estado de movies con los resultados de búsqueda o un array vacío si no hay resultados
    setMovies(data.Response === 'True' ? data.Search : []);
  };

  // Función para alternar una película dentro y fuera de la lista de fixedMovies
  const toggleFixMovie = (movie) => {
    setFixedMovies(fixedMovies =>
      fixedMovies.some(fixedMovie => fixedMovie.imdbID === movie.imdbID)
        // Si la película ya está fijada, eliminarla
        ? fixedMovies.filter(fixedMovie => fixedMovie.imdbID !== movie.imdbID)
        // De lo contrario, añadirla
        : [...fixedMovies, movie]
    );
  };

  // Componente para renderizar una tarjeta de película
  const MovieCard = ({ movie, isFixed }) => (
    <div className="movie-card">
      <img src={movie.Poster !== 'N/A' ? movie.Poster : 'default-poster.jpg'} alt={movie.Title} className="movie-poster" />
      <h3 className="movie-title">{movie.Title}</h3>
      <p className="movie-year">{movie.Year}</p>
      <button className={`fix-button ${isFixed ? 'fixed' : ''}`} onClick={() => toggleFixMovie(movie)}>
        {isFixed ? '✕' : '⭐'}
      </button>
    </div>
  );

  return (
    <div className="movie-search">
      <input
        type="text"
        placeholder="Busca una película..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <div className="movie-list">
        {/* Renderizar la lista de películas de la búsqueda */}
        {movies.length > 0 ? movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />) : <div>No se encontraron películas</div>}
      </div>
      <h2>Películas Fijadas</h2>
      <div className="fixed-movie-list">
        {/* Renderizar la lista de películas fijadas */}
        {fixedMovies.length > 0 ? fixedMovies.map(movie => <MovieCard key={movie.imdbID} movie={movie} isFixed />) : <div>No hay películas fijadas</div>}
      </div>
    </div>
  );
};

export default MovieSearch;
