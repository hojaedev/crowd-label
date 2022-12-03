const contractAddress = "0x1b88Bdb8269A1aB1372459F5a4eC3663D6f5cCc4";
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
      {
        internalType: "string",
        name: "hash",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllImage",
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
          {
            internalType: "string",
            name: "hash",
            type: "string",
          },
        ],
        internalType: "struct Storage.File[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "hashes",
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
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "retrieveImage",
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
          {
            internalType: "string",
            name: "hash",
            type: "string",
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
