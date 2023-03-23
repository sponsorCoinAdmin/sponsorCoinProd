const { } = require("./utils/logging");

let spCoinContractDeployed;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////


setCreateContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

getAccountKeySize = async () => {
  logFunctionHeader("getAccountKeySize = async()");
  let maxSize = await spCoinContractDeployed.getAccountKeySize();
  logDetail("JS => Found " + maxSize + " Account Keys");
  return maxSize;
};

getAccountKeys = async () => {
  logFunctionHeader("getAccountKeys = async()");
  let insertedAccountList = await spCoinContractDeployed.getAccountKeys();
  return insertedAccountList;
};

////////////////////////// ACCOUNT RECORD FUNCTIONS //////////////////////////

getAccountSponsorKeySize = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorKeySize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountSponsorKeySize(_accountKey);
  logDetail("JS => Found " + maxSize + " Account Sponsor Keys");
  return maxSize;
};

getAccountPatreonKeySize = async (_accountKey) => {
  logFunctionHeader("getAccountPatreonKeySize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountPatreonKeySize(_accountKey);
  logDetail("JS => Found " + maxSize + " Account Patreon Keys");
  return maxSize;
};

getAccountAgentKeySize = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeySize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountAgentKeySize(_accountKey);
  logDetail("JS => Found " + maxSize + " Account Agent Records");
  return maxSize;
};

getAccountParentSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getAccountParentSponsorKeys = async(" + _accountKey + ")");
  let accountParentSponsorKeys = spCoinContractDeployed.getAccountParentSponsorKeys;
  return accountParentSponsorKeys;
}

getAccountParentSponsorKeySize = async () => {
  logFunctionHeader("getAccountParentSponsorKeySize = async()");
  let maxSize = await spCoinContractDeployed.getAccountParentSponsorKeySize();
  logDetail("JS => Found " + maxSize + " Account Keys");
  return maxSize;
};

getAccountPatreonKeys = async (_accountKey) => {
  logFunctionHeader("getAccountPatreonKeys = async(" + _accountKey + ")");
  let maxSize = await spCoinContractDeployed.getAccountPatreonKeySize(_accountKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountPatreonKeyByIndex(_accountKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
  return accountPatreonKeys;
};

getAccountSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorKeys = async(" + _accountKey + ")");
  let accountSponsorKeys = await spCoinContractDeployed.getSponsorKeys(_accountKey);
  return accountSponsorKeys;
};

/* */
getAccountAgentKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _accountKey + ")");
  let accountAgentKeys = await spCoinContractDeployed.getAccountAgentKeys(_accountKey);
  return accountAgentKeys;
};

/////////////////////// SPONSOR RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  let maxSize = await spCoinContractDeployed.getAgentRecordKeySize(_accountKey, _sponsorAccountKey);

  let accountAgentKeys = {};
  for (let idx = 0; idx < maxSize; idx++) {
    let agent = await spCoinContractDeployed.getSponsorAgentKey(_accountKey, _sponsorAccountKey, idx);
    logDetail("JS => Agent[" + idx + "]: " + agent);
    accountAgentKeys[agent] = idx;
  }
  return accountAgentKeys;
};

getAgentRecordKeySize = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentRecordKeySize = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );

  let agentSize = await spCoinContractDeployed.getAgentRecordKeySize(
    _accountKey, _sponsorAccountKey );
  logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
  return agentSize;
};

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////



/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  getAccountAgentKeys,
  getAccountAgentKeySize,
  getAccountKeys,
  getAccountKeySize,
  getAccountParentSponsorKeys,
  getAccountParentSponsorKeySize,
  getAccountPatreonKeys,
  getAccountPatreonKeySize,
  getAccountSponsorKeys,
  getAccountSponsorKeySize,
  getAgentRecordKeys,
  getAgentRecordKeySize,
  setCreateContract,
};
