import React from "react";
import { Bar } from "react-chartjs-2";
function BarChart() {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels: MONTHS.slice(0, 5),
    datasets: [
      {
        label: "Sales for 2021 (M) ",
        data: [3, 2, 2, 1, 5],
        borderColor: ["rgba(255,206,86,0.9)"],
        backgroundColor: ["rgba(255,206,86,0.9)"],
        pointBackgroundColor: ["rgba(255,206,86,0.9)"],
        pointBorderColor: ["rgba(255,206,86,0.9)"],
      },
      {
        label: "Sales for 2020 (M) ",
        data: [1, 3, 5, 1, 2],
        borderColor: ["rgba(54,162,235,0.9)"],
        backgroundColor: ["rgba(54,162,235,0.9)"],
        pointBackgroundColor: ["rgba(54,162,235,0.9)"],
        pointBorderColor: ["rgba(54,162,235,0.9)"],
      },
    ],
  };

  var options = {
    legend: {
      display: false,
    },
    scales: {
      y: {
        ticks: {
          min: 0,
          max: 5,
          ticks: {
            // forces step size to be 50 units
            stepSize: 1,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Sales compared to last year",
      },
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
