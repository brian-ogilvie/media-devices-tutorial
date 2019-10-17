import React, { useState, useEffect } from 'react';

export default function RecordingTimer({ running }) {
  const [timerInterval, setTimerInterval] = useState(null);
  const [started, setStarted] = useState(null);
  const [timerDisplay, setTimerDisplay] = useState('00:00');

  useEffect(() => {
    if (started !== null && timerInterval === null) {
      setTimerInterval(
        setInterval(() => {
          const elapsedMiliseconds = new Date() - started;
          const elapsedMinutes = Math.floor(elapsedMiliseconds / 1000 / 60);
          const elapsedSeconds = Math.floor((elapsedMiliseconds / 1000) % 60);
          const minutesString = `0${elapsedMinutes}`.slice(-2);
          const secondsString = `0${elapsedSeconds}`.slice(-2);
          setTimerDisplay(`${minutesString}:${secondsString}`);
        }, 200)
      );
      return;
    }
    if (started === null && timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setTimerDisplay('00:00');
    }
  }, [started, timerInterval]);

  useEffect(() => {
    if (running) {
      setStarted(new Date());
    } else {
      setStarted(null);
    }
  }, [running]);

  return <div className="RecordingTimer">{timerDisplay}</div>;
}
