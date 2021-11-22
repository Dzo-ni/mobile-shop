import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { axios2 } from "../axios";
import Products from "./Products";
function RelatedProducts() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios2.get("/api/product/" + id + "/relatedFour").then((data) => {
      let arr = data.data;
      function shuffle(array) {
        let currentIndex = array.length,
          randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }

        return array;
      }
      shuffle(arr);
      setProducts(arr.slice(0, 4));
    });
  }, [id]);
  return (
    <div id="related_products">
      <h2>Related Products</h2>
      <Products products={products} />
    </div>
  );
}

export default RelatedProducts;
