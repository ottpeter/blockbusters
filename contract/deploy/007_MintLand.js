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
  
  
  await execute(
      "PropertyRegistryContract",
      {from: user, log: true},
      "registerProperty",
      1, 1, config.deployAddresses.user, ethers.utils.toUtf8Bytes("Haz 1")
  );
};

module.exports.tags = ["MintLand"];
module.exports.dependencies = ["PropertyRegistryContract", "SimpleLandHandler"];
