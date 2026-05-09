import React from 'react';

function Statistics({ books }) {
  const total = books.length;
  const read = books.filter(b => b.status === 'Przeczytana').length;
  const inProgress = books.filter(b => b.status === 'W trakcie').length;
  const planned = books.filter(b => b.status === 'Planowana').length;

  return (
    <div className="statistics-panel card">
      <h3>Statystyki</h3>
      <div className="stats-grid">
        <div className="stat-item"><span>Wszystkie:</span> <strong>{total}</strong></div>
        <div className="stat-item"><span>Przeczytane:</span> <strong>{read}</strong></div>
        <div className="stat-item"><span>W trakcie:</span> <strong>{inProgress}</strong></div>
        <div className="stat-item"><span>Planowane:</span> <strong>{planned}</strong></div>
      </div>
    </div>
  );
}

export default Statistics;