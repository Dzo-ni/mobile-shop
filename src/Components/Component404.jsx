import React from "react";
import { Link } from "react-router-dom";

function Component404() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "4rem" }}>Page 404</h1>
      <p style={{ fontSize: "1.2rem" }}>Page doesn't exist</p>
      <Link style={{ fontSize: "1.1rem" }} to="/">
        Back to home page
      </Link>
    </div>
  );
}

export default Component404;
