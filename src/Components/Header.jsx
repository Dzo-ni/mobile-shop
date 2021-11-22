import axios, { preflight, axios2 } from "../axios";
import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import Nav from "./Nav";
import Products from "./Products";
import $ from "jquery";
import Landingmsg from "./Landingmsg";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Payment from "./Payment";
import ShoppingCardOverview from "./ShoppingCardOverview";
import LazyShoppingCard from "./ShoppingCard";
import {
  ContextSetUserStatus,
  ContextUserStatus,
  ContextSetIsAdmin,
} from "./../App";
import EmailVerified from "./EmailVerified";
import { Spinner } from "react-bootstrap";
const stripePromise = loadStripe("pk_test_oEHQgWKWhkD12GWBTKgIX8qH");

function Header({ getCookie, setEmailVerified }) {
  const history = useHistory();
  const location = useLocation();
  const [showArrows, setShowArrows] = useState(true);
  const [showProductsLink, setShowProductsLink] = useState(true);
  const setUserStatus = useContext(ContextSetUserStatus);
  const setIsAdmin = useContext(ContextSetIsAdmin);
  const userStatus = useContext(ContextUserStatus);
  const [shoppingCardProducts, setShoppingCardProducts] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const LazyRegistration = React.lazy(() => import("./auth/Registration"));
  const LazyLogin = React.lazy(() => import("./auth/Login"));
  const LazyForgotPassword = React.lazy(() => import("./auth/ForgotPassword"));
  const LazyResetPassword = React.lazy(() => import("./auth/ResetPassword"));
  const LazyProductDetails = React.lazy(() => import("./Product_details"));
  const LazyProfile = React.lazy(() => import("./Profile"));
  const LazyRelatedProducts = React.lazy(() => import("./RelatedProducts"));
  // const LazyShoppingCard = React.lazy(() => import("./ShoppingCard"));

  const LazyShoppingCardOverview = React.lazy(() =>
    import("./ShoppingCardOverview")
  );
  const [products, setProducts] = useState([]);
  const [login, setLogin] = useState();
  const [userNav, setUserNav] = useState(false);
  let change = false;
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted && userStatus) setLogin(true);

    return () => {
      componentMounted = false;
    };
  }, [userStatus]);
  useEffect(() => {
    if (
      location.pathname == "/profile" ||
      location.pathname.match(/^\/verify/) ||
      location.pathname.match(/^\/payment/)
    ) {
      setShowProductsLink(false);
      setShowArrows(false);
    } else {
      setShowProductsLink(true);
      setShowArrows(true);
    }
    if (location.pathname == "/login" || location.pathname == "/registration") {
      setShowArrows(false);
    }
  }, [location]);
  useEffect(() => {
    let componentMounted = true;

    if (userStatus) {
      setUserStatus(true);
      setLogin(true);
    }

    axios2
      .get("/api/products/latestFour")
      .then((data) => {
        console.log(data);
        if (componentMounted) setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      componentMounted = false;
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    document.cookie =
      "APPSESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log(document.cookie);
    setLogin(false);
    setUserStatus(false);
    setIsAdmin(false);
    history.push("/login");
  };
  const handleScroll = (e) => {
    $("html, body").animate({ scrollTop: $("main").offset().top }, 1000);
  };

  return (
    <>
      <header>
        <div className="navbar">
          <h1 className={isOpen ? "show_menu" : ""}>MOBILE SHOP</h1>
          <Nav
            handleScroll={handleScroll}
            logout={logout}
            getCookie={getCookie}
            login={login}
            userNav={userNav}
            setHeaderClass={setisOpen}
            showProductsLink={showProductsLink}
          />
        </div>

        <div className="landing">
          <div className="landing_box">
            <Switch>
              <Route path="/verify/:email/:activation_code">
                <EmailVerified setEmailVerified={setEmailVerified} />
              </Route>
              <React.Suspense
                fallback={
                  <Spinner className="mx-auto" delay={200} animation="border" />
                }
              >
                <Route exact path="/">
                  <Landingmsg />
                </Route>
                <Route exact path="/payment">
                  <Elements stripe={stripePromise}>
                    <Payment getCookie={getCookie} />
                  </Elements>
                </Route>
                {!login && (
                  <Switch>
                    <Route exact path="/registration">
                      <LazyRegistration setLogin={setLogin} />
                    </Route>

                    <Route exact path="/login">
                      <LazyLogin
                        setLogin={setLogin}
                        setUserNav={setUserNav}
                        getCookie={getCookie}
                        setIsAdmin={setIsAdmin}
                      />
                    </Route>
                    <Route exact path="/forgot-password">
                      <LazyForgotPassword />
                    </Route>
                    <Route exact path="/reset-password/:email/:token">
                      <LazyResetPassword
                        setLogin={setLogin}
                        setUserNav={setUserNav}
                        setIsAdmin={setIsAdmin}
                      />
                    </Route>
                  </Switch>
                )}
                {login && (
                  <Route exact path="/profile">
                    <LazyProfile />
                  </Route>
                )}
                <Route exact path="/product_details/:id">
                  <LazyProductDetails />
                </Route>
                <Route exact path="/shopping_card/">
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      marginTop: "-1rem",
                      marginLeft: "1rem",
                      justifyContent: "center",
                    }}
                  >
                    <h2>
                      SHOPPING CARD <br /> OVERVIEW
                    </h2>
                  </div>
                </Route>
                <Route exact path="/shopping_card/payment">
                  <LazyShoppingCardOverview />
                </Route>
              </React.Suspense>
            </Switch>
          </div>
          <Route
            exact
            path={[
              "/",
              "/login",
              "/registration",
              "/forgot-password",
              "/reset-password/:email/:token",
            ]}
          >
            <div className="exposed">
              <h2>ON ACTION</h2>
              <Products products={products} />
            </div>
          </Route>
          <Route exact path="/payment">
            {/* <div>Hello</div> */}
          </Route>
          <Switch>
            <React.Suspense fallback="Loading...">
              <Route exact path="/shopping_card">
                <LazyShoppingCard
                  shoppingCardProducts={shoppingCardProducts}
                  setShoppingCardProducts={setShoppingCardProducts}
                />
              </Route>
              <Route exact path="/product_details/:id">
                <LazyRelatedProducts />
              </Route>
            </React.Suspense>
          </Switch>
          {showArrows && (
            <a
              onClick={handleScroll}
              href="javascript:;"
              class="scroll-down arrows"
              style={{
                position: "absolute",
                left: "50%",
                top: "88vh",
                width: "5rem",
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </a>
          )}
        </div>
      </header>
    </>
  );
}

export default React.memo(Header);
