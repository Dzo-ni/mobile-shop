import React, { useEffect } from "react";
import { axios2 } from "../axios";

function UserInformation() {
  useEffect(() => {
    axios2.get();
  }, []);
  return <div></div>;
}

export default UserInformation;
