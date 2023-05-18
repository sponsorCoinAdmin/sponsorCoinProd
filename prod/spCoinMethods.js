const { SpCoinAddMethods }       = require("./lib/spCoinAddMethods");
const { SpCoinDeleteMethods }    = require("./lib/spCoinDeleteMethods");
const { SpCoinReadMethods }      = require("./lib/spCoinReadMethods");
const { SpCoinStakingMethods }   = require("./lib/spCoinStakingMethods");
const { SpCoinERC20Methods }     = require("./lib/spCoinTransferMethods");
const { SpCoinLogger, LOG_MODE } = require("./lib/utils/logging");

spCoinConnectMethods = async (spCoinContractDeployed) => {
  spCoinAddMethods     = new SpCoinAddMethods(spCoinContractDeployed);
  spCoinDeleteMethods  = new SpCoinDeleteMethods(spCoinContractDeployed);
  spCoinERC20Methods   = new SpCoinERC20Methods(spCoinContractDeployed);
  spCoinReadMethods    = new SpCoinReadMethods(spCoinContractDeployed);
  spCoinStakingMethods = new SpCoinStakingMethods(spCoinContractDeployed);
  spCoinLogger         = new SpCoinLogger(spCoinContractDeployed);
}

module.exports = {
  spCoinConnectMethods
}