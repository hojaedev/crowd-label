import React, { useEffect, useState } from "react";
import { BaseLayout, ComponentLayout } from "../components/Layout";
import { useContract } from "../contexts/ContractContext";
import { useAuth } from "../contexts/AuthContext";

const CROWL_TO_USD = 1e-9;

const RewardPage = () => {
  const { token } = useContract();
  const { signer } = useAuth();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    (async () => {
      const hexBalance = (await token.balanceOf(await signer.getAddress()))
        ._hex;
      setBalance(parseInt(hexBalance));
    })();
  }, [token, signer]);

  const getUSD = amount => {
    return `$${(balance * CROWL_TO_USD).toLocaleString("en-US")}`;
  };

  return (
    <BaseLayout>
      <div className="bg-black">
        <ComponentLayout>
          <h1 className="text-3xl font-extrabold pt-10 text-white">Rewards</h1>
          <div className="bg-black flex h-screen space-x-5">
            <div className="w-1/3 h-fit flex flex-col mt-10 justify-between  bg-white rounded-md p-4">
              <h2 className="text-2xl font-bold">Claimable Reward</h2>
              <div className="text-right text-2xl text-bold flex-grow pt-10">
                {balance.toLocaleString("en-US")} CROWL
              </div>
              <div className="text-right text text-bold text-gray-500 flex-grow pt-4 pb-10">
                = {getUSD(balance)}
              </div>
              <button
                type="button"
                className="flex-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
              >
                Claim
              </button>
            </div>
            <div className="w-1/3 h-fit flex flex-col mt-10 justify-between  bg-white rounded-md p-4">
              <h2 className="text-2xl font-bold">Swap</h2>
              <div className="text-right text-2xl text-bold flex-grow pt-10">
                {balance.toLocaleString("en-US")} CROWL
              </div>
              <div className="text-right text text-bold text-gray-500 flex-grow pt-4 pb-10">
                = {getUSD(balance)}
              </div>
              <button
                type="button"
                className="flex-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
              >
                Claim
              </button>
            </div>
          </div>
        </ComponentLayout>
      </div>
    </BaseLayout>
  );
};

export default RewardPage;
