import React from "react";
import { BaseLayout } from "../components/Layout";

const MainPage = () => {
  return (
    <BaseLayout>
      <div className="bg-black flex h-screen items-center justify-between px-28">
        <h1 className="flex-1 w-100 text-white text-6xl font-extrabold">
          <span className="bg-gradient-to-r text-transparent bg-clip-text from-cyan-500 to-pink-600">
            Powering the Next Generation ML Tasks <br />
          </span>
          Decentralized Distributed Labeling Platform
        </h1>
        <img src="./main.svg" alt="3d" className="flex-none" />
      </div>
    </BaseLayout>
  );
};

export default MainPage;
