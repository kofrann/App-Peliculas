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
  const [favoritos, setFavoritos] = useState(() => {
    const favs = localStorage.getItem('favoritos');
    return favs ? JSON.parse(favs) : [];
  });
  const [showFavoritos, setShowFavoritos] = useState(false);

  // Guardar favoritos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);
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
      paddingTop: '80px',
      paddingBottom: '70px'
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
        favoritos={favoritos}
        setFavoritos={setFavoritos}
      />
      <Footer onShowFavoritos={() => setShowFavoritos(true)} />

      {/* Modal de favoritos */}
      {showFavoritos && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}
          onClick={() => setShowFavoritos(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              maxWidth: 420,
              width: '90%',
              padding: 28,
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFavoritos(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'transparent',
                border: 'none',
                fontSize: 26,
                cursor: 'pointer',
                color: '#888'
              }}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 style={{ marginTop: 0, marginBottom: 18, textAlign: 'center', color: '#c1121f' }}>Lista de Favoritos</h2>
            {favoritos.length === 0 ? (
              <p style={{ color: '#555', fontSize: 16 }}>No hay películas favoritas.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
                {favoritos.map((movie) => (
                  <li key={movie.id} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                    {movie.poster_path ? (
                      <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} style={{ width: 40, height: 60, objectFit: 'cover', borderRadius: 4 }} />
                    ) : (
                      <div style={{ width: 40, height: 60, background: '#eee', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 12 }}>Sin imagen</div>
                    )}
                    <span style={{ fontWeight: 500 }}>{movie.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
