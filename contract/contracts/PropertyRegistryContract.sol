pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./IPropertyTypeHandler.sol";
import "./IPropertyRegistryContract.sol";


contract PropertyRegistryContract is Ownable, IPropertyRegistryContract {
    constructor(address newOwner) {
        _transferOwnership(newOwner);
    }

    modifier preventPropertyTypeChange(uint256 propertyId) {
        uint256 propertyType = properties[propertyId].propertyType;
        _;
        require(properties[propertyId].propertyType == propertyType, "Handler changed propertyId");
    }

    mapping(uint256 => Property) public properties;

    mapping(uint256 => IPropertyTypeHandler) public propertyTypeHandlers;

    // register propertyType handler
    function registerPropertyTypeHandler(uint256 propertyType, address handlerAddress) external onlyOwner {
        require(propertyType > 0, "Must be > 0");
        propertyTypeHandlers[propertyType] = IPropertyTypeHandler(handlerAddress);
    }

    // Functions
    function registerProperty(uint256 propertyId, uint256 propertyType, address owner, bytes memory details) public {
        // Record property ownership / add new property to the register
        require(properties[propertyId].propertyType == 0, "Property exists");
        require(address(propertyTypeHandlers[propertyType]) != address(0), "Unknown property type");
        properties[propertyId] = propertyTypeHandlers[propertyType].registerProperty(msg.sender, propertyId, propertyType, owner, details);
        // ensure type
        properties[propertyId].propertyType = propertyType;
    }

    function transferOwnership(uint256 propertyId, address newOwner) preventPropertyTypeChange(propertyId) public {
        // Transfer property rights
        require(properties[propertyId].propertyType != 0, "Property does not exist");
        properties[propertyId] = propertyTypeHandlers[properties[propertyId].propertyType].transferOwnership(msg.sender, propertyId, properties[propertyId], newOwner);
    }

    function updateRegistry(uint256 propertyId, bytes memory newDetails) public preventPropertyTypeChange(propertyId) {
        // Update property details
        require(properties[propertyId].propertyType != 0, "Property does not exist");
        properties[propertyId] = propertyTypeHandlers[properties[propertyId].propertyType].updateRegistry(msg.sender, propertyId, properties[propertyId], newDetails);
    }

    function verifyOwnership(uint256 propertyId) public view preventPropertyTypeChange(propertyId) returns (address) {
        // Verify property claims
        return properties[propertyId].owner;
    }
}
