import React, { useEffect, useState } from "react";
import { axios2 } from "./../../axios";
import LineChart from "../chart/LineChart";
import BarChart from "../chart/BarChart";
import DoughnutChart from "../chart/DoughnutChart";
import DashboardBox from "./DashboardBox";
import RadarChart from "../chart/RadarChart";
import Report from "./report";
import { renderButton, checkSignedIn } from "./../../utils";
import DoughnutChartGA from "../chart/ga/DoughnutChartGA";
import BarCharGa from "../chart/ga/BarChartGA";
import BarChartGa from "../chart/ga/BarChartGA";
import CurrentlyVisitors from "../chart/ga/CurrentlyVisitors";
import LocalData from "./LocalData";

function DashboardHome() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [productNames, setProductNames] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const updateSignin = (signedIn) => {
    //(3)
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };
  const init = () => {
    //(2)
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
  });
  useEffect(() => {
    axios2.get("/admin/dashboard/statistical/products").then((data) => {
      console.log(data);
      var arrProductNames = [];
      var arrProductQuantities = [];
      data.data.forEach((item) => {
        arrProductNames.push(item.product_name);
        arrProductQuantities.push(item.quantity);
      });
      setProductNames(arrProductNames);
      setQuantities(arrProductQuantities);
    });
  }, []);
  return (
    <>
      <section id="statistical_container">
        <div className="vertical_dashboard_boxes_rows">
          <DashboardBox name={"Number of transactions"} digit={345} />
          <LocalData />

          <div>
            {!isSignedIn ? (
              <div id="signin-button"></div>
            ) : (
              <CurrentlyVisitors />
            )}
          </div>

          {!isSignedIn ? (
            <div id="signin-button"></div>
          ) : (
            <div className="chart_google">
              <DoughnutChartGA />
            </div>
          )}
        </div>
        <section id="main_container">
          <div className="dashboard_boxes_rows">
            <DashboardBox name={"Number of transactions"} digit={345} />
            <DashboardBox name={"Income"} digit={5000554} isPrice={true} />
            <DashboardBox name={"Active Users"} digit={200} />
          </div>

          <div className="charts_container">
            <div className="chartboxes">
              <div className="chart-box">
                <div className="chart">
                  <LineChart />
                </div>
              </div>
              <div className="chart-box">
                <div className="chart">
                  <BarChart />
                </div>
              </div>
              <div className="chart-box">
                <div className="chart">
                  <RadarChart />
                </div>
              </div>
              <div className="chart-box">
                <div className="chart">
                  <DoughnutChart
                    product_names={productNames}
                    quantities={quantities}
                  />
                </div>
              </div>
              <div className="chart-box">
                <div className="chart">
                  {!isSignedIn ? (
                    <div id="signin-button"></div>
                  ) : (
                    <BarChartGa />
                  )}
                </div>
              </div>
              <div className="chart-box">
                <div className="chart">
                  <BarChart
                    product_names={productNames}
                    quantities={quantities}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default DashboardHome;
