import { ethers } from "ethers";
export const formatCrowl = v => {
  return parseFloat(ethers.utils.formatUnits(v));
};

export const formatEth = v => {
  // defaults to eth conversion
  return parseFloat(ethers.utils.formatUnits(v));
};
