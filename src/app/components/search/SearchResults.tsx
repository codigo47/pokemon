// src/components/SearchResults.tsx
import React from 'react';
import { PokemonDetails } from '../../api/pokemonApi';

interface SearchResultsProps {
  searchResults: PokemonDetails[];
  limit?: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, limit }) => {
  const limitedResults = limit ? searchResults.slice(0, limit) : searchResults; 
  
  return (
    <div className="w-full max-w-md p-4 bg-gray-100 rounded">
      <ul>
        {limitedResults.map((result, index) => (
          <li key={index} className="p-2 border-b border-gray-300">
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
