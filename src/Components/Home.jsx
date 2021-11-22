import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import Products from "./Products";
import $ from "jquery";
function Home() {
  const [products, setProducts] = useState([]);
  const [original, setOriginal] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(false);
  function sortProducts(orderBy, orderASC) {
    if (orderBy === "product_name") {
      if (orderASC === "asc") {
        var my_products = [...products].sort((a, b) =>
          a[orderBy].localeCompare(b[orderBy])
        );
      } else {
        var my_products = [...products].sort((a, b) =>
          b[orderBy].localeCompare(a[orderBy])
        );
      }
    } else if (orderBy === "product_price") {
      if (orderASC === "asc") {
        var my_products = [...products].sort(
          (a, b) => parseFloat(a[orderBy]) - parseFloat(b[orderBy])
        );
      } else {
        var my_products = [...products].sort(
          (a, b) => parseFloat(b[orderBy]) - parseFloat(a[orderBy])
        );
      }
    }
    setProducts(my_products);
  }

  useEffect(() => {
    setProducts(
      original?.filter((product) =>
        product.product_name.toLowerCase().includes(name.toLowerCase())
      )
    );
  }, [original, page]);

  useEffect(() => {
    setProducts(
      original?.filter((product) =>
        product.product_name.toLowerCase().includes(name.toLowerCase())
      )
    );
  }, [name]);
  // useEffect(() => {
  //   setProducts(sortedArr);
  // }, [sortedArr]);
  const handleProducts = (data) => {
    setOriginal(data);
  };
  const handleProducts2 = (e) => {
    setName(e.target.value.trim());
  };
  const scrollToBegin = () => {
    $("html, body").animate({ scrollTop: $("main").offset().top }, 1000);
  };
  const changeSelect = (e) => {
    let orderBy = "product_name";
    let orderASC = "asc";
    if (e.target.value != "-1") {
      switch (e.target.value) {
        case "1":
          orderBy = "product_name";
          orderASC = "asc";
          break;
        case "2":
          orderBy = "product_name";
          orderASC = "desc";
          break;
        case "3":
          orderBy = "product_price";
          orderASC = "asc";
          break;
        case "4":
          orderBy = "product_price";
          orderASC = "desc";
          break;
        default:
          break;
      }
      sortProducts(orderBy, orderASC);
    }
  };
  return (
    <>
      <Aside
        handleProducts={handleProducts}
        filter={filter}
        setPage={setPage}
      />
      <main>
        <form id="searching">
          <span id="filter_on_mobile" onClick={() => setFilter(!filter)}>
            <img
              src="https://icon-library.com/images/icon-filter/icon-filter-5.jpg"
              width="50px"
              id="filter_icon"
              alt=""
            />
          </span>
          <input
            id="search"
            type="text"
            name="search"
            autoComplete="off"
            placeholder="&#61442; Search products..."
            onChange={handleProducts2}
          />
          <select name="order_by" id="order_by" onChange={changeSelect}>
            <option value="-1">Order products by...</option>
            <option value="1">Name asceding</option>
            <option value="2">Name descending</option>
            <option value="3">Price ascending</option>
            <option value="4">Price descending</option>
          </select>
          <select
            name="per_page"
            id="per_page"
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option disabled value="-1">
              Show per page...
            </option>
            <option value="12">12 products per page</option>
            <option value="25">25 products per page</option>
            <option value="50">50 products per page</option>
          </select>
        </form>
        <div id="results_text">
          {" "}
          Currently view{" "}
          {products.length == 0 ? 0 : itemsPerPage * (page - 1) + 1}
          {/* {products.length < itemsPerPage
            ? products.length
            : page === Math.ceil(products.length / itemsPerPage) &&
              products.length % itemsPerPage !== 0
            ? products.length % itemsPerPage
            : itemsPerPage}{" "} */}
          -{/*3  34 < 12 */}
          {products.length < itemsPerPage
            ? products.length
            : page === Math.ceil(products.length / itemsPerPage) &&
              products.length % itemsPerPage !== 0
            ? products.length
            : page * itemsPerPage}
          / {products.length} products from results
        </div>
        <Products
          products={products}
          name={name}
          page={page}
          itemsPerPage={itemsPerPage}
        />
        {products.length > 0 && (
          <div
            id="pagination"
            style={
              page === Math.ceil(products.length / itemsPerPage)
                ? { position: "relative", left: "20px" }
                : null
            }
          >
            <>
              {" "}
              <button
                disabled={page === 1 ? "disabled" : ""}
                className={`pagination_btn ${page === 1 && "disabled"}`}
                onClick={() => {
                  scrollToBegin();
                  setPage(1);
                }}
              >
                &lt; &lt; &lt;
              </button>
              <button
                disabled={page === 1 ? "disabled" : ""}
                className={`pagination_btn ${page === 1 && "disabled"}`}
                onClick={() => {
                  scrollToBegin();
                  setPage((prevPage) => prevPage - 1);
                }}
              >
                &lt;
              </button>
            </>

            <button className="pagination_btn">Page {page}</button>

            <button
              disabled={
                products.length === 0 ||
                page === Math.ceil(products.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }
              className={`pagination_btn ${
                page ===
                  Math.ceil(
                    products.length / itemsPerPage || products.length === 0
                  ) && "disabled"
              }`}
              onClick={() => {
                scrollToBegin();
                setPage((prevPage) => prevPage + 1);
              }}
            >
              &gt;
            </button>
            <button
              disabled={
                products.length === 0 ||
                page === Math.ceil(products.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }
              className={`pagination_btn ${
                page ===
                  Math.ceil(
                    products.length / itemsPerPage || products.length === 0
                  ) && "disabled"
              }`}
              onClick={() => {
                scrollToBegin();
                setPage(Math.ceil(products.length / itemsPerPage));
              }}
            >
              &gt; &gt; &gt;
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
