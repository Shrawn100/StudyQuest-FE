import { useState, useEffect } from "react";

import User from "./User";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import axios from "axios";

const Authentication = ({ user, setUser }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState(false);

  //Use Effect for checking user login
  useEffect(() => {
    async function checkUser() {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.get(
            "http://localhost:3000/checkUser",
            config
          );

          if (response.data) {
            const authData = response.data.authData.user;
            setUser(authData);
          }
        } catch (error) {
          console.error("Error checking user:", error);
        }
      }
    }

    checkUser();
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setModalVisible(false);
      setSignUpStatus(false);
    }
  };

  const handleSignUpClick = async () => {
    setSignUpStatus(true);
  };
  const handleLoginClick = async () => {
    setSignUpStatus(false);
  };
  return (
    <>
      <button
        className="settings-user-btn"
        onClick={() => setModalVisible(true)}
      >
        <span className="material-symbols-outlined">person</span>{" "}
        {user ? user.name : "Login"}
      </button>
      {modalVisible && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header-section">
              <h2 className="modal-heading">
                <span className="material-symbols-outlined">person</span>
                {user ? user.name : "Account"}
              </h2>
              <button
                className="modal-close-btn"
                onClick={() => {
                  setModalVisible(false);
                  setSignUpStatus(false);
                }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {user ? (
              <User setUser={setUser} user={user} />
            ) : signUpStatus ? (
              <SignupForm
                setUser={setUser}
                handleLoginClick={handleLoginClick}
                setModalVisible={setModalVisible}
              />
            ) : (
              <LoginForm
                setUser={setUser}
                handleSignUpClick={handleSignUpClick}
                setModalVisible={setModalVisible}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Authentication;
