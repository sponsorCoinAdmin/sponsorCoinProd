/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require('hardhat-contract-sizer');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version:  "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      }
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: ['SPCoin'],
  }
};
