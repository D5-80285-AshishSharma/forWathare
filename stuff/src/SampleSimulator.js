import React, { useState } from 'react';

function generateDummyData(numSamples) {
  const data = [];
  let prevTimestamp = new Date();
  for (let i = 0; i < numSamples; i++) {
    const timestamp = new Date(prevTimestamp.getTime() + 1000); // Increment timestamp by 1 second
    const sample = {
      ts: timestamp.toISOString(),
      machine_status: Math.floor(Math.random() * 2),
      vibration: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
    };
    data.push(sample);
    prevTimestamp = timestamp;
  }
  return data;
}

function SampleSimulator() {
  const [numSamples, setNumSamples] = useState(10);
  const [dummyData, setDummyData] = useState(generateDummyData(numSamples));

  const regenerateData = () => {
    const newData = generateDummyData(numSamples);
    setDummyData(newData);
  };

  return (
    <div className="sample-simulator">
      <h2>Sample Generation Simulator</h2>
      <label htmlFor="numSamples">Number of Samples:</label>
      <input
        type="number"
        id="numSamples"
        value={numSamples}
        onChange={(e) => setNumSamples(parseInt(e.target.value))}
      />
      <button onClick={regenerateData}>Generate Data</button>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Machine Status</th>
            <th>Vibration Level</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((sample, index) => (
            <tr key={index}>
              <td>{sample.ts}</td>
              <td>{sample.machine_status === 1 ? 'On' : 'Off'}</td>
              <td>{sample.vibration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// CSS for SampleSimulator component
const styles = `
  .sample-simulator {
    font-family: Arial, sans-serif;
    margin: 20px;
  }

  .sample-simulator h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .sample-simulator label {
    display: block;
    margin-bottom: 5px;
  }

  .sample-simulator input[type="number"] {
    width: 100px;
    padding: 5px;
    margin-bottom: 10px;
  }

  .sample-simulator button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .sample-simulator button:hover {
    background-color: #0056b3;
  }

  .sample-simulator table {
    border-collapse: collapse;
    width: 100%;
  }

  .sample-simulator th,
  .sample-simulator td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .sample-simulator th {
    background-color: #f2f2f2;
  }
`;

// Apply the CSS styles to the component
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default SampleSimulator;
