// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
import "./1_Storage.sol";

struct Coordinate {
    uint256 x1;
    uint256 x2;
    uint256 y1;
    uint256 y2;
}

contract Label {
    Storage public storageContract;
    mapping(string => Coordinate[]) public labels;

    constructor(address _addr) {
        storageContract = Storage(_addr);
    }

    function addLabel(string memory id, Coordinate memory coord) public {
        bool registered;
        uint256 labelCount;
        (registered, labelCount) = storageContract.getLabelCount(id);
        assert(registered);
        if (labelCount > 5) return;
        labels[id].push(coord);
        storageContract.addLabelCount(id);
    }

    // function calcScore(string[] memory id) {}
}
