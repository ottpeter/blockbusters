pragma solidity ^0.8.0;

interface IPropertyRegistryContract {
    struct Property {
        uint256 propertyType;
        address owner;
        bytes propertyData;
        // Property details
    }
}
