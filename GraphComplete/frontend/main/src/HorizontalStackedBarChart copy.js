import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HorizontalStackedBarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Cleanup previous chart instance before creating a new one
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const datasets = data.map((obj) => ({
        label: obj.name,
        data: [obj.age],
        backgroundColor: obj.age > 25 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 206, 86, 0.2)',
        borderColor: obj.age > 25 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }));

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Age'],
          datasets: datasets
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              type: 'linear', // Use 'linear' scale for numerical data
              stacked: true
            },
            y: {
              type: 'category', // Use 'category' scale for categorical data
              stacked: true
            }
          }
        }
      });
    }

    // Cleanup the chart instance on component unmount
    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default HorizontalStackedBarChart;
