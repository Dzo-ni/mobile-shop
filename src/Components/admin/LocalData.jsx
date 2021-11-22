import React, { useEffect, useState } from "react";
import { axios2 } from "../../axios";
import DashboardBox from "./DashboardBox";

function LocalData() {
  const [digit, setDigit] = useState(0);
  useEffect(() => {
    axios2.get("/api/order/total_price").then((data) => {
      setDigit(data.data);
    });
  }, []);
  return (
    <>
      <DashboardBox name={"Income"} digit={digit} isPrice={true} />
    </>
  );
}

export default LocalData;
