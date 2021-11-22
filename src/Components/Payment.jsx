import React, { useState, useEffect, useContext } from "react";

import { ContextUserStatus } from "../App";

import PaymentUser from "./Payment/PaymentUser";
import PaymentNonUser from "./Payment/PaymentNonUser";
import { useHistory } from "react-router";

function Payment({ getCookie }) {
  const userStatus = useContext(ContextUserStatus);
  const history = useHistory();
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  var values = 0;
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return ((Math.round(m) / 100) * Math.sign(num)).toFixed(2);
  }
  useEffect(() => {
    if (userStatus) {
      if (
        JSON.parse(localStorage.getItem("user")).city == null ||
        JSON.parse(localStorage.getItem("user")).street == null
      ) {
        console.log(JSON.parse(localStorage.getItem("user")).street == null);

        history.push("/profile?provide_address=2");
      }
    }
    JSON.parse(localStorage.getItem("shopping_card")).forEach((item) => {
      values += parseFloat(item.product_price);
    });

    setSubtotal(values);
    setTotal(values + parseFloat(values / 20));
  }, []);

  if (userStatus) {
    return <PaymentUser round={round} total={total} subtotal={subtotal} />;
  } else {
    return <PaymentNonUser round={round} total={total} subtotal={subtotal} />;
  }
}

export default Payment;
