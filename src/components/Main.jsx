import { useEffect, useState } from 'react';
import React from 'react';

function Main({
  searchTerm,
  setSearchTerm,
  movies,
  isLoading,
  error,
  fetchMovies,
  setSelectedMovie,
  selectedMovie
}) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main style={{
      width: '100%',
      maxWidth: 1100,
      margin: '0 auto',
      padding: '32px 16px 48px 16px',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (searchTerm.trim()) fetchMovies(searchTerm);
        }}
        style={{ marginBottom: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 600 }}
      >
        <input
          type="text"
          placeholder="Buscar película o serie..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: 12, width: '70%', maxWidth: 400, marginRight: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 18, textAlign: 'center' }}
        />
        <button type="submit" style={{ padding: '12px 24px', fontSize: 18, borderRadius: 8 }}>Buscar</button>
      </form>
      {isLoading && <p style={{ fontSize: 18 }}>Cargando...</p>}
      {error && <p style={{ color: 'red', fontSize: 18 }}>{error}</p>}
      <div className="movies-grid" style={{
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        marginTop: 10
      }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 340,
              cursor: 'pointer',
              transition: 'transform 0.1s, box-shadow 0.2s',
            }}
            onClick={() => setSelectedMovie(movie)}
            title="Ver reseña"
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', height: 270, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }}
              />
            ) : (
              <div style={{ width: '100%', height: 270, background: '#eee', borderRadius: 8, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 16 }}>
                Sin imagen
              </div>
            )}
            <h3 style={{ fontSize: 20, margin: '0 0 10px 0', textAlign: 'center', fontWeight: 600 }}>{movie.title}</h3>
            <p style={{ fontSize: 15, color: '#555', textAlign: 'center', margin: 0 }}>{movie.release_date ? movie.release_date.slice(0, 4) : 'Sin año'}</p>
          </div>
        ))}
      </div>

      {/* Modal para mostrar la reseña */}
      {selectedMovie && (
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
          zIndex: 1000
        }}
          onClick={() => setSelectedMovie(null)}
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
              onClick={() => setSelectedMovie(null)}
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
            {selectedMovie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                style={{ width: '100%', maxWidth: 220, height: 320, objectFit: 'cover', borderRadius: 8, marginBottom: 23 }}
              />
            ) : (
              <div style={{ width: 220, height: 320, background: '#eee', borderRadius: 8, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 16 }}>
                Sin imagen
              </div>
            )}
            <h2 style={{ marginTop: 0, marginBottom: 12, textAlign: 'center' }}>{selectedMovie.title}</h2>
            <p style={{ fontSize: 15, color: '#555', textAlign: 'center' }}><b>Año:</b> {selectedMovie.release_date ? selectedMovie.release_date.slice(0, 4) : 'Sin año'}</p>
            <p style={{ fontSize: 16, color: '#222', textAlign: 'center' }}><b>Reseña:</b> {selectedMovie.overview ? selectedMovie.overview : 'Sin reseña disponible.'}</p>
          </div>
        </div>
      )}
      {showScroll && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: 90,
            right: 30,
            zIndex: 3000,
            background: '#181c24',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 48,
            height: 48,
            fontSize: 28,
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          aria-label="Subir al inicio"
          title="Subir al inicio"
        >
          ↑
        </button>
      )}
    </main>
  );
}

export default Main;
