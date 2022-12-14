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
    FinalLabel label;
    address owner;
    address[] access;
  }

  struct FinalLabel {
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
      address[] memory addr;
      files[k] = File({
        label_count: 0,
        use_count: 0,
        registered: true,
        hash: k,
        label: FinalLabel(0, 0, 0, 0),
        owner: msg.sender,
        access: addr
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

  function getUnlabeledImagesByUser(string[] memory unlabeledHashes) public view returns(File[] memory) {
    File[] memory ret = new File[](hashes.length);
    for (uint256 i = 0; i < unlabeledHashes.length; i++) {
      ret[i] = (files[unlabeledHashes[i]]);
    }
    return ret;
  }

  function getImageHashes() external view returns (string[] memory) {
    return hashes;
  }

  function addLabelCount(string memory id) external {
    assert(files[id].registered == true);
    files[id].label_count++;
  }

  function getLabelCount(string memory id) public view returns (bool, uint256) {
    return (files[id].registered, files[id].label_count);
  }

  function setLabel(
    string memory id,
    uint256 x1,
    uint256 y1,
    uint256 x2,
    uint256 y2
  ) external {
    assert(files[id].registered == true);
    files[id].label = FinalLabel(x1, y1, x2, y2);
  }

  function buyDataset(string[] memory ids) public {
    uint256 size = ids.length;
    for (uint256 i = 0; i < size; i++) {
      assert(files[ids[i]].registered == true);
    }
    address[] memory uploaders = new address[](size);
    for (uint256 i = 0; i < size; i++) {
      files[ids[i]].use_count++;
      uploaders[i] = files[ids[i]].owner;
      files[ids[i]].access.push(msg.sender);
    }
    vendor.addReward(uploaders, 1);
  }

  function downloadDataset(
    string[] memory ids
  ) public view returns (string[] memory, FinalLabel[] memory) {
    FinalLabel[] memory labels = new FinalLabel[](ids.length);
    string[] memory imageHashes = new string[](ids.length);
    for (uint i = 0; i < ids.length; i++) {
      bool found = false;
      for (uint j = 0; j < files[ids[i]].access.length; j++) {
        if (files[ids[i]].access[j] == msg.sender) {
          imageHashes[i] = ids[i];
          labels[i] = files[ids[i]].label;
          found = true;
          break;
        }
      }
    }
    return (ids, labels);
  }
}
