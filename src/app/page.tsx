"use client";
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import PokemonTypesChart from './components/charts/PokemonTypesChart';
import TypeDistributionChart from './components/charts/SingleDualTypeChart';
import { usePokemonSearch } from './hooks/usePokemonSearch';
import SearchForm from './components/search/SearchForm';
import SearchResults from './components/search/SearchResults';
import ToggleSwitch from './components/common/ToggleSwitch';

export default function ChartPage() {
  const [showPercentages, setShowPercentages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { searchResults, searchPokemon, loading } = usePokemonSearch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    searchPokemon(e.target.value);
  };

  const handleToggle = () => {
    setShowPercentages(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-1">
      <h1 className="text-4xl font-bold text-center mb-8">Embeddable &lt;&gt; Pokémon</h1>

      <SearchForm searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      {loading ? (
        <Skeleton count={5} height={40} width={300} />
      ) : (
        searchResults && searchResults.length > 0 && (
          <SearchResults searchResults={searchResults} limit={10} />
        )
      )}

      <ToggleSwitch showPercentages={showPercentages} onToggle={handleToggle} />

      <div className="w-full max-w-4xl p-6 rounded-lg">
          <PokemonTypesChart showPercentages={showPercentages} />
      </div>
      <div className="w-full max-w-4xl p-6 rounded-lg">
          <TypeDistributionChart showPercentages={showPercentages} />
      </div>
    </div>
  );
}
