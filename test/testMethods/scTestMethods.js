const { testHHAccounts } = require("./hhTestAccounts");
const {
  setContract,
  addNetworkAccount,
  addAccountSponsors,
  addNetworkSponsorAgents,
  getNetworkAccounts,
  getSponsorKeys,
  getSponsorAgentKeys,
} = require("../prod/lib/scAccountMethods");

addTestNetworkAccountSponsors = async (_accountIdx, _sponsoredObjectArrayayIdx) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _sponsoredObjectArrayayIdx+ ")");
  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  let sponsoredObjectArrayayKeys = getTestHHAccountArrayKeys(_sponsoredObjectArrayayIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records:");
  logDetail(sponsoredObjectArrayayKeys);
  await addAccountSponsors(accountKey, sponsoredObjectArrayayKeys);
  return accountKey;
};

addTestNetworkSponsorAgents = async ( _accountIdx, _sponsorIdx, _agentArrayIdx ) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _sponsorIdx + "," + _agentArrayIdx+ ")");
  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  let sponsorAccountKey = testHHAccounts[_sponsorIdx].toLowerCase();
  let agentAccountKeys = getTestHHAccountArrayKeys(_agentArrayIdx);

  await addNetworkSponsorAgents(accountKey, sponsorAccountKey, agentAccountKeys);
  return sponsorAccountKey;
};

addTestNetworkAccount = async (testRecordNumber) => {
  logFunctionHeader("async (" + testRecordNumber+ ")");
  let accountKey = testHHAccounts[testRecordNumber].toLowerCase();
  await addNetworkAccount(accountKey);
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