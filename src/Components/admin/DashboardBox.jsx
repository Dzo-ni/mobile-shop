import React from "react";

function DashboardBox({
  name,
  digit,
  parameter = "vs Previous Month",
  isPrice = false,
}) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="dashboard_box">
      <div>
        {" "}
        <p>{name}</p>
        <p>
          {numberWithCommas(digit)}
          {isPrice && "$"}
        </p>{" "}
        <p>{parameter}</p>{" "}
      </div>
    </div>
  );
}

export default DashboardBox;
