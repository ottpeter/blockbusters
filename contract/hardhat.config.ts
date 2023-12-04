import { HardhatUserConfig } from "hardhat/config";
//import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

//import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import '@openzeppelin/hardhat-upgrades';
import 'solidity-coverage';
import '@typechain/hardhat';

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const accounts = [];


const reportFile = `reports/gas-report-${new Date().toISOString().replace(/:/g, '-')}-${(process.argv.includes('--grep')) ? process.argv[process.argv.indexOf('--grep') + 1].replace("|","_") : 'all'}.log`

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  abiExporter: {
    path: "./abi",
    runOnCompile: true,
    clear: true,
    flat: false,
    spacing: 2,
  },
  mocha: {
    reporter: "spec",
  },
  excludeContracts: [
      "paths/to/ignore",
  ],
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  solidity: {
    typechain: {
      outDir: 'typechain',
      target: 'ethers-v5',
    },
    excludeContracts: [
      "paths/to/ignore",
    ],
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200000,
          },
        },
      }
    ],

    overrides: {
      "contracts/..../*": {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200000,
          },
        },
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },

  },
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
      allowUnlimitedContractSize: true,
      allowBlocksWithSameTimestamp: true,
      accounts: {
          count: 30
      },
      mining: {
          //auto: true,
          //interval: 0
      }
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPrice: 5,
    outputFile: reportFile,
    excludeContracts: [
      "paths/to/ignore",
    ],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  contractSizer: {
    disambiguatePaths: false,
    runOnCompile: true,
    strict: false,
  },
};

export default config;
