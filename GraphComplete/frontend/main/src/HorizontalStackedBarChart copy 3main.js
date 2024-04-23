import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const HorizontalStackedBarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Cleanup previous chart instance before creating a new one
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (chartRef.current && data.length > 0) {
      const obj = data[0]; // Take the first object from the data array
      let backgroundColor;
      if (obj.machine_status === 1) backgroundColor = 'rgba(0, 255, 0, 0.5)';
      else if (obj.machine_status === 0) backgroundColor = 'rgba(255, 255, 0, 0.5)';
      else backgroundColor = 'rgba(255, 0, 0, 0.5)';

      const dataset = {
        data: [1],
        backgroundColor
      };

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Single Bar'],
          datasets: [dataset]
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
