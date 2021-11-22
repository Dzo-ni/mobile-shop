import React from "react";

function Filter({ title, filter_data, filters }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {filters?.map((filter, index) => {
          const filter_name = `product_${title}`;
          return (
            <li key={index}>
              <input
                className={`common_filter ${title}`}
                value={filter}
                id={filter}
                type="checkbox"
                onClick={() => {
                  filter_data();
                }}
              />
              <label htmlFor={filter}>
                {filter}
                {title === "brand" ? "" : "GB"}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Filter;
