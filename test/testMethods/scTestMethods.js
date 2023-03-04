const { testHHAccounts } = require("./hhTestAccounts");
const {
  setContract,
  addNetworkAccount,
  addAccountSponsors,
  addNetworkSponsorAgents,
  getNetworkAccounts,
  getSponsorKeys,
  getNetworkSponsorAgentKeys,
} = require("../prod/lib/scAccountMethods");

addTestNetworkAccountSponsors = async (_accountIdx, _sponsorArrayIdx) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _sponsorArrayIdx+ ")");
  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  let sponsorArrayKeys = getTestHHAccountArrayKeys(_sponsorArrayIdx);
  logDetail("JS => For Account: " + accountKey + " Inserting Sponsor Records:");
  logDetail(sponsorArrayKeys);
  await addAccountSponsors(accountKey, sponsorArrayKeys);
  return accountKey;
};

addTestNetworkSponsorAgents = async ( _accountIdx, _sponsorIdx, _agentArrayIdx ) => {
  logFunctionHeader("async (" + _accountIdx  + "," + _sponsorIdx + "," + _agentArrayIdx+ ")");
  let accountKey = testHHAccounts[_accountIdx].toLowerCase();
  let sponsorKey = testHHAccounts[_sponsorIdx].toLowerCase();
  let agentArrayKeys = getTestHHAccountArrayKeys(_agentArrayIdx);

  await addNetworkSponsorAgents(accountKey, sponsorKey, agentArrayKeys);
  return sponsorKey;
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