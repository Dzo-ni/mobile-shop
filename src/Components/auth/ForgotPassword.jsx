import React, { useState } from "react";
import { axios2 } from "../../axios";
import "./ForgotPassword.css";
function ForgotPassword() {
  const [email, setEmail] = useState();
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios2.get("/forgot/password/" + email).then((data) => {
      console.log(data);
      if (data.data.status) {
        setPage(2);

        setMessage(
          "You will receive an email soon with link for changing password  on " +
            email
        );
        axios2
          .get("http://localhost:4242/handle/email/" + data.data.event_id)
          .then((data) => {
            console.log(data.data);
          });
      }
    });
    //send email address to server and then question server if email exist in database and
    // if email exist and belongs to user send link with validation code to provide email address
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div id="forgot-password">
      <h2>Forgot Password</h2>
      {page == 1 && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            <span className="label-txt">E-mail Address</span>
            <input type="text" onChange={handleChange} />
          </label>
          <button type="submit">Send Password Reset Link</button>
        </form>
      )}
      {page == 2 && (
        <div style={{ textAlign: "center", width: "90%", margin: "auto" }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
