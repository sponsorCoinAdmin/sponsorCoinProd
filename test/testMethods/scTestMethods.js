const { testHHAccounts } = require("./hhTestAccounts");
const {
  setCreateContract,
  addAccountRecord,
  addAccountSponsors,
  addSponsorAgents,
  getAccountKeys,
  getAccountSponsorKeys,
  getSponsorAgentKeys,
} = require("../prod/lib/scAccountCreateMethods");

addTestNetworkAccountSponsors = async (_accountIdx, _accountSponsorObjectsayIdx) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _accountSponsorObjectsayIdx+ ")");
  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  let accountSponsorObjectKeys = getTestHHAccountArrayKeys(_accountSponsorObjectsayIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records:");
  logDetail(accountSponsorObjectKeys);
  await addAccountSponsors(accountKey, accountSponsorObjectKeys);
  return accountKey;
};

addTestNetworkSponsorAgents = async ( _accountIdx, _sponsorIdx, _agentArrayIdx ) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _sponsorIdx + "," + _agentArrayIdx+ ")");
  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  let sponsorAccountKey = testHHAccounts[_sponsorIdx].toLowerCase();
  let accountAgentKeys = getTestHHAccountArrayKeys(_agentArrayIdx);

  await addSponsorAgents(accountKey, sponsorAccountKey, accountAgentKeys);
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

deleteTestNetworkAccountSponsors = async (testRecordNumber) => {
  logFunctionHeader("async (" + testRecordNumber+ ")");
  let accountKey = testHHAccounts[testRecordNumber].toLowerCase();
  await deleteAccountSponsors(accountKey);
  return accountKey;
};

deleteTestNetworkSponsorAgents = async (testRecordNumber) => {
  logFunctionHeader("async (" + testRecordNumber+ ")");
  let accountKey = testHHAccounts[testRecordNumber].toLowerCase();
  await deleteSponsorAgents(accountKey);
  return accountKey;
};

module.exports = {
  addTestNetworkAccountSponsors,
  addTestNetworkSponsorAgents,
  addTestNetworkAccount,
  getTestHHAccountArrayKeys
}