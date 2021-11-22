import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { axios2 } from "../axios";

function EmailVerified({ setEmailVerified }) {
  const { email, activation_code } = useParams();
  const history = useHistory();
  useEffect(() => {
    let componentMounted = true;

    axios2
      .get("/api/email/verified/" + email + "/" + activation_code)
      .then((data) => {
        if (componentMounted && data.data.status) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          setEmailVerified(2);
          history.push("/");
        }
      });
    return () => {
      componentMounted = false;
    };
  }, []);

  return <div></div>;
}

export default EmailVerified;
