import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContextItems } from "../App";
function Nav({
  handleScroll,
  logout,
  getCookie,
  login,
  userNav,
  setHeaderClass,
  showProductsLink,
}) {
  const numberOfitems = useContext(ContextItems);

  const [user, setUser] = useState({});

  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) setUser(JSON.parse(localStorage.getItem("user")));
    return () => {
      componentMounted = false;
    };
  }, [userNav, login, logout]);

  const handleMenu = () => {
    setHeaderClass(!isOpen);
    setisOpen(!isOpen);
  };
  return (
    <nav>
      <ul>
        <li id="shopping_card_icon" className={isOpen ? "show_menu" : ""}>
          <Link to="/shopping_card" id="shoping_card_link">
            <img id="shoping_card_img" src="/img/shopping_card2.png" alt="" />
            <span id="card_items">{numberOfitems}</span>
          </Link>
        </li>
        <li
          id="hamburger_icon"
          className={isOpen ? "show_menu" : ""}
          onClick={handleMenu}
        >
          <div className="menu-icon-lines bar1"></div>
          <div className="menu-icon-lines bar2"></div>
          <div className="menu-icon-lines bar3"></div>
        </li>
        <li
          id="menu_links_container"
          className={isOpen ? "show_menu" : ""}
          onClick={
            isOpen
              ? () => {
                  setHeaderClass(false);
                  setisOpen(false);
                }
              : ""
          }
        >
          <ul id="menu_links" className={isOpen ? "show_menu" : ""}>
            {showProductsLink && (
              <li>
                <button onClick={handleScroll}>PRODUCTS</button>
              </li>
            )}

            <li>
              <Link to="/">Home</Link>
            </li>

            {!login ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <li>
                <button onClick={logout}>LOGOUT</button>
              </li>
            )}

            {!login ? (
              <li id="register_nav" className="profile_register">
                <Link to="/registration">Register</Link>
              </li>
            ) : (
              <>
                <li id="profile_btn" className="profile_register login_links">
                  <Link id="img" to="/profile"></Link>
                </li>
                <li className="profile_register" className="login_links">
                  <Link to="/profile">{user?.firstname}</Link>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(Nav);
