// SampleData.js
import React from 'react';
import StackedGraph from './StackedGraph';

const SampleData = () => {
  const data = [
    {
      "ts": "2024-01-21T15:00:00Z",
      "machine_status": 1,
      "vibration": 529
    },
    {
      "ts": "2024-01-21T15:00:01Z",
      "machine_status": 1,
      "vibration": 536
    },
    {
      "ts": "2024-01-21T15:00:02Z",
      "machine_status": 1,
      "vibration": 536
    },
    {
      "ts": "2024-01-21T15:00:03Z",
      "machine_status": 1,
      "vibration": 544
    }
  ];

  // Fill in missing samples with machine_status 0
  const startTime = new Date(data[0].ts);
  const endTime = new Date(data[data.length - 1].ts);
  const interval = 1000; // Assuming 1 second interval
  for (let time = startTime; time <= endTime; time.setTime(time.getTime() + interval)) {
    const ts = time.toISOString();
    if (!data.find(sample => sample.ts === ts)) {
      data.push({
        ts: ts,
        machine_status: 0,
        vibration: null // or whatever value you want for missing data
      });
    }
  }

  // Sort data by timestamp
  data.sort((a, b) => new Date(a.ts) - new Date(b.ts));

  return <StackedGraph data={data} />;
};

export default SampleData;
