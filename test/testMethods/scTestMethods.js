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

addTestNetworkAccounts = async (_accountKeys) => {
  logFunctionHeader("addTestNetworkAccounts = async (" + _accountKeys + ")");
  let testHHAccountKeys = getTestHHAccountListKeys(_accountKeys);
  logDetail("JS => For Adding Account Records: " + testHHAccountKeys );
  await addAccountRecords(testHHAccountKeys);
};

//////////////////////////// TEST SPONSOR METHODS ////////////////////////////

addTestNetworkPatronSponsor = async (_accountIdx, _sponsorIdx) => {
  logFunctionHeader("addTestNetworkPatronSponsor = async (" + _accountIdx + ", " + _sponsorIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let sponsorKey = getTestHHAccountKey(_sponsorIdx);  
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records");
  logDetail(sponsorKey);
  await addPatronSponsor(accountKey, sponsorKey);
};

addTestNetworkPatronSponsors = async (_accountIdx, _sponsorAccount2KeysIdx) => {
  logFunctionHeader("addTestNetworkPatronSponsors = async (" + _accountIdx + ", " + _sponsorAccount2KeysIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let accountSponsorRecordKeys = getTestHHAccountListKeys(_sponsorAccount2KeysIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records:");
  logDetail(accountSponsorRecordKeys);
  await addPatronSponsors(accountKey, accountSponsorRecordKeys);
};

//////////////////////////// TEST AGENT METHODS ////////////////////////////

addTestNetworkSponsorAgents = async ( _accountIdx, _sponsorIdx, _sponsorRateKey, _agentListIdx ) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _sponsorIdx + "," + _agentListIdx+ ")");
  let accountKey = getTestHHAccountKey(_accountIdx);
  let sponsorAccountKey = getTestHHAccountKey(_sponsorIdx);
  let agentAccountKeys = getTestHHAccountListKeys(_agentListIdx);

  await addSponsorAgents(accountKey, sponsorAccountKey, _sponsorRateKey, agentAccountKeys);
  return sponsorAccountKey;
};

addTestNetworkAccount = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await addAccountRecord(accountKey);
  return accountKey;
};

getTestHHAccountListKeys = (testAccountIdxArr) => {
  logFunctionHeader("getTestHHAccountListKeys (" + testAccountIdxArr + ")");
  let accountKeysKeys = [];
  for (let i = 0; i < testAccountIdxArr.length; i++) {
    accountKeysKeys.push(getTestHHAccountKey(testAccountIdxArr[i]));
  }
  return accountKeysKeys;
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
  testHHAccountKeys = getTestHHAccountListKeys(_testHHAccountArr);
  await deleteAccountRecords(testHHAccountKeys);
};

/////////////////////////// TEST UN-SPONSOR METHODS //////////////////////////

deleteTestPatronSponsor = async (_patreonIdx, _sponsorIdx) => {
  logFunctionHeader("deleteTestPatronSponsor(" + _patreonIdx + ", " + _sponsorIdx + ")");
  let patreonKey = getTestHHAccountKey(_patreonIdx);
  let sponsorKey = getTestHHAccountKey(_sponsorIdx);
  await deletePatronSponsorRecord(patreonKey, sponsorKey);
}

deleteTestNetworkPatronSponsors = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await (accountKey);
  return accountKey;
};

/*
deleteTestNetworkSponsorAgents = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await deletePatronSponsorAgentRecords(accountKey);
  return accountKey;
};
*/

module.exports = {
  getTestHHAccountListKeys,
  addTestNetworkAccount,
  addTestNetworkAccounts,
  addTestNetworkPatronSponsor,
  addTestNetworkPatronSponsors,
  addTestNetworkSponsorAgents,
  deleteTestNetworkAccount,
  deleteTestPatronSponsor,
  getTestHHAccountKey,
  getTestHHAccountRecord,
  logTestHHAccountRecord
}
