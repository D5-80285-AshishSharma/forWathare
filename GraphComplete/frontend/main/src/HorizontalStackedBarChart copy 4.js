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

    if (chartRef.current && data.length > 0) {
      const limitedData = data.slice(0,); // Limiting data to the first 200 objects

      // Log machine_status values
      limitedData.forEach(obj => {
        console.log('machine_status:', obj.machine_status);
      });

      const datasets = limitedData.map(obj => {
        let backgroundColor;
        if (obj.machine_status === '1') backgroundColor = 'rgba(0, 255, 0, 0.5)'; // Green for machine_status = 1
        else if (obj.machine_status === '0') backgroundColor = 'rgba(255, 255, 0, 0.5)'; // Yellow for machine_status = 0
        else backgroundColor = 'rgba(255, 0, 0, 0.5)'; // Red for other values or null

        return {
          data: [1],
          backgroundColor
        };
      });

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: Array.from({ length: limitedData.length }, (_, i) => `Data Point ${i + 1}`),
          datasets
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              stacked: true,
              display: false
            },
            y: {
              stacked: true,
              display: false
            }
          },
          plugins: {
            legend: {
              display: false
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
