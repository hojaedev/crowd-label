const config = {
  ipfs: {
    defaultGateway: "http://localhost:8080/ipfs",
    apiRoute: "http://localhost:5001/api/v0",
  },
  eth: {
    providerURL: "http://localhost:8545",
  },
  contractAddress: {
    // maintain deployment order
    token: "0x1c9fD50dF7a4f066884b58A05D91e4b55005876A",
    vendor: "0x0fe4223AD99dF788A6Dcad148eB4086E6389cEB6",
    storage: "0x71a0b8A2245A9770A4D887cE1E4eCc6C1d4FF28c",
  },
};

export default config;
