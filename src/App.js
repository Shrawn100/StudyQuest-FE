import CountdownTimer from "./components/Timer";
import React, { useState, useEffect } from "react";

import StudyTracker from "./components/StudyTracker";
import Settings from "./components/SettingsModal";

import Authentication from "./components/Authentication";

import classNames from "classnames";

const App = () => {
  //Study periods
  //Stating the initial default study time
  const [startStudyTime, setStartStudyTime] = useState(25);
  //Stating the time left for study timer
  const [studyTimeLeft, setStudyTimeLeft] = useState(startStudyTime * 60);
  //Will start the study timer if true
  const [startStudy, setStartStudy] = useState(false);

  //Short break periods
  //Stating the initial short default study time
  const [startBreakTime, setStartBreakTime] = useState(5);
  //Will start the break timer if true
  const [startBreak, setStartBreak] = useState(false);
  //Stating the time left for short break timer
  const [breakTimeLeft, setBreakTimeLeft] = useState(startBreakTime * 60);

  //Long break periods
  //Stating the initial default long break time
  const [startLongBreakTime, setStartLongBreakTime] = useState(15);
  //Stating the time left for long break time
  const [longBreakTimeLeft, setLongBreakTimeLeft] = useState(
    startLongBreakTime * 60
  );

  //Will start the long break timer if true
  const [startLongBreak, setStartLongBreak] = useState(false);

  //Counts the number of study sessions completed
  const [studySessionCounter, setStudySessionCounter] = useState(1);

  //Checks to see if the user is inside the study period or not. Initial value is set to true because it initiates
  //from study time.
  const [studying, setStudying] = useState(true);
  //Checks to see if the user is in a shortBreak period or not
  const [shortBreak, setShortBreak] = useState(false);
  //Checks to see if the user is in longBreak period or not.
  const [longBreak, setLongBreak] = useState(false);

  //Track how long the user has been studying for
  const [studyTimeTracker, setStudyTimeTracker] = useState([]);

  const [user, setUser] = useState(null);

  //Use Effect for timers
  useEffect(() => {
    if (studying) {
      setStudyTimeLeft(startStudyTime * 60);
      setStartStudy(false);
    } else if (longBreak) {
      setLongBreakTimeLeft(startLongBreakTime * 60);
      setStartLongBreak(false);
    } else if (shortBreak) {
      setBreakTimeLeft(startBreakTime * 60);
      setStartBreak(false);
    }
  }, [
    studying,
    shortBreak,
    longBreak,
    startStudyTime,
    startBreakTime,
    startLongBreakTime,
    studySessionCounter,
  ]);

  const handleTimeChange = (event) => {
    const inputValue = event.target.value.trim(); // Remove leading and trailing spaces
    let numericValue = parseFloat(inputValue);

    if (isNaN(numericValue) || numericValue < 0) {
      numericValue = 0; // Set to 0 if not a valid number
    }

    let setTime, setStart, setTimeLeft;

    switch (event.target.id) {
      case "studyInput":
        setTime = setStartStudyTime;
        setStart = setStartStudy;
        setTimeLeft = setStudyTimeLeft;
        break;
      case "shortBreakInput":
        setTime = setStartBreakTime;
        setStart = setStartBreak;
        setTimeLeft = setBreakTimeLeft;
        break;
      case "longBreakInput":
        setTime = setStartLongBreakTime;
        setStart = setStartLongBreak;
        setTimeLeft = setLongBreakTimeLeft;
        break;
      default:
        break;
    }

    if (inputValue === "") {
      setTime(0);
      setTimeLeft(0);
    } else {
      setStart(false);
      setTime(numericValue);
      setTimeLeft(numericValue * 60);
    }
  };

  const handleStudyClick = () => {
    setStudying(true);
    setShortBreak(false);
    setLongBreak(false);
  };

  const handleBreakClick = () => {
    setShortBreak(true);
    setStudying(false);
    setLongBreak(false);
  };
  const handleLongBreakClick = () => {
    setStudying(false);
    setLongBreak(true);
    setShortBreak(false);
  };

  return (
    <div className="home-container-first">
      <div className="home-container-second">
        <nav className="navbar">
          {" "}
          {/*Should be able to convert navabr to its own component
                                    making it more modular??? */}
          <h1 className="navbar-heading">
            Study{" "}
            <span
              className={classNames("", {
                studying: studying,
                shortBreak: shortBreak,
                longBreak: longBreak,
              })}
            >
              Quest
            </span>
          </h1>
          <div className="settings-user-container">
            <Settings
              startStudyTime={startStudyTime}
              startBreakTime={startBreakTime}
              startLongBreakTime={startLongBreakTime}
              handleTimeChange={handleTimeChange}
            />
            <Authentication user={user} setUser={setUser} />
          </div>
        </nav>
        <div className="switch-modes-btn-container">
          <button
            className={
              studying ? "switch-modes-btn studying" : "switch-modes-btn"
            }
            onClick={handleStudyClick}
          >
            Pomodoro
          </button>
          <button
            className={
              shortBreak ? "switch-modes-btn shortBreak" : "switch-modes-btn"
            }
            onClick={handleBreakClick}
          >
            Short Break
          </button>
          <button
            className={
              longBreak ? "switch-modes-btn longBreak" : "switch-modes-btn"
            }
            onClick={handleLongBreakClick}
          >
            Long Break
          </button>
        </div>
        {studying && !shortBreak && !longBreak ? (
          <CountdownTimer
            startTime={startStudyTime}
            timeLeft={studyTimeLeft}
            setTimeLeft={setStudyTimeLeft}
            start={startStudy}
            setStart={setStartStudy}
            setStudying={setStudying}
            studying={studying}
            name={"Study"}
            counter={studySessionCounter}
            setCounter={setStudySessionCounter}
            setLongBreak={setLongBreak}
            longBreak={longBreak}
            setShortBreak={setShortBreak}
            shortBreak={shortBreak}
            studyTimeTracker={studyTimeTracker}
            setStudyTimeTracker={setStudyTimeTracker}
          />
        ) : null}
        {longBreak ? (
          <CountdownTimer
            startTime={startLongBreakTime}
            timeLeft={longBreakTimeLeft}
            setTimeLeft={setLongBreakTimeLeft}
            start={startLongBreak}
            setStart={setStartLongBreak}
            setStudying={setStudying}
            studying={studying}
            name={"LongBreak"}
            counter={studySessionCounter}
            setCounter={setStudySessionCounter}
            setLongBreak={setLongBreak}
            longBreak={longBreak}
            setShortBreak={setShortBreak}
            shortBreak={shortBreak}
          />
        ) : null}
        {shortBreak ? (
          <CountdownTimer
            startTime={startBreakTime}
            timeLeft={breakTimeLeft}
            setTimeLeft={setBreakTimeLeft}
            start={startBreak}
            setStart={setStartBreak}
            setStudying={setStudying}
            studying={studying}
            name={"Break"}
            counter={studySessionCounter}
            setCounter={setStudySessionCounter}
            setLongBreak={setLongBreak}
            longBreak={longBreak}
            setShortBreak={setShortBreak}
            shortBreak={shortBreak}
          />
        ) : null}
        <StudyTracker
          studySessionCounter={studySessionCounter}
          studyTimeTracker={studyTimeTracker}
        />
      </div>
    </div>
  );
};

export default App;
