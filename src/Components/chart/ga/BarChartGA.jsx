import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { report } from "../../admin/report";
function BarChartGa() {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  useEffect(() => {
    var result = report("ga:pageviews", "ga:country").then((data) => {
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
        borderColor: ["rgba(10,10,225,0.9)"],
        backgroundColor: ["rgba(10,10,225,0.9)"],
        pointBackgroundColor: ["rgba(10,10,225,0.9)"],
        pointBorderColor: ["rgba(10,10,225,0.9)"],
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
        text: "PageViews/Country",
      },
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />{" "}
    </div>
  );
}

export default BarChartGa;
