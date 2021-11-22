import axios from "axios";

import React, { useState, useEffect, useRef } from "react";
import { set } from "react-ga";
import { axios2, preflight2 } from "../axios";
import "./Profile.css";
import $ from "jquery";
import { useHistory, useLocation } from "react-router";
function Profile() {
  const search = useLocation().search;
  const history = useHistory();
  const provide_address = new URLSearchParams(search).get("provide_address");
  const [stateChange, setStateChange] = useState("");
  const [page, setPage] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  const [userEditState, setUserEditState] = useState({});
  const inputRef = useRef({});
  console.log(provide_address);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userId);

    preflight2.post("/api/user/edit", userEditState).then((response) => {
      if (response.data.status) {
        setUser(userEditState);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      console.log(response);
      if (provide_address === "2") {
        history.push("/payment");
        return;
      }
      setPageState(1);
    });
  };
  const handleClick = (e) => {
    setStateChange("changePersonalInformation");
  };
  const handleChange = (e) => {
    console.log(e.target.name);
    setUserEditState((prevState) => ({
      ...prevState,

      [e.target.name]: e.target.value,
    }));
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("user_id")));
    if (provide_address === "2") {
      setPageState(2);
    }
    $(".arrows").css("display", "none");

    let componentMounted = true;

    axios2.get("/api/user").then((user) => {
      console.log(user.data);
      setUser(user.data);
      setUserEditState(user.data);
      inputRef.current["firstname"] = user.data.firstname;
      inputRef.current["lastname"] = user.data.lastname;

      inputRef.current["city"] = user.data.city ?? "";
      inputRef.current["street"] = user.data.street ?? "";
    });

    axios2.get("/profile/orders").then((data) => {
      var arr = data.data
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      console.log(arr);
      if (componentMounted) setOrders(arr);
    });
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <div id="profile">
      <div>
        <div>
          <img src="/img/avatar.png" />
        </div>
        <ul id="profile_options">
          <li>
            <span
              className={page == 1 && "border_bottom"}
              onClick={() => setPage(1)}
            >
              {" "}
              Personal Information
            </span>
          </li>

          <li>
            <span
              className={page == 4 && "border_bottom"}
              onClick={() => setPage(4)}
            >
              {" "}
              View last payments{" "}
            </span>
          </li>
        </ul>
      </div>
      <div class="profile_column">
        {page == 1 && (
          <>
            {pageState == 1 ? (
              <>
                <h3>
                  <img src="/img/personalinformation.png" alt="" />
                  Personal information
                </h3>
                <p>
                  <span>Firstname: </span>
                  <span> {user.firstname} </span>
                </p>
                <p>
                  <span>Lastname: </span> <span>{user.lastname} </span>
                </p>

                <h3>
                  <img src="/img/shippingaddress.png" alt="" />
                  Shipping Address
                </h3>
                <p>
                  <span>Street and number: </span>
                  <span> {user.street} </span>
                </p>
                <p>
                  <span>City: </span> <span>{user.city}</span>
                </p>

                <h3>
                  <img src="/img/contact.png" alt="" />
                  Personal information
                </h3>
                <p>
                  <span>Email: </span>
                  <span> {user.email_address} </span>
                </p>

                {/* <p>ZipCode: 52020</p> */}
                <button
                  onClick={() => {
                    setPageState(2);
                  }}
                >
                  Change information
                </button>
              </>
            ) : (
              <>
                {provide_address === "2" && (
                  <h2 style={{ color: "red", backgroundColor: "#ccc" }}>
                    First you need provide all information
                  </h2>
                )}
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="firstname">Firstname: </label>
                    <input
                      onChange={handleChange}
                      ref={(el) => (inputRef.current["firstname"] = el)}
                      type="text"
                      name="firstname"
                      value={userEditState.firstname}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastname">Lastname: </label>
                    <input
                      onChange={handleChange}
                      ref={(el) => (inputRef.current["lastname"] = el)}
                      type="text"
                      name="lastname"
                      value={userEditState.lastname}
                    />
                  </div>
                  <div>
                    <label htmlFor="street">Street: </label>
                    <input
                      onChange={handleChange}
                      ref={(el) => (inputRef.current["street"] = el)}
                      type="text"
                      name="street"
                      value={userEditState.street}
                    />
                  </div>
                  <div>
                    <label htmlFor="city">City: </label>
                    <input
                      onChange={handleChange}
                      ref={(el) => (inputRef.current["city"] = el)}
                      type="text"
                      name="city"
                      value={userEditState.city}
                    />
                  </div>

                  <div>
                    <input type="submit" value="Save" />
                    <button
                      onClick={() => {
                        setPageState(1);
                      }}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        )}

        {page == 4 && orders.length > 0 && (
          <>
            <h2>
              <img src="/img/previuspayments.png" alt="" /> Previous Payments
            </h2>
            <div className="profile_details">
              <table>
                <tr>
                  <th>PO Number</th>
                  <th>TOTAL PRICE</th>
                  <th>DATE</th>
                  <th>&nbsp;</th>
                </tr>
                {orders.map((order) => (
                  <tr>
                    <td>{order.po_number}</td>
                    <td>{numberWithCommas(order.total_price)}$</td>
                    <td>{order.created_at}</td>
                    <td>
                      <button
                        onClick={() => {
                          setPage(5);
                          axios2
                            .get("/profile/orders/" + order.order_id)
                            .then((data) => {
                              console.log(data);
                              setOrderDetails(data.data.order);
                              setOrderItems(data.data.order_details);
                            });
                        }}
                      >
                        SHOW MORE
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </>
        )}

        {page == 5 && orderItems.length > 0 && (
          <>
            <button
              id="previousPage"
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              &lt;&lt;&lt; BACK
            </button>
            <div id="order_detail_content">
              <div>
                <h2>Order details</h2>
                <p>
                  <span>PO NUMBER : </span>
                  {orderDetails.po_number}
                </p>
                <p>
                  <span>CREATED AT : </span>
                  {orderDetails.created_at}
                </p>
                <p>
                  <span>SUBTOTAL PRICE : </span>
                  {numberWithCommas(orderDetails.subtotal_price)}$
                </p>
                <p>
                  <span>TOTAL PRICE : </span>
                  {numberWithCommas(orderDetails.total_price)}$
                </p>
              </div>
              <div id="order_detail_list">
                <h2>Order items</h2>
                <div>
                  <span> PRODUCT NAME </span>
                  <span>QUANTITY</span>
                </div>
                {orderItems.map((item) => (
                  <div>
                    <span> {item.product_name} </span>
                    <span>{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
