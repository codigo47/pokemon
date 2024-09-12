// src/hooks/useSingleDualTypes.ts
import { useState, useEffect } from 'react';
import { fetchSingleDualTypes } from '../api/pokemonApi';

export const useSingleDualTypes = () => {
  const [singleDualTypeCount, setSingleDualTypeCount] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSingleDualTypes = async () => {
      try {
        setLoading(true);

        // Fetch the single-type vs dual-type data
        const { singleType, dualType } = await fetchSingleDualTypes();

        // Set the data in the state as [singleType, dualType]
        setSingleDualTypeCount([singleType, dualType]);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load single vs dual-type data: ${err}`);
        setLoading(false);
      }
    };

    loadSingleDualTypes();
  }, []);

  return { singleDualTypeCount, loading, error };
};
