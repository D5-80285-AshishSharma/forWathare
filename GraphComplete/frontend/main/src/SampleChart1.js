import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const SampleChart = () => {
  // Sample data from API
  const sampleData = [
    {
      id: 1,
      ts: "2024-01-21T09:30:00.000Z",
      machine_status: "1",
      vibration: "529"
    },
    {
      id: 2,
      ts: "2024-01-21T09:30:01.000Z",
      machine_status: "1",
      vibration: "536"
    },
    {
      id: 3,
      ts: "2024-01-21T09:30:02.000Z",
      machine_status: "1",
      vibration: "536"
    }
    // More data...
  ];

  // Initialize state for chart data
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Process sample data to prepare chart data
    const processedData = sampleData.map(item => {
      let color;
      switch (item.machine_status) {
        case "0":
          color = "rgba(255, 255, 0, 0.5)"; // Yellow
          break;
        case "1":
          color = "rgba(0, 128, 0, 0.5)"; // Green
          break;
        default:
          color = "rgba(255, 0, 0, 0.5)"; // Red
          break;
      }
      return {
        x: item.ts,
        y: item.vibration,
        backgroundColor: color
      };
    });

    // Set chart data
    setChartData({
      labels: sampleData.map(item => item.ts),
      datasets: [
        {
          label: "Machine Status",
          data: processedData
        }
      ]
    });
  }, []);

  return (
    <div>
      <h2>Stacked Bar Graph</h2>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                stacked: true
              },
              y: {
                stacked: true
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default SampleChart1;
