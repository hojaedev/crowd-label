import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CROWLToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("Crowd Label", "CROWL") {
    _mint(msg.sender, initialSupply);
  }
}
