import React, { useState } from "react";
import loginStyle from"./Login.module.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { config } from "../../../../App";
import Header from "../../../Shared/Header";

function Signup() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [islogged, setIslogged] = useState(false);

  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const login = async (userDetails) => {
    if (!validation(userDetails)) return;

    try {

      let url = `${config.endpoint}/user/login`;
      let response = await axios.post(url, {
        username: userDetails.username,
        password: userDetails.password,
      });

      setIslogged(true);


      const resToken = response.data.jwt;
      const resUsername = userDetails.username;

      persistLogin(resToken, resUsername);
      navigate("/user/test");

      enqueueSnackbar("Logged in  Successfully", { variant: "success" });
    } catch (e) {
      if (e.response && e.response.status === 403) {
        enqueueSnackbar("Username is not signed up! Please signup!", { variant: "error" });
      }
       else {
         enqueueSnackbar("Something went wrong!", { variant: "error" });
       }
    }
  };

  const persistLogin = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const validation = (data) => {
    if (userDetails.username.length === 0) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }

    if (userDetails.password.length === 0) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }

    return true;
  };


  const handleChange = (e) => {
    let [key, value] = [e.target.name, e.target.value];
    setuserDetails({ ...userDetails, [key]: value });
  };

  return (
    <>
      <Header />
      <div className={loginStyle.main}>
        <p className={loginStyle.fontstyle}>Login!</p>
        <br />

        {islogged ? ( 
          <div class="alert alert-success" role="alert">
            Loggedin Succesfully
          </div>
        ) : null}
        <br />

        <div>
          <form>
            <div className="row mb-3">
            <div className={loginStyle.labelwidth}>
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                Username
              </label>
              </div>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="colFormLabel"
                  placeholder="Enter the username"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.username}
                  type="text"
                  name="username"
                ></input>
              </div>
            </div>

            <div className="row mb-3">
              <div className={loginStyle.labelwidth}>
              <label
                htmlFor="colFormLabeloption2"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              </div>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="colFormLabeloption2"
                  placeholder="Enter the Password"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.password}
                  name="password"
                ></input>
              </div>
            </div>

            <br />
            <div className={loginStyle.centrealign}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={async (e) => {
                  await login(userDetails);
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
