import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function GoogleAuth({ setUser, setModalVisible }) {
  async function handleCallBackResponse(response) {
    let userObject = jwtDecode(response.credential);

    try {
      const response = await axios.post(
        "https://studyquest-be-production.up.railway.app/googleSignIn",
        {
          name: userObject.given_name,
          email: userObject.email,
        }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
    // Use the userObject or setUser(userObject) based on your requirements
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "706196984767-52k37tr38j7vb6a8caaf838oq8aqk60e.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  return <button id="signInDiv"></button>;
}

export default GoogleAuth;
