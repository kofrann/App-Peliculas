import React from 'react';

// Helper function para obtener la ruta correcta de assets
const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`.replace(/\/+/g, '/');
};

function Navbar() {
  return (
    <nav className="navbar-app">
      <div className="navbar-content" style={{ width: '100%', alignItems: 'center', display: 'flex', gap: 18 }}>
        <img
          src={getAssetPath('clap.png')}
          alt="Logo Clap"
          className="navbar-logo"
        />
        <h1 className="navbar-title" style={{ margin: 0, flex: 1, textAlign: 'center', paddingLeft: 0 }}>
          Buscador de Películas y Series
        </h1>
      </div>
    </nav>
  );
}

export default Navbar;
