// src/components/SearchForm.tsx
import React from 'react';

interface SearchFormProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="w-full max-w-md p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Pokémon by name"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default SearchForm;
