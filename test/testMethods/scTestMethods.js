const { testHHAccounts } = require("./hhTestAccounts");
const {
  setContract,
  addAccountRecord,
  addAccountSponsors,
  addSponsorAgents,
  getAccountKeys,
  getAccountSponsorKeys,
  getSponsorAgentKeys,
} = require("../prod/lib/scAccountMethods");

addTestNetworkAccountSponsors = async (_accountIdx, _accountSponsorObjectsayIdx) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _accountSponsorObjectsayIdx+ ")");
  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  let accountSponsorObjectsayKeys = getTestHHAccountArrayKeys(_accountSponsorObjectsayIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records:");
  logDetail(accountSponsorObjectsayKeys);
  await addAccountSponsors(accountKey, accountSponsorObjectsayKeys);
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

module.exports = {
  addTestNetworkAccountSponsors,
  addTestNetworkSponsorAgents,
  addTestNetworkAccount,
  getTestHHAccountArrayKeys
}