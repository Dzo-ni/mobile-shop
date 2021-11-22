import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AddToShoppingCard } from "../App";
import ReactGA from "react-ga";
function Product({ product }) {
  const history = useHistory();
  const addItem = useContext(AddToShoppingCard);

  const handle = () => {};
  // useEffect(() => {

  // }, [shoppingCard]);

  const getDetails = (e) => {
    e.preventDefault();
    let btn = e.target;

    if (e.target.classList.contains("show_more_icon")) {
      btn = e.target.parentElement;
    }
    const id =
      btn.parentElement.parentElement.parentElement.firstElementChild.value;
    window.scrollTo({ top: 0, behavior: "smooth" });
    ReactGA.event({
      category: "Button",
      action: "Click to product",
    });
    history.push("/product_details/" + id);
  };
  return (
    <div className="custom_card">
      <input className="itemId" type="hidden" value={product.product_id} />
      <div className="card__image">
        <img
          src={`${process.env.REACT_APP_PUBLIC_IMAGE}${product.product_thumbnail}`}
          alt=""
        />
      </div>

      <div className="card__content">
        <p>
          <span>Brand: </span> <span>{product.product_brand}</span>
        </p>
        <h3> {product.product_name}</h3>
        <p>
          <span>Price: </span> <span>{product.product_price}</span>
        </p>
        <p>
          <span>Camera: </span> <span>{product.product_camera}MP</span>
        </p>
        <p>
          <span>RAM: </span> <span>{product.product_ram} GB</span>
        </p>
        <p>
          <span>Storage: </span>
          <span>{product.product_storage} GB</span>
        </p>
      </div>

      <div class="card__info">
        {/* <p id="price_container">
          <span>Price: </span>
          <span className="price">{product.product_price}$</span>
        </p> */}
        <div className="buttons_product_container">
          <button
            className="add"
            onClick={(e) => {
              addItem(e, { ...product, quantity: 1 });
            }}
          >
            ADD <i class="fas fa-plus add_icon"></i>
          </button>
        </div>
        <div>
          <button onClick={getDetails} className="show_more">
            SHOW
            <i class="fas fa-eye show_more_icon"></i>
          </button>
        </div>
      </div>
      {/* <div className="show-details">
        <button
          className="add"
          onClick={(e) => {
            addItem(e, { ...product, quantity: 1 });
          }}
        >
          ADD
        </button>
        <button id="show_more" onClick={getDetails} className="show_more">
          SHOW MORE
        </button>
      </div> */}
    </div>
  );
}

export default Product;
