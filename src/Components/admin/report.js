import React, { useState, useEffect } from "react";

export const report = async (expression, dimension) => {
  var response = await new Promise((resolve, reject) => {
    window.gapi.client
      .request({
        path: "/v4/reports:batchGet",
        root: "https://analyticsreporting.googleapis.com",
        method: "POST",
        body: {
          reportRequests: [
            {
              viewId: process.env.REACT_APP_GOOGLE_VIEW_ID, //enter your view ID here
              dateRanges: [
                {
                  startDate: "2021-10-01",
                  endDate: "2021-11-01",
                },
              ],
              metrics: [
                {
                  expression: expression,
                },
              ],
              dimensions: [
                {
                  name: dimension,
                },
              ],
            },
          ],
        },
      })
      .then((data) => {
        var x = [];
        var y = [];
        data.result.reports[0].data.rows.forEach((element) => {
          x.push(element.dimensions[0]);
          y.push(element.metrics[0].values[0]);
        });
        console.log(x);
        console.log(y);

        resolve([x, y]);
      });
  });
  return response;
};
