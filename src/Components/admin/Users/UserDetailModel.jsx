import { Input } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { Button, FloatingLabel, Form, Modal, Accordion } from "react-bootstrap";
import { axios2, preflight2 } from "../../../axios";
import BarChart from "./../../chart/BarChart";
import LineChart from "./../../chart/LineChart";
function UserDetailModel(props) {
  const inputRef = useRef({});
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [formItems, setFormItems] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(null);
  const [expStatus, setExpStatus] = useState(null);
  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,

      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    let componentMounted = true;
    axios2.get("/admin/api/users/" + props.userId).then((data) => {
      if (componentMounted) setUser(data.data);

      //   inputRef.current["product_price"] = data.data.product_price;
      //   inputRef.current["product_ram"] = data.data.ram;
      //   inputRef.current["product_storage"] = data.data.product_storage;
      //   inputRef.current["quantity"] = data.data.quantity;
      //   inputRef.current["product_status"] = data.data.product_status;
      //   inputRef.current["exposed"] = data.data.exposed;
    });
    return () => {
      componentMounted = false;
    };
  }, [props.userId]);
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
          {user && (
            <div className="admin_model">
              <h4 className="text-center">
                {user.firstname} {user.lastname}
              </h4>

              <img src="/img/avatar.png" alt="" />
              <div className="model_information_dasboard">
                <h5>User Information</h5>

                <p>
                  <strong>Email: </strong>{" "}
                  {page == 1 ? (
                    <p>{user.email_address}</p>
                  ) : (
                    <Form.Control
                      ref={(el) => (inputRef.current["email_address"] = el)}
                      value={user.email_address}
                      type="text"
                      placeholder="Email address"
                      onChange={(e) => handleChange(e)}
                      name="email_address"
                    />
                  )}
                </p>
                <p>
                  <strong>Firstname: </strong>
                  {page == 1 ? (
                    <p>{user.firstname}</p>
                  ) : (
                    <Form.Control
                      ref={(el) => (inputRef.current["firstname"] = el)}
                      value={user.firstname}
                      type="text"
                      placeholder="Firstname"
                      onChange={(e) => handleChange(e)}
                      name="firstname"
                    />
                  )}
                </p>
                <p>
                  <strong>Lastname: </strong>
                  {page == 1 ? (
                    <p>{user.lastname}</p>
                  ) : (
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      name="user_lastname"
                      placeholder="Lastname"
                      value={user.lastname}
                      ref={(el) => (inputRef.current["lastname"] = el)}
                      class="form-select"
                      aria-label=".form-select example"
                    />
                  )}
                </p>
                <p>
                  <strong>User Role:</strong>
                  {page == 1 ? (
                    <p>{user.user_role_id == 1 ? "USER" : "ADMINISTRATOR"}</p>
                  ) : (
                    <Form.Control
                      ref={(el) => (inputRef.current["user_role_id"] = el)}
                      value={user.user_role_id}
                      type="number"
                      min="1"
                      placeholder="Price"
                      onChange={(e) => handleChange(e)}
                      name="user_role_id"
                    />
                  )}
                </p>
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
        <Modal.Footer></Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UserDetailModel;
