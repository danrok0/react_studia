import React from 'react';
import BookItem from './BookItem';

function BookList({ books, onDelete, onEdit, onToggleStatus }) {
  if (books.length === 0) {
    return <div className="empty-state card">Brak książek spełniających kryteria.</div>;
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookItem 
          key={book.id} 
          book={book} 
          onDelete={onDelete} 
          onEdit={onEdit} 
          onToggleStatus={onToggleStatus} 
        />
      ))}
    </div>
  );
}

export default BookList;