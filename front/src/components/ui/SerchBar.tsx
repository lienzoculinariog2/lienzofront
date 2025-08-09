// src/components/ui/SearchBar.tsx
"use client";

import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Button from './Button';

// 1. Definimos la interfaz de las propiedades que el componente recibirá
type SearchBarProps = {
  onSearch: (category: string, term: string) => void;
};

const categories = ['Todas las categorías', 'Pizzas', 'Hamburguesas', 'Bebidas', 'Postres', 'Ensaladas'];

// 2. El componente ahora acepta un objeto de propiedades, y desestructuramos 'onSearch'
const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 3. ¡CORRECCIÓN CLAVE! Ahora llamamos a la función 'onSearch' que viene del componente padre
    onSearch(selectedCategory, searchTerm);
  };

  return (
    <form className="max-w-lg mx-auto my-4" onSubmit={handleSearch}>
      <div className="flex rounded-lg overflow-hidden shadow-md">
        {/* Dropdown Button */}
        <div className="relative">
          <Button
            id="dropdown-button"
            type="button"
            variant="dark"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center rounded-s-lg py-2.5 px-4 text-sm font-medium text-center"
          >
            {selectedCategory}
            <ChevronDown className="w-4 h-4 ms-2.5" />
          </Button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              id="dropdown"
              className="absolute z-10 top-full left-0 mt-1 bg-primary-background-900 divide-y divide-primary-background-800 rounded-lg shadow-xl w-44"
            >
              <ul className="py-2 text-sm text-secondary-txt-500" aria-labelledby="dropdown-button">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                      className="inline-flex w-full px-4 py-2 hover:bg-primary-background-700 hover:text-primary-txt-100 transition-colors"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Search Input and Button */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2.5 w-full z-20 text-sm text-primary-txt-100 bg-primary-background-700 rounded-e-lg border-s-primary-background-700 border-s-2 border border-primary-background-800 focus:ring-celiac-500 focus:border-celiac-500 placeholder-secondary-txt-500 outline-none"
            placeholder="Buscar productos, ingredientes..."
            required
          />
          <Button
            type="submit"
            variant="dailyMenu"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-celiac-500 rounded-e-lg border border-celiac-500 hover:bg-celiac-600 focus:ring-4 focus:outline-none focus:ring-celiac-300 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;





