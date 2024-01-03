import { useState } from "react";
const TimerConfig = ({
  visible,
  startStudyTime,
  startBreakTime,
  startLongBreakTime,
  handleTimeChange,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="timer-config-section">
      <h3 className="timer-config-section-heading">Time (minutes) </h3>
      <div className="timer-config-input-container-first">
        <div className="timer-config-input-container-second">
          <label htmlFor="studyInput" className="timer-input-label">
            Pomodoro
          </label>
          <input
            className="timer-config-input"
            type="number"
            min="0"
            value={startStudyTime}
            onChange={handleTimeChange}
            id="studyInput"
          />
        </div>

        <div className="timer-config-input-container-second">
          <label htmlFor="shortBreakInput" className="timer-input-label">
            Short Break
          </label>
          <input
            className="timer-config-input"
            type="number"
            min="0"
            value={startBreakTime}
            onChange={handleTimeChange}
            id="shortBreakInput"
          />
        </div>

        <div className="timer-config-input-container-second">
          <label htmlFor="longBreakInput" className="timer-input-label">
            Long Break
          </label>
          <input
            className="timer-config-input"
            type="number"
            min="0"
            value={startLongBreakTime}
            onChange={handleTimeChange}
            id="longBreakInput"
          />
        </div>
      </div>
    </div>
  );
};

export default TimerConfig;
