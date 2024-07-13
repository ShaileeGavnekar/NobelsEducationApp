import React from "react";
import { useState, useEffect } from "react";

interface TimerProps {
  initialSeconds: number;
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = (props) => {
  const { initialSeconds = 0, onTimeUp } = props;
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        onTimeUp?.();
        clearInterval(myInterval);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return <>{seconds === 0 ? null : <> {seconds}</>}</>;
};

export default Timer;
