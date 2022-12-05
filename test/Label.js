const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Label Contract Test", async function () {
  async function loadContracts() {
    const Token = await ethers.getContractFactory("CrowdLabelToken");
    const token = await Token.deploy();
    const Vendor = await ethers.getContractFactory("Vendor");
    const vendor = await Vendor.deploy(token.address);
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy(vendor.address);
    const Label = await ethers.getContractFactory("Label");
    const label = await Label.deploy(storage.address, vendor.address);

    return { storage, label };
  }
  const imageHash = "QmQTux7QbD8BYftFhDJdoJkmpfGEeHdSxx2g7jeVfEsryo";

  it("Should add label", async function () {
    const { storage, label } = await loadContracts();
    await storage.store([imageHash]);
    await label.addLabel(imageHash, 100, 100, 200, 200);
    const res = await label.getLabels(imageHash);
    const { x1, y1, x2, y2 } = res[0];

    expect({ x1, y1, x2, y2 }).to.deep.equal({
      x1: 100,
      y1: 100,
      x2: 200,
      y2: 200,
    });
  });

  it("Should five labels from five different account", async function () {
    const { storage, label } = await loadContracts();
    const signers = await ethers.getSigners();
    await storage.store([imageHash]);

    for (let i = 0; i < 5; i++) {
      await label
        .connect(signers[i])
        .addLabel(
          imageHash,
          100 + i * 5,
          100 + i * 5,
          200 + i * 5,
          200 + i * 5,
        );
    }
    const res = await label.getLabels(imageHash);
    for (let i = 0; i < 5; i++) {
      expect(res[i].owner).to.equal(signers[i].address);
    }
  });

  it("Should fetch the final label", async function () {
    const { storage, label } = await loadContracts();
    const signers = await ethers.getSigners();
    await storage.store([imageHash]);

    for (let i = 0; i < 3; i++) {
      await label.connect(signers[i]).addLabel(imageHash, 100, 100, 200, 200);
    }

    for (let i = 2; i < 5; i++) {
      await label
        .connect(signers[i])
        .addLabel(
          imageHash,
          100 + i * 5,
          100 + i * 5,
          200 + i * 5,
          200 + i * 5,
        );
    }

    const res = await storage.getAllImage(true);
    const { x1, y1, x2, y2 } = res[0].label;
    expect({ x1, y1, x2, y2 }).to.deep.equal({
      x1: 100,
      y1: 100,
      x2: 200,
      y2: 200,
    });
  });

  // TODO: rewrite this test
  // it("Should reward winners", async function () {
  //   const { storage, label } = await loadContracts();
  //   const signers = await ethers.getSigners();
  //   await storage.store([imageHash]);

  // for (let i = 0; i < 3; i++) {
  //   await label.connect(signers[i]).addLabel(imageHash, 100, 100, 200, 200);
  // }

  // for (let i = 2; i < 5; i++) {
  //   await label
  //     .connect(signers[i])
  //     .addLabel(
  //       imageHash,
  //       100 + i * 5,
  //       100 + i * 5,
  //       200 + i * 5,
  //       200 + i * 5,
  //     );
  // }

  //   for (let i = 0; i < 2; i++) {
  //     const { amount, claimed } = await label.connect(signers[i]).getPayout();
  //     expect({ amount, claimed }).to.deep.equal({ amount: 1, claimed: 0 });
  //   }
  // });
});
