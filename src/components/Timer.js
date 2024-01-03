// src/components/CountdownTimer.js
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

import alarm from "../audio/alarm.mp3";

const CountdownTimer = ({
  startTime,
  timeLeft,
  setTimeLeft,
  start,
  setStart,
  studying,
  setStudying,
  name,
  counter,
  setCounter,
  setLongBreak,
  longBreak,
  setShortBreak,
  shortBreak,
  studyTimeTracker,
  setStudyTimeTracker,
}) => {
  const [skipSignal, setSkipSignal] = useState(false);
  const [timeStudied, setTimeStudied] = useState(0); // Used to track how long the user actually studied
  const playAlarm = () => {
    const audio = new Audio(alarm);
    audio.play();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && start) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }
    }, 1000);

    if (timeLeft <= 0 && start) {
      setStart(false);

      if (studying) {
        setStudying(false);
        if (!skipSignal) {
          playAlarm();
          const currentTimeStudied = startTime * 60;
          setStudyTimeTracker((prevTracker) => [
            ...prevTracker,
            currentTimeStudied,
          ]);
          insertStudySession({
            duration: currentTimeStudied,
          });
        } else {
          setSkipSignal(false);
          setStudyTimeTracker((prevTracker) => [...prevTracker, timeStudied]);
          insertStudySession({
            duration: timeStudied,
          });
        }

        setCounter((prev) => prev + 1);
        if (counter % 4 === 0 && counter !== 0) {
          setLongBreak(true);
          setShortBreak(false);
        } else {
          setShortBreak(true);
          setLongBreak(false);
        }
      }

      if (longBreak || shortBreak) {
        setLongBreak(false);
        setShortBreak(false);
        setStudying(true);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, start]);

  const insertStudySession = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found. User not authenticated.");
        // Handle the lack of authentication, depending on your app's requirements.
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.post(
        "https://studyquest-be-production.up.railway.app/session",
        data,
        config
      );
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        // You might want to show user-friendly messages based on error.response.status
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const handleStart = () => {
    if (typeof startTime === "number") {
      // If the validation passes,start the countdown
      setStart(true);
    } else {
      // If the validation fails, you can handle it accordingly (e.g., show an error message)
      console.error("Invalid input. Please enter a valid positive number.");
      // You may also reset the startTime state or take other appropriate actions
    }
  };
  const handleStop = () => {
    setStart(false);
  };

  const handleSkip = (e) => {
    setTimeStudied(startTime * 60 - timeLeft);
    setSkipSignal(true);
    setTimeLeft(0);
    setStart(true);
  };
  return (
    <div className="timer-container">
      {typeof timeLeft !== "number" ? null : (
        <p
          className={classNames("time-left-display", {
            studying: studying,
            shortBreak: shortBreak,
            longBreak: longBreak,
          })}
        >
          {Math.floor(timeLeft / 60).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false, // To avoid grouping digits with commas
          })}
          :
          {(timeLeft % 60).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
          })}
        </p>
      )}

      {start ? (
        <div className="pause-skip-btn-container">
          <button
            className={classNames("start-stop-btn", {
              startStopStudying: studying,
              startStopShortBreak: shortBreak,
              startStopLongBreak: longBreak,
            })}
            onClick={handleStop}
          >
            Pause <span className="material-symbols-outlined">pause</span>
          </button>
          <button
            className={classNames("skip-btn", {
              startStopStudying: studying,
              startStopShortBreak: shortBreak,
              startStopLongBreak: longBreak,
            })}
            id={name}
            onClick={handleSkip}
          >
            <span className="material-symbols-outlined">skip_next</span>
          </button>
        </div>
      ) : (
        <button
          className={classNames("start-stop-btn", {
            startStopStudying: studying,
            startStopShortBreak: shortBreak,
            startStopLongBreak: longBreak,
          })}
          onClick={handleStart}
        >
          Start<span className="material-symbols-outlined">play_arrow</span>
        </button>
      )}
    </div>
  );
};

export default CountdownTimer;

/*

const [studyTimeTracker,setStudyTimeTracker]=useState([])


//When the timer is set to 0
then you do---

if(skipSignal===false){
  setStudyTimeTracker(studyTimeTracker.push(startStudyTime*60))
}else{
  setStudyTimeTracker(studyTimeTracker.push(timeStudied)) 
  // ^^ for this to occur, it means that the timer was skipped.
  // We will find out the time studied in the handleSkip function
  // We can achieve this by setting timeStudied= startStudyTime*60-timeLeft. That should give us the amount
  // of time the user studied.
}

// Then we would also be able to display the total minutes they have studied by doing
// Math.floor(studyTimeTracker.reduce()/60) 
// We can display that under sessions completed.
*/
