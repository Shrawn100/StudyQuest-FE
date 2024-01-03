import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ handleLoginClick, setUser, setModalVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://studyquest-be-production.up.railway.app/signup",
        {
          name: displayName,
          username: username,
          password: password,
        }
      );

      const { message, errors, user, token } = response.data;

      if (errors) {
        setErrors(errors);
        setMessage("");
      } else if (
        message === "Username already exists. Please pick another one."
      ) {
        setMessage(message);
      } else if (message === "Validation failed") {
        setErrors([]);
        setMessage("Please correct the validation errors.");
      } else if (message === "User registered successfully" && token) {
        localStorage.setItem("token", token);
        setErrors([]);
        setMessage("Signup successful");
        // You might want to perform any necessary action upon successful signup
        setUser(user);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Signup request failed:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const isPasswordValid = (value) => {
    return (
      value.length >= 6 && /(?=.*[A-Z])/.test(value) && /(?=.*\d)/.test(value)
    );
  };

  const isUsernameValid = (value) => {
    return value.length >= 3;
  };

  const isDisplayNameValid = (value) => {
    return value.length >= 3;
  };

  return (
    <div className="signup-page-container">
      <h1 className="signup-header">Create an account</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="displayName" className="form-label">
            Display name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={displayName}
            onChange={handleInputChange}
            className={`form-input ${
              displayName && !isDisplayNameValid(displayName)
                ? "invalid-input"
                : ""
            }`}
          />
        </div>
        <div className="input-container">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            className={`form-input ${
              username && !isUsernameValid(username) ? "invalid-input" : ""
            }`}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            className={`form-input ${
              password && !isPasswordValid(password) ? "invalid-input" : ""
            }`}
          />
        </div>

        {errors.length > 0 && (
          <ul className="errors-list-ul">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {message && <p className="error-msg-p">{message}</p>}
        <div className="signup-page-btns">
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </div>
        <button className="alternator-btn" onClick={handleLoginClick}>
          Already have an account? <span>Login</span>
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
