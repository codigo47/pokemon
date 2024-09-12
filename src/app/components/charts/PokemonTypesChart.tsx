// src/components/PokemonTypesChart.tsx

"use client";

import { useEffect, useState } from 'react';
import GenericBarChart from './GenericBarChart';
import Skeleton from 'react-loading-skeleton';
import { usePokemonTypes } from '../../hooks/usePokemonTypes';
import 'react-loading-skeleton/dist/skeleton.css';

const PokemonTypesChart = ({ showPercentages }: { showPercentages: boolean }) => {
  const { pokemonTypesCount, loading, error } = usePokemonTypes();
  const [labels, setLabels] = useState<string[]>([]);
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    if (pokemonTypesCount && pokemonTypesCount.length > 0) {
      const totalCount = pokemonTypesCount.reduce((acc, [, count]) => acc + count, 0);
      const sortedTypes = pokemonTypesCount.sort(([, a], [, b]) => b - a);

      const newLabels = sortedTypes.map(([type]) => type);
      const newCounts = sortedTypes.map(([, count]) =>
        showPercentages
          ? parseFloat(((count / totalCount) * 100).toFixed(1))
          : count
      );

      setLabels(newLabels);
      setCounts(newCounts);
    }
  }, [pokemonTypesCount, showPercentages]);

  if (loading) {
    return <Skeleton height={400} width="100%" />;
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  return (
    <div className="w-full min-w-[700px] sm:min-w-0">
      <GenericBarChart labels={labels} data={counts} showPercentages={showPercentages} />
    </div>
  );
};

export default PokemonTypesChart;
