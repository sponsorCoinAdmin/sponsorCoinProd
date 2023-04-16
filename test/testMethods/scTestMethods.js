const { TEST_HH_ACCOUNT_LIST } = require("./hhTestAccounts");
const {} = require("../../prod//lib/spCoinAddMethods");
const {} = require("../../prod//lib/spCoinReadMethods");
const {} = require("../../prod//lib/utils/logging");

getTestHHAccountKey = async (idx) => {
  return TEST_HH_ACCOUNT_LIST[idx].toLowerCase();
}

//////////////////////////// TEST ACCOUNT METHODS ////////////////////////////

addTestNetworkAccount = async (_accountIdx) => {
  logFunctionHeader("addTestNetworkAccount = async (" + _accountIdx + ")");
  let accountKey = getTestHHAccountKey(_accountIdx);
  logDetail("JS => For Adding Account Record: " + accountKey );
  await addAccountRecord(accountKey);
};

addTestNetworkAccounts = async (_AccountList) => {
  logFunctionHeader("addTestNetworkAccounts = async (" + _AccountList + ")");
  let testHHAccountList = getTestHHAccountListKeys(_AccountList);
  logDetail("JS => For Adding Account Records: " + testHHAccountList );
  await addAccountRecords(testHHAccountList);
};

//////////////////////////// TEST RECIPIENT METHODS ////////////////////////////

addTestNetworkSponsorRecipient = async (_accountIdx, _recipientIdx) => {
  logFunctionHeader("addTestNetworkSponsorRecipient = async (" + _accountIdx + ", " + _recipientIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let recipientKey = getTestHHAccountKey(_recipientIdx);  
  logDetail("JS => For Account: " + accountKey + " Inserting Recipient Records");
  logDetail(recipientKey);
  await addSponsorRecipient(accountKey, recipientKey);
};

addTestNetworkSponsorRecipients = async (_accountIdx, _recipientAccountListIdx) => {
  logFunctionHeader("addTestNetworkSponsorRecipients = async (" + _accountIdx + ", " + _recipientAccountListIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let recipientAccountList = getTestHHAccountListKeys(_recipientAccountListIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Recipient Records:");
  logDetail(recipientAccountList);
  await addSponsorRecipients(accountKey, recipientAccountList);
};

//////////////////////////// TEST AGENT METHODS ////////////////////////////

addTestNetworkRecipientAgents = async ( _accountIdx, _recipientIdx, _recipientRateKey, _agentListIdx ) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _recipientIdx + "," + _agentListIdx+ ")");
  let accountKey = getTestHHAccountKey(_accountIdx);
  let recipientKey = getTestHHAccountKey(_recipientIdx);
  let agentAccountList = getTestHHAccountListKeys(_agentListIdx);

  await addRecipientAgents(accountKey, recipientKey, _recipientRateKey, agentAccountList);
  return recipientKey;
};

addTestNetworkAccount = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await addAccountRecord(accountKey);
  return accountKey;
};

getTestHHAccountListKeys = (testAccountIdxArr) => {
  logFunctionHeader("getTestHHAccountListKeys (" + testAccountIdxArr + ")");
  let AccountListKeys = [];
  for (let i = 0; i < testAccountIdxArr.length; i++) {
    AccountListKeys.push(getTestHHAccountKey(testAccountIdxArr[i]));
  }
  return AccountListKeys;
};

getTestHHAccountRecord = (testHHAccountIdx) => {
  testHHAccountKey = getTestHHAccountKey(testHHAccountIdx);
  testHHAccountRecord = getAccountRecord(testHHAccountKey);
  return testHHAccountRecord;
}

logTestHHAccountRecord = (testHHAccountIdx) => {
  testHHAccountKey = getTestHHAccountKey(testHHAccountIdx);
  testHHAccountRecord = logJSONAccount(testHHAccountKey);
  return testHHAccountRecord;
}

///////////////////////////// DELETE METHODS ///////////////////////////////

deleteTestNetworkAccount = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await deleteAccountRecord(accountKey);
  return accountKey;
};

deleteTestNetworkAccounts = async (_testHHAccountArr) => {
  logFunctionHeader("async (" + _testHHAccountArr+ ")");
  testHHAccountList = getTestHHAccountListKeys(_testHHAccountArr);
  await deleteAccountRecords(testHHAccountList);
};

/////////////////////////// TEST UN-RECIPIENT METHODS //////////////////////////

deleteTestSponsorRecipient = async (_sponsorIdx, _recipientIdx) => {
  logFunctionHeader("deleteTestSponsorRecipient(" + _sponsorIdx + ", " + _recipientIdx + ")");
  let sponsorKey = getTestHHAccountKey(_sponsorIdx);
  let recipientKey = getTestHHAccountKey(_recipientIdx);
  await deleteSponsorRecipientRecord(sponsorKey, recipientKey);
}

deleteTestNetworkSponsorRecipients = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await (accountKey);
  return accountKey;
};

/*
deleteTestNetworkRecipientAgents = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await deleteAgentRecords(accountKey);
  return accountKey;
};
*/

module.exports = {
  getTestHHAccountListKeys,
  addTestNetworkAccount,
  addTestNetworkAccounts,
  addTestNetworkSponsorRecipient,
  addTestNetworkSponsorRecipients,
  addTestNetworkRecipientAgents,
  deleteTestNetworkAccount,
  deleteTestSponsorRecipient,
  getTestHHAccountKey,
  getTestHHAccountRecord,
  logTestHHAccountRecord
}
