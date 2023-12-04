const { ethers } = require("hardhat");
const { config } = require("../lib/config");

module.exports = async function ({ getNamedAccounts, deployments, getChainId }) {
  const { deploy, read, execute } = deployments;
  const chainId = await getChainId();
  const { deployer, daoOwner1, daoOwner2, daoOwner3, user } = await getNamedAccounts();

  const deployResult = await deploy("DaoFactory", {
    args: [],
    contract: "contracts/DaoContract.sol:DaoFactory",
    from: deployer,
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["DaoFactory"];
module.exports.dependencies = [];
