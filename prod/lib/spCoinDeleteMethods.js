const {} = require("./utils/serialize");
const {} = require("./utils/logging");

let spCoinContractDeployed;
let signer;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

injectDeleteMethodsContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
  setSigner3(spCoinContractDeployed.signer);
};

setSigner3 = (_signer) => {
  signer = _signer;
};

////////////////////////// DELETE ACCOUNT FUNCTIONS //////////////////////////

deleteAccountRecord = async (_accountKey) => {
  // ToDo: do Solidity Code and Testing
    logFunctionHeader("deleteAccountRecord = async(" + _accountKey + ")");
    logDetail("JS => Deleting Account " + _accountKey + " From Blockchain Network");
    await spCoinContractDeployed.connect(signer).deleteAccountRecord(_accountKey);
    logExitFunction();
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
  logDetail("JS => Inserted " + maxCount + " Account to Blockchain Network");
  logExitFunction();
};

/////////////////////// RECIPIENT RECORD FUNCTIONS ///////////////////////

unSponsorRecipient = async (_sponsorKey, _recipientKey) => {
  logFunctionHeader("unSponsorRecipient(" + _sponsorKey.accountKey + ", " + _recipientKey + ")");
  await spCoinContractDeployed.connect(signer).unSponsorRecipient(_recipientKey);
  logExitFunction();
}

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

deleteAgentRecord = async (_accountKey, _recipientKey, _accountAgentKey) => {
  // ToDo: do Solidity Code and Testing
  logFunctionHeader(
    "deleteAgentRecord = async(" + _accountKey + ", " + _recipientKey + ", " + _accountAgentKey + ")"
  );
  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Deleting Agent " + _accountAgentKey + " From Blockchain Network");

  logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
  // await spCoinContractDeployed.connect(signer).deleteAgentRecord( _accountKey, _recipientKey, _agentKey );
  logDetail("JS => "+ "Deleted = " + _accountAgentKey + " Agent Record from RecipientKey " + _recipientKey);
  logExitFunction();
};

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  deleteAccountRecord,
  deleteAccountRecords,
  deleteAgentRecord,
  unSponsorRecipient,
  injectDeleteMethodsContract,
};
