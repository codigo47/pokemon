"use client";

import { useEffect, useState } from 'react';
import GenericBarChart from './GenericBarChart';
import Skeleton from 'react-loading-skeleton';
import { useSingleDualTypes } from '../../hooks/useSingleDualTypes';
import 'react-loading-skeleton/dist/skeleton.css';

const SingleDualTypeChart = ({ showPercentages }: { showPercentages: boolean }) => {
  const { singleDualTypeCount, loading, error } = useSingleDualTypes();
  const [labels, setLabels] = useState<string[]>(['Single-Type', 'Dual-Type']);
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    if (singleDualTypeCount && singleDualTypeCount.length > 0) {
      const totalCount = singleDualTypeCount.reduce((acc, count) => acc + count, 0);

      const newCounts = singleDualTypeCount.map((count) =>
        showPercentages
          ? parseFloat(((count / totalCount) * 100).toFixed(1))
          : count
      );

      setCounts(newCounts);
    }
  }, [singleDualTypeCount, showPercentages]);

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

export default SingleDualTypeChart;
