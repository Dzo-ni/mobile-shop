import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Component404 from "./Components/Component404";
import ResetPassword from "./Components/auth/ResetPassword";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route
          exact
          path={[
            "/",
            "/login",
            "/registration",
            "/forgot-password",
            "/reset-password/:email/:token",
            "/product_details/:id",
            "/shopping_card",
            "/payment",
            "/dashboard",
            "/profile",
            "/verify/:email/:activation_code",
            "/dashboard/email",
            "/dashboard/products",
            "/dashboard/users",
          ]}
        >
          <App />
        </Route>

        <Route path="*" exact>
          <Component404 />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
