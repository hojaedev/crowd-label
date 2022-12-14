const labelAddress = "0xd52fb61f250b1d92C9DcB81852B373D9B2Aff4d3";
const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "addLabel",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "getLabel",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "x2",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y2",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        internalType: "struct Coordinate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPayout",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimed",
            type: "uint256",
          },
        ],
        internalType: "struct Payout",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "labels",
    outputs: [
      {
        internalType: "uint256",
        name: "x1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "x2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y2",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "payouts",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimed",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "storageContract",
    outputs: [
      {
        internalType: "contract Storage",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export { labelAddress, abi };
