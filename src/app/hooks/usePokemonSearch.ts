import { useState } from 'react';
import { searchPokemonByName } from '../api/pokemonApi'; 

export const usePokemonSearch = () => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = async (name: string) => {
    try {
      if (name.trim() === '') {
        setSearchResults(null);
        setLoading(false);
        return;
      }

      setLoading(true); 
      const result = await searchPokemonByName(name);
      setSearchResults(result);
    } catch (err) {
      setError(`Failed to search Pokémon: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, searchPokemon, loading, error };
};
