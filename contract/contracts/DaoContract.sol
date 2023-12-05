pragma solidity ^0.8.0;

import "./IDaoContract.sol";
import "./IRoleHandler.sol";


contract DaoFactory {
    function createDao(address _parent, address[] memory _initialCitizens, bool _councilMode, address _daoFactory) public returns (address) {
        DaoContract newDao = new DaoContract(_parent, _initialCitizens, _councilMode, _daoFactory);
        return address(newDao);
    }
}

contract DaoContract is IDaoContract {
    mapping(address => mapping(uint256 => bool)) public roles;

    mapping(uint256 => uint256) public roleCount;

    mapping(uint256 => IRoleHandler) public roleHandlers;
    
    address public parentDao;

    modifier onlyGovernance() {
        _;
    }

    enum ProposalType{NONE, TEXT, CALL, CREATE_SUBDAO}

    struct Proposal {
        ProposalType pType;
        string description;
        address target;
        uint256 amount;
        bytes fun;
        bytes data;
        uint256 support;
        uint256 totalVotes;
        bool executed;
        uint256 deadline;
        bool executionSuccess;
        bytes executionResult;
    }

    mapping(uint256 => mapping(address => bool)) public proposalVotes;

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    
    DaoFactory public daoFactory;
    address[] public subDAOs;

    bool public councilMode;

    constructor(address _parentDao, address[] memory _initialCitizens, bool _councilMode, address _daoFactory) {
        require(_initialCitizens.length > 0, "At least one initial citizen required");
        parentDao = _parentDao;
        councilMode = _councilMode;

        // Assign initial citizens to a role, e.g., role 1
        for (uint i = 0; i < _initialCitizens.length; i++) {
            roles[_initialCitizens[i]][1] = true; // Assuming role 1 is for citizens
            roleCount[1]++;
        }
        daoFactory = DaoFactory(_daoFactory);
    }

    function getProposal(uint256 proposalId) public view returns (Proposal memory proposal) {
        return proposals[proposalId];
    }
    
    function subDAOCount() public view returns (uint256 count) {
        return subDAOs.length;
    }

    function getProposals(uint256 from, uint256 count) public view returns (Proposal[] memory proposalsOut) {
        count = (from + count <= proposalCount) ? count :  proposalCount - from;
        proposalsOut = new Proposal[](count);
        for (uint i = 0 ; from + i < proposalCount && i < count; i++) {
            proposalsOut[i] = proposals[from + i];
        }
    }
    
    function getSubDAOs(uint256 from, uint256 count) public view returns (address[] memory subDAOsOut) {
        count = (from + count <= subDAOs.length) ? count :  subDAOs.length - from;
        subDAOsOut = new address[](count);
        for (uint i = 0 ; from + i < subDAOs.length && i < count; i++) {
            subDAOsOut[i] = subDAOs[from + i];
        }
    }

    function createProposal(
        ProposalType pType,
        string memory description,
        address target,
        uint256 amount,
        bytes memory funToCall,
        bytes memory data,
        uint256 duration
    ) public {
        require(pType == ProposalType.TEXT || pType == ProposalType.CALL || pType == ProposalType.CREATE_SUBDAO, "Invalid proposal type");
        require(pType != ProposalType.CREATE_SUBDAO || target == address(0), "SubDAO proposals must not have a target");
        Proposal storage proposal = proposals[proposalCount++];
        proposal.pType = pType;
        proposal.description = description;
        proposal.target = target;
        proposal.amount = amount;
        proposal.fun = funToCall;
        proposal.data = data;
        proposal.deadline = block.timestamp + duration;
    }

    function voteOnProposal(uint256 proposalId, bool supportVote) public {
        require(roles[msg.sender][1], "Not authorized to vote");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(block.timestamp < proposal.deadline, "Voting period has ended");
        require(!proposalVotes[proposalId][msg.sender], "Already voted");


        proposalVotes[proposalId][msg.sender] = true;
        proposal.totalVotes += 1;
        if (supportVote) {
            proposal.support += 1;
        }
    }

    function checkProposalPassed(uint256 proposalId) internal view returns (bool) {
        Proposal storage proposal = proposals[proposalId];
        uint256 requiredSupport = (roleCount[1] * 66) / 100;
        return proposal.support >= requiredSupport && proposal.totalVotes - proposal.support <= (roleCount[1] * (100 - 66)) / 100;
    }

    function executeProposal(uint256 proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(block.timestamp < proposal.deadline, "Proposal has expired");

        if (checkProposalPassed(proposalId)) {
            proposal.executed = true;
            if (proposal.pType == ProposalType.CALL) {
                (bool success, bytes memory result) = executeCallProposal(proposal);
                proposal.executionSuccess = success;
                proposal.executionResult = result;
            } else if (proposal.pType == ProposalType.CREATE_SUBDAO) {
                createSubDAO(proposal);
            }
            // Add logic for other types of proposals if needed
        } else {
            revert("Proposal did not pass");
        }
    }

    function executeCallProposal(Proposal storage proposal) internal returns (bool, bytes memory) {
        require(proposal.target != address(0), "Invalid target address");

        // Hash the function signature string to get the function selector
        bytes4 funcSelector = bytes4(keccak256(bytes(proposal.fun)));
        
        // Concatenate the function selector with the parameters
        bytes memory payload = abi.encodePacked(funcSelector, proposal.data);
        (bool success, bytes memory result) = proposal.target.call{value: proposal.amount}(payload);
        return (success, result);
    }
 
    // Function to create a proposal for registering a role handler
    function createCreateSubDAOProposal(address[] memory citizens, bool isCouncil, uint256 duration) public {
        bytes memory parameters = abi.encode(citizens, isCouncil);

        // Create a CALL type proposal in the IdentityHandler DAO
        createProposal(ProposalType.CREATE_SUBDAO, "Register Role Handler", address(this), 0, "", parameters, duration);
    }

    function createSubDAO(Proposal storage proposal) internal {
        require(proposal.pType == ProposalType.CREATE_SUBDAO, "Invalid proposal type");

        (address[] memory initialCitizens, bool isCouncil) = abi.decode(proposal.data, (address[],bool));
 
        DaoContract newSubDAO = DaoContract(daoFactory.createDao(address(this), initialCitizens, isCouncil, address(daoFactory)));
        subDAOs.push(address(newSubDAO));

        // Additional    initialization for newSubDAO if required
    }

    function delegateVoting(address delegate) public {
        // Delegate voting rights
    }

    // Function to create a proposal for registering a role handler
    function createRegisterRoleHandlerProposal(uint256 role, address handlerAddress, uint256 duration) public {
        // Function definition as a string
        string memory functionDefinition = "internalRegisterRoleHandler(uint256,address)";

        // Convert function definition from string to bytes
        bytes memory functionDefinitionBytes = bytes(functionDefinition);

        // Encode only the parameters
        bytes memory parameters = abi.encode(role, handlerAddress);

        // Create a CALL type proposal in the IdentityHandler DAO
        createProposal(ProposalType.CALL, "Register Role Handler", address(this), 0, functionDefinitionBytes, parameters, duration);
    }


    // Internal function to register a role handler
    function internalRegisterRoleHandler(uint256 role, address handlerAddress) external {
        require(msg.sender == address(this), "Unauthorized");
        require(role > 0, "Must be > 0");
        roleHandlers[role] = IRoleHandler(handlerAddress);
    }

    // Function to create a proposal for assignig a role
    function createAssignManagedRoleProposal(address target, uint256 role, address handlerAddress, uint256 duration) public {
        // Function definition as a string
        string memory functionDefinition = "assignRole(uint256,address)";

        // Convert function definition from string to bytes
        bytes memory functionDefinitionBytes = bytes(functionDefinition);

        // Encode only the parameters
        bytes memory parameters = abi.encode(handlerAddress, role);

        // Create a CALL type proposal in the IdentityHandler DAO
        createProposal(ProposalType.CALL, "Assign role", target, 0, functionDefinitionBytes, parameters, duration);
    }

    // Functions
    function assignRole(address entityAddress, uint256 role) public {
        if (councilMode) {
            require(msg.sender == parentDao, "Only parent dao can update roles in council");
        } else {
            require(address(roleHandlers[role]) == msg.sender || msg.sender == address(this), "Only self or matching role handler can update roles in DAO");
        }
        if (!roles[entityAddress][role]) {
            roleCount[role]++;
            roles[entityAddress][role] = true;
        }
    }
    
    // Function to create a proposal for assignig a role
    function createRevokeManagedRoleProposal(address target, uint256 role, address handlerAddress, uint256 duration) public {
        // Function definition as a string
        string memory functionDefinition = "revokeRole(uint256,address)";

        // Convert function definition from string to bytes
        bytes memory functionDefinitionBytes = bytes(functionDefinition);

        // Encode only the parameters
        bytes memory parameters = abi.encode(handlerAddress, role);

        // Create a CALL type proposal in the IdentityHandler DAO
        createProposal(ProposalType.CALL, "Revoke role", target, 0, functionDefinitionBytes, parameters, duration);
    }

    function revokeRole(address entityAddress, uint256 role) public {
        if (councilMode) {
            require(msg.sender == parentDao, "Only parent dao can update roles in council");
        } else {
            require(address(roleHandlers[role]) == msg.sender || msg.sender == address(this), "Only self or matching role handler can update roles in DAO");
        }
        if (roles[entityAddress][role]) {
            require(roleCount[role] > 1 || role != 1, "Dont kill the last citizen");
            roleCount[role]--;
            roles[entityAddress][role] = false;
        }
    }

}
