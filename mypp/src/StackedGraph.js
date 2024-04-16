// StackedGraph.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StackedGraph = ({ data }) => {
  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="ts" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="vibration" stroke="#8884d8" />
      <Line type="monotone" dataKey="machine_status" stroke="#82ca9d" />
    </LineChart>
  );
};

export default StackedGraph;
