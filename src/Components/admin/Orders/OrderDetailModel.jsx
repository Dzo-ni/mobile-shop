import { Input } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { Button, FloatingLabel, Form, Modal, Accordion } from "react-bootstrap";
import { axios2, axios3, preflight2 } from "../../../axios";
import BarChart from "../../chart/BarChart";
import LineChart from "../../chart/LineChart";
import "./Orders.css";
function OrderDetailModel(props) {
  const inputRef = useRef({});
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [formItems, setFormItems] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);
  const [expStatus, setExpStatus] = useState(null);
  const handleChange = (e) => {
    setOrder((prevState) => ({
      ...prevState,

      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (props.orderId == 0) return;
    axios2.get("/admin/api/orders/" + props.orderId).then((data) => {
      setOrder(data.data);
    });

    axios2.get("/admin/api/orderdetail/" + props.orderId).then((data) => {
      setOrderDetail(data.data);
    });
  }, [props.orderId]);

  const update = (e) => {
    e.preventDefault();
  };
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          update(e);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-center w-100"
          >
            VIEW MOBILE DETAILS AND STATISTICS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {order && (
            <div id="order_details_dashboard" className="admin_model">
              <h4 className="text-center">
                {order.firstname} {order.lastname}
              </h4>

              <div className="model_information_dasboard">
                <h5>Order Information</h5>

                <p>
                  <p>Subtotal Price:</p>
                  <strong>{order.subtotal_price}$</strong>
                </p>
                <p>
                  <p>Total Price: </p>
                  <strong>{order.total_price}$</strong>
                </p>
                <p>
                  <p>Status </p>
                  <strong>{order.status}</strong>
                </p>
                <p>
                  <p>Created by: </p>
                  <strong>{order.created_by}</strong>
                </p>

                <p>
                  <p>Created at: </p>
                  <strong>{order.created_at}</strong>
                </p>
              </div>
              <div className="model_information_dasboard" id="list_of_products">
                <h5>Ordered list of items</h5>
                {orderDetail?.map((order) => (
                  <p>
                    <p>{order.product_name}:</p>
                    <strong> {order.quantity}</strong>
                  </p>
                ))}

                {/* <p>
                  <strong>Firstname: </strong>

                  <p>product.product_ram</p>
                </p>
                <p>
                  <strong>Lastname: </strong>
                  <p>product.product_ram</p>
                </p>
                <p>
                  <strong>Order Role : </strong>

                  <p>
                    {order.order_role_id == 1 ? "USER" : "ADMINISTRATOR"} :{" "}
                  </p>
                </p> */}
                {/* <p>
                  <strong>STATUS/EXPOSED</strong>
                  {page == 1 ? (
                    <p>
                      {product.product_status === "1" ? "1" : "0"} /{" "}
                      {product.exposed === "1" ? "1" : "0"}
                    </p>
                  ) : (
                    <p id="exposed_status">
                      <span>STATUS</span>
                      <input
                        defaultChecked={
                          product.product_status == 1 ? "checked" : ""
                        }
                        onChange={(e) => handleChange(e)}
                        value={product.product_status}
                        ref={(el) => (inputRef.current["product_status"] = el)}
                        type="checkbox"
                        name="product_status"
                      />

                      <span>EXPOSED</span>
                      <input
                        defaultChecked={product.exposed == 1 ? "checked" : ""}
                        onChange={(e) => handleChange(e)}
                        value={product.exposed}
                        name="exposed"
                        ref={(el) => (inputRef.current["exposed"] = el)}
                        type="checkbox"
                        name="exposed"
                      />
                    </p> */}
                {/* )}
                </p> */}
              </div>
            </div>
          )}
          {/* <div id="buttons_modal">
            {page == 1 && (
              <>
                <Button
                  className="bg-warning"
                  type="submit"
                  onClick={() => setPage(2)}
                >
                  EDIT
                </Button>
                <Button onClick={props.onHide}>CLOSE</Button>
                <Button variant="danger" type="submit">
                  DELETE
                </Button>
              </>
            )}
            {page == 2 && (
              <>
                <Button variant="success" type="submit">
                  UPDATE
                </Button>
                <Button variant="secondary" onClick={() => setPage(1)}>
                  BACK
                </Button>
              </>
            )}
          </div> */}
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>DETAILS</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>GET STATISTICS</Accordion.Header>
              <Accordion.Body>
                <div className="chartboxes">
                  <div className="chart-box">
                    <BarChart />
                  </div>
                  <div className="chart-box">
                    <LineChart />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>CLOSE</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default OrderDetailModel;
