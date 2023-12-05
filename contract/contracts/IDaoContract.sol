pragma solidity ^0.8.0;

interface IDaoContract {
    // register entityType handler
    function createRegisterRoleHandlerProposal(uint256 role, address handlerAddress, uint256 duration) external;
    function assignRole(address entityAddress, uint256 role) external;
    function revokeRole(address entityAddress, uint256 role) external;
}
