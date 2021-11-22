import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import CreateNewProduct from "./CreateNewProduct";
import { axios2 } from "./../../../axios";
import $ from "jquery";
import ProductDetailModel from "./ProductDetailModel";
import "react-toastify/dist/ReactToastify.css";
function Products() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(1);
  const [modalCreateNewShow, setModalCreateNewShow] = React.useState(false);
  const [modalProductShow, setModalProductShow] = React.useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    let componentMounted = true;
    axios2.get("/admin/api/products").then((data) => {
      if (componentMounted) setProducts(data.data);
    });
    return () => {
      componentMounted = false;
    };
  }, []);
  const deleteProduct = (e) => {
    const id =
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "product_id"
      );
    console.log(products);

    axios2.get("/admin/api/product/delete/" + id).then((data) => {
      console.log(data.data);
      if (data.data == 1) {
        setModalProductShow(false);
        setProducts(
          [...products].filter((product) => {
            return product.product_id != productId;
          })
        );
      }
    });
    document.querySelector(".success_deleted_modal").classList.add("show");
  };
  return (
    <div id="product_dashboard">
      <div class="success_deleted_modal">
        <p>Succesfull deleted product</p>
        <button
          onClick={(e) => {
            console.log(e.target.parentElement);
            e.target.parentElement.style.display = "none";
            if (productId == 0) return;
          }}
          className="m-2 p-2 bg-success bg-gradient text-light"
        >
          OK
        </button>
      </div>
      <CreateNewProduct
        show={modalCreateNewShow}
        onHide={() => setModalCreateNewShow(false)}
        products={products}
        setProducts={setProducts}
      />

      <ProductDetailModel
        show={modalProductShow}
        product_id={productId}
        onHide={() => setModalProductShow(false)}
        deleteProduct={deleteProduct}
      />
      <h2>PRODUCTS</h2>
      <Button
        variant="primary"
        onClick={() => setModalCreateNewShow(true)}
        className="create_new_btn"
      >
        CREATE NEW PRODUCT
      </Button>

      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantities</th>

          <th>Created at</th>
          <th>Status</th>
          <th>Exposed</th>
          <th>ACTIONS</th>
        </tr>

        {products.slice((page - 1) * 10, 10 * page)?.map((product) => (
          <tr key={product.product_id}>
            <td>{product.product_name}</td>
            <td>{product.product_price}</td>
            <td>{product.quantity}</td>
            <td>{product.created_at}</td>
            <td>{product.product_status}</td>
            <td>{product.exposed}</td>
            <td>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  id={product.product_id}
                  style={{ display: "inlineBlock", marginTop: "15px" }}
                  variant="info"
                  onClick={(e) => {
                    setModalProductShow(true);
                    setProductId(e.target.id);
                    console.log(e.target.id);
                  }}
                  className="create_new_btn"
                >
                  SHOW
                </Button>
              </div>
              {/* <button>UPDATE</button>
              <button>DELETE</button> */}
            </td>
          </tr>
        ))}
      </table>

      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination" style={{ justifyContent: "center" }}>
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li
            className={`page-item ${page == 1 ? "active" : ""}`}
            ariaCurrent={page == 1 ? "page" : ""}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setPage(1);
              }}
            >
              1
            </a>
          </li>
          <li
            className={`page-item ${page == 2 ? "active" : ""}`}
            ariaCurrent={page == 2 ? "page" : ""}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setPage(2);
              }}
            >
              2
            </a>
          </li>
          <li
            className={`page-item ${page == 3 ? "active" : ""}`}
            ariaCurrent={page == 3 ? "page" : ""}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setPage(3);
              }}
            >
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Products;
