import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HorizontalStackedBarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Filter data to include only defined machine_status
  const filteredData = data.filter(obj => obj.machine_status !== null);

  useEffect(() => {
    // Cleanup previous chart instance before creating a new one
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const datasets = filteredData.map(obj => {
        let backgroundColor;
        if (obj.machine_status === 1) backgroundColor = 'rgba(0, 255, 0, 0.5)'; // Green for machine_status = 1
        else backgroundColor = 'rgba(255, 255, 0, 0.5)'; // Yellow for machine_status = 0

        return {
          data: [1],
          backgroundColor
        };
      });

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: Array.from({ length: filteredData.length }, (_, i) => `Data Point ${i + 1}`),
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
            afterDraw: (chart) => {
              const ctx = chart.ctx;
              const bars = chart.getDatasetMeta(0).data;
              const minBarHeight = 10; // Adjust the value as needed
              bars.forEach((bar) => {
                const height = bar.height;
                if (height < minBarHeight) {
                  const x = bar.x;
                  const y = bar.y + (minBarHeight - height) / 2;
                  const width = bar.width;
                  ctx.fillStyle = bar._model.backgroundColor;
                  ctx.fillRect(x, y, width, minBarHeight - height);
                }
              });
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
  }, [filteredData]);

  return <canvas ref={chartRef} style={{maxWidth: '100%', maxHeight: '100%'}} />;
};

export default HorizontalStackedBarChart;
