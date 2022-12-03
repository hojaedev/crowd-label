import React, { useState } from "react";
import {BaseLayout} from "../components/Layout";
import { ethers } from "ethers";

const MainPage = () => {
  return (
    <BaseLayout>
      <div className="bg-black flex h-screen items-center justify-between px-28">
        <h1 className="flex-1 w-100 text-white text-5xl font-extrabold">
          Powering the Next Generation ML Tasks: Decentralized Distributed
          Labeling Platform
        </h1>
        <img src="./main.svg" alt="3d" className="flex-none" />
      </div>
    </BaseLayout>
  );
};

export default MainPage;
