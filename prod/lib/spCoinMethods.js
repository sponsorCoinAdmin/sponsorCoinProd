const { SpCoinLogger, LOG_MODE } = require("./utils/logging");
const { SpCoinERC20Methods } = require("./spCoinTransferMethods");
const { SpCoinDeleteMethods } = require("./spCoinDeleteMethods");
const { SpCoinAddMethods } = require("./spCoinAddMethods");
const { SpCoinReadMethods } = require("./SpCoinReadMethods");

/*
let spCoinContractDeployed;
let BURN_ACCOUNT;
let spCoinAddMethods;
let spCoinDeleteMethods;
let spCoinReadMethods;
let spCoinERC20Methods;
let spCoinLogger;
let hhTestElements;
*/

initSPCoin = async () => {
  hhTestElements = await initHHAccounts();
  spCoinContractDeployed = await deploySpCoinContract();
  spCoinAddMethods = new SpCoinAddMethods(spCoinContractDeployed);
  spCoinReadMethods = new SpCoinReadMethods(spCoinContractDeployed);
  spCoinERC20Methods = new SpCoinERC20Methods(spCoinContractDeployed);
  spCoinDeleteMethods = new SpCoinDeleteMethods(spCoinContractDeployed);
  spCoinLogger = new SpCoinLogger(spCoinContractDeployed);
  spCoinLogger.logSetup("JS => Setup Test");
  spCoinLogger.setLogMode(LOG_MODE.LOG_FUNCTION_HEADER, false);
  SPONSOR_ACCOUNT_SIGNERS = hhTestElements.signers;
  RECIPIENT_ACCOUNT_KEYS = AGENT_ACCOUNT_KEYS = hhTestElements.accounts;
  TRANSACTION_QTY = RECIPIENT_RATES = AGENT_RATES = hhTestElements.rates;
  BURN_ACCOUNT = hhTestElements.burnAddress;
};

module.exports = {
  SpCoinLogger, LOG_MODE,
  SpCoinERC20Methods,
  SpCoinDeleteMethods,
  SpCoinAddMethods,
  SpCoinReadMethods
};