// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Storage = await hre.ethers.getContractFactory("Storage");
  // const Token = await hre.ethers.getContractFactory("CrowdLabelToken");
  // const Label = await hre.ethers.getContractFactory("Label");
  const storage = await Storage.deploy();
  await storage.deployed();
  // const token = await Token.deploy();
  // await token.deployed();
  // const label = await Label.deploy(storage.address);
  // await label.deployed();

  console.log("Storage deployed to:", storage.address);
  // console.log("Token deployed to:", token.address);
  // console.log("Label deployed to:", label.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
