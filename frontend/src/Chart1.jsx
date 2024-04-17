
import React from 'react';
import HistogramChart from './HistogramChart3';
import { useState, useEffect } from 'react';
//import data from './sample-data.json';
import axios from 'axios';
import './App.css';


const Chart = () => {

  var [charts, setCharts] = useState([]);
  var [slicedData, setSlicedData] = useState([]);
  useEffect(() => {
      fetchData();
  }, [])

  useEffect(()=>{
      setSlicedData(charts);
  },[charts])

  //console.log(data);
    var fetchData = () => {
      axios.get(`http://localhost:8080/machine`, {}).then((response) => {
          setCharts(response.data.data);
          console.log(response); // Logging the data to console
      }).catch((error) => {
          console.error('Error fetching data:', error);
      });
  }

 
  console.log(slicedData);
  
  const histogramData = {
    
    labels: slicedData ? slicedData.map((point,index) => point.ts) : [],

    datasets: [
      {
        label: 'Machine Status',
         data: slicedData.map(() => 1),
        backgroundColor: (context) => {
          const value = slicedData && slicedData.length > context.dataIndex ? slicedData[context.dataIndex].machine_status : null;

          return value === 0
            ? 'yellow'
            : value === 1
              ? 'green'
              : 'red';
        },
        borderColor: 'black',
      },
    ],

  };

  console.log({ histogramData });
  return (
    <div className='graphdiv'>
      <h1>Histogram Chart Example</h1>
      <HistogramChart data={histogramData} />
    </div>
  );
};

export default Chart;