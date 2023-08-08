import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { Alert } from "@mui/material";
// import { AppContext } from "../context/AppProvider";
export default function Login() {
  // const { setUser } = useContext(AppContext);
  const [input, setInput] = useState({ username: "", password: "" });
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const newUser = { ...input };
    newUser[e.target.name] = e.target.value;
    setInput(newUser);
  };

  const submit = async (e) => {
    e.preventDefault();
    let response = await axios.post("http://localhost:5000/login", {
      username: input.username,
      password: input.password,
    });
    response = response.data;
    console.log(response);
    if (!response.success) {
      <Alert>{response.message}</Alert>;
    } else {
      localStorage.setItem("user_id", response.user_id);
      localStorage.setItem("Username", response.name);
      // const userData = { user_id: response.user_id, name: response.name };
      // setUser(userData);
      Navigate("/");
    }
  };
  if (localStorage.getItem("user_id")) {
    Navigate("/");
  }
  const handleGoogleLogin = async () => {
    let response = await axios.post("http://localhost:5000/googleLogin", {
      name: localStorage.getItem("username"),
      email: localStorage.getItem("user_id"),
    });
    response = response.data;
    if (!response.success) {
      <Alert>{response.message}</Alert>;
    } else {
      Navigate("/");
    }
  };
  return (
    <>
      <section className="vh-75 mt-5 " style={{ "background-color": "#eee;" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black"
                style={{ "border-radius": "25px;" }}
              >
                <div className="card-body ">
                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1  mt-2">
                        Login
                      </p>
                      <div className="mb-3 ">
                        <GoogleLogin
                          onSuccess={async (credentialResponse) => {
                            const info = jwt_decode(
                              credentialResponse.credential
                            );
                            localStorage.setItem("user_id", info.email);
                            localStorage.setItem("username", info.name);
                            await handleGoogleLogin();
                          }}
                          onError={() => {
                            <Alert>Login failed</Alert>;
                          }}
                        />
                      </div>
                      <form className="mx-1 mx-md-3">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>

                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            placeholder="email"
                            name="username"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>

                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg m-2"
                            onClick={(e) => {
                              submit(e);
                            }}
                          >
                            Login
                          </button>
                          <Link
                            to="/register"
                            className="btn btn-danger btn-lg m-2"
                          >
                            Not a User
                          </Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
