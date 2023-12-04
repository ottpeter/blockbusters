const { config } = require("../lib/config");

module.exports = async function ({ deployments, getChainId }) {
  const { read } = deployments;

  const chainId = await getChainId();

  const DaoFactory = (await deployments.get("DaoFactory")).address;
  const DaoRoot = (await deployments.get("DaoRoot")).address;
  const IdentityHandler = (await deployments.get("IdentityHandler")).address;


  const contracts = {
    DaoFactory,
    DaoRoot,
    IdentityHandler
  };
  console.table(contracts);
};

module.exports.tags = ["GetContracts"];
