import React, { useState, useContext } from "react";
import axios, { preflight2, axios2 } from "../../axios";
import { useHistory, Redirect } from "react-router-dom";

import { ContextSetUserStatus, ContextSetEmailVerified } from "../../App";
function Registration({ setLogin }) {
  const setUserStatus = useContext(ContextSetUserStatus);
  const setEmailVerified = useContext(ContextSetEmailVerified);
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    password: "",
    repassword: "",
    email: "",
    lastname: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.firstname == "" ||
      user.password == "" ||
      user.repassword == "" ||
      user.email == "" ||
      user.lastname == ""
    ) {
      setErrorMsg("All fields must be filled");
      console.log("All fields must be filled");
      return;
    }
    preflight2
      .post("/auth/user/register", {
        user: user,
      })
      .then((data) => {
        if (data.data.status) {
          setErrorMsg("");
          setLogin(true);
          setUserStatus(true);
          setEmailVerified("1");
          localStorage.setItem("user", JSON.stringify(data.data.user));

          axios2.get("handle/email/" + data.data.event_id).then((data) => {
            console.log("Mail sent");
          });
          Redirect("/");
        } else {
          setErrorMsg(data.data.msg);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ margin: "0 3rem" }}>
      <h2 className="center">Registration</h2>
      <form className="form register_form" onSubmit={handleSubmit}>
        <p id="error_message_register">{errorMsg}</p>
        <div>
          <input
            placeholder="Firstname"
            className="input-field"
            type="text"
            name="firstname"
            id="firstname"
            onChange={handleChange}
          />

          <input
            placeholder="Lastname"
            className="input-field"
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleChange}
          />

          <input
            placeholder="Password"
            className="input-field"
            type="password"
            name="password"
            id="password"
            autocomplete="new-password"
            onChange={handleChange}
          />

          <input
            placeholder="Re-password"
            className="input-field"
            type="password"
            name="repassword"
            id="repassword"
            onChange={handleChange}
          />

          <input
            placeholder="Email"
            className="input-field"
            type="text"
            name="email"
            id="email"
            autocomplete="new-email"
            onChange={handleChange}
          />
          {/* <label htmlFor='telephone'>Telephone</label>
             <input type='text' name='telephone' id='telephone' onChange={handleChange}/> */}
          <div id="buttons">
            <button type="reset" className="reset-btn">
              Reset
            </button>
            <button type="submit" className="submit-btn">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Registration;
