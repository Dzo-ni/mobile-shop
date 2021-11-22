import React, { useState, useEffect } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { preflight2 } from "../../../axios";
import { useHistory } from "react-router-dom";
function CreateNewProduct(props) {
  const [data, setData] = useState({});
  const [formItems, setFormItems] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

    console.log(data);
  };
  useEffect(() => {
    setFormItems(Object.keys(data).length);
    console.log(Object.keys(data).length);
  }, [data]);
  const save = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target); //formdata object
    console.log("sacuvaj");
    console.log(data);

    preflight2
      .post("/admin/product", formData, {
        "content-type": "multipart/form-data",
      })
      .then((data) => {
        console.log(data);
        if (data.data.status) {
          console.log(data.data.msg);
          console.log(e.target.lastElementChild.lastElementChild.click());
          props.setProducts([...props.products, data.data.product]);
        }
      });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          save(e);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-center w-100"
          >
            CREATE NEW MOBILE TELEPHONE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="text-center">INSERT MOBILE DATA</h4>
          <div id="msg_error">{errorMsg}</div>
          <FloatingLabel
            controlId="floatingInput"
            label="Product Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="product_name"
              placeholder="Product Name"
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel
            name="product_price"
            className="mt-4"
            controlId="product_price"
            label="Price"
          >
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Price"
              min="1000.00"
              onChange={(e) => handleChange(e)}
              name="product_price"
            />
          </FloatingLabel>

          <FloatingLabel className="mt-4" controlId="Quantity" label="Quantity">
            <Form.Control
              type="number"
              placeholder="Quantity"
              min="1"
              name="quantity"
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Product Brand"
            className="mb-3 mt-3"
          >
            <Form.Control
              type="text"
              name="product_brand"
              placeholder="Product Brand"
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Select
              name="product_storage"
              onChange={(e) => handleChange(e)}
              aria-label="Default select example"
            >
              <option>Select product storage in GB</option>
              <option value="1">16</option>
              <option value="2">32</option>
              <option value="3">64</option>
              <option value="3">128</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Select
              name="product_ram"
              onChange={(e) => handleChange(e)}
              aria-label="Default select example"
            >
              <option>Select product ram in GB</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">4</option>
              <option value="3">6</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Select
              name="product_camera"
              onChange={(e) => handleChange(e)}
              aria-label="Default select example"
            >
              <option>Select product camera in GB</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">4</option>
              <option value="3">6</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-31">
            <Form.Label>Upload mobile image</Form.Label>
            <Form.Control
              onChange={(e) => {
                if (e.target?.files[0]) {
                  var allowedExtensions = ["image/jpeg", "image/png"];
                  var img_type = e.target?.files[0].type;
                  if (!allowedExtensions.includes(img_type)) {
                    console.log("File doesnt allowed.Only pictures");
                    setIsValid(false);
                    setErrorMsg("File doesnt allowed.Only pictures");
                    return;
                  }
                  if (!(e.target?.files[0].size / Math.pow(1024, 2) < 2)) {
                    console.log("file is > 2MB");
                    setErrorMsg("file must be lower then 2MB");
                    setIsValid(false);
                    return;
                  }
                  console.log(e.target?.files[0].size / Math.pow(1024, 2));
                  console.log(e.target?.files[0]);
                  setIsValid(true);
                  setErrorMsg("");
                  setData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }));
                }
              }}
              type="file"
              name="product_image"
              className={!isValid ? "errorInput" : ""}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!(isValid && formItems == 8) ? "disabled" : ""}
            className="bg-success"
            type="submit"
          >
            Save
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateNewProduct;
