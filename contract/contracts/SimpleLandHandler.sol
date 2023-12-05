pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./IPropertyTypeHandler.sol";

contract SimpleLandHandler is Ownable, IPropertyTypeHandler {

    function renderProperty(bytes memory propertyData) external pure returns (string memory landAddress){
        return(abi.decode(propertyData, (string)));
    }

    function registerProperty(address originalSender, uint256 propertyId, uint256 propertyType, address owner, bytes memory details) external view returns (PropertyRegistryContract.Property memory property) {
        require(originalSender == owner, "Not admin");
        // abi.decode....
        // do stuff
        // propertyData = abi.encode(..
        property.owner = owner;
        property.propertyData = details;
    }

    function transferOwnership(address originalSender, uint256 propertyId, PropertyRegistryContract.Property memory property, address newOwner) external view returns (PropertyRegistryContract.Property memory propertyOut) {
        require(originalSender == property.owner || originalSender == owner, "Not owner or admin");
        // abi.decode....
        // do stuff
        // propertyData = abi.encode(..
        property.owner = newOwner;
        return property;
    }

    function updateRegistry(address originalSender, uint256 propertyId, PropertyRegistryContract.Property memory property, bytes memory details) external view returns (PropertyRegistryContract.Property memory propertyOut) {
        require(originalSender == owner /* || == propertymanagement dao */, "Not admin");
        // abi.decode....
        // do stuff
        // propertyData = abi.encode(..
        property.propertyData = details;
        return property;
    }
}
