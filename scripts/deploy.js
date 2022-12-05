// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { parseUnits } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const crowlToEth = 1e-3;

async function main() {
  const Storage = await hre.ethers.getContractFactory("Storage");
  const Token = await hre.ethers.getContractFactory("CrowdLabelToken");
  const Vendor = await hre.ethers.getContractFactory("Vendor");
  // const Label = await hre.ethers.getContractFactory("Label");

  const targetAccount = (await ethers.getSigners())[2];
  const token = await Token.deploy();
  await token.deployed();
  const vendor = await Vendor.deploy(token.address);
  vendor.deployed();
  const storage = await Storage.deploy(vendor.address);
  storage.deployed();
  await token.transfer(vendor.address, parseUnits("10000", 18));
  await vendor
    .connect(targetAccount)
    .buyTokens({ value: ethers.utils.parseEther("1") }); // buy 1 * 1e3 tokens

  // // add images
  const imageHash = ["i/1", "i/2", "i/3", "i/4", "i/5"];
  await storage.connect(targetAccount).store(imageHash);
  await storage.downloadDataset(imageHash);

  console.log(`token: "${token.address}",`);
  console.log(`vendor: "${vendor.address}",`);
  console.log(`storage: "${storage.address}"`);
  // console.log("Label deployed to:", label.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
