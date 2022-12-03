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

const ComponentLayout = ({ children }) => {
  return <div className="px-28">{children}</div>;
};

export { BaseLayout, ComponentLayout };
