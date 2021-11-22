import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
  Link,
} from "react-router-dom";
import { axios2, preflight2 } from "./axios";
import Dashboard from "./Components/admin/Dashboard";
import ReactGA from "react-ga";
import Component404 from "./Components/Component404";
import Footer from "./Components/Footer";
import CookiesInformation from "./Components/CookiesInformation";
import UserNotVerified from "./Components/UserNotVerified";

export const ContextUserStatus = React.createContext();
export const ShoppingCardContext = React.createContext();
export const AddToShoppingCard = React.createContext();
export const ContextItems = React.createContext();
export const ContextRemoveItem = React.createContext();
export const ContextSetItems = React.createContext();
export const ContextSetUserStatus = React.createContext();
export const ContextSetIsAdmin = React.createContext();
export const ContextSetEmailVerified = React.createContext();
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function App() {
  const effectAdded = (btn, new_items) => {
    var cart = $("#shopping_card_icon");
    if (btn.classList.contains("add") || btn.classList.contains("add_icon")) {
      if (btn.classList.contains("add_icon")) btn = $(btn).parent(".add");

      var imgtodrag = $(btn)
        .parent(".buttons_product_container")
        .parent(".card__info")
        .parent(".custom_card")
        .find(".card__image")
        .eq(0)
        .find("img")
        .eq(0);
    } else {
      if (btn.classList.contains("addto_icon"))
        btn = $(btn).parent(".addtocard");
      var imgtodrag = $(btn)
        .parent("#details_footer")
        .parent(".col-2")
        .prev(".col-2")
        .eq(0)
        .find("img")
        .eq(0);
    }

    if (imgtodrag) {
      var imgclone = imgtodrag
        .clone()
        .offset({
          top: imgtodrag.offset().top,
          left: imgtodrag.offset().left,
        })
        .css({
          opacity: "0.5",
          position: "absolute",
          height: "150px",
          width: "150px",
          "z-index": "100",
        })
        .appendTo($("body"))
        .animate(
          {
            top: cart.offset().top + 10,
            left: cart.offset().left + 10,
            width: 75,
            height: 75,
          },
          1000,
          "easeInOutExpo"
        );

      setTimeout(function () {
        const audio = new Audio(
          "zapsplat_foley_shopping_cart_metal_roll_push_into_wall_or_other_object_002_20223.mp3"
        );
        audio.play();
      }, 500);
      setTimeout(function () {
        cart.effect(
          "shake",
          {
            times: 1,
          },
          200
        );
      }, 1500);

      imgclone.animate(
        {
          width: 0,
          height: 0,
          padding: 0,
          margin: 0,
        },
        function () {
          setNumberOfitems(new_items);
        }
      );
    }
  };
  const [userStatus, setUserStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [shoppingCard, setShoppingCard] = useState([]);
  const [numberOfitems, setNumberOfitems] = useState(0);
  const [emailVerified, setEmailVerified] = useState(1);
  let localCart = localStorage.getItem("shopping_card");
  let num_items = localStorage.getItem("items")
    ? parseInt(localStorage.getItem("items"))
    : 0;
  const addItem = (e, item, update) => {
    //create a copy of our cart state, avoid overwritting existing state
    let shoppingStorageCard = localStorage.getItem("shopping_card")
      ? JSON.parse(localStorage.getItem("shopping_card"))
      : [];
    let numStorageCard = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : 0;
    var new_items = parseInt(numStorageCard) + 1;
    if (!update) effectAdded(e.target, new_items);

    let cartCopy = [...shoppingStorageCard];

    //assuming we have an ID field in our item
    let { product_id } = item;

    //look for item in cart array
    let existingItem = cartCopy.find(
      (cartItem) => cartItem.product_id === product_id
    );

    //if item already exists
    if (update) {
      existingItem.quantity = parseInt(existingItem.quantity) + 1;
    } else {
      if (existingItem) {
        existingItem.quantity =
          parseInt(existingItem.quantity) + parseInt(item.quantity); //update item
      } else {
        //if item doesn't exist, simply add it
        cartCopy.push(item);
      }
    }

    //update app state
    setShoppingCard(cartCopy);

    if (update) setNumberOfitems(new_items);
    localStorage.setItem("items", new_items);

    localStorage.setItem("shopping_card", JSON.stringify(cartCopy));
  };

  const removeItem = (itemID, quantity, isOne) => {
    //create cartCopy
    let cardStorage = JSON.parse(localStorage.getItem("shopping_card"));
    let cartCopy = [...cardStorage];
    let copyNum = numberOfitems - parseInt(quantity);

    if (isOne === false || isOne === "1")
      cartCopy = cartCopy.filter((item) => item.product_id != itemID);
    else {
      cartCopy.forEach((item) => {
        if (item.product_id === itemID) {
          item.quantity = item.quantity - quantity;
        }
      });
    }
    //update state and local
    setShoppingCard(cartCopy);
    setNumberOfitems(copyNum);

    localStorage.setItem("shopping_card", JSON.stringify(cartCopy));
    localStorage.setItem("items", JSON.stringify(copyNum));
  };

  useEffect(() => {
    let componentMounted = true;
    setEmailVerified(
      JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user")).email_status_id
        : 1
    );
    ReactGA.initialize("UA-211696781-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
    //turn it into js
    localCart = JSON.parse(localCart);
    num_items = JSON.parse(num_items);
    //load persisted cart into state if it exists
    if (localCart) setShoppingCard(localCart);
    if (num_items) setNumberOfitems(parseInt(num_items));

    axios2.get("/auth/user/is_login").then((data) => {
      if (componentMounted) {
        console.log(data);
        if (data.data.status) setUserStatus(data.data.status);
        setIsAdmin(data.data.isAdmin);
      }
    });
    return () => {
      componentMounted = false;
    };
  }, []);
  const LazyRegistration = React.lazy(() =>
    import("./Components/auth/Registration")
  );
  const LazyLogin = React.lazy(() => import("./Components/auth/Login"));
  return (
    // <ShoppingCardContext.Provider value={shoppingCard}>
    <>
      <Switch>
        <Router>
          <Route path="/dashboard">
            {isAdmin ? <Dashboard /> : <Redirect from="*" to="/" />}
          </Route>

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
              "/profile",
              "/verify/:email/:activation_code",
            ]}
          >
            {isAdmin && (
              <div id="admin_panel">
                <h2>HELLO ADMINISTRATOR</h2>
                <Link to="/dashboard">
                  {" "}
                  <button>GO TO DASHBOARD</button>
                </Link>
              </div>
            )}

            {userStatus && emailVerified === "1" && <UserNotVerified />}
            <ContextSetEmailVerified.Provider value={setEmailVerified}>
              <ContextSetIsAdmin.Provider value={setIsAdmin}>
                <ContextSetUserStatus.Provider value={setUserStatus}>
                  <ContextUserStatus.Provider value={userStatus}>
                    <ContextItems.Provider value={numberOfitems}>
                      <ContextRemoveItem.Provider value={removeItem}>
                        <ContextSetItems.Provider value={setNumberOfitems}>
                          <AddToShoppingCard.Provider value={addItem}>
                            <Header
                              getCookie={getCookie}
                              setEmailVerified={setEmailVerified}
                            />
                          </AddToShoppingCard.Provider>
                        </ContextSetItems.Provider>
                      </ContextRemoveItem.Provider>
                    </ContextItems.Provider>
                  </ContextUserStatus.Provider>
                </ContextSetUserStatus.Provider>
              </ContextSetIsAdmin.Provider>
            </ContextSetEmailVerified.Provider>
          </Route>
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
            ]}
          >
            <div className="wrap">
              <AddToShoppingCard.Provider value={addItem}>
                <Home />
              </AddToShoppingCard.Provider>
            </div>
          </Route>
        </Router>
      </Switch>
      <Footer />
      {!getCookie("information") ? (
        <CookiesInformation setCookie={setCookie} getCookie={getCookie} />
      ) : null}
    </>
    // </ShoppingCardContext.Provider> */}
  );
}

export default App;
