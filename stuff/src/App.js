import './App.css';
import SampleSimulator from './SampleSimulator';
import DailyWeatherChart from './DailyWeatherChart';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
       
      <div ><main>
        <SampleSimulator />
      </main> </div>
      {/* </header> */}
      <div>
        
    <h1>Weather past 10 days</h1>
  
  <main style={{ 
    width: '60%', 
    margin: '20px auto',
    border: '5px solid #ccc', 
    padding: '20px',
    borderRadius: '100px', 
    backgroundColor: 'lightyellow'
  }}>
    <DailyWeatherChart /> 
  </main> </div>
  

    </div>
  );
}

export default App;
