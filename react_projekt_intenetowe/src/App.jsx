import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialBooks } from './data/initialData';
import Header from './components/Header';
import Statistics from './components/Statistics';
import FilterSortBar from './components/FilterSortBar';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  const [theme, setTheme] = useLocalStorage('app-theme', 'light');
  const [books, setBooks] = useLocalStorage('books-data', initialBooks);
  const [filters, setFilters] = useLocalStorage('books-filters', { search: '', category: '', status: '', sortBy: 'titleAsc' });
  const [editingBook, setEditingBook] = useState(null);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleSaveBook = (book) => {
    if (editingBook) {
      setBooks(books.map(b => b.id === book.id ? book : b));
      setEditingBook(null);
    } else {
      setBooks([book, ...books]);
    }
  };

  const handleDelete = (id) => {
    setBooks(books.filter(b => b.id !== id));
  };

  const handleToggleStatus = (id) => {
    const statuses = ['Planowana', 'W trakcie', 'Przeczytana'];
    setBooks(books.map(b => {
      if (b.id === id) {
        const nextIndex = (statuses.indexOf(b.status) + 1) % statuses.length;
        return { ...b, status: statuses[nextIndex] };
      }
      return b;
    }));
  };

  const filteredAndSortedBooks = useMemo(() => {
    let result = books.filter(b => {
      const matchSearch = b.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === '' || b.category === filters.category;
      const matchStatus = filters.status === '' || b.status === filters.status;
      return matchSearch && matchCategory && matchStatus;
    });

    result.sort((a, b) => {
      if (filters.sortBy === 'titleAsc') return a.title.localeCompare(b.title);
      if (filters.sortBy === 'titleDesc') return b.title.localeCompare(a.title);
      if (filters.sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

    return result;
  }, [books, filters]);

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="container">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <div className="main-content">
          <aside className="sidebar">
            <Statistics books={books} />
            <BookForm 
              onSave={handleSaveBook} 
              editingBook={editingBook} 
              onCancel={() => setEditingBook(null)} 
            />
          </aside>
          
          <main className="content">
            <FilterSortBar filters={filters} setFilters={setFilters} />
            <BookList 
              books={filteredAndSortedBooks} 
              onDelete={handleDelete} 
              onEdit={setEditingBook} 
              onToggleStatus={handleToggleStatus} 
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;