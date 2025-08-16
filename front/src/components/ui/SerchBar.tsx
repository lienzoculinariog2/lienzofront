"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import Button from "./Button";

type SearchBarProps = {
  onSearch: (category: string, term: string) => void;
  categories: string[];
};

const SearchBar = ({ onSearch, categories }: SearchBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0] || "Todas las categorías"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (categories.length > 0 && !categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    onSearch(category, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    // ✅ Se llama a onSearch con la categoría actual y el nuevo término
    onSearch(selectedCategory, newTerm);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCategory, searchTerm);
  };

  return (
    <form className="mx-auto my-4" onSubmit={handleFormSubmit}>
      <div className="relative flex w-full rounded-lg shadow-md">
        <div className="relative w-1/4 min-w-max">
          <Button
            id="dropdown-button"
            type="button"
            variant="dark"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full h-full px-4 py-2.5 text-sm font-medium text-center rounded-l-lg"
          >
            {selectedCategory}
            <ChevronDown className="w-4 h-4 ms-2.5" />
          </Button>

          {isDropdownOpen && (
            <div
              id="dropdown"
              className="absolute left-0 z-10 w-full mt-1 divide-y rounded-lg shadow-xl top-full bg-primary-background-900 divide-primary-background-800"
            >
              <ul
                className="py-2 text-sm text-secondary-txt-500"
                aria-labelledby="dropdown-button"
              >
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                      className="inline-flex w-full px-4 py-2 transition-colors hover:bg-primary-background-700 hover:text-primary-txt-100"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative flex items-stretch w-2/3">
          <input
            type="search"
            id="search-dropdown"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full p-2.5 text-sm rounded-lg ml-2 mr-2 text-primary-txt-100 bg-primary-background-700 border-l-2  border border-secondary-background-700 focus:ring-daily-menu-500 focus:border-daily-menu-500 placeholder-secondary-txt-500 outline-none"
            placeholder="Buscar..."
            required
          />
          <Button type="submit" variant="dailyMenu">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
