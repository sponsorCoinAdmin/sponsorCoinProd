const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("./dataTypes");

const {} = require("./utils/serialize");

const { logFunctionHeader, logDetail } = require("./utils/logging");

let spCoinContractDeployed;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

setDeleteContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

////////////////////////// ACCOUNT OBJECT FUNCTIONS //////////////////////////

deleteAccount = async (_accountKey) => {
  // ToDo: do Solidity Code and Testing
    logFunctionHeader("deleteAccount = async(" + _accountKey + ")");
    logDetail("JS => Deleting Account " + _accountKey + " From Blockchain Network");
    await spCoinContractDeployed.deleteAccount(_accountKey);
  };
  
/////////////////////// SPONSOR OBJECT FUNCTIONS ///////////////////////

deleteAccountSponsor = async (_accountKey, _sponsorKey) => {
  // ToDo: do Solidity Code and Testing
  logFunctionHeader(
    "deleteAccountSponsor = async(" + _accountKey + ", " + _sponsorKey + ")"
  );

  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Deleting " + _sponsorKey + " Sponsor From Blockchain Network"
  );

  logDetail("JS => Deleting Sponsor " + _sponsorKey );
  await spCoinContractDeployed.deleteAccountSponsor(_accountKey, _sponsorKey);
};

/////////////////////// AGENT OBJECT FUNCTIONS ////////////////////////

deleteSponsorAgent = async (_accountKey, _sponsorAccountKey, _accountAgentKey) => {
  // ToDo: do Solidity Code and Testing
  logFunctionHeader(
    "deleteSponsorAgent = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKey + ")"
  );
  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Deleting Agent " + _accountAgentKey + " From Blockchain Network");

  logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
  // await spCoinContractDeployed.deleteSponsorAgent( _accountKey, _sponsorAccountKey, _agentAccountKey );
  logDetail("JS => "+ "Deleted = " + _accountAgentKey + " Agent Record from SponsorKey " + _sponsorAccountKey);
};

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {

  deleteAccount,
  deleteAccountSponsor,
  deleteSponsorAgent,
  setDeleteContract,
};
