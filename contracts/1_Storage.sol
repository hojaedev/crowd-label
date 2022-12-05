// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
import "./3_Vendor.sol";

contract Storage {
  struct File {
    uint256 label_count;
    uint256 use_count;
    bool registered;
    string hash;
    Label label;
    address owner;
  }

  struct Label {
    uint256 x1;
    uint256 y1;
    uint256 x2;
    uint256 y2;
  }

  mapping(string => File) public files;
  mapping(address => uint256) public reward;
  string[] public hashes;
  uint256 public totalLabeled;
  Vendor vendor;

  constructor(address vendorAddress) {
    vendor = Vendor(vendorAddress);
  }

  function store(string[] memory ids) public {
    for (uint256 i = 0; i < ids.length; i++) {
      string memory k = ids[i];
      files[k] = File({
        label_count: 0,
        use_count: 0,
        registered: true,
        hash: k,
        label: Label(0, 0, 0, 0),
        owner: msg.sender
      });
      hashes.push(k);
    }
  }

  function getImage(string memory id) public view returns (File memory) {
    return files[id];
  }

  function getAllImage(
    bool filterLabelRequired
  ) public view returns (File[] memory) {
    uint256 size = hashes.length;
    if (filterLabelRequired) {
      size -= totalLabeled;
    }
    File[] memory ret = new File[](size);
    for (uint256 i = 0; i < hashes.length; i++) {
      if (filterLabelRequired) {
        if (files[hashes[i]].label_count > 4) {
          ret[i] = (files[hashes[i]]);
        }
      } else {
        ret[i] = (files[hashes[i]]);
      }
    }
    return ret;
  }

  function getMyImage() public view returns (File[] memory) {
    File[] memory ret = new File[](hashes.length);
    for (uint256 i = 0; i < hashes.length; i++) {
      if (files[hashes[i]].owner == msg.sender) {
        ret[i] = (files[hashes[i]]);
      }
    }
    return ret;
  }

  function addLabelCount(string memory id) external {
    assert(files[id].registered == true);
    files[id].label_count++;
  }

  function getLabelCount(string memory id) public view returns (bool, uint256) {
    return (files[id].registered, files[id].label_count);
  }

  function setLabel(string memory id, uint256 x1, uint256 y1, uint256 x2, uint256 y2) external {
    assert(files[id].registered == true);
    files[id].label = Label(x1, y1, x2, y2);
  }

  function downloadDataset(string[] memory ids) external {
    for (uint256 i = 0; i < ids.length; i++) {
      assert(files[ids[i]].registered == true);
    }
    address[] memory uploaders = new address[](ids.length);
    for (uint256 i = 0; i < ids.length; i++) {
      files[ids[i]].use_count++;
      uploaders[i] = files[ids[i]].owner;
    }
    vendor.addReward(uploaders, 1);
  }

  // TODO: Distribute reward
}
