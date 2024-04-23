import React, { useEffect, useState } from 'react';
import HorizontalStackedBarChart from './HorizontalStackedBarChart';

function App() {
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

  return (
    <div className="App">
      <h1>Horizontal Stacked Bar Chart</h1>
      <div style={{ width: '1200px', margin: '0 auto', minHeight: '800px' }}>
        <HorizontalStackedBarChart data={data} />
      </div>

     
    </div>
   
  );
}

export default App;
