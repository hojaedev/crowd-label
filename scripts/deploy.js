// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { parseUnits } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const Storage = await hre.ethers.getContractFactory("Storage");
  const Token = await hre.ethers.getContractFactory("CrowdLabelToken");
  const Vendor = await hre.ethers.getContractFactory("Vendor");
  const Label = await hre.ethers.getContractFactory("Label");
  const signers = await ethers.getSigners();
  const targetAccount = signers[2];
  const otherSigners = [
    signers[3],
    signers[4],
    signers[5],
    signers[6],
    signers[7],
  ];
  const token = await Token.deploy();
  await token.deployed();
  const vendor = await Vendor.deploy(token.address);
  vendor.deployed();
  const storage = await Storage.deploy(vendor.address);
  storage.deployed();
  const label = await Label.deploy(storage.address, vendor.address);
  label.deployed();
  await token.transfer(vendor.address, parseUnits("10000", 18));
  await vendor
    .connect(targetAccount)
    .buyTokens({ value: ethers.utils.parseEther("1") }); // buy 1 * 1e3 tokens

  // // add images
  const imageHash = [
    "QmXrR3iJnBvT1BWskK7tt2H2BxWckMV1b2G7DFyiMBiq6y",
    "QmSFt7LH1xnzyeYA9WbVTCoVYQKBMr1VpHbU5G5pypRNz2",
    "QmcLqsyaofhU37bZTwtMSW3bmX23xvBFr8L8gmyPJcBPJ9",
    "QmXSatudJks9G7TXK4LCty9AmyafKUqnzGSGtSusx47Rju",
    "QmUHWsZyUAk8ceLyeWxU8Uvpueyfx4jpMRRnEjrvHaCbG6",
    "QmUsPSEq8NPTqJuHrDwKzdkaiWQUaKyBZ4oAVZqGt4YoED",
    "Qmd5hNkyzy2RJw6BSZUBtFrqBvqs1qJGP6H6ugtXaTUuM4",
    "QmXNSbLjb2zcBX76E1oBBM7Y1KrRmR1f1iwKXRhSuoedCj",
    "QmPNiHgiqDe7HrCHdq6mwd2k2FgYxhaCRhUk6fSrZ23eXw",
    "QmT8nuXRDiNvbGVPwRVGxr5o6KZTXFFF6Acs86VtPNXKaQ",
    "QmWthUzu95EjmtYHTfGjWW1CCd71zAVwVe3Bpk16URGmEt",
  ];
  // upload image
  await storage.connect(targetAccount).store(imageHash);

  imageHash.map(async (h, i) => {
    if (i % 3 === 0) return;
    await label.connect(otherSigners[0]).addLabel(h, 100, 100, 200, 200);
    await label.connect(otherSigners[1]).addLabel(h, 100, 100, 200, 200);
    for (let i = 2; i < 5; i++) {
      await label
        .connect(otherSigners[i])
        .addLabel(h, 100 + i * 5, 100 + i * 5, 200 + i * 5, 200 + i * 5);
    }
  });

  // set labels

  await storage.buyDataset(imageHash);
  console.log(`token: "${token.address}",`);
  console.log(`vendor: "${vendor.address}",`);
  console.log(`storage: "${storage.address}",`);
  console.log(`label: "${label.address}"`);
  // console.log("Label deployed to:", label.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
