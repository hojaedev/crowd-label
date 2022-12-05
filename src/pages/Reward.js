import React, { useEffect, useState } from "react";
import { BaseLayout, ComponentLayout } from "../components/Layout";
import { useContract } from "../contexts/ContractContext";
import { useAuth } from "../contexts/AuthContext";
import Swap from "../components/Swap";
import { formatCrowl } from "../utils/convert";
import { toast } from "react-toastify";

const CROWL_TO_ETH = 1e-3;

const RewardPage = () => {
  const { token, vendor } = useContract();
  const { signer } = useAuth();
  const [balance, setBalance] = useState(0);
  const [claimable, setClaimable] = useState(0);

  const init = async () => {
    setBalance(formatCrowl(await token.balanceOf(await signer.getAddress())));
    setClaimable(formatCrowl(await vendor.getClaimable()));
  };

  const getETH = amount => {
    return `${(amount * CROWL_TO_ETH).toLocaleString("en-US")} ETH`;
  };

  useEffect(() => {
    (async () => {
      init();
    })();
  }, []);

  const handleClaim = async () => {
    const claim = await vendor.claim();
    await claim.wait();
    init();
    toast.success("Claim successful");
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
                {claimable.toLocaleString("en-US")} CROWL
              </div>
              <div className="text-right text text-bold text-gray-500 flex-grow pt-4 pb-10">
                = {getETH(claimable)}
              </div>
              <button
                type="button"
                className="flex-end disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
                {...(claimable === 0 && { disabled: true })}
                onClick={handleClaim}
              >
                Claim
              </button>
            </div>
            <div className="w-1/3 h-fit flex flex-col mt-10 justify-between  bg-white rounded-md p-4">
              <h2 className="text-2xl font-bold">My Balance</h2>
              <div className="text-right text-2xl text-bold flex-grow pt-10">
                {balance.toLocaleString("en-US")} CROWL
              </div>
              <div className="text-right text text-bold text-gray-500 flex-grow pt-4 pb-10">
                = {getETH(balance)}
              </div>
            </div>
            <Swap init={init} />
          </div>
        </ComponentLayout>
      </div>
    </BaseLayout>
  );
};

export default RewardPage;
