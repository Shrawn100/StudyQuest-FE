// StudyTracker.js

import React, { useState } from "react";
import formatTime from "./FormatTime";

const StudyTracker = ({ studySessionCounter, studyTimeTracker }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setModalVisible(false);
    }
  };

  return (
    <div className="study-tracker-container">
      <button
        className="study-tracker-btn"
        onClick={() => setModalVisible(true)}
      >
        Sessions Completed: {studySessionCounter - 1}
      </button>
      {modalVisible && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header-section">
              <h2 className="modal-heading">Study Sessions</h2>
              <button
                className="modal-close-btn"
                onClick={() => setModalVisible(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="study-sessions">
              {studyTimeTracker.map((sessionTime, index) => (
                <p className="study-session" key={index}>
                  {index + 1}: {formatTime(sessionTime)}
                </p>
              ))}
            </div>
            <p className="total-study-time">
              Total -{" "}
              {formatTime(
                studyTimeTracker.reduce((acc, time) => acc + time, 0)
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyTracker;
