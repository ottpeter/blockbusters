const { ethers } = require("hardhat");
const { config } = require("../lib/config");

module.exports = async function ({ getNamedAccounts, deployments, getChainId }) {
  const { deploy, read, execute } = deployments;
  const chainId = await getChainId();
  const { deployer, daoOwner1, daoOwner2, daoOwner3, user } = await getNamedAccounts();

  const daoFactory = (await deployments.get("DaoFactory")).address;
  const daoRoot = (await deployments.get("DaoRoot")).address;
  
  const deployResult = await deploy("IdentityHandler", {
    args: [daoRoot, [config.deployAddresses.daoOwner1], daoFactory, ethers.utils.parseEther("100")],
    contract: "contracts/IdentityHandler.sol:IdentityHandler",
    from: deployer,
    log: true,
    deterministicDeployment: false,
  });
  if (deployResult.newlyDeployed) {
    const identityHandler = (await deployments.get("IdentityHandler")).address;
    await execute(
        "DaoRoot",
        {from: user, log: true},
        "createRegisterRoleHandlerProposal",
        1, identityHandler, 300
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

module.exports.tags = ["IdentityHandler"];
module.exports.dependencies = ["DaoRoot"];
