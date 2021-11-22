import React, { useState, useEffect } from "react";
import { axios2 } from "../../../axios";
import OrderDetailModel from "./OrderDetailModel";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(0);
  const [page, setPage] = useState(1);
  const [modalOrderShow, setModalOrderShow] = React.useState(false);
  useEffect(() => {
    let componentMounted = true;
    axios2.get("/admin/api/orders").then((data) => {
      if (componentMounted) setOrders(data.data);
    });
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <div id="user_dashboard">
      <OrderDetailModel
        show={modalOrderShow}
        orderId={orderId}
        onHide={() => setModalOrderShow(false)}
      />
      <h2>ORDERS</h2>
      <table>
        <tr>
          <th>Order ID</th>
          <th>SUBTOTAL PRICE</th>
          <th>TOTAL PRICE</th>
          <th>STATUS</th>
          <th>CREATED BY</th>
          <th>CREATED AT</th>
          <th>CREATED AT</th>
          <th></th>
        </tr>
        {orders.slice((page - 1) * 10, 10 * page)?.map((order) => (
          <tr>
            <td>{order.order_id}</td>
            <td>{order.subtotal_price}</td>
            <td>{order.total_price}</td>
            <td
              className={
                (order.status == "RESERVED" && "reserved") ||
                (order.status == "SUCCESSFUL" && "success")
              }
            >
              {order.status}
            </td>
            <td>{order.created_by}</td>
            <td>{order.created_at}</td>
            <td>
              <button
                id={order.order_id}
                className="bg-info py-1 px-3 border-0"
                onClick={(e) => {
                  setModalOrderShow(true);
                  setOrderId(e.target.id);
                }}
              >
                SHOW
              </button>
            </td>
          </tr>
        ))}
      </table>
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination" style={{ justifyContent: "center" }}>
          <li className={`page-item ${page == 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setPage((prevState) => prevState - 1);
              }}
            >
              Previous
            </a>
          </li>

          {[...Array(Math.ceil(orders.length / 10))].map((item, index) => (
            <li
              className={`page-item ${page == index + 1 ? "active" : ""}`}
              ariaCurrent={page == index + 1 ? "page" : ""}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => {
                  setPage(index + 1);
                }}
              >
                {index + 1}
              </a>
            </li>
          ))}

          <li
            className={`page-item ${
              page == Math.ceil(orders.length / 10) ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setPage((prevState) => prevState + 1);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Orders;
