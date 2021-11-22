import React from "react";
import { Line } from "react-chartjs-2";
function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales for 2021 (M) ",
        data: [3, 2, 2, 1, 5],
        borderColor: ["rgba(255,206,86,0.2)"],
        backgroundColor: ["rgba(255,206,86,0.2)"],
        pointBackgroundColor: ["rgba(255,206,86,0.2)"],
        pointBorderColor: ["rgba(255,206,86,0.2)"],
      },
      {
        label: "Sales for 2020 (M) ",
        data: [1, 3, 5, 1, 2],
        borderColor: ["rgba(54,162,235,0.2)"],
        backgroundColor: ["rgba(54,162,235,0.2)"],
        pointBackgroundColor: ["rgba(54,162,235,0.2)"],
        pointBorderColor: ["rgba(54,162,235,0.2)"],
      },
    ],
  };
  var options = {
    title: {
      display: true,
      text: "Line chart",
    },
    scales: {
      y: {
        min: 1,
        max: 10,
        ticks: {
          // forces step size to be 50 units
          stepSize: 1,
        },
      },
    },
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
