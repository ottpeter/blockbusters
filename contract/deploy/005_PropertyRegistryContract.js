const { ethers } = require("hardhat");
const { config } = require("../lib/config");

module.exports = async function ({ getNamedAccounts, deployments, getChainId }) {
  const { deploy, read, execute } = deployments;
  const chainId = await getChainId();
  const { deployer, daoOwner1, daoOwner2, daoOwner3, user } = await getNamedAccounts();

  const daoFactory = (await deployments.get("DaoFactory")).address;
  const daoRoot = (await deployments.get("DaoRoot")).address;
  
  const deployResult = await deploy("PropertyRegistryContract", {
    args: [daoRoot],
    contract: "contracts/PropertyRegistryContract.sol:PropertyRegistryContract",
    from: deployer,
    log: true,
    deterministicDeployment: false,
  });
  if (deployResult.newlyDeployed) {
  }
};

module.exports.tags = ["PropertyRegistryContract"];
module.exports.dependencies = ["DaoRoot"];
