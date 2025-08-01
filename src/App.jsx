

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
//consumimos la api de tmdb con una api key del mismo sitio, registrandonos en este.
  async function fetchMovies(query) {
    setIsLoading(true);
    setError(null);
    const API_KEY = "53ebd6aca73d8bb8a1599057fe392fd6"; 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener datos de la API");
      }
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("No se pudieron cargar los datos. " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies("Matrix");
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#f5f6fa',
      paddingTop: '80px', // espacio para el navbar fijo
      paddingBottom: '70px' // espacio para el footer fijo
    }}>
      <Navbar />
      <Main
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        movies={movies}
        isLoading={isLoading}
        error={error}
        fetchMovies={fetchMovies}
        setSelectedMovie={setSelectedMovie}
        selectedMovie={selectedMovie}
      />
      <Footer />
    </div>
  );
}

export default App;
