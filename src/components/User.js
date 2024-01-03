//User

import React, { useState, useEffect } from "react";
import axios from "axios";
import History from "./History";

const User = ({ setUser, user }) => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.get(
            "https://studyquest-be-production.up.railway.app/history",
            config
          );
          if (response.data && response.data.history) {
            const userHistory = response.data.history;
            setHistory(userHistory);
          }
        } catch (error) {
          console.error("Error fetching user history:", error);
        }
      }
    };
    fetchHistory();
  }, []); // Empty dependency array to run the effect only once on mount
  const [historyVisible, setHistoryVisible] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const handleHistoryVisible = () => {
    setHistoryVisible(!historyVisible);
  };

  return (
    <div className="user-container">
      <History
        historyVisible={historyVisible}
        setHistoryVisible={setHistoryVisible}
        handleBackClick={handleHistoryVisible}
        history={history}
      />
      {historyVisible ? null : (
        <>
          <button className="logout-button" onClick={handleLogOut}>
            Log out
          </button>
        </>
      )}
    </div>
  );
};

export default User;
