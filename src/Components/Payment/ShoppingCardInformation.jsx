import React from "react";

function ShoppingCardInformation({ round, total, subtotal }) {
  return (
    <div>
      <h3>Information from shopping card</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name </th>
            <th>Quantity </th>
          </tr>
        </thead>
        <tbody>
          {JSON.parse(localStorage.getItem("shopping_card")).map((item) => (
            <tr>
              <td>{item.product_name}</td>

              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="overview_total_show">
        <p>
          Total:
          <span> {Number(round(parseFloat(total))).toFixed(2)}$</span>
        </p>
        <p>
          Subtotal:
          <span> {Number(round(parseFloat(subtotal))).toFixed(2)}$</span>
        </p>
      </div>
    </div>
  );
}

export default ShoppingCardInformation;
