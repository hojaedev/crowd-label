// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Storage {
    struct File {
        uint256 label_count;
        uint256 use_count;
        bool registered;
    }

    mapping(string => File) public files;
    string[] public hashes;

    function store(string[] memory ids) public {
        for (uint256 i = 0; i < ids.length; i++) {
            string memory k = ids[i];
            files[k] = File({label_count: 0, use_count: 0, registered: true});
            hashes.push(k);
        }
    }

    function retrieveImage(string memory id) public view returns (File memory) {
        // console.log("this is files", files);
        return files[id];
    }

    function getAllImage() public view returns (File[] memory) {
        File[] memory ret = new File[](hashes.length);
        for (uint256 i = 0; i < hashes.length; i++) {
            ret[i] = (files[hashes[i]]);
        }
        return ret;
    }
}
