import React from 'react';

function Footer() {
  return (
    <footer className="footer-app">
      © {new Date().getFullYear()} App de Películas. Proyecto para el Curso Front-End de Software Libre
    </footer>
  );
}

export default Footer;
