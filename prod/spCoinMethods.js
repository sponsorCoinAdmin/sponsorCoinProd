const { SpCoinLogger, LOG_MODE } = require("./lib/utils/logging");
const { SpCoinERC20Methods } = require("./lib/spCoinTransferMethods");
const { SpCoinDeleteMethods } = require("./lib/spCoinDeleteMethods");
const { SpCoinAddMethods } = require("./lib/spCoinAddMethods");
const { SpCoinReadMethods } = require("./lib/SpCoinReadMethods");

spCoinConnectMethods = async (spCoinContractDeployed) => {
  spCoinAddMethods = new SpCoinAddMethods(spCoinContractDeployed);
  spCoinReadMethods = new SpCoinReadMethods(spCoinContractDeployed);
  spCoinERC20Methods = new SpCoinERC20Methods(spCoinContractDeployed);
  spCoinDeleteMethods = new SpCoinDeleteMethods(spCoinContractDeployed);
  spCoinLogger = new SpCoinLogger(spCoinContractDeployed);
}
