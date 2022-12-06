const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseUnits } = require("ethers/lib/utils");

const transferAmount = parseUnits("1000", 18);

describe("Vendor", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function setup() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CrowdLabelToken");
    const Vendor = await ethers.getContractFactory("Vendor");
    const token = await Token.deploy();
    await token.deployed();
    const vendor = await Vendor.deploy(token.address);
    vendor.deployed();
    await token.transfer(vendor.address, parseUnits("1000", 18));
    return { vendor, token, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should transfer balance", async function () {
      const { vendor, token } = await loadFixture(setup);
      expect(await token.balanceOf(vendor.address)).to.equal(transferAmount);
    });
  });

  it("Should be able to buy token from vendor", async function () {
    const { vendor, token, otherAccount } = await loadFixture(setup);
    await vendor.connect(otherAccount).buyTokens({ value: ethers.utils.parseEther("0.1") });
    expect(await token.balanceOf(otherAccount.address)).to.equal(parseUnits("0.1", 21));
    expect(await vendor.userRewardEligible(otherAccount.address)).to.equal(
      true,
    );
  });

  it("Should be able to sell token to vendor", async function () {
    const { vendor, token, otherAccount } = await loadFixture(setup);
    await vendor
      .connect(otherAccount)
      .buyTokens({ value: ethers.utils.parseEther("1") }); // 1e3 crowl
    // https://ethereum.stackexchange.com/questions/136010/transferfrom-result-in-execution-reverted-insufficient-allowance
    await token.connect(otherAccount).approve(vendor.address, parseUnits("10000000", 18));
    await vendor.connect(otherAccount).sellTokens(parseUnits("900", 18));
    const result = 1e18 - 1e3;
    expect(await token.balanceOf(otherAccount.address)).to.equal(
      parseUnits("100", 18)
    );
  });
});
