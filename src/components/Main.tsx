import React, { useEffect, useState } from "react";

import MainSign from "./MainSign";
import MainMenu from "./customers/MainMenu";

const Main: React.FC<any> = () => {
  //-- check if authenticated
  const isAuth =
    (window.localStorage.getItem("userName") &&
      window.localStorage.getItem("accessToken")) !== null;

  return <div>{!isAuth ? <MainSign /> : <MainMenu />}</div>;
};

export default Main;
