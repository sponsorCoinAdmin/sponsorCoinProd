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

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

setContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

getAccountSize = async () => {
  logFunctionHeader("getAccountSize = async()");
  let maxSize = await spCoinContractDeployed.getAccountSize();
  logDetail("JS => Found " + maxSize + " Account Records");
  return maxSize;
};

getAccountKeys = async () => {
  logFunctionHeader("getAccountKeys = async()");
  let maxSize = await spCoinContractDeployed.getAccountSize();

  var insertedArrayAccounts = [];
  for (idx = 0; idx < maxSize; idx++) {
    let account = await spCoinContractDeployed.getAccountKey(idx);
    logDetail("JS => Address at Index " + idx + "  = " + account);
    insertedArrayAccounts.push(account);
  }
  return insertedArrayAccounts;
};

////////////////////////// ACCOUNT OBJECT FUNCTIONS //////////////////////////

addAccountRecord = async (accountKey) => {
  logFunctionHeader("addAccountRecord = async(" + accountKey + ")");
  logDetail("JS => Inserting Account " + accountKey + " To Blockchain Network");
  await spCoinContractDeployed.addAccountRecord(accountKey);
};

addAccountRecords = async (_accountArrayKeys) => {
  logFunctionHeader("addAccountRecord = async(arrayAccounts)");
  let maxSize = _accountArrayKeys.length;
  logDetail("JS => Inserting " + maxSize + " Records to Blockchain Network");

  for (idx = 0; idx < maxSize; idx++) {
    let account = _accountArrayKeys[idx];
    logDetail("JS => Inserting " + idx + ", " + account);
    await spCoinContractDeployed.addAccountRecord(account);
  }
  logDetail("JS => Inserted " + maxSize + " Accounts to Blockchain Network");

  return maxSize;
};

getAccountRecord = async (accountKey) => {
  logFunctionHeader("getAccountRecord = async(" + accountKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRec(accountKey);
  return deSerializedAccountRec(serializedAccountRec);
};

getAccountSponsorSize = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorSize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountSponsorSize(_accountKey);
  logDetail("JS => Found " + maxSize + " Sponsor Records For Account " + _accountKey
  );
  return maxSize;
};

getAccountPatreonKeys = async (_accountKey) => {
  logFunctionHeader("getAccountPatreonKeys = async(" + _accountKey + ")");
  let maxSize = await spCoinContractDeployed.getPatreonSize(_accountKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountPatreonKeyByIndex(_accountKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
  return accountPatreonKeys;
};

getAccountSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorKeys = async(" + _accountKey + ")");
  let maxSize = await spCoinContractDeployed.getAccountSponsorSize(_accountKey);

  let accountSponsorKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let sponsor = await spCoinContractDeployed.getAccountSponsorKeyByIndex(_accountKey, idx );
    accountSponsorKeys[sponsor] = idx;
  }
  return accountSponsorKeys;
};

getAccountAgentKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _accountKey + ")");
  let maxSize = await spCoinContractDeployed.getAgentRecordSize(_accountKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountAgentKeyByIndex(_accountKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
  return accountPatreonKeys;
};

/////////////////////// SPONSOR OBJECT FUNCTIONS ///////////////////////

addAccountSponsor = async (accountKey, sponsorKey) => {
  logFunctionHeader(
    "addAccountSponsor = async(" + accountKey + ", " + sponsorKey + ")"
  );

  logDetail("JS => For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("JS => Inserting " + sponsorKey + " Sponsors To Blockchain Network"
  );

  logDetail("JS => " + sponsorCount + ". " + "Inserting Sponsor[" + sponsorCount + "]: " + sponsorKey );
  await spCoinContractDeployed.insertAccountSponsor(accountKey, sponsorKey);
  return --sponsorCount;
};

addAccountSponsors = async (accountKey, _accountSponsorObjects) => {
  logFunctionHeader(
    "addAccountSponsors = async(" + accountKey + ", " + _accountSponsorObjects + ")"
  );

  logDetail("JS => For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("JS => Inserting " + _accountSponsorObjects.length + " Sponsors To Blockchain Network"
  );

  let sponsorCount = 0;
  for (sponsorCount; sponsorCount < _accountSponsorObjects.length; sponsorCount++) {
    let sponsorKey = _accountSponsorObjects[sponsorCount];
    await addAccountSponsor(accountKey, sponsorKey);
  }
  logDetail("JS => Inserted = " + sponsorCount + " Sponsor Records");
  return --sponsorCount;
};

getSponsorAgentKeys = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getSponsorAgentKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  let maxSize = await spCoinContractDeployed.getSponsorAgentSize(_accountKey, _sponsorAccountKey);

  let accountAgentKeys = {};
  for (let idx = 0; idx < maxSize; idx++) {
    let agent = await spCoinContractDeployed.getSponsorAgentKeyAddress(_accountKey, _sponsorAccountKey, idx);
    logDetail("JS => Agent[" + idx + "]: " + agent);
    accountAgentKeys[agent] = idx;
  }
  return accountAgentKeys;
};

/////////////////////// AGENT OBJECT FUNCTIONS ////////////////////////

addSponsorAgents = async (accountKey, sponsorAccountKey, _accountAgentKeys) => {
  logFunctionHeader(
    "addSponsorAgents = async(" + accountKey + ", " + sponsorAccountKey + ", " + _accountAgentKeys + ")"
  );
  logDetail("JS => For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("JS => For Sponsor[" + sponsorAccountKey + "]: " + sponsorAccountKey + ")");
  logDetail("JS => Inserting " + _accountAgentKeys.length + " Agents To Blockchain Network"
  );
  logDetail("JS => _accountAgentKeys = " + _accountAgentKeys);

  let agentAccountKeyCount = 0;
  let agentCount = _accountAgentKeys.length;
  logDetail("JS => agentCount.length = " + agentCount);
  for (let i = 0; i < agentCount; i++) {
    let agentAccountKey = _accountAgentKeys[i];
    logDetail("JS =>  " + ++agentAccountKeyCount + ". " + "Inserting Agent[" + i + "]: " + agentAccountKey );
    await spCoinContractDeployed.insertSponsorAgent(
      accountKey,
      sponsorAccountKey,
      agentAccountKey
    );
  }
  agentCount = await spCoinContractDeployed.getSponsorAgentSize(
    accountKey,
    sponsorAccountKey
  );
  logDetail("JS => "+ "Inserted = " + agentCount + " Agent Records");
  return agentCount;
};

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  addAccountField,
  addAccountRecord,
  addAccountRecord,
  addAccountRecords,
  addAccountSponsors,
  addSponsorAgents,
  getAccountSize,
  getAccountRecord,
  getAccountKeys,
  getAccountSponsorSize,
  getSponsorAgentKeys,
  getAccountSponsorKeys,
  setContract,
};
