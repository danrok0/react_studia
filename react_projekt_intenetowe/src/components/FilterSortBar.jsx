import React from 'react';

function FilterSortBar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-sort-bar card">
      <input
        type="text"
        name="search"
        placeholder="🔍 Szukaj po tytule..."
        value={filters.search}
        onChange={handleChange}
      />
      
      <select name="category" value={filters.category} onChange={handleChange}>
        <option value="">Wszystkie kategorie</option>
        <option value="Fantastyka">Fantastyka</option>
        <option value="IT">IT</option>
        <option value="Kryminał">Kryminał</option>
        <option value="Poradnik">Poradnik</option>
      </select>

      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">Wszystkie statusy</option>
        <option value="Przeczytana">Przeczytana</option>
        <option value="W trakcie">W trakcie</option>
        <option value="Planowana">Planowana</option>
      </select>

      <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
        <option value="titleAsc">Tytuł (A-Z)</option>
        <option value="titleDesc">Tytuł (Z-A)</option>
        <option value="category">Kategoria</option>
      </select>
    </div>
  );
}

export default FilterSortBar;