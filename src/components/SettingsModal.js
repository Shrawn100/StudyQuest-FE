import { useState } from "react";
import TimerConfig from "./TimerConfig";
import AlarmConfig from "./AlarmConfig";

const Settings = ({
  startStudyTime,
  startBreakTime,
  startLongBreakTime,
  handleTimeChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setModalVisible(false);
    }
  };

  return (
    <>
      <button
        className="settings-user-btn"
        onClick={() => setModalVisible(true)}
      >
        <span className="material-symbols-outlined">settings</span> Settings
      </button>
      {modalVisible && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header-section">
              <h2 className="modal-heading">Settings</h2>
              <button
                className="modal-close-btn"
                onClick={() => setModalVisible(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <TimerConfig
              visible={modalVisible}
              startStudyTime={startStudyTime}
              startBreakTime={startBreakTime}
              startLongBreakTime={startLongBreakTime}
              handleTimeChange={handleTimeChange}
            />
            <AlarmConfig />
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
