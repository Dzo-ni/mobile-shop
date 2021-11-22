import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { report } from "./../../admin/report";
function DoughnutChartGA() {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  useEffect(() => {
    var result = report("ga:users", "ga:browser").then((data) => {
      setXData(data[0]);
      setYData(data[1]);
    });
  }, []);
  const data = {
    labels: xData,
    datasets: [
      {
        label: "Sales for 2021 (M) ",
        data: yData,

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
        text: "Browsers/Users",
      },
    },
  };
  return (
    <div>
      <Doughnut data={data} options={options} />{" "}
    </div>
  );
}

export default DoughnutChartGA;
