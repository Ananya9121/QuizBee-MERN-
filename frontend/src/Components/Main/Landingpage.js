import React, { useState } from "react";

import LandingpageStyle from "./Landingpage.module.css";
import { useNavigate } from "react-router-dom";

function Landingpage() {
  const [userClick, setUserclick] = useState(false);
  const navigate = useNavigate();

  const handleUser = () => {
    setUserclick(!userClick);
  };

  const routeChangeSignup = () => {
    navigate("/user/signup");
  };

  const routeChangeLogin = () => {
    navigate("/user/login");
  };

  const routeChangeAdmin = () => {
    navigate("/admin");
  };

  return (
    <section className={LandingpageStyle.hero}>
      <div className="container ">
        <div className="row" padding-top="15rem">
          <div className={LandingpageStyle.divdata}>
            <div className="col-12" fontSize="2rem">
              <h1>QuizBee</h1>
              <div className={LandingpageStyle.buttonsdata}>
                {userClick ? null : (
                  <>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={routeChangeAdmin}
                    >
                      Admin
                    </button>{" "}
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleUser()}
                    >
                      User
                    </button>
                  </>
                )}
                {userClick ? (
                  <>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={routeChangeSignup}
                    >
                      Signup
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={routeChangeLogin}
                    >
                      Login
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landingpage;
