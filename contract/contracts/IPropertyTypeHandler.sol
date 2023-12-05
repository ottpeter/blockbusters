pragma solidity ^0.8.0;

import "./PropertyRegistryContract.sol";

interface IPropertyTypeHandler {
    function registerProperty(address originalSender, uint256 propertyId, uint256 propertyType, address owner, bytes memory details) external returns (PropertyRegistryContract.Property memory property);
    function transferOwnership(address originalSender, uint256 propertyId, PropertyRegistryContract.Property memory property, address newOwner) external returns (PropertyRegistryContract.Property memory propertyOut);
    function updateRegistry(address originalSender, uint256 propertyId, PropertyRegistryContract.Property memory property, bytes memory details) external view returns (PropertyRegistryContract.Property memory propertyOut);
}