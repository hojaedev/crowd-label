// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
import "./1_Storage.sol";
import "./3_Vendor.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "hardhat/console.sol";

struct Coordinate {
  uint256 x1;
  uint256 y1;
  uint256 x2;
  uint256 y2;
  address owner;
}

contract Label {
  Storage public storageContract;
  Vendor public vendorContract;
  mapping(string => Coordinate[]) public labels;

  constructor(address storageAddr, address vendorAddr) {
    storageContract = Storage(storageAddr);
    vendorContract = Vendor(vendorAddr);
  }

  function addLabel(
    string memory id,
    uint256 x1,
    uint256 y1,
    uint256 x2,
    uint256 y2
  ) public {
    bool registered;
    uint256 labelCount;
    (registered, labelCount) = storageContract.getLabelCount(id);
    assert(registered);
    if (labelCount >= 5) return;
    Coordinate memory coord = Coordinate(x1, y1, x2, y2, msg.sender);
    labels[id].push(coord);
    storageContract.addLabelCount(id);

    if (labelCount == 4) {
      reward(id);
    }
  }

  function getLabels(
    string memory id
  ) public view returns (Coordinate[] memory) {
    return labels[id];
  }

  function reward(string memory id) private {
    Coordinate memory winner1;
    Coordinate memory winner2;
    (winner1, winner2) = findWinners(id);
    address[] memory winners = new address[](2);
    winners[0] = winner1.owner;
    winners[1] = winner2.owner;
    vendorContract.addReward(winners, 1);
  }

  function findWinners(
    string memory id
  ) private view returns (Coordinate memory, Coordinate memory) {
    Coordinate[] memory label = labels[id];
    Coordinate memory winner1;
    Coordinate memory winner2;
    uint256 maxIOU = 0;
    for (uint256 i = 0; i < label.length; i++) {
      Coordinate memory c1 = label[i];
      uint256 area1 = (c1.x2 - c1.x1) * (c1.y2 - c1.y1);
      for (uint256 j = i + 1; j < label.length; j++) {
        Coordinate memory c2 = label[j];
        uint256 area2 = (c2.x2 - c2.x1) * (c2.y2 - c2.y1);
        uint256 intersection = findIntersection(c1, c2);
        uint256 curIOU = intersection / (area1 + area2 - intersection);

        if (curIOU > maxIOU) {
          winner1 = c1;
          winner2 = c2;
          maxIOU = curIOU;
        }
      }
    }

    return (winner1, winner2);
  }

  function findIntersection(
    Coordinate memory c1,
    Coordinate memory c2
  ) private pure returns (uint256) {
    if (c1.x2 <= c2.x1 || c1.x1 >= c2.x2 || c1.y2 <= c2.y1 || c1.y1 >= c2.y2) {
      return 0;
    }
    uint256 x1 = Math.max(c1.x1, c2.x1);
    uint256 y1 = Math.max(c1.y1, c2.y1);
    uint256 x2 = Math.min(c1.x2, c2.x2);
    uint256 y2 = Math.min(c1.y2, c2.y2);
    return (x2 - x1) * (y2 - y1);
  }
}
