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

//////////////////////////// TEST SPONSOR METHODS ////////////////////////////

addTestNetworkPatronSponsor = async (_accountIdx, _sponsorIdx) => {
  logFunctionHeader("addTestNetworkPatronSponsor = async (" + _accountIdx + ", " + _sponsorIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let sponsorKey = getTestHHAccountKey(_sponsorIdx);  
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records");
  logDetail(sponsorKey);
  await addPatronSponsor(accountKey, sponsorKey);
};

addTestNetworkPatronSponsors = async (_accountIdx, _sponsorAccountListIdx) => {
  logFunctionHeader("addTestNetworkPatronSponsors = async (" + _accountIdx + ", " + _sponsorAccountListIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let sponsorAccountList = getTestHHAccountListKeys(_sponsorAccountListIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records:");
  logDetail(sponsorAccountList);
  await addPatronSponsors(accountKey, sponsorAccountList);
};

//////////////////////////// TEST AGENT METHODS ////////////////////////////

addTestNetworkSponsorAgents = async ( _accountIdx, _sponsorIdx, _sponsorRateKey, _agentListIdx ) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _sponsorIdx + "," + _agentListIdx+ ")");
  let accountKey = getTestHHAccountKey(_accountIdx);
  let sponsorAccountKey = getTestHHAccountKey(_sponsorIdx);
  let agentAccountList = getTestHHAccountListKeys(_agentListIdx);

  await addSponsorAgents(accountKey, sponsorAccountKey, _sponsorRateKey, agentAccountList);
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

/////////////////////////// TEST UN-SPONSOR METHODS //////////////////////////

deleteTestPatronSponsor = async (_patronIdx, _sponsorIdx) => {
  logFunctionHeader("deleteTestPatronSponsor(" + _patronIdx + ", " + _sponsorIdx + ")");
  let patronKey = getTestHHAccountKey(_patronIdx);
  let sponsorKey = getTestHHAccountKey(_sponsorIdx);
  await deletePatronSponsorRecord(patronKey, sponsorKey);
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
  await deleteAgentRecords(accountKey);
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
