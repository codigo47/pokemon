// src/components/charts/GenericBarChart.tsx

"use client";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';
import { ChartData } from 'chart.js'; // Importa el tipo correcto

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface GenericBarChartProps {
  labels: string[];
  data: number[];
  showPercentages: boolean;
}

const colors = [
  '#F08030', // color1
  '#6890F0', // color2
  '#78C850', // color3
  '#F8D030', // color4
  '#98D8D8', // color5
  '#C03028', // color6
  '#A040A0', // color7
  '#E0C068', // color8
  '#A890F0', // color9
  '#F85888', // color10
  '#A8B820', // color11
  '#B8A038', // color12
  '#705898', // color13
  '#7038F8', // color14
  '#705848', // color15
  '#B8B8D0', // color16
  '#F0B6BC', // color17
  '#FF5733', // color18
  '#33FF57', // color19
  '#3357FF', // color20
];

const GenericBarChart: React.FC<GenericBarChartProps> = ({ labels, data, showPercentages }) => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null); // Usamos el tipo ChartData<"bar">

  useEffect(() => {
    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, i) => colors[i % colors.length]), // Use color scheme
          datalabels: {
            anchor: 'center' as const, // Anchor set as constant
            align: 'center' as const, // Align set as constant
            color: 'white',
            formatter: (value: number) => {
              return showPercentages
                ? `${value.toFixed(1)}`
                : `${Math.round(value)}`;
            },
          },
        },
      ],
    });
  }, [labels, data, showPercentages]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, // Disable animations
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: 'white',
        anchor: 'center' as const, // Anchor set as constant
        align: 'center' as const, // Align set as constant
        formatter: (value: number) => {
          return showPercentages ? `${value.toFixed(1)}%` : `${Math.round(value)}`;
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: number) {
            return showPercentages ? `${value.toFixed(0)}%` : value;
          },
        },
      },
      x: {
        ticks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function (value: any, index: number) {
            const label = chartData?.labels && Array.isArray(chartData.labels) 
              ? chartData.labels[index] as string 
              : ''; // Ensure it's a string
            return label ? label.charAt(0).toUpperCase() + label.slice(1) : '';
          },
        },
      },
    },
  };

  return chartData ? (
    <div className="relative h-[400px]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  ) : (
    <p>Loading chart...</p>
  );
};

export default GenericBarChart;
