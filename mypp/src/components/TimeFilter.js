import React, { useState } from 'react';

const TimeFilter = ({ onSubmit }) => {
  const [startTime, setStartTime] = useState('');
  const [frequency, setFrequency] = useState('hour');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(startTime, frequency);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Start Time:
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </label>
        <label>
          Frequency:
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </label>
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

export default TimeFilter;
