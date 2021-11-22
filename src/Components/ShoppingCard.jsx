import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AddToShoppingCard, ContextRemoveItem } from "../App";

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return ((Math.round(m) / 100) * Math.sign(num)).toFixed(2);
}
console.log(round(100));
function ShoppingCard({ shoppingCardProducts, setShoppingCardProducts }) {
  const add = useContext(AddToShoppingCard);
  const removeItem = useContext(ContextRemoveItem);
  // const [products, setProducts] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    setShoppingCardProducts(
      JSON.parse(localStorage.getItem("shopping_card")) ?? []
    );
  }, [add, removeItem]);
  useEffect(() => {
    setSubTotal(
      round(
        shoppingCardProducts.reduce(
          function (acc, item) {
            return parseFloat(
              parseFloat(acc) +
                parseFloat(item.product_price * parseFloat(item.quantity))
            );
          },
          [0]
        )
      )
    );
  }, [shoppingCardProducts]);
  return (
    shoppingCardProducts.length > 0 && (
      <div id="shopping_card_content">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCardProducts.map((product) => (
              <tr key={product.product_id}>
                <td id="product_td">
                  <img
                    style={{ objectFit: "contain" }}
                    src={`${process.env.REACT_APP_PUBLIC_IMAGE}${product.product_thumbnail}`}
                    width="70px;"
                    alt=""
                  />
                  <div id="mobile_text">
                    <h4>{product.product_name}</h4>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nesciunt, quia?
                    </p>
                  </div>
                </td>
                <td id="td_buttons_quantity">
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      removeItem(
                        e.target.parentElement.nextElementSibling
                          .nextElementSibling.lastElementChild.value,
                        1,
                        e.target.nextElementSibling.innerHTML
                      );
                    }}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      add(e, product, true);
                    }}
                  >
                    +
                  </button>
                </td>
                <td id="mobile_price_card">
                  {Number(
                    round(parseFloat(product.product_price) * product.quantity)
                  ).toFixed(2)}
                  $
                </td>
                <td>
                  <button
                    className="btn btn_remove"
                    onClick={(e) => {
                      removeItem(
                        e.target.nextElementSibling.value,
                        e.target.parentElement.previousElementSibling
                          .previousElementSibling.firstElementChild
                          .nextElementSibling.innerHTML,
                        false
                      );
                    }}
                  >
                    Remove
                  </button>
                  <input type="hidden" value={product.product_id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table id="total">
          <thead>
            <tr>
              <th>Subtotal</th>
              <th>Taxes (5%) </th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{subtotal}$</td>
              <td>
                + {Number(round(parseFloat(subtotal / 100) * 5)).toFixed(2)}$
              </td>
              <td>
                {round(parseFloat(subtotal) + parseFloat((subtotal / 100) * 5))}{" "}
                $
              </td>
            </tr>
          </tbody>
        </table>
        <div id="payments_buttons">
          <Link to="/payment">
            {" "}
            <button style={{ float: "right" }} class="btn btn_success">
              CONTINUE TO PAYMENT{" "}
            </button>
          </Link>
        </div>
      </div>
    )
  );
}

export default React.memo(ShoppingCard);
