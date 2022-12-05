// SPDX-License-Identifier: MIT
// https://stermi.medium.com/how-to-create-an-erc20-token-and-a-solidity-vendor-contract-to-sell-buy-your-own-token-8882808dd905
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./2_Token.sol";

// Learn more about the ERC20 implementation
// on OpenZeppelin docs: https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vendor is Ownable {
  // Our Token Contract
  CrowdLabelToken token;

  // token price for ETH
  uint256 public tokensPerEth = 1e3;

  struct Reward {
    uint256 total;
    uint256 claimed;
  }
  /**
   * @notice use an array to track reward eligible addresses
   */
  Reward[] internal rewards;
  mapping(address => uint256) internal rewardMap;

  // Event that log buy operation
  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
  event SellTokens(address seller, uint256 amountOfTokens, uint256 amountOfETH);

  constructor(address tokenAddress) {
    token = CrowdLabelToken(tokenAddress);
    // empty 0 index reward to handle initializd struct indexes.
    rewards.push();
  }

  /**
   * @notice Allow users to buy tokens for ETH
   */
  function buyTokens() public payable returns (uint256 tokenAmount) {
    require(msg.value > 0, "Send ETH to buy some tokens");

    uint256 amountToBuy = msg.value * tokensPerEth;

    // check if the Vendor Contract has enough amount of tokens for the transaction
    uint256 vendorBalance = token.balanceOf(address(this));
    require(
      vendorBalance >= amountToBuy,
      "Vendor contract has not enough tokens in its balance"
    );
    initUser(msg.sender);

    // Transfer token to the msg.sender
    bool sent = token.transfer(msg.sender, amountToBuy);
    require(sent, "Failed to transfer token to user");

    // emit the event
    emit BuyTokens(msg.sender, msg.value, amountToBuy);

    return amountToBuy;
  }

  /**
   * @notice Allow users to sell tokens for ETH
   */
  function sellTokens(uint256 tokenAmountToSell) public {
    // Check that the requested amount of tokens to sell is more than 0
    require(
      tokenAmountToSell > 0,
      "Specify an amount of token greater than zero"
    );

    // Check that the user's token balance is enough to do the swap
    uint256 userBalance = token.balanceOf(msg.sender);
    require(
      userBalance >= tokenAmountToSell,
      "Your balance is lower than the amount of tokens you want to sell"
    );

    // Check that the Vendor's balance is enough to do the swap
    uint256 amountOfETHToTransfer = tokenAmountToSell / tokensPerEth;
    uint256 ownerETHBalance = address(this).balance;
    require(
      ownerETHBalance >= amountOfETHToTransfer,
      "Vendor has not enough funds to accept the sell request"
    );

    bool sent = token.transferFrom(
      msg.sender,
      address(this),
      tokenAmountToSell
    );
    require(sent, "Failed to transfer tokens from user to vendor");

    (sent, ) = msg.sender.call{value: amountOfETHToTransfer}("");
    require(sent, "Failed to send ETH to the user");
  }

  /**
   * @notice Allow the owner of the contract to withdraw ETH
   */
  function withdraw() public onlyOwner {
    uint256 ownerBalance = address(this).balance;
    require(ownerBalance > 0, "Owner has not balance to withdraw");

    (bool sent, ) = msg.sender.call{value: address(this).balance}("");
    require(sent, "Failed to send user balance back to the owner");
}

  function userRewardEligible(address _addr) public view returns (bool) {
    return rewardMap[_addr] != 0;
  }

  function initUser(address _addr) internal {
    if (userRewardEligible(_addr)) return;
    rewards.push(Reward(0, 0));
    rewardMap[_addr] = rewards.length - 1;
  }

  /**
   * @notice Add fixed amount rewards to address array.
   */
  function addReward(address[] memory _addrs, uint256 amount) external {
    for (uint i = 0; i < _addrs.length; i++) {
      initUser(_addrs[i]);
      rewards[rewardMap[_addrs[i]]].total += amount * 1e18;
    }
  }

  function claim() public {
    initUser(msg.sender);
    uint256 id = rewardMap[msg.sender];
    uint256 toClaim = rewards[id].total - rewards[id].claimed;
    require(toClaim > 0, "No rewards to claim");
    token.transfer(msg.sender, toClaim);
    rewards[id].claimed = rewards[id].total;
  }

  function getClaimable() public view returns (uint256) {
    require(userRewardEligible(msg.sender), "User not eligible for rewards");
    uint256 id = rewardMap[msg.sender];
    uint256 toClaim = rewards[id].total - rewards[id].claimed;
    return toClaim;
  }
}
