import React from 'react';

function Navbar() {
  return (
    <nav className="navbar-app">
      <div className="navbar-content">
        <img
          src="/clap.png"
          alt="Logo Clap"
          className="navbar-logo"
        />
        <h1 className="navbar-title">
          Buscador de Películas y Series
        </h1>
      </div>
    </nav>
  );
}

export default Navbar;
