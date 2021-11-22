import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import $ from "jquery";
import { axios2, preflight2 } from "../axios";
import SliderUI from "./Slider";
function Aside({ handleProducts, filter, setPage }) {
  const [filters, setFilters] = useState([]);
  const [minimum_price, setMinimumPrice] = useState(1000);
  const [maximum_price, setMaximumPrice] = useState(65000);
  useEffect(() => {
    let componentMounted = true;
    axios2.get("/api/filters").then((res) => {
      if (componentMounted) setFilters(res.data);
    });

    if (componentMounted) filter_data();
    return () => {
      componentMounted = false;
    };
  }, []);

  function get_filter(class_name) {
    var filter = [];
    $("." + class_name + ":checked").each(function () {
      filter.push($(this).val());
    });

    return filter;
  }
  function filter_data() {
    $(".filter-data").html(
      '<div id="loading" style="text-align:center;"><img src="assets/img/loading.gif"></div>'
    );
    var action = "fetch_data";

    var brand = get_filter("brand");
    var ram = get_filter("ram");
    var storage = get_filter("storage");

    preflight2
      .post("/api/products", {
        action: action,
        brand: brand,
        ram: ram,
        storage: storage,
        minimum_price: minimum_price,
        maximum_price: maximum_price,
      })
      .then((data) => {
        // $('.filter-data').html(data)

        setPage(1);
        handleProducts(data.data);
      });
  }

  const handleValues = (values) => {
    setMinimumPrice(values[0]);
    setMaximumPrice(values[1]);
    filter_data();
  };

  return (
    <aside className={filter ? "show_filter" : ""}>
      <SliderUI handleValues={handleValues} />
      <div id="filters_ul_links">
        <Filter
          title="brand"
          filter_data={filter_data}
          filters={filters["brands"]}
        />
        <Filter
          title="ram"
          filter_data={filter_data}
          filters={filters["rams"]}
        />
        <Filter
          title="storage"
          filter_data={filter_data}
          filters={filters["storages"]}
        />
      </div>
    </aside>
  );
}

export default React.memo(Aside);
