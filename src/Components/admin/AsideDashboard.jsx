import React, { useState } from "react";
import { Link } from "react-router-dom";
function AsideDashboard({ mobileOpen, setMobilleOpen }) {
  const [open, isOpen] = useState(true);
  const logout = () => {
    localStorage.removeItem("user");
    document.cookie =
      "APPSESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location = "/";
  };
  return (
    <aside id={mobileOpen ? "mobile" : ""} className={open ? "minimize" : ""}>
      <button
        onClick={() => isOpen((prevState) => !prevState)}
        id="aside_switch"
      >
        {!open ? (
          <>
            <img width="40px" src="/img/hamburgericon.png" alt="" />
          </>
        ) : (
          <>
            <img width="40px" src="/img/hamburgericon.png" alt="" />
          </>
        )}
      </button>
      <button
        class="close_mobile_aside"
        onClick={() => {
          setMobilleOpen(false);
        }}
      >
        X
      </button>
      {!open ? (
        <>
          <section id="admin_section" className="wave">
            <div className="admin_info">
              <h2>ADMIN</h2>
              <p>admin@yahoo.com</p>
              <button id="dashboard_logout" onClick={logout}>
                Logout
              </button>
            </div>
            <img
              src="https://img.favpng.com/8/0/5/computer-icons-user-profile-avatar-png-favpng-6jJk1WU2YkTBLjFs4ZwueE8Ub.jpg"
              alt=""
            />
          </section>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/products">Products</Link>
              </li>
              <li>
                <Link to="/dashboard/users">Users</Link>
              </li>
              <li>
                {" "}
                <Link to="/dashboard/orders">Orders</Link>
              </li>
              <li>
                {" "}
                <Link to="/dashboard/email">Compose Email</Link>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <section id="admin_section" className="wave">
            <img
              src="https://img.favpng.com/8/0/5/computer-icons-user-profile-avatar-png-favpng-6jJk1WU2YkTBLjFs4ZwueE8Ub.jpg"
              alt=""
            />
          </section>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">
                  <img class="img_icon" src="/img/home.png" alt="" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard/products">
                  <img class="img_icon" src="/img/mobiles.png" alt="" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  {" "}
                  <img class="img_icon" src="/img/users.png" alt="" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard/orders">
                  {" "}
                  <img class="img_icon" src="/img/transaction.png" alt="" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard/email">
                  {" "}
                  <img
                    id="email_compose_icon"
                    class="img_icon"
                    src="/img/emailicon.png"
                    alt=""
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </aside>
  );
}

export default AsideDashboard;
