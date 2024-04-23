import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

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

  // Process sample data to prepare chart data
  const stackedData = sampleData.reduce((acc, curr) => {
    const existingIndex = acc.findIndex(item => item.ts === curr.ts);
    if (existingIndex !== -1) {
      acc[existingIndex][curr.machine_status] = (acc[existingIndex][curr.machine_status] || 0) + parseInt(curr.vibration);
    } else {
      const newItem = {
        ts: curr.ts,
        [curr.machine_status]: parseInt(curr.vibration)
      };
      acc.push(newItem);
    }
    return acc;
  }, []);

  return (
    <div>
      <h2>Horizontal Stacked Bar Graph</h2>
      <BarChart
        width={800}
        height={400}
        data={stackedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="ts" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="0" stackId="status" fill="#FFFF00" />
        <Bar dataKey="1" stackId="status" fill="#008000" />
        <Bar dataKey="null" stackId="status" fill="#FF0000" />
      </BarChart>
    </div>
  );
};

export default SampleChart;
