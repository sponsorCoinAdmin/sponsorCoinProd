const {} = require("./utils/serialize");
const {} = require("./utils/logging");

let spCoinContractDeployed;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

setContractDeleteMethods = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

////////////////////////// DELETE ACCOUNT FUNCTIONS //////////////////////////

deleteAccountRecord = async (_accountKey) => {
  // ToDo: do Solidity Code and Testing
    logFunctionHeader("deleteAccountRecord = async(" + _accountKey + ")");
    logDetail("JS => Deleting Account " + _accountKey + " From Blockchain Network");
    await spCoinContractDeployed.deleteAccountRecord(_accountKey);
};

deleteAccountRecords = async (_accountListKeys) => {
  logFunctionHeader("deleteAccountRecords = async(arrayAccounts)");
  let maxCount = _accountListKeys.length;
  logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");
  
  for (idx = 0; idx < maxCount; idx++) {
    let accountKey = _accountListKeys[idx];
    logDetail("JS => Deleting " + idx + ", " + accountKey);
    await deleteAccountRecord(accountKey);
  }
  logDetail("JS => Inserted " + maxCount + " Accounts to Blockchain Network");
};

/////////////////////// SPONSOR RECORD FUNCTIONS ///////////////////////

deletePatreonSponsorRecord = async (_patreonKey, _sponsorKey) => {
  logFunctionHeader("deletePatreonSponsorRecord(" + _patreonKey + ", " + _sponsorKey + ")");
  await spCoinContractDeployed.deletePatreonSponsorRecord(_patreonKey, _sponsorKey);
}

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

deletePatreonSponsorAgentRecord = async (_accountKey, _sponsorAccountKey, _accountAgentKey) => {
  // ToDo: do Solidity Code and Testing
  logFunctionHeader(
    "deletePatreonSponsorAgentRecord = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKey + ")"
  );
  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Deleting Agent " + _accountAgentKey + " From Blockchain Network");

  logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
  // await spCoinContractDeployed.deletePatreonSponsorAgentRecord( _accountKey, _sponsorAccountKey, _agentAccountKey );
  logDetail("JS => "+ "Deleted = " + _accountAgentKey + " Agent Record from SponsorKey " + _sponsorAccountKey);
};

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  deleteAccountRecord,
  deleteAccountRecords,
  deletePatreonSponsorAgentRecord,
  deletePatreonSponsorRecord,
  setContractDeleteMethods,
};
