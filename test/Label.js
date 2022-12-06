const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

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
  const imageHash2 = "AAAAAA7QbD8BYftFhDJdoJkmpfGEeHdSxx2g7jeVfEsryo";
  const imageHash3 = "BBBBBB7QbD8BYftFhDJdoJkmpfGEeHdSxx2g7jeVfEsryo";
  const imageHash4 = "CCCCCC7QbD8BYftFhDJdoJkmpfGEeHdSxx2g7jeVfEsryo";

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

  it("Should return all unlabeled images by user", async function () {
    const { storage, label } = await loadContracts();
    await storage.store([imageHash]);
    await storage.store([imageHash2]);
    await storage.store([imageHash3]);
    await storage.store([imageHash4]);
    await label.addLabel(imageHash, 100, 100, 200, 200);
    let unlabeledHashes = await label.getUnlabeledHashesByUser();
    unlabeledHashes = unlabeledHashes.filter(hash => {
      return hash.length != 0;
    });
    expect(unlabeledHashes).to.deep.equal([imageHash2, imageHash3, imageHash4]);

    let unlabeledImages = await storage.getUnlabeledImagesByUser(
      unlabeledHashes,
    );
    unlabeledImages = unlabeledImages.filter(unlabeledImage => {
      return unlabeledImage.registered;
    });
    const res = [];

    unlabeledImages.forEach(image => {
      res.push(image.hash);
    });

    expect(res).to.deep.equal([imageHash2, imageHash3, imageHash4]);
  });
});

// TODO: rewrite this test
//   it("Should reward winners", async function () {
//     const { storage, label } = await loadContracts();
//     const signers = await ethers.getSigners();
//     await storage.store([imageHash]);

//   for (let i = 0; i < 3; i++) {
//     await label.connect(signers[i]).addLabel(imageHash, 100, 100, 200, 200);
//   }

//   for (let i = 2; i < 5; i++) {
//     await label
//       .connect(signers[i])
//       .addLabel(
//         imageHash,
//         100 + i * 5,
//         100 + i * 5,
//         200 + i * 5,
//         200 + i * 5,
//       );
//   }

//     for (let i = 0; i < 2; i++) {
//       const { amount, claimed } = await label.connect(signers[i]).getPayout();
//       expect({ amount, claimed }).to.deep.equal({ amount: 1, claimed: 0 });
//     }
//   });
// });
