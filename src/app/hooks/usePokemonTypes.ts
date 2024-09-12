// src/hooks/usePokemonTypes.ts
import { useState, useEffect } from 'react';
import { fetchPokemonTypes } from '../api/pokemonApi';

export const usePokemonTypes = () => {
  const [pokemonTypesCount, setPokemonTypesCount] = useState<[string, number][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        setLoading(true);
        
        const typesData = await fetchPokemonTypes();

        // Convertir los datos a un array de pares clave-valor
        const typesArray = Object.entries(typesData);
        setPokemonTypesCount(typesArray);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load Pokémon types: ${err}`);
        setLoading(false);
      }
    };

    loadTypes();
  }, []);

  return { pokemonTypesCount, loading, error };
};
