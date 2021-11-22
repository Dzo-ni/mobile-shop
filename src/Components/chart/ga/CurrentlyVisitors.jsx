import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DashboardBox from "../../admin/DashboardBox";
import { report } from "../../admin/report";
function CurrentlyVisitors() {
  const [numberOfUsers, setNumberOfUsers] = useState([]);

  useEffect(() => {
    var result = report("ga:users", "ga:date").then((data) => {
      setNumberOfUsers(data[1]);
    });
  }, []);

  return (
    <>
      <DashboardBox
        name={"Active Users"}
        digit={numberOfUsers[0] ?? 0}
        parameter="visitors source google"
      />
    </>
  );
}

export default CurrentlyVisitors;
