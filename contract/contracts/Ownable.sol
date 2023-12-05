pragma solidity ^0.8.0;

contract Ownable {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    function _transferOwnership(address newOwner) internal {
        owner = newOwner;
    }
}