import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";

const BaseLayout = ({ children }) => {
  const { handleLogin } = useAuth();
  useEffect(() => {
    if (window.location.pathname === "/") return;
    handleLogin();
  }, []);
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
