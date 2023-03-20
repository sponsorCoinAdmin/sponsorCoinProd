const { testHHAccounts } = require("./hhTestAccounts");
const { getAccountRecord } = require("../prod/lib/loadStructures");
const {
  setCreateContract,
  addAccountRecord,
  addAccountRecords,
  addPatreonSponsors,
  addSponsorAgents,
  deletePatreonSponsor,
  getAccountKeys,
  getPatreonSponsorKeys,
  getAgentKeys,
} = require("../prod/lib/scAccountMethods");


const {} = require("../prod/lib/utils/serialize");

const { logFunctionHeader } = require("../prod/lib/utils/logging");

getTestHHAccountKey = async (idx) => {
  return testHHAccounts[idx].toLowerCase();
}

//////////////////////////// TEST ACCOUNT METHODS ////////////////////////////

addTestNetworkAccount = async (_accountIdx) => {
  logFunctionHeader("addTestNetworkAccount = async (" + _accountIdx + ")");
  let accountKey = getTestHHAccountKey(_accountIdx);
  logDetail("JS => For Adding Account Record: " + accountKey );
  await addAccountRecord(accountKey);
};

addTestNetworkAccounts = async (accountIndexes) => {
  logFunctionHeader("addTestNetworkAccounts = async (" + accountIndexes + ")");
  let accountKeys = getTestHHAccountListKeys(accountIndexes);
  logDetail("JS => For Adding Account Records: " + accountKeys );
  await addAccountRecords(accountKeys);
};

//////////////////////////// TEST SPONSOR METHODS ////////////////////////////

addTestNetworkPatreonSponsor = async (_accountIdx, _sponsorIdx) => {
  logFunctionHeader("addTestNetworkPatreonSponsor = async (" + _accountIdx + ", " + _sponsorIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let sponsorKey = getTestHHAccountKey(_sponsorIdx);  
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records");
  logDetail(sponsorKey);
  await addPatreonSponsor(accountKey, sponsorKey);
};

addTestNetworkPatreonSponsors = async (_accountIdx, _accountSponsorKeysIdx) => {
  logFunctionHeader("addTestNetworkPatreonSponsors = async (" + _accountIdx + ", " + _accountSponsorKeysIdx + ")");

  let accountKey = getTestHHAccountKey(_accountIdx);
  let accountSponsorRecordKeys = getTestHHAccountListKeys(_accountSponsorKeysIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records:");
  logDetail(accountSponsorRecordKeys);
  await addPatreonSponsors(accountKey, accountSponsorRecordKeys);
};

//////////////////////////// TEST AGENT METHODS ////////////////////////////

addTestNetworkSponsorAgents = async ( _accountIdx, _sponsorIdx, _agentArrayIdx ) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _sponsorIdx + "," + _agentArrayIdx+ ")");
  let accountKey = getTestHHAccountKey(_accountIdx);
  let sponsorAccountKey = getTestHHAccountKey(_sponsorIdx);
  let accountAgentKeys = getTestHHAccountListKeys(_agentArrayIdx);

  await addSponsorAgents(accountKey, sponsorAccountKey, accountAgentKeys);
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
  let accountIdxArrayKeys = [];
  for (let i = 0; i < testAccountIdxArr.length; i++) {
    accountIdxArrayKeys.push(getTestHHAccountKey(testAccountIdxArr[i]));
  }
  return accountIdxArrayKeys;
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
  await deleteAccount(accountKey);
  return accountKey;
};

deleteTestNetworkAccounts = async (_testHHAccountArr) => {
  logFunctionHeader("async (" + _testHHAccountArr+ ")");
  accountArrayKeys = getTestHHAccountListKeys(_testHHAccountArr);
  await deleteAccounts(accountArrayKeys);
};

/////////////////////////// TEST UN-SPONSOR METHODS //////////////////////////

deleteTestPatreonSponsor = async (_patreonIdx, _sponsorIdx) => {
  logFunctionHeader("deleteTestPatreonSponsor(" + _patreonIdx + ", " + _sponsorIdx + ")");
  let patreonKey = getTestHHAccountKey(_patreonIdx);
  let sponsorKey = getTestHHAccountKey(_sponsorIdx);
  await deletePatreonSponsor(patreonKey, sponsorKey);
}

deleteTestNetworkPatreonSponsors = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await (accountKey);
  return accountKey;
};

deleteTestNetworkSponsorAgents = async (_testHHAccountIdx) => {
  logFunctionHeader("async (" + _testHHAccountIdx+ ")");
  let accountKey = getTestHHAccountKey(_testHHAccountIdx);
  await deleteSponsorAgents(accountKey);
  return accountKey;
};

module.exports = {
  getTestHHAccountListKeys,
  addTestNetworkAccount,
  addTestNetworkAccounts,
  addTestNetworkPatreonSponsor,
  addTestNetworkPatreonSponsors,
  addTestNetworkSponsorAgents,
  deleteTestNetworkAccount,
  deleteTestPatreonSponsor,
  getTestHHAccountKey,
  getTestHHAccountRecord,
  logTestHHAccountRecord
}
