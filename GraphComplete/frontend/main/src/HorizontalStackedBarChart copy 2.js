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
      const datasets = [
        {
          label: 'Machine Status',
          data: data.map(obj => obj.machine_status),
          backgroundColor: data.map(obj => {
            if (obj.machine_status === 1) return 'rgba(0, 255, 0, 0.5)'; // Green for machine_status = 1
            else if (obj.machine_status === 0) return 'rgba(255, 255, 0, 0.5)'; // Yellow for machine_status = 0
            else return 'rgba(255, 0, 0, 0.5)'; // Red for null machine_status
          })
        }
      ];

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: data.map((obj, index) => `Data Point ${index + 1}`),
          datasets: datasets
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
