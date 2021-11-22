import React, { useState, useEffect, useContext } from "react";
import { preflight2 } from "../../axios";
import { useHistory, Link } from "react-router-dom";
import {
  ContextUserStatus,
  ContextSetUserStatus,
  ContextSetEmailVerified,
} from "../../App";
function Login({ setLogin, setUserNav, getCookie, setIsAdmin }) {
  const history = useHistory();
  const setUserStatus = useContext(ContextSetUserStatus);
  const setEmailVerified = useContext(ContextSetEmailVerified);
  const [user, setUser] = useState({ email: "", password: "" });
  const userStatus = useContext(ContextUserStatus);
  // useEffect(() => {
  //   //  axios2.get("/api/get_token");
  // }, []);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (user.email === "" || user.password === "") {
      setErrorMessage("All fields must be filled");
      return false;
    }
    function validateInput(input, type) {
      var validRegex;
      switch (type) {
        case "email":
          validRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          break;
        case "password":
          validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
          break;
      }
      return input.match(validRegex);
    }
    //validate email
    if (!validateInput(user.email, "email")) {
      setErrorMessage("Email must be valid");
      return;
    }
    //validate password
    if (!validateInput(user.password, "password")) {
      console.log(
        "Password must contains minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      );
      setErrorMessage(
        "Password must contains minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      );
      return;
    }

    preflight2
      .post(
        "/auth/user/login",
        {
          user: user,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((user) => {
        if (user.data.status) {
          localStorage.setItem("user", JSON.stringify(user.data.user));

          setUserNav(true);
          setUserStatus(true);
          setEmailVerified(user.data.user.email_status_id);
          setLogin(true);
          setIsAdmin(user.data.isAdmin);
          setErrorMessage("");
          history.push("/");
        } else {
          setErrorMessage("User doesnt exist");
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ margin: "0 3rem" }}>
      <h2 className="center">Login</h2>
      <form
        style={{ width: "100%" }}
        className="form login_form"
        onSubmit={handleSubmit}
      >
        <p id="error_message_login">{errorMessage}</p>
        <div>
          <input type="hidden" name="_csrf" value={""} />
          <input
            className="input-field"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div style={{ alignItems: "center", display: "flex" }}>
              <input
                style={{ position: "relative", top: "10px" }}
                type="checkbox"
                className="check-box"
              />{" "}
              <span style={{ fontSize: "0.8rem" }}>Remember password</span>
            </div>
            <span style={{ color: "#22f", fontSize: "1rem" }}>
              <Link to="/forgot-password">Forgot Password</Link>
            </span>
          </div>
          <div id="buttons">
            <button type="reset" className="reset-btn">
              Reset
            </button>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
