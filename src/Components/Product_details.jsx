import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios, { axios2 } from "../axios";
import { AddToShoppingCard } from "./../App";
function Product_details() {
  const { id } = useParams();
  const addItem = useContext(AddToShoppingCard);
  const [product, setProduct] = useState({});
  useEffect(() => {
    let componentMounted = true;

    axios2.get("/api/product/" + id).then((data) => {
      if (componentMounted) setProduct(data.data);
      return () => {
        componentMounted = false;
      };
    });
  }, [id]);

  return (
    <div id="product_details">
      <div className="row">
        <div className="col-2">
          <p>BRAND: {product.product_brand}</p>
          <h2>{product.product_name}</h2>

          <img
            src={`${process.env.REACT_APP_PUBLIC_IMAGE}${product.product_image}`}
            alt=""
            width="150px"
          />
        </div>
        <div className="col-2">
          <p id="details_description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
            perferendis modi aliquam praesentium, iure, facilis vitae neque
            iusto suscipit nisi dolor, nobis fugiat molestiae harum ab ipsum
            architecto! Dolorum incidunt iste aperiam quo magnam provident quos
            in eius sint doloribus?
          </p>
          <table id="table_detail_product">
            <tr>
              <td>RAM</td>
              <td>{product.product_ram}GB</td>
            </tr>
            <tr>
              <td>STORAGE</td>
              <td>{product.product_storage}GB</td>
            </tr>
            <tr>
              <td>CAMERA</td>
              <td>{product.product_camera}MP</td>
            </tr>
          </table>

          <div id="details_footer">
            <h4>Price: {product.product_price}$</h4>
            <button
              className="addtocard"
              onClick={(e) => {
                addItem(e, { ...product, quantity: 1 });
              }}
            >
              ADD TO <i class="fas fa-cart-plus addto_icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Product_details);
