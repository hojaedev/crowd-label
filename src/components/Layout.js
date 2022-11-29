import React, { useState } from "react";
import Header from "./Header";

const BaseLayout = ({ children }) => {
  return (
    <div className="bg-black">
      <Header />
      {children}
    </div>
  );
};

export default BaseLayout;
