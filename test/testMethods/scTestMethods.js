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

//////////////////////////// TEST BENIFICIARY METHODS ////////////////////////////

addTestNetworkPatronBenificiary = async (_accountIdx, _benificiaryIdx) => {
  logFunctionHeader("addTestNetworkPatronBenificiary = async (" + _accountIdx + ", " + _benificiaryIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let benificiaryKey = getTestHHAccountKey(_benificiaryIdx);  
  logDetail("JS => For Account: " + accountKey + " Inserting Benificiary Records");
  logDetail(benificiaryKey);
  await addPatronBenificiary(accountKey, benificiaryKey);
};

addTestNetworkPatronBenificiarias = async (_accountIdx, _benificiaryAccountListIdx) => {
  logFunctionHeader("addTestNetworkPatronBenificiarias = async (" + _accountIdx + ", " + _benificiaryAccountListIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let benificiaryAccountList = getTestHHAccountListKeys(_benificiaryAccountListIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Benificiary Records:");
  logDetail(benificiaryAccountList);
  await addPatronBenificiarias(accountKey, benificiaryAccountList);
};

//////////////////////////// TEST AGENT METHODS ////////////////////////////

addTestNetworkBenificiaryAgents = async ( _accountIdx, _benificiaryIdx, _benificiaryRateKey, _agentListIdx ) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _benificiaryIdx + "," + _agentListIdx+ ")");
  let accountKey = getTestHHAccountKey(_accountIdx);
  let benificiaryKey = getTestHHAccountKey(_benificiaryIdx);
  let agentAccountList = getTestHHAccountListKeys(_agentListIdx);

  await addBenificiaryAgents(accountKey, benificiaryKey, _benificiaryRateKey, agentAccountList);
  return benificiaryKey;
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

/////////////////////////// TEST UN-BENIFICIARY METHODS //////////////////////////

deleteTestPatronBenificiary = async (_patronIdx, _benificiaryIdx) => {
  logFunctionHeader("deleteTestPatronBenificiary(" + _patronIdx + ", " + _benificiaryIdx + ")");
  let patronKey = getTestHHAccountKey(_patronIdx);
  let benificiaryKey = getTestHHAccountKey(_benificiaryIdx);
  await deletePatronBenificiaryRecord(patronKey, benificiaryKey);
}

deleteTestNetworkPatronBenificiarias = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await (accountKey);
  return accountKey;
};

/*
deleteTestNetworkBenificiaryAgents = async (_testHHAccountIdx) => {
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
  addTestNetworkPatronBenificiary,
  addTestNetworkPatronBenificiarias,
  addTestNetworkBenificiaryAgents,
  deleteTestNetworkAccount,
  deleteTestPatronBenificiary,
  getTestHHAccountKey,
  getTestHHAccountRecord,
  logTestHHAccountRecord
}
