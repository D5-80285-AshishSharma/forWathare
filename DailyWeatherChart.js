import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


const DailyWeatherChart = () => {
  const [dailyData, setDailyData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m")
      .then(response => response.json())
      .then(data => {
        // Filter hourly data for 9 AM each day
        const filteredData = filterDataFor9AM(data.hourly);
        setDailyData(filteredData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to filter hourly data for 9 AM each day
  const filterDataFor9AM = (hourlyData) => {
    const filteredData = [];
    hourlyData.time.forEach((time, index) => {
      if (time.endsWith('T09:00')) {
        filteredData.push({
          time: time.substring(0, 10), // Extract date only
          temperature_2m: hourlyData.temperature_2m[index],
          relative_humidity_2m: hourlyData.relative_humidity_2m[index],
          wind_speed_10m: hourlyData.wind_speed_10m[index]
        });
      }
    });
    return filteredData;
  };

  // Render the chart if data is available
  return (
    <div>
      {dailyData && (
        <Line
          data={{
            labels: dailyData.map(data => data.time),
            datasets: [
              {
                label: 'Temperature (°C)',
                data: dailyData.map(data => data.temperature_2m),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
              },
              {
                label: 'Relative Humidity (%)',
                data: dailyData.map(data => data.relative_humidity_2m),
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
              },
              {
                label: 'Wind Speed (m/s)',
                data: dailyData.map(data => data.wind_speed_10m),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default DailyWeatherChart;
