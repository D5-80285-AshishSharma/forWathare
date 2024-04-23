import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart } from 'victory';

const StackedBarLinesGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    fetch('http://localhost:3000/data') // Assuming your backend is running on port 3000
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Fixed y-axis value
  const fixedYValue = 100; // Change this to your desired fixed value

  return (
    <VictoryChart>
      {/* Render stacked bars */}
      <VictoryBar
        data={data}
        x="ts"
        y={fixedYValue} // Fixed y-axis value
        style={{
          data: {
            width: 20,
            fill: ({ datum }) => {
              if (datum.machine_status === 1) {
                return "green"; // Green color for machine_status = 1
              } else if (datum.machine_status === 0) {
                return "yellow"; // Yellow color for machine_status = 0
              } else {
                return "red"; // Red color for machine_status = null
              }
            }
          }
        }}
      />
    </VictoryChart>
  );
};

export default StackedBarLinesGraph;
