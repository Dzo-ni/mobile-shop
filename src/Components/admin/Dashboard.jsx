import React, { useState } from "react";
import AsideDashboard from "./AsideDashboard";
import "./Dashboard.css";
import DashboardHome from "./DashboardHome";
import Products from "./Products/Products";
import Users from "./Users/Users";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Orders from "./Orders/Orders";
import EmailCompose from "./EmailCompose";

function Dashboard() {
  const [open, setOpen] = useState(false);
  return (
    <div id="dashboard">
      <AsideDashboard mobileOpen={open} setMobilleOpen={setOpen} />
      <main>
        <div r id="dashboard_title">
          <span onClick={() => setOpen(true)} id="mobile_button">
            <img width="40px" src="/img/hamburgericon.png" alt="" />
          </span>
          <Link to="/">
            <button>GO TO STORE</button>
          </Link>
          <h1>DASHBOARD</h1>
        </div>
        <div className="main_dashboard_content">
          <Switch>
            <Route exact path="/dashboard">
              <DashboardHome />
            </Route>
            <Route exact path="/dashboard/products">
              <Products />
            </Route>
            <Route exact path="/dashboard/users">
              <Users />
            </Route>
            <Route exact path="/dashboard/orders">
              <Orders />
            </Route>
            <Route exact path="/dashboard/email">
              <EmailCompose />
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
