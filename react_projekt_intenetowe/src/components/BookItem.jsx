import React from 'react';

function BookItem({ book, onDelete, onEdit, onToggleStatus }) {
  const handleDelete = () => {
    if (window.confirm(`Czy na pewno chcesz usunąć książkę: "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  const getStatusClass = (status) => {
    if (status === 'Przeczytana') return 'status-read';
    if (status === 'W trakcie') return 'status-progress';
    return 'status-planned';
  };

  return (
    <div className={`book-item card ${getStatusClass(book.status)}`}>
      <div className="book-content">
        <h4>{book.title}</h4>
        <div className="book-badges">
          <span className="badge category">{book.category}</span>
          <span className="badge priority">Priorytet: {book.priority}</span>
          <span className="badge status" onClick={() => onToggleStatus(book.id)} title="Kliknij by zmienić status">
            {book.status} 🔄
          </span>
        </div>
        <p className="description">{book.description}</p>
      </div>
      <div className="book-actions">
        <button onClick={() => onEdit(book)} className="btn-edit">Edytuj</button>
        <button onClick={handleDelete} className="btn-delete">Usuń</button>
      </div>
    </div>
  );
}

export default BookItem;