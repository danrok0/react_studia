import React, { useState, useEffect } from 'react';

function BookForm({ onSave, editingBook, onCancel }) {
  const initialState = { title: '', category: '', status: 'Planowana', priority: 'Średni', description: '' };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    } else {
      setFormData(initialState);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Czyszczenie błędu przy pisaniu
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Tytuł jest wymagany.';
    if (!formData.category) newErrors.category = 'Wybierz kategorię.';
    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = 'Opis musi mieć co najmniej 10 znaków.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        id: formData.id || Date.now().toString()
      });
      setFormData(initialState);
    }
  };

  return (
    <form className="book-form card" onSubmit={handleSubmit}>
      <h3>{editingBook ? '✏️ Edytuj Książkę' : '➕ Dodaj Nową Książkę'}</h3>
      
      {/* 1. Pole tekstowe */}
      <div className="form-group">
        <label>Tytuł:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      {/* 2. Pole Select */}
      <div className="form-group">
        <label>Kategoria:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">-- Wybierz --</option>
          <option value="Fantastyka">Fantastyka</option>
          <option value="IT">IT</option>
          <option value="Kryminał">Kryminał</option>
          <option value="Poradnik">Poradnik</option>
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </div>

      {/* 3. Radio buttons (Priorytet) */}
      <div className="form-group radio-group">
        <label>Priorytet:</label>
        {['Niski', 'Średni', 'Wysoki'].map(prio => (
          <label key={prio} className="radio-label">
            <input 
              type="radio" 
              name="priority" 
              value={prio} 
              checked={formData.priority === prio} 
              onChange={handleChange} 
            />
            {prio}
          </label>
        ))}
      </div>

      {/* 4. Pole statusu jako select (dodatkowe) */}
      <div className="form-group">
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Planowana">Planowana</option>
          <option value="W trakcie">W trakcie</option>
          <option value="Przeczytana">Przeczytana</option>
        </select>
      </div>

      {/* 5. Textarea */}
      <div className="form-group">
        <label>Krótki opis:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingBook ? 'Zapisz zmiany' : 'Dodaj książkę'}
        </button>
        {editingBook && (
          <button type="button" className="btn-secondary" onClick={onCancel}>Anuluj</button>
        )}
      </div>
    </form>
  );
}

export default BookForm;