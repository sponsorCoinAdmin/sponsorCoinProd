const { TEST_HH_ACCOUNT_LIST } = require("./hhTestAccounts");
const {} = require("../../prod//lib/spCoinAddMethods");
const {} = require("../../prod//lib/spCoinReadMethods");
const {} = require("../../prod//lib/utils/logging");
let hhTestElements = undefined;


getTestHHAccountKey = async (idx) => {
  if (hhTestElements === undefined) {
     hhTestElements = await initHHAccounts();
  }
  const signers = hhTestElements.signers;
  const accounts = hhTestElements.accounts;
  const rates = hhTestElements.rates;
  return accounts[idx];
}

//////////////////////////// TEST ACCOUNT METHODS ////////////////////////////

addTestNetworkAccount = async (_accountIdx) => {
  logFunctionHeader("addTestNetworkAccount = async (" + _accountIdx + ")");
  let accountKey = await getTestHHAccountKey(_accountIdx);
  logDetail("JS => For Adding Account Record: " + accountKey );
  await addAccountRecord(accountKey);
};

addTestNetworkAccounts = async (_AccountList) => {
  logFunctionHeader("addTestNetworkAccounts = async (" + _AccountList + ")");
  let testHHAccountList = await getTestHHAccountListKeys(_AccountList);
  logDetail("JS => For Adding Account Records: " + testHHAccountList );
  await addAccountRecords(testHHAccountList);
};

//////////////////////////// TEST RECIPIENT METHODS ////////////////////////////

addTestNetworkRecipient = async (_accountIdx, _recipientIdx) => {
  logFunctionHeader("addTestNetworkRecipient = async (" + _accountIdx + ", " + _recipientIdx + ")");

  let accountKey = await getTestHHAccountKey(_accountIdx);
  let recipientKey = await getTestHHAccountKey(_recipientIdx);  
  logDetail("JS => For Account: " + accountKey + " Inserting Recipient Records");
  logDetail(recipientKey);
  await addRecipient(recipientKey);
};

addTestNetworkRecipients = async (_accountIdx, _recipientAccountListIdx) => {
  logFunctionHeader("addTestNetworkRecipients = async (" + _accountIdx + ", " + _recipientAccountListIdx + ")");

  let accountKey = await getTestHHAccountKey(_accountIdx);
  let recipientAccountList = await getTestHHAccountListKeys(_recipientAccountListIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Recipient Records:");
  logDetail(recipientAccountList);
  await addRecipients(accountKey, recipientAccountList);
};

//////////////////////////// TEST AGENT METHODS ////////////////////////////

addTestNetworkRecipientAgents = async (_recipientIdx, _recipientRateKey, _agentListIdx ) => {
  logFunctionHeader("async (" + _recipientIdx + "," + _agentListIdx+ ")");
  let recipientKey = await getTestHHAccountKey(_recipientIdx);
  let agentAccountList = await getTestHHAccountListKeys(_agentListIdx);
  await addAgents(recipientKey, _recipientRateKey, agentAccountList);
  return recipientKey;
};

addTestNetworkAccount = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = await getTestHHAccountKey(_testHHAccountIdx);
  await addAccountRecord(accountKey);
  return accountKey;
};

getTestHHAccountListKeys = async (testAccountIdxArr) => {
  logFunctionHeader("await getTestHHAccountListKeys (" + testAccountIdxArr + ")");
  let AccountListKeys = [];
  for (let i = 0; i < testAccountIdxArr.length; i++) {
    AccountListKeys.push(await getTestHHAccountKey(testAccountIdxArr[i]));
  }
  return AccountListKeys;
};

getTestHHAccountRecord = async (testHHAccountIdx) => {
  testHHAccountKey = await getTestHHAccountKey(testHHAccountIdx);
  testHHAccountRecord = getAccountRecord(testHHAccountKey);
  return testHHAccountRecord;
}

logTestHHAccountRecord = async (testHHAccountIdx) => {
  testHHAccountKey = await getTestHHAccountKey(testHHAccountIdx);
  testHHAccountRecord = logJSONAccount(testHHAccountKey);
  return testHHAccountRecord;
}

///////////////////////////// DELETE METHODS ///////////////////////////////

deleteTestNetworkAccount = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = await getTestHHAccountKey(_testHHAccountIdx);
  await deleteAccountRecord(accountKey);
  return accountKey;
};

deleteTestNetworkAccounts = async (_testHHAccountArr) => {
  logFunctionHeader("async (" + _testHHAccountArr+ ")");
  testHHAccountList = await getTestHHAccountListKeys(_testHHAccountArr);
  await deleteAccountRecords(testHHAccountList);
};

/////////////////////////// TEST UN-RECIPIENT METHODS //////////////////////////

deleteTestRecipient = async (_recipientIdx) => {
  logFunctionHeader("deleteTestRecipient(" + _sponsorIdx + ", " + _recipientIdx + ")");
  let recipientKey = await getTestHHAccountKey(_recipientIdx);
  await deleteRecipientRecord(recipientKey);
}

deleteTestNetworkRecipients = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = await getTestHHAccountKey(_testHHAccountIdx);
  await (accountKey);
  return accountKey;
};

/*
deleteTestNetworkRecipientAgents = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = await getTestHHAccountKey(_testHHAccountIdx);
  await deleteAgentRecords(accountKey);
  return accountKey;
};
*/

module.exports = {
  getTestHHAccountListKeys,
  addTestNetworkAccount,
  addTestNetworkAccounts,
  addTestNetworkRecipient,
  addTestNetworkRecipients,
  addTestNetworkRecipientAgents,
  deleteTestNetworkAccount,
  deleteTestRecipient,
  getTestHHAccountKey,
  getTestHHAccountRecord,
  logTestHHAccountRecord
}
