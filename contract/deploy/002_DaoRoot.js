const { ethers } = require("hardhat");
const { config } = require("../lib/config");

module.exports = async function ({ getNamedAccounts, deployments, getChainId }) {
  const { deploy, read, execute } = deployments;
  const chainId = await getChainId();
  const { deployer, daoOwner1, daoOwner2, daoOwner3, user } = await getNamedAccounts();

  const daoFactory = (await deployments.get("DaoFactory")).address;

  const deployResult = await deploy("DaoRoot", {
    args: [ethers.constants.AddressZero, [config.deployAddresses.daoOwner1, config.deployAddresses.daoOwner2, config.deployAddresses.daoOwner3], false, daoFactory],
    contract: "contracts/DaoContract.sol:DaoContract",
    from: deployer,
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["DaoRoot"];
module.exports.dependencies = ["DaoFactory"];
