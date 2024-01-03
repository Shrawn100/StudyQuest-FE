import React, { useState, useEffect, useRef } from "react";
import formatTime from "./FormatTime";

const History = ({
  handleBackClick,
  setHistoryVisible,
  historyVisible,
  history,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Reverse the scroll direction
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [history, historyVisible]);
  // Get the start and end dates from the history data
  const currentYear = new Date().getFullYear(); // Get the current year

  const startOfYear = new Date(currentYear, 0, 1); // January 1st of the current year
  const today = new Date(); // Current date

  // Generate an array of dates within the range from start of the year to today
  const dateRange = [];
  for (
    let date = new Date(startOfYear);
    date <= today;
    date.setDate(date.getDate() + 1)
  ) {
    dateRange.push(new Date(date));
  }

  // Group sessions by date
  const groupedSessions = history.reduce((acc, session) => {
    const date = new Date(session.date).toLocaleDateString(); // Format date
    if (!acc[date]) {
      acc[date] = { sessions: [], total: 0 };
    }
    acc[date].sessions.push(session);
    acc[date].total += session.duration;
    return acc;
  }, {});
  // Calculate total hours studied
  const totalHoursStudied = Object.values(groupedSessions).reduce(
    (total, dateEntry) => total + dateEntry.total,
    0
  );
  const formattedTotalTime = formatTime(totalHoursStudied);

  // Show more information when clicking a date
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Hide the popup when clicking outside
  const handlePopupClose = () => {
    setSelectedDate(null);
  };
  let emptyDivCount = 0;
  return historyVisible ? (
    <>
      <section className="history">
        <nav className="history-nav">
          <button className="history-go-back-btn" onClick={handleBackClick}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="history-heading">History</h2>
        </nav>

        <div ref={scrollContainerRef} className="calender-grid-container">
          <div className="calendar-grid">
            {dateRange.map((date, index) => {
              const formattedDate = date.toLocaleDateString();
              const dayOfMonth = date.getDate();
              const hasStudyData = Boolean(groupedSessions[formattedDate]);
              const monthName = date.toLocaleString("default", {
                month: "long",
              }); // Get the month name
              let position = (index + emptyDivCount) % 7;

              if (dayOfMonth === 1) {
                // Generate empty divs based on the position in the grid
                const emptyDivs = Array.from(
                  { length: 7 - position },
                  (_, i) => <div className="empty" key={`empty-${i}`}></div>
                );

                // Update emptyDivCount
                emptyDivCount += emptyDivs.length;

                return (
                  <>
                    {emptyDivs}
                    <div key={index} className="new-month">
                      {monthName}
                    </div>
                    {/* Generate additional empty divs */}
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={`additional-empty-${i}`}></div>
                    ))}
                    <div
                      key={formattedDate}
                      className={`calendar-cell ${
                        groupedSessions[formattedDate] ? "studied" : ""
                      }`}
                      style={{ cursor: hasStudyData ? "pointer" : "default" }}
                      onClick={
                        hasStudyData
                          ? () => handleDateClick(formattedDate)
                          : null
                      }
                    >
                      {dayOfMonth}
                    </div>
                  </>
                );
              }

              return (
                <div
                  key={formattedDate}
                  className={`calendar-cell ${
                    groupedSessions[formattedDate] ? "studied" : ""
                  }`}
                  style={{ cursor: hasStudyData ? "pointer" : "default" }}
                  onClick={
                    hasStudyData ? () => handleDateClick(formattedDate) : null
                  }
                >
                  {dayOfMonth}
                </div>
              );
            })}
          </div>
          <p className="total-time-studied">
            Total time studied: {formattedTotalTime}
          </p>

          {selectedDate && (
            <div className="selected-date-popup" onClick={handlePopupClose}>
              <div
                className="selected-date"
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="selected-date-nav">
                  <h3 className="selected-date-heading">
                    Date: {selectedDate}
                  </h3>
                  <button
                    className="selected-date-close-button"
                    onClick={handlePopupClose}
                  >
                    &times;
                  </button>
                </nav>

                <p className="selected-date-total">
                  Total time: {formatTime(groupedSessions[selectedDate]?.total)}
                </p>
                {groupedSessions[selectedDate]?.sessions.map(
                  (session, index) => (
                    <div key={index} className="selected-date-info-container">
                      <h4 className="selected-date-session-counter">
                        Session {index + 1}
                      </h4>
                      <div className="selected-date-info">
                        <p>Start Time: {formatTime(new Date(session.date))}</p>
                        <p>Duration: {formatTime(session.duration)}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  ) : (
    <>
      <p className="total-time-studied">
        {" "}
        Total time studied: {formattedTotalTime}
      </p>
      <button className="view-history-btn" onClick={handleBackClick}>
        View History
      </button>
    </>
  );
};

export default History;
