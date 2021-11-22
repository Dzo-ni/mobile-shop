import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { axios2, preflight2 } from "../../axios";
import "./ForgotPassword.css";
import { useHistory, Link } from "react-router-dom";
import {
  ContextUserStatus,
  ContextSetUserStatus,
  ContextSetEmailVerified,
} from "../../App";
function ResetPassword({ setLogin, setUserNav, setIsAdmin }) {
  const history = useHistory();
  const setUserStatus = useContext(ContextSetUserStatus);
  const setEmailVerified = useContext(ContextSetEmailVerified);
  const [user, setUser] = useState({ email: "", password: "" });
  const userStatus = useContext(ContextUserStatus);
  const { email, token } = useParams({});
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password && form.repassword) {
      if (form.password !== form.repassword) {
        console.log("Password and repassword must match");
        setErrorMessage("Password and repassword must match");
        return;
      }
      //validation password must be minimum eight caracter and have minimum one uppercase letter and contain minimum one digit
      //validate password
      const validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!form.password.match(validRegex)) {
        console.log(
          "Password must contains minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
        );
        setErrorMessage(
          "Password must contains minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
        );
        return;
      }
      //go to server with password email_address
      preflight2
        .post("/reset/password/", {
          email_address: email,
          token: token,
          password: form.password,
        })
        .then((data) => {
          //setuj localstorage
          if (data.data.status) {
            localStorage.setItem("user", JSON.stringify(data.data.user));
            setUserNav(true);
            setUserStatus(true);
            setEmailVerified(data.data.user.email_status_id);
            setLogin(true);
            setIsAdmin(data.data.isAdmin);
            setErrorMessage("");
            history.push("/");
          }
        });
      console.log(form);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div id="reset-password">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <p style={{ marginBottom: "10px" }} id="error_message_login">
          {errorMessage}
        </p>
        <label htmlFor="">
          <span class="label-txt">New Password</span>
          <input name="password" onChange={handleChange} type="password" />
        </label>
        <label htmlFor="">
          <span class="label-txt">Confirm password</span>
          <input name="repassword" onChange={handleChange} type="password" />
        </label>
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
