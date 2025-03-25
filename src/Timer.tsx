import { useEffect, useState } from "react";

// interface TimerProps {
//   isStart: boolean;
// }

function Timer() {
  const currTimer = localStorage.getItem('seconds')
  const [seconds, setSeconds] = useState(Number(currTimer));

  useEffect(() => {
    localStorage.setItem("seconds", String(seconds));
  }, [seconds]);

  useEffect(() => {
    const storeSec = localStorage.getItem("seconds");
    if (storeSec) {
      setSeconds(Number(storeSec));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p style={{color: seconds % 2 == 0 ? 'blue' : 'red'}}>Время на странице {seconds}</p>
    </div>
  );
}

export default Timer;
