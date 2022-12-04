// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
import "./1_Storage.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

struct Coordinate {
    uint256 x1;
    uint256 x2;
    uint256 y1;
    uint256 y2;
    address owner;
}

struct Payout {
    uint256 amount;
    uint256 claimed;
}

contract Label {
    Storage public storageContract;
    mapping(string => Coordinate[]) public labels;
    mapping(address => Payout) public payouts;

    constructor(address _addr) {
        storageContract = Storage(_addr);
    }

    function addLabel(string memory id, Coordinate memory coord) public {
        bool registered;
        uint256 labelCount;
        (registered, labelCount) = storageContract.getLabelCount(id);
        assert(registered);
        if (labelCount >= 5) return;
        labels[id].push(coord);
        storageContract.addLabelCount(id);

        if (labelCount == 5) {
            reward(id);
        }
    }

    function getLabel(string memory id) public view returns (Coordinate[] memory) {
        return labels[id];
    }

    function getPayout() public view returns (Payout memory) {
        return payouts[msg.sender];
    }

    function reward(string memory id) private {
        Coordinate memory winner1;
        Coordinate memory winner2;
        (winner1, winner2) = findWinners(id);
        payouts[winner1.owner].amount += 1;
        payouts[winner2.owner].amount += 1;
    }

    function findWinners(string memory id) private view returns (Coordinate memory, Coordinate memory){
        Coordinate[] memory label = labels[id];
        Coordinate memory winner1;
        Coordinate memory winner2;
        uint256 maxIOU = 0;
        for (uint256 i = 0; i < label.length; i++) {
            Coordinate memory c1 = label[i];
            uint256 area1 =  (c1.x2 - c1.x1) * (c1.y2 - c1.y1);
            for (uint256 j = i + 1; j < label.length; j++) {
                Coordinate memory c2 = label[j];
                uint256 area2 =  (c2.x2 - c2.x1) * (c2.y2 - c2.y1);
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

    function findIntersection(Coordinate memory c1, Coordinate memory c2) private pure returns (uint256) {
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
