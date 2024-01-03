import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const LoginForm = ({ handleSignUpClick, setUser, setModalVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleLogin = async () => {
    // Handle login with test user
    setUsername("testUser");
    setPassword("testUser");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });
      const { message, errors, token, user } = response.data;

      if (errors) {
        setErrors(errors);
        setMessage("");
      } else if (message === "User does not exist") {
        setErrors([]);
        setMessage("User does not exist");
      } else if (message === "Wrong password") {
        setErrors([]);
        setMessage("Wrong password");
      } else if (token) {
        // Perform any necessary action upon successful login, e.g., save token to localStorage
        localStorage.setItem("token", token);
        setErrors([]);
        setMessage("Login successful");
        setUser(user);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Login request failed:", error);
    }
  };

  return (
    <div className="login-page-container">
      <h1 className="login-header">Welcome back</h1>
      <GoogleAuth setUser={setUser} setModalVisible={setModalVisible} />
      <form className="login-form" onSubmit={handleSubmit}>
        <p>-OR-</p>
        <div className="input-container">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-input"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-container">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        {errors.length > 0 && (
          <ul className="errors-list-ul">
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        )}
        {message && <p className="error-msg-p">{message}</p>}
        <div className="login-page-btns">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>

      <button className="alternator-btn" onClick={handleSignUpClick}>
        Don't have an account? <span>Signup</span>
      </button>
    </div>
  );
};

export default LoginForm;
