import React, { useState } from "react";

const BaseLayout = ({ children }) => {
  return <div className="bg-black">{children}</div>;
};

export default BaseLayout;
