import React, { useState } from "react";
import Header from "./Header";

const BaseLayout = ({ children }) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default BaseLayout;
