import React from 'react';

function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: '#181c24',
      color: '#fff',
      textAlign: 'center',
      padding: '1rem 0',
      fontSize: 16,
      position: 'fixed',
      left: 0,
      bottom: 0,
      zIndex: 2000
    }}>
      © {new Date().getFullYear()} App de Películas. Proyecto para el Curso Front-End de Software Libre
    </footer>
  );
}

export default Footer;
