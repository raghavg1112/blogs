import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import cors from "cors";
// const clientId =
//   "736699391766-n0n2ojmmht8cblpijm6v3nvv8ukk3g8r.apps.googleusercontent.com";
const GoogleOAuth = () => {
  const Navigate = useNavigate();
  cors();
  const responseGoogle = (response) => {
    if (response && response.profileObj) {
      const { googleId, name, email, imageUrl } = response.profileObj;
      // console.log(name);

      // localStorage.setItem("user_id", email);
      // localStorage.setItem("Username", name);
      // Navigate("/");
      // You can now use the user's details in your application
    }
    // You can use the 'response' object to handle user data.
  };

  return (
    <div className="mb-4">
      <GoogleLogin
        clientId="736699391766-n0n2ojmmht8cblpijm6v3nvv8ukk3g8r.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleOAuth;
