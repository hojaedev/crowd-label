import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useContract } from "../contexts/ContractContext";
import { formatEth, formatCrowl } from "../utils/convert";
import { toast } from "react-toastify";
import config from "../config";
import { parseUnits } from "ethers/lib/utils";
const Swap = ({ init }) => {
  const [src, setSrc] = useState(0);
  const [eth, setEth] = useState(0);
  const [crowl, setCrowl] = useState(0);
  const [mode, setMode] = useState(0);
  const labels = ["ETH", "CROWL"];
  const { token, vendor } = useContract();
  const { signer } = useAuth();
  const scaler = () => {
    return mode === 0 ? 1e3 : 1e-3;
  };

  useEffect(() => {
    signer.getBalance().then(x => {
      setEth(formatEth(x));
    });
    token.balanceOf(signer.getAddress()).then(x => {
      setCrowl(formatCrowl(x));
    });
    if (mode === 0) {
      setSrc(eth);
    } else {
      setSrc(crowl);
    }
  }, [mode, crowl, signer, token, eth]);

  const handleSwap = async () => {
    if (mode === 0) {
      await token.increaseAllowance(
        config.contractAddress.token,
        ethers.utils.parseEther("100000"),
      );
      const buy = await vendor.buyTokens({
        value: ethers.utils.parseEther(src.toString()),
      });
      await buy.wait();
    } else {
      const intSrc = parseInt(src);
      await token.approve(
        config.contractAddress.vendor,
        parseUnits(intSrc.toString(), 21),
      );
      const sell = await vendor.sellTokens(parseUnits(intSrc.toString(), 18));
      await sell.wait();
    }
    toast.success("Swap successful");
    init();
    setEth(0);
  };

  const getLabel = pad => {
    return labels[(mode + pad) % 2];
  };
  const handleInput = e => {
    setSrc(Math.max(0, Math.min(e.target.value, getMax())));
  };
  const getMax = () => {
    return mode === 0 ? Number(eth) : Number(crowl);
  };

  return (
    <div className="bg-white flex flex-col w-1/3 h-fit mt-10 justify-betwee rounded-md p-4 space-y-2">
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-2xl font-bold ">Swap</h2>
        <div
          className="rounded-xl border-black border-2 px-3 py-1"
          onClick={() => setMode((mode + 1) % 2)}
        >
          Switch
        </div>
      </div>
      <div className="w-full rounded-md text-lg border-2 p-3 border-black">
        <h1>From</h1>
        <div className="flex text-xl">
          <input
            className="h-5 w-full decoration-none mr-4 focus:outline-none text-right"
            type="number"
            onChange={handleInput}
            max={getMax()}
            min={0}
            value={src}
          />
          <h3 className="w-32">{getLabel(0)}</h3>
        </div>
      </div>
      <div className="w-full rounded-md text-lg border-2  p-3  border-black">
        <h1>To</h1>
        <div className="flex text-xl">
          <input
            className="h-5 w-full decoration-none mr-4 focus:outline-none text-right"
            type="number"
            disabled={true}
            value={src * scaler()}
          />
          <h3 className="w-32">{getLabel(1)}</h3>
        </div>
      </div>
      <button
        type="button"
        className="flex-end disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
        onClick={handleSwap}
      >
        Swap
      </button>
    </div>
  );
};

export default Swap;
