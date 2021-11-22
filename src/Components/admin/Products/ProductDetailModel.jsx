import { Input } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Button, FloatingLabel, Form, Modal, Accordion } from "react-bootstrap";

import { axios2, preflight2 } from "../../../axios";
import BarChart from "./../../chart/BarChart";
import LineChart from "./../../chart/LineChart";
function ProductDetailModel(props) {
  const update = (e) => {
    e.preventDefault();
    console.log(product);
    axios2
      .post("/admin/api/product/" + product.product_id, {
        product: product,
      })
      .then((data) => {
        console.log(data.data);
        setPage(1);
      });
  };
  const showDeleteModel = () => {
    document.getElementById("delete_box").classList.add("delete_modal_open");
    document
      .getElementById("delete_box_modal")
      .classList.add("delete_modal_open");
    console.log("ovde");
  };
  const inputRef = useRef({});
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [formItems, setFormItems] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [product, setProduct] = useState(null);
  const [expStatus, setExpStatus] = useState(null);
  const handleChange = (e) => {
    if (e.target.name == "exposed" || e.target.name == "product_status") {
      setProduct((prevState) => ({
        ...prevState,

        [e.target.name]: e.target.value == "1" ? "0" : "1",
      }));
      return;
    }

    setProduct((prevState) => ({
      ...prevState,

      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    let componentMounted = true;
    axios2.get("/admin/api/product/" + props.product_id).then((data) => {
      if (componentMounted) {
        setProduct(data.data);

        inputRef.current["product_price"] = data.data.product_price;
        inputRef.current["product_ram"] = data.data.product_ram;
        inputRef.current["product_storage"] = data.data.product_storage;
        inputRef.current["quantity"] = data.data.quantity;
        inputRef.current["product_status"] = data.data.product_status;
        inputRef.current["exposed"] = data.data.exposed;
      }
    });
    return () => {
      componentMounted = false;
    };
  }, [props.product_id]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div id="delete_box_modal">
        <div
          id="delete_box"
          className="border border-warning rounded badge bg-secondary"
        >
          <p> Are you sure to delete this product?</p>
          <div>
            <button
              onClick={(e) => props.deleteProduct(e)}
              className="bg-danger bg-gradient text-white py-2 px-4 rounded"
            >
              YES, DELETE
            </button>
            <button
              className="bg-warning bg-gradient py-2 px-4 rounded"
              onClick={(e) => {
                e.target.parentElement.parentElement.classList.remove(
                  "delete_modal_open"
                );
                e.target.parentElement.parentElement.parentElement.classList.remove(
                  "delete_modal_open"
                );
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
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
          {product && (
            <div className="admin_model">
              <input type="hidden" value={product.product_id} />
              <h4 className="text-center">{product.product_name}</h4>

              <img
                src={`${process.env.REACT_APP_PUBLIC_IMAGE}${product.product_image}`}
                alt=""
              />
              <div className="model_information_dasboard">
                <h5>Product Information</h5>

                <p>
                  <strong>Price: </strong>{" "}
                  {page == 1 ? (
                    <p> {product.product_price}</p>
                  ) : (
                    <>
                      <Form.Control
                        ref={(el) => (inputRef.current["product_price"] = el)}
                        value={product.product_price}
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        min="1000.00"
                        onChange={(e) => handleChange(e)}
                        name="product_price"
                      />
                    </>
                  )}
                </p>
                <p>
                  {" "}
                  <strong>Storage: </strong>{" "}
                  {page == 1 ? (
                    <p>{product.product_storage}</p>
                  ) : (
                    <Form.Control
                      ref={(el) => (inputRef.current["product_storage"] = el)}
                      value={product.product_storage}
                      type="number"
                      placeholder="Price"
                      onChange={(e) => handleChange(e)}
                      name="product_storage"
                    />
                  )}
                </p>
                <p>
                  <strong>Ram: </strong>
                  {page == 1 ? (
                    <p>{product.product_ram}</p>
                  ) : (
                    <Form.Control
                      ref={(el) => (inputRef.current["product_ram"] = el)}
                      value={product.product_ram}
                      type="number"
                      placeholder="Ram"
                      onChange={(e) => handleChange(e)}
                      name="product_ram"
                    />
                  )}
                </p>
                <p>
                  <strong>Camera: </strong>
                  {page == 1 ? (
                    <p>{product.product_camera}</p>
                  ) : (
                    <select
                      onChange={(e) => handleChange(e)}
                      name="product_camera"
                      value={product.product_camera}
                      ref={(el) => (inputRef.current["product_camera"] = el)}
                      class="form-select"
                      aria-label=".form-select example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  )}
                </p>
                <p>
                  <strong>Quantity: </strong>
                  {page == 1 ? (
                    <p>{product.quantity}</p>
                  ) : (
                    <Form.Control
                      ref={(el) => (inputRef.current["quantity"] = el)}
                      value={product.quantity}
                      type="number"
                      min="1"
                      placeholder="Price"
                      onChange={(e) => handleChange(e)}
                      name="quantity"
                    />
                  )}
                </p>
                <p>
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
                    </p>
                  )}
                </p>
              </div>
            </div>
          )}
          <div id="buttons_modal">
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

                <Button
                  onClick={() => showDeleteModel()}
                  variant="danger"
                  type="submit"
                >
                  DELETE
                </Button>
              </>
            )}
            {page == 2 && (
              <>
                <Button
                  onClick={(e) => update(e)}
                  variant="success"
                  type="submit"
                >
                  UPDATE
                </Button>
                <Button variant="secondary" onClick={() => setPage(1)}>
                  BACK
                </Button>
              </>
            )}
          </div>
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
        <Modal.Footer></Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ProductDetailModel;
