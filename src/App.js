import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const Clock = ({ timezone }) => {
  const [time, setTime] = useState(moment.tz(timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment.tz(timezone));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    if (time.minutes() === 0 && time.seconds() === 0) {
      alert(`It's ${time.format('h A')} in ${timezone}`);
    }
  }, [time, timezone]);

  const hourDeg = (time.hours() % 12) * 30 + time.minutes() * 0.5;
  const minuteDeg = time.minutes() * 6;
  const secondDeg = time.seconds() * 6;

  const clockStyle = {
    position: 'relative',
    width: '200px',
    height: '200px',
    border: '2px solid black',
    borderRadius: '50%',
  };

  const handStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: '50% 100%',
    transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
    width: '2px',
    height: '50px',
    backgroundColor: 'black',
  };

  const minuteStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: '50% 100%',
    transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`,
    width: '2px',
    height: '70px',
    backgroundColor: 'black',
  };

  const secondStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: '50% 100%',
    transform: `translate(-50%, -100%) rotate(${secondDeg}deg)`,
    width: '1px',
    height: '80px',
    backgroundColor: 'red',
  };

  return (
    <div style={clockStyle}>
      <div style={handStyle}></div>
      <div style={minuteStyle}></div>
      <div style={secondStyle}></div>
      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', fontSize: '20px' }}>
        {time.format('h:mm:ss A')}
      </div>
    </div>
  );
};

const App = () => {
  const [timezones, setTimezones] = useState(['Europe/London', 'America/New_York', 'Asia/Tokyo']);
  const [selectedTimezones, setSelectedTimezones] = useState(['Europe/London', 'America/New_York', 'Asia/Tokyo']);

  const handleTimezoneChange = (index, newTimezone) => {
    const newSelectedTimezones = [...selectedTimezones];
    newSelectedTimezones[index] = newTimezone;
    setSelectedTimezones(newSelectedTimezones);
  };

  return (
    <div>
      <h1>Analogue Clocks</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {selectedTimezones.map((timezone, index) => (
          <div key={index}>
            <Clock timezone={timezone} />
            <select value={timezone} onChange={(e) => handleTimezoneChange(index, e.target.value)}>
              {timezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
