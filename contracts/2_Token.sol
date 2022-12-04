// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CrowdLabelToken is ERC20 {
  constructor() ERC20("CrowdLabel", "CROWL") {
    _mint(msg.sender, 1000 * 10 ** decimals());
  }
}
