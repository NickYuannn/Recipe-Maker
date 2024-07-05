import React, { useEffect } from "react";
import { useState } from "react";
import "./CookingTimer.css";

function CookingTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 0) {
                setHours((prevHours) => {
                  if (prevHours === 0) {
                    clearInterval(timer);
                    setIsActive(false);
                    return 0;
                  } else {
                    setMinutes(59);
                    return prevHours - 1;
                  }
                });
                return 59;
              } else {
                return prevMinutes - 1;
              }
            });
            return 59;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, hours, minutes, seconds]);

  function startTimer() {
    setIsActive(true);
  }

  function stopTimer() {
    setIsActive(false);
  }

  function padTime(time) {
    return time.toString().padStart(2, "0");
  }

  function resetTimer() {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  function addHour() {
    setHours(hours + 1);
  }

  function addMinute() {
    if (minutes === 59) {
      setMinutes(0);
      addHour();
    } else {
      setMinutes(minutes + 1);
    }
  }

  function addSecond() {
    if (seconds === 59) {
      setSeconds(0);
      addMinute();
    } else {
      setSeconds(seconds + 1);
    }
  }

  function deleteHour() {
    if (hours === 0) {
      setHours(0);
    } else {
      setHours(hours - 1);
    }
  }

  function deleteMinute() {
    if (minutes === 0) {
      setMinutes(0);
    } else {
      setMinutes(minutes - 1);
    }
  }

  function deleteSecond() {
    if (seconds === 0) {
      setSeconds(0);
    } else {
      setSeconds(seconds - 1);
    }
  }

  return (
    <div className="cooking-timer-container">
      <h1>Cooking Timer</h1>
      <div className="timer-container">
        <h1>{padTime(hours)}:</h1>
        <h1>{padTime(minutes)}:</h1>
        <h1>{padTime(seconds)}</h1>
      </div>

      <div className="timer-buttons">
        <button onClick={addHour}>Add Hour</button>
        <button onClick={addMinute}>Add Minute</button>
        <button onClick={addSecond}>Add Second</button>
        <br />
        <button onClick={deleteHour}>Delete Hour</button>
        <button onClick={deleteMinute}>Delete Minute</button>
        <button onClick={deleteSecond}>Delete Second</button>
        <br />
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}> Reset</button>
      </div>
    </div>
  );
}

export default CookingTimer;
