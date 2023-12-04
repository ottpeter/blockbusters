pragma solidity ^0.8.0;

interface IDaoContract {
    // register entityType handler
    function registerRoleHandler(uint256 role, address handlerAddress) external;
    function assignRole(address entityAddress, uint256 role) external;
    function revokeRole(address entityAddress, uint256 role) external;
}
