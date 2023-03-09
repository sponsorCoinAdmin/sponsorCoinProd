const { testHHAccounts } = require("./hhTestAccounts");
const {
  setCreateContract,
  addAccountRecord,
  addAccountRecords,
  addPatreonSponsors,
  addSponsorAgents,
  getAccountKeys,
  getPatreonSponsorKeys,
  getChildAgentKeys,
} = require("../prod/lib/scAccountMethods");
const { logFunctionHeader } = require("../prod/lib/utils/logging");

//////////////////////////// TEST ACCOUNT METHODS ////////////////////////////

addTestNetworkAccount = async (_accountIdx) => {
  logFunctionHeader("addTestNetworkAccount = async (" + _accountIdx + ")");
  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  logDetail("JS => For Adding Account Record: " + accountKey );
  await addAccountRecord(accountKey);
};

addTestNetworkAccounts = async (accountIndexes) => {
  logFunctionHeader("addTestNetworkAccounts = async (" + accountIndexes + ")");
  let accountKeys = getTestHHAccountArrayKeys(accountIndexes);
  logDetail("JS => For Adding Account Records: " + accountKeys );
  await addAccountRecords(accountKeys);
};

//////////////////////////// TEST SPONSOR METHODS ////////////////////////////

addTestNetworkPatreonSponsors = async (_accountIdx, _accountChildSponsorKeysIdx) => {
  logFunctionHeader("addTestNetworkPatreonSponsors = async (" + _accountIdx + ", " + _accountChildSponsorKeysIdx + ")");

  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  let accountSponsorObjectKeys = getTestHHAccountArrayKeys(_accountChildSponsorKeysIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records:");
  logDetail(accountSponsorObjectKeys);
  await addPatreonSponsors(accountKey, accountSponsorObjectKeys);
};

//////////////////////////// TEST AGENT METHODS ////////////////////////////

addTestNetworkSponsorAgents = async ( _accountIdx, _sponsorIdx, _agentArrayIdx ) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _sponsorIdx + "," + _agentArrayIdx+ ")");
  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  let sponsorAccountKey = testHHAccounts[_sponsorIdx].toLowerCase();
  let accountChildAgentKeys = getTestHHAccountArrayKeys(_agentArrayIdx);

  await addSponsorAgents(accountKey, sponsorAccountKey, accountChildAgentKeys);
  return sponsorAccountKey;
};


addTestNetworkAccount = async (testRecordNumber) => {
  logFunctionHeader("async (" + testRecordNumber+ ")");
  let accountKey = testHHAccounts[testRecordNumber].toLowerCase();
  await addAccountRecord(accountKey);
  return accountKey;
};

getTestHHAccountArrayKeys = (testAccountIdxArr) => {
  logFunctionHeader("getTestHHAccountArrayKeys (" + testAccountIdxArr + ")");
  let accountIdxArrayKeys = [];
  for (let i = 0; i < testAccountIdxArr.length; i++) {
    accountIdxArrayKeys.push(testHHAccounts[testAccountIdxArr[i]]);
  }
  return accountIdxArrayKeys;
};

///////////////////////////// DELETE METHODS ///////////////////////////////

deleteTestNetworkAccount = async (testRecordNumber) => {
  logFunctionHeader("async (" + testRecordNumber+ ")");
  let accountKey = testHHAccounts[testRecordNumber].toLowerCase();
  await deleteAccount(accountKey);
  return accountKey;
};

deleteTestNetworkPatreonSponsors = async (testRecordNumber) => {
  logFunctionHeader("async (" + testRecordNumber+ ")");
  let accountKey = testHHAccounts[testRecordNumber].toLowerCase();
  await deletePatreonSponsors(accountKey);
  return accountKey;
};

deleteTestNetworkSponsorAgents = async (testRecordNumber) => {
  logFunctionHeader("async (" + testRecordNumber+ ")");
  let accountKey = testHHAccounts[testRecordNumber].toLowerCase();
  await deleteSponsorAgents(accountKey);
  return accountKey;
};

module.exports = {
  addTestNetworkAccounts,
  deleteTestNetworkAccount,
  addTestNetworkPatreonSponsors,
  addTestNetworkSponsorAgents,
  addTestNetworkAccount,
  getTestHHAccountArrayKeys
}