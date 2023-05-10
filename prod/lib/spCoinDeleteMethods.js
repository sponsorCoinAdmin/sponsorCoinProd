const {} = require("./utils/serialize");
const {} = require("./utils/logging");
const { SpCoinLoggingMethods } = require("./utils/logging");

let spCoinContractDeployed;
let spCoinLoggingMethods;
let signer;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

injectDeleteMethodsContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
  spCoinLoggingMethods = new SpCoinLoggingMethods(spCoinContractDeployed);
  setSigner3(spCoinContractDeployed.signer);
};

setSigner3 = (_signer) => {
  signer = _signer;
};

////////////////////////// DELETE ACCOUNT FUNCTIONS //////////////////////////

deleteAccountRecord = async (_accountKey) => {
  // ToDo: do Solidity Code and Testing
    spCoinLoggingMethods.logFunctionHeader("deleteAccountRecord = async(" + _accountKey + ")");
    spCoinLoggingMethods.logDetail("JS => Deleting Account " + _accountKey + " From Blockchain Network");
    await spCoinContractDeployed.connect(signer).deleteAccountRecord(_accountKey);
    spCoinLoggingMethods.logExitFunction();
};

deleteAccountRecords = async (_accountListKeys) => {
  spCoinLoggingMethods.logFunctionHeader("deleteAccountRecords = async(arrayAccounts)");
  let maxCount = _accountListKeys.length;
  spCoinLoggingMethods.logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");
  
  for (idx = 0; idx < maxCount; idx++) {
    let accountKey = _accountListKeys[idx];
    spCoinLoggingMethods.logDetail("JS => Deleting " + idx + ", " + accountKey);
    await deleteAccountRecord(accountKey);
  }
  spCoinLoggingMethods.logDetail("JS => Inserted " + maxCount + " Account to Blockchain Network");
  spCoinLoggingMethods.logExitFunction();
};

/////////////////////// RECIPIENT RECORD FUNCTIONS ///////////////////////

unSponsorRecipient = async (_sponsorKey, _recipientKey) => {
  spCoinLoggingMethods.logFunctionHeader("unSponsorRecipient(" + _sponsorKey.accountKey + ", " + _recipientKey + ")");
  await spCoinContractDeployed.connect(signer).unSponsorRecipient(_recipientKey);
  spCoinLoggingMethods.logExitFunction();
}

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

deleteAgentRecord = async (_accountKey, _recipientKey, _accountAgentKey) => {
  // ToDo: do Solidity Code and Testing
  spCoinLoggingMethods.logFunctionHeader(
    "deleteAgentRecord = async(" + _accountKey + ", " + _recipientKey + ", " + _accountAgentKey + ")"
  );
  spCoinLoggingMethods.logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  spCoinLoggingMethods.logDetail("JS => Deleting Agent " + _accountAgentKey + " From Blockchain Network");

  spCoinLoggingMethods.logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
  // await spCoinContractDeployed.connect(signer).deleteAgentRecord( _accountKey, _recipientKey, _agentKey );
  spCoinLoggingMethods.logDetail("JS => "+ "Deleted = " + _accountAgentKey + " Agent Record from RecipientKey " + _recipientKey);
  spCoinLoggingMethods.logExitFunction();
};

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  deleteAccountRecord,
  deleteAccountRecords,
  deleteAgentRecord,
  unSponsorRecipient,
  injectDeleteMethodsContract,
};
