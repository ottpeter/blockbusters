const { ethers } = require("hardhat");
const { config } = require("../lib/config");

module.exports = async function ({ getNamedAccounts, deployments, getChainId }) {
  const { deploy, read, execute } = deployments;
  const chainId = await getChainId();
  const { deployer, daoOwner1, daoOwner2, daoOwner3, user } = await getNamedAccounts();

  const daoFactory = (await deployments.get("DaoFactory")).address;
  const daoRoot = (await deployments.get("DaoRoot")).address;
  const simpleLandHandler = (await deployments.get("SimpleLandHandler")).address;
  const propertyRegistryContract = (await deployments.get("PropertyRegistryContract")).address;
  
  
  const currentHandler = await read("PropertyRegistryContract", {log: true}, "propertyTypeHandlers", 1);
  if (currentHandler != simpleLandHandler) {
    await execute(
        "DaoRoot",
        {from: user, log: true},
        "createProposal",
        2, "Set land handler council address", propertyRegistryContract, 0,
        ethers.utils.toUtf8Bytes("registerPropertyTypeHandler(uint256,address)"),
        ethers.utils.defaultAbiCoder.encode(["uint256", "address"], [1, simpleLandHandler]),
        300
    );
    await new Promise(r => setTimeout(r, 1000));
    const proposalNo = await read("DaoRoot", {log: true}, "proposalCount");
    
    await execute(
        "DaoRoot",
        {from: daoOwner1, log: true},
        "voteOnProposal",
        proposalNo - 1, true
    );
    await new Promise(r => setTimeout(r, 1000));
    await execute(
        "DaoRoot",
        {from: daoOwner2, log: true},
        "voteOnProposal",
        proposalNo - 1, true
    );
    await new Promise(r => setTimeout(r, 1000));
    
    await execute(
        "DaoRoot",
        {from: user, log: true},
        "executeProposal",
        proposalNo - 1
    ); 
  }
};

module.exports.tags = ["SetupLandHandler"];
module.exports.dependencies = ["PropertyRegistryContract", "SimpleLandHandler"];
