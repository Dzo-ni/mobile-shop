import React, { useState, useEffect, useContext } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { preflight, preflight2, axios2 } from "../../axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./../Payment.css";
import Profile from "./../Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextSetItems, ContextUserStatus } from "../../App";
import $ from "jquery";
import ShoppingCardInformation from "./ShoppingCardInformation";
import { useHistory } from "react-router";
function PaymentUser({ round, total, subtotal }) {
  const history = useHistory();
  const setNumberOfitems = useContext(ContextSetItems);
  const userStatus = useContext(ContextUserStatus);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntent, setPaymentIntent] = useState("");
  const [user, setUser] = useState({});
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });

  const [count, setCount] = useState(1);
  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const [product, setProduct] = useState({
    name: "Apple10",
    price: 10,
    productBy: "Apple",
  });

  useEffect(() => {
    $(".landing_box:has(#payments) ~ .arrows").addClass("not_arrows");
    setCount(1);
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    let width = count * 25 + "%";
    $("#myBar").css("width", width);
    if (count === 1) {
      $(".test").removeAttr("disabled");
      $(".test").removeClass("nova");
    } else if (count === 2) {
      $(".test").attr("disabled", "disabled");
      $(".test").addClass("nova");
    } else if (count == 3) {
      preflight2
        .post(
          // "/charge_second_time.php",
          "/api/payment",
          {
            // appsession: getCookie("APPSESSION") ?? "",

            items: [...JSON.parse(localStorage.getItem("shopping_card"))],
            pi_id: localStorage.getItem("payment_intent") ?? "",
          },

          // {
          //   token: token,
          //   product: product,
          // },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          // return;
          console.log(data);
          // if (data == "Nemate autorizaciju") {
          //   document.cookie = "";
          // }
          // return;
          setClientSecret(data.data.clientSecret);
          if (
            localStorage.getItem("payment_intent") == null ||
            localStorage.getItem("payment_intent") == undefined
          ) {
            localStorage.setItem("payment_intent", data.data.payment_intent);
          }
          setPaymentIntent(data.data.payment_intent);

          // const info = data.data;
          // const cardelement = elements.getElement(CardElement);
          // stripe
          //   .confirmCardPayment(info.clientSecret, {
          //     payment_method: { card: CardElement },
          //   })
          //   .then((confirmPayment) => {
          //     if (confirmPayment.paymentIntent.status == "succeeded") {
          //       alert("succesful");
          //     } else {
          //       alert("failed");
          //     }
          //   });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [count]);
  const payWithMethod = () => {
    preflight
      .post(
        "/charge_second_time.php",

        {
          //   customer_id: customerId,
          items: [...JSON.parse(localStorage.getItem("shopping_card"))],
          pm_method: "pm_1Jj2vVH0WfqRVZtvg8xzs56W",
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        // return;
        setClientSecret(data.data.payment_intent);
        if (
          localStorage.getItem("payment_intent") == null ||
          localStorage.getItem("payment_intent") == undefined
        ) {
          localStorage.setItem("payment_intent", data.data.payment_intent);
        }
        setPaymentIntent(data.data.payment_intent);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(!event.complete);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmitForUsers = (e) => {
    e.preventDefault();

    //here try to reduce product.product_quantity if product.quantities for all products exist then reduce
    var handleEmailId = "";
    preflight2
      .post("/api/order", {
        // appsession: getCookie("APPSESSION") ?? "",
        shopping_card: localStorage.getItem("shopping_card"),
        stripe_pi: localStorage.getItem("payment_intent"),
      })
      .then((data) => {
        console.log(data);

        if (!data.data.success) {
          console.log(
            "You need " +
              data.data.needs +
              " " +
              data.data.missing_product.product_name
          );
          console.log(
            "We have only " +
              data.data.have +
              " " +
              data.data.missing_product.product_name
          );
          console.log(
            "Please be patient. We will get an additional quantity of this product soon"
          );
          setProcessing(false);
        } else {
          setProcessing(true);
          handleEmailId = data.data.event_id;
          continueToPayment();
        }
      });

    //and insert row aboout sales in table sales (with sales.status = reserved)
    //then continue to payload
    //if quantities doesnt exist stop processing to payload and show properly message to customer
    //and log to file which product doesnt exist and which customer've tried to buy some products
    //maybe send properly email latter to customer in marketing purposes

    async function continueToPayment() {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        // receipt_email: email,
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        toast("Successfull payment your products!");
        localStorage.removeItem("shopping_card");
        localStorage.removeItem("items");
        setNumberOfitems(0);
        $("#myBar").css("width", "100%");
        $("#myBar").html("100%");
        setCount(4);
        axios2.get("handle/email/" + handleEmailId).then((data) => {
          console.log("Mail poslat");
        });
      }
      localStorage.removeItem("payment_intent");
    }
  };

  return (
    <div id="payments">
      <h2>Payment Proccess</h2>
      <div id="myProgress">
        <ProgressBar
          stripped
          label={`${count * 25}%`}
          variant={count * 25 == 100 ? "success" : "primary"}
          animated={count * 25 == 100 ? "" : "animated"}
          now={count * 25}
        />
      </div>
      <ToastContainer />

      {count === 1 ? (
        <div id="overview_data">
          <div>
            <h3>Your personal information</h3>
            <p>
              <span>Firstname :</span> <span>{user.firstname}</span>
            </p>
            <p>
              <span>Lastname :</span> <span>{user.lastname}</span>
            </p>
            <p>
              <span>Street :</span> <span>{user.street}</span>
            </p>
            <p>
              <span>City :</span> <span>{user.city}</span>
            </p>
            <p>
              <span>Email :</span> {user.email_address}
              <span></span>
            </p>
            <button onClick={() => history.push("/profile")}>
              Change personal data
            </button>
          </div>
          <ShoppingCardInformation
            total={total}
            subtotal={subtotal}
            round={round}
          />
        </div>
      ) : null}

      {count === 2 ? (
        <div>
          {/* <div>
            You have already payment cards.Maybe you want to reuse again same of
            them
          </div>
          <div>
            <img src="/img/visa.png" height="30px" alt="" />{" "}
            <span>Card number : *************4455</span>
            <button onClick={payWithMethod}>PAY WITH VISA CARD</button>
          </div>
          <div>
            <img src="/img/master.png" height="30px" alt="" />{" "}
            <span>Card number : *************4455</span>
            <button onClick={payWithMethod}>PAY WITH MASTER CARD</button>
          </div>
          <p>OR CONTINUE TO PAY WITH NEW PAYMENT CARD . PLEASE CLICK TO NEXT</p> */}
          <div>
            <p>You doenst have payment method yet</p>
            <p>Click next to payment</p>
          </div>
        </div>
      ) : null}

      {count === 3 ? (
        <div className="form-group">
          <form id="payment-form" onSubmit={handleSubmitForUsers}>
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
            <button
              disabled={processing || disabled || succeeded}
              id="submit"
              type="submit"
            >
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {/* Show any error that happens when processing the payment */}
            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}
            {/* Show a success message upon completion */}
            <p
              className={succeeded ? "result-message" : "result-message hidden"}
            >
              Payment succeeded, see the result in your
              <a href={`https://dashboard.stripe.com/test/payments`}>
                {" "}
                Stripe dashboard.
              </a>{" "}
              Refresh the page to pay again.
            </p>
          </form>
        </div>
      ) : null}

      {count < 4 ? (
        <div id="next_previous">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <button
              className="btn btn-dark"
              type="submit"
              onClick={() => setCount(count - 1)}
              disabled={count < 2}
            >
              Back
            </button>

            {count <= 2 && (
              <>
                <button
                  className="btn btn-light mx-2"
                  type="submit"
                  onClick={() => setCount(count + 1)}
                  disabled={count > 2}
                >
                  Next
                </button>
              </>
            )}
          </form>
        </div>
      ) : null}
      {count == 4 ? (
        <div id="successfully_msg">
          <h3>Payment has been processed successfully </h3>
          <p>You can expected shipped between two or five working days</p>
          <p>Successfully...</p>
          <p>Thank you in trust </p>
          <p>MobileShop.com</p>
        </div>
      ) : null}
    </div>
  );
}

export default PaymentUser;
