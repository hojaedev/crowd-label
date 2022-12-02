const contractAddress = "0xA586074FA4Fe3E546A132a16238abe37951D41fE";
const abi = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "ids",
        type: "string[]",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "files",
    outputs: [
      {
        internalType: "uint256",
        name: "label_count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "use_count",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "registered",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "retrieve",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "label_count",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "use_count",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "registered",
            type: "bool",
          },
        ],
        internalType: "struct Storage.File",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export { contractAddress, abi };
const contractAddress = "0xa131AD247055FD2e2aA8b156A11bdEc81b9eAD95";
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "x",
        type: "string",
      },
    ],
    name: "setHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getHash",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export { contractAddress, abi };
