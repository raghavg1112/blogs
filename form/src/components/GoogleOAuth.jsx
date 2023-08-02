import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Alert } from "@mui/material";
import Alerts from "./Alerts";
import { useNavigate } from "react-router-dom";
import cors from "cors";
const clientId =
  "736699391766-n0n2ojmmht8cblpijm6v3nvv8ukk3g8r.apps.googleusercontent.com";
const GoogleOAuth = () => {
  const Navigate = useNavigate();
  cors();
  const responseGoogle = (response) => {
    if (response && response.profileObj) {
      const { googleId, name, email, imageUrl } = response.profileObj;
      console.log(name);
      // let responsee = axios.post("http://localhost:5000/googleLogin", {
      //   email: email,
      // });
      // responsee = responsee.data;
      // if (!responsee.success) <Alerts val="0" message={responsee.message} />;
      localStorage.setItem("user_id", email);
      localStorage.setItem("Username", name);
      Navigate("/");
      // You can now use the user's details in your application
    }
    // You can use the 'response' object to handle user data.
  };

  return (
    <div>
      <h2>Google OAuth Example</h2>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleOAuth;
