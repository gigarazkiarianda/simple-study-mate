import { useState, useEffect } from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0); // Store time as total seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1); // Decrease time by 1 second
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = (initialTime: number) => {
    setTime(initialTime); // Set the timer with total seconds
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return { time, isRunning, startTimer, stopTimer, resetTimer };
};

export default useTimer;
