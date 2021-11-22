import React from "react";
import { Radar } from "react-chartjs-2";
function RadarChart() {
  const data = {
    labels: [
      "Services",
      "Complain",
      "Pleasure",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "Last month Dataset",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "This month Dataset",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  const config = {
    plugins: {
      title: {
        display: true,
        text: "Make UX great again",
      },
    },
    type: "radar",
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  };

  //   var options = {
  //     legend: {
  //       display: false,
  //     },
  //     scales: {
  //       yAxes: [
  //         {
  //           ticks: {
  //             min: 0,
  //             max: 5,
  //             ticks: {
  //               // forces step size to be 50 units
  //               stepSize: 50,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     title: {
  //       display: true,
  //       text: "Bar chart",
  //     },
  //   };
  return (
    <div>
      <Radar data={data} options={config} />
    </div>
  );
}

export default RadarChart;
