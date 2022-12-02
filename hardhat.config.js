// require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    sources: "./contracts/contract",
    tests: "./contracts/test",
    cache: "./contracts/cache",
    artifacts: "./contracts/artifacts",
  },
  hardhat: {
    chainId: 1337,
  },
  ganache: {
    url: "http://127.0.0.1:8545",
    accounts: [
      `7bc522e9ba27f118ad4157771bec290f59ffffe45ee66bb81f137043150bd2`,
    ],
  },
};
