import React, { useState } from "react";
import Product from "./Product";
import "./Products.css";

function Products({ products, name, page = false, itemsPerPage = 4 }) {
  if (page)
    var products = products.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
  return (
    <div className="products">
      <div className="custom_cards">
        {products?.length > 0 ? (
          products?.map((product) => (
            <Product key={product.product_id} product={product} />
          ))
        ) : (
          <div id="msg_doesnt_match">
            Product with provided filters doesnt exists
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Products);
