import React from 'react';

function Navbar() {
  return (
    <nav style={{
      width: '100%',
      background: '#181c24',
      padding: '1.2rem 0',
      marginBottom: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 2000
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: 1200,
        margin: '0 auto',
        height: '100%'
      }}>
        <img
          src="/clap.png"
          alt="Logo Clap"
          style={{
            height: 100,
            width: 100,
            objectFit: 'contain',
            position: 'absolute',
            left: 0,
            top: '-20px',
            marginLeft: 18,
            zIndex: 2100
          }}
        />
        <h1 style={{
          color: '#fff',
          textAlign: 'center',
          margin: 0,
          fontSize: '2.2rem',
          letterSpacing: 1
        }}>
          Buscador de Películas y Series
        </h1>
      </div>
    </nav>
  );
}

export default Navbar;
