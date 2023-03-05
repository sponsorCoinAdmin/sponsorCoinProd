const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("./dataTypes");

const {} = require("./utils/serialize");

const { logFunctionHeader, logDetail } = require("./utils/logging");

let spCoinContractDeployed;

setContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

////////////////////// ADD NETWORK FUNCTIONS ///////////////////////

getAccounts = async () => {
  logFunctionHeader("getAccounts = async()");
  let maxCount = await spCoinContractDeployed.getAccountCount();

  var insertedArrayAccounts = [];
  for (idx = 0; idx < maxCount; idx++) {
    let account = await spCoinContractDeployed.getAccountKey(idx);
    logDetail("JS => Address at Index " + idx + "  = " + account);
    insertedArrayAccounts.push(account);
  }
  return insertedArrayAccounts;
};

getAccountRec = async (accountKey) => {
  logFunctionHeader("getAccountRec = async(" + accountKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRec(accountKey);
  return deSerializedAccountRec(serializedAccountRec);
};

addAccounts = async (_accountArrayKeys) => {
  logFunctionHeader("addAccount = async(arrayAccounts)");
  let maxCount = _accountArrayKeys.length;
  logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");

  for (idx = 0; idx < maxCount; idx++) {
    let account = _accountArrayKeys[idx];
    logDetail("JS => Inserting " + idx + ", " + account);
    await spCoinContractDeployed.addAccount(account);
  }
  logDetail("JS => Inserted " + maxCount + " Accounts to Blockchain Network");

  return maxCount;
};

addAccount = async (accountKey) => {
  logFunctionHeader("addAccount = async(" + accountKey + ")");
  logDetail("JS => Inserting Account " + accountKey + " To Blockchain Network");
  await spCoinContractDeployed.addAccount(accountKey);
};

getAccountCount = async () => {
  logFunctionHeader("getAccountCount = async()");
  let maxCount = await spCoinContractDeployed.getAccountCount();
  logDetail("JS => Found " + maxCount + " Account Records");
  return maxCount;
};

getPatreonKeys = async (_accountKey) => {
  logFunctionHeader("getPatreonKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getPatreonRecordCount(_accountKey);

  let patreonAccountKeys = {};

  for (let idx = 0; idx < maxCount; idx++) {
    let patreon = await spCoinContractDeployed.getPatreonKeyAddress(_accountKey, idx );
    patreonAccountKeys[patreon] = idx;
  }
  return patreonAccountKeys;
};

////////////////////// ADD SPONSOR FUNCTIONS ///////////////////////

addAccountSponsors = async (accountKey, _sponsoredObjectArray) => {
  logFunctionHeader(
    "addAccountSponsors = async(" + accountKey + ", " + _sponsoredObjectArray + ")"
  );

  logDetail("JS => For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("JS => Inserting " + _sponsoredObjectArray.length + " Sponsors To Blockchain Network"
  );

  let sponsorCount = 0;
  for (sponsorCount; sponsorCount < _sponsoredObjectArray.length; sponsorCount++) {
    let sponsorRec = _sponsoredObjectArray[sponsorCount];
    logDetail("JS => " + sponsorCount + ". " + "Inserting Sponsor[" + sponsorCount + "]: " + sponsorRec );
    await spCoinContractDeployed.insertAccountSponsor(accountKey, sponsorRec);
  }
  logDetail("JS => Inserted = " + sponsorCount + " Sponsor Records");
  return --sponsorCount;
};

getAccountSponsorCount = async (_account) => {
  logFunctionHeader("getAccountSponsorCount = async(" + _account + ")");

  let maxCount = await spCoinContractDeployed.getAccountSponsorCount(_account);
  logDetail("JS => Found " + maxCount + " Sponsor Records For Account " + _account
  );
  return maxCount;
};

getAccountSponsorsCount = async (_accountKey) => {
  logFunctionHeader("getNetworkAccountSponsors = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getSponsorRecordCount(
    _accountKey
  );

  logDetail("JS => Found " + maxCount + " Account Records");
  return maxCount;
};

getSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getSponsorKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getSponsorRecordCount(_accountKey);

  let sponsoredAccountKeys = {};

  for (let idx = 0; idx < maxCount; idx++) {
    let sponsor = await spCoinContractDeployed.getSponsorKeyAddress(_accountKey, idx );
    sponsoredAccountKeys[sponsor] = idx;
  }
  return sponsoredAccountKeys;
};

//////////////////////// ADD AGENT FUNCTIONS /////////////////////////

addNetworkSponsorAgents = async (accountKey, sponsorAccountKey, _agentAccountKeys) => {
  logFunctionHeader(
    "addNetworkSponsorAgents = async(" + accountKey + ", " + sponsorAccountKey + ", " + _agentAccountKeys + ")"
  );
  logDetail("JS => For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("JS => For Sponsor[" + sponsorAccountKey + "]: " + sponsorAccountKey + ")");
  logDetail("JS => Inserting " + _agentAccountKeys.length + " Agents To Blockchain Network"
  );
  logDetail("JS => _agentAccountKeys = " + _agentAccountKeys);

  let agentAccountKeyCount = 0;
  let agentCount = _agentAccountKeys.length;
  logDetail("JS => agentCount.length = " + agentCount);
  for (let i = 0; i < agentCount; i++) {
    let agentAccountKey = _agentAccountKeys[i];
    logDetail("JS =>  " + ++agentAccountKeyCount + ". " + "Inserting Agent[" + i + "]: " + agentAccountKey );
    await spCoinContractDeployed.insertSponsorAgent(
      accountKey,
      sponsorAccountKey,
      agentAccountKey
    );
  }
  agentCount = await spCoinContractDeployed.getSponsorAgentRecordCount(
    accountKey,
    sponsorAccountKey
  );
  logDetail("JS => "+ "Inserted = " + agentCount + " Agent Records");
  return agentCount;
};

getNetworkAgentKeys = async (_accountKey) => {
  logFunctionHeader("getNetworkAgentKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getAgentRecordCount(_accountKey);

  let patreonAccountKeys = {};

  for (let idx = 0; idx < maxCount; idx++) {
    let patreon = await spCoinContractDeployed.getAgentKeyAddress(_accountKey, idx );
    patreonAccountKeys[patreon] = idx;
  }
  return patreonAccountKeys;
};

getSponsorAgentKeys = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getSponsorAgentKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  let maxCount = await spCoinContractDeployed.getSponsorAgentRecordCount(_accountKey, _sponsorAccountKey);

  let agentAccountKeys = {};
  for (let idx = 0; idx < maxCount; idx++) {
    let agent = await spCoinContractDeployed.getSponsorAgentKeyAddress(_accountKey, _sponsorAccountKey, idx);
    logDetail("JS => Agent[" + idx + "]: " + agent);
    agentAccountKeys[agent] = idx;
  }
  return agentAccountKeys;
};
/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  setContract,
  addAccount,
  getAccountRec,
  addAccountField,
  addAccountSponsors,
  addNetworkSponsorAgents,
  addAccounts,
  addAccount,
  getAccounts,
  getAccountSponsorCount,
  getAccountCount,
  getAccountSponsorsCount,
  getSponsorKeys,
  getSponsorAgentKeys,
};
