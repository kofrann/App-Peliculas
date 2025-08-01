import React from 'react';

function Navbar() {
  return (
    <nav className="navbar-app">
      <div className="navbar-content" style={{ width: '100%', alignItems: 'center', display: 'flex', gap: 18 }}>
        <img
          src="/clap.png"
          alt="Logo Clap"
          className="navbar-logo"
          style={{ height: '70px', width: '70px', objectFit: 'contain', marginLeft: 0 }}
        />
        <h1 className="navbar-title" style={{ margin: 0, flex: 1, textAlign: 'center', paddingLeft: 0 }}>
          Buscador de Películas y Series
        </h1>
      </div>
    </nav>
  );
}

export default Navbar;
