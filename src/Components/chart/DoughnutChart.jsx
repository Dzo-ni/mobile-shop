import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
function DoughnutChart({ product_names, quantities }) {
  const data = {
    labels: product_names.slice(0, 5),
    datasets: [
      {
        label: "Sales for 2021 (M) ",
        data: quantities.slice(0, 5),

        backgroundColor: [
          "rgba(255,206,86,0.9)",
          "rgba(142,206,86,0.9)",
          "rgba(255,155,86,0.9)",
          "rgba(200,200,86,0.9)",
          "rgba(25,100,86,0.9)",
        ],
      },
    ],
  };
  var options = {
    legend: {
      display: false,
    },

    plugins: {
      title: {
        display: true,
        text: "5 most sales mobile so far with numbers",
      },
    },
  };
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DoughnutChart;
