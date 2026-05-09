import React from 'react';

function Header({ theme, toggleTheme }) {
  return (
    <header className="app-header">
      <h1>📚 Mój Katalog Książek</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙 Tryb Ciemny' : '☀️ Tryb Jasny'}
      </button>
    </header>
  );
}

export default Header;