import React from 'react';

function Navbar() {
  return (
    <nav className="navbar-app">
      <div className="navbar-content" style={{ position: 'relative', width: '100%' }}>
        <img
          src="/clap.png"
          alt="Logo Clap"
          className="navbar-logo"
          style={{
            position: 'absolute',
            left: 0,
            top: '-10px',
            height: '130px',
            width: '130px',
            objectFit: 'contain',
            marginLeft: 18,
            zIndex: 2100
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <h1 className="navbar-title" style={{ margin: 0 }}>
            Buscador de Películas y Series
          </h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
