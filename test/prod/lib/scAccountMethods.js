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

////////////////////// ADD ACCOUNT OBJECT FUNCTIONS ///////////////////////

addAccountRecords = async (_accountArrayKeys) => {
  logFunctionHeader("addAccountRecord = async(arrayAccounts)");
  let maxCount = _accountArrayKeys.length;
  logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");

  for (idx = 0; idx < maxCount; idx++) {
    let account = _accountArrayKeys[idx];
    logDetail("JS => Inserting " + idx + ", " + account);
    await spCoinContractDeployed.addAccountRecord(account);
  }
  logDetail("JS => Inserted " + maxCount + " Accounts to Blockchain Network");

  return maxCount;
};

addAccountRecord = async (accountKey) => {
  logFunctionHeader("addAccountRecord = async(" + accountKey + ")");
  logDetail("JS => Inserting Account " + accountKey + " To Blockchain Network");
  await spCoinContractDeployed.addAccountRecord(accountKey);
};

getAccountKeys = async () => {
  logFunctionHeader("getAccountKeys = async()");
  let maxCount = await spCoinContractDeployed.getAccountCount();

  var insertedArrayAccounts = [];
  for (idx = 0; idx < maxCount; idx++) {
    let account = await spCoinContractDeployed.getAccountKey(idx);
    logDetail("JS => Address at Index " + idx + "  = " + account);
    insertedArrayAccounts.push(account);
  }
  return insertedArrayAccounts;
};

getAccountRecord = async (accountKey) => {
  logFunctionHeader("getAccountRecord = async(" + accountKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRec(accountKey);
  return deSerializedAccountRec(serializedAccountRec);
};

getAccountCount = async () => {
  logFunctionHeader("getAccountCount = async()");
  let maxCount = await spCoinContractDeployed.getAccountCount();
  logDetail("JS => Found " + maxCount + " Account Records");
  return maxCount;
};

getAccountPatreonKeys = async (_accountKey) => {
  logFunctionHeader("getAccountPatreonKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getPatreonRecordCount(_accountKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxCount; idx++) {
    let patreon = await spCoinContractDeployed.getPatreonKeyAddress(_accountKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
  return accountPatreonKeys;
};

////////////////////// ADD SPONSOR FUNCTIONS ///////////////////////

addAccountSponsors = async (accountKey, _accountSponsorObjects) => {
  logFunctionHeader(
    "addAccountSponsors = async(" + accountKey + ", " + _accountSponsorObjects + ")"
  );

  logDetail("JS => For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("JS => Inserting " + _accountSponsorObjects.length + " Sponsors To Blockchain Network"
  );

  let sponsorCount = 0;
  for (sponsorCount; sponsorCount < _accountSponsorObjects.length; sponsorCount++) {
    let sponsorRec = _accountSponsorObjects[sponsorCount];
    logDetail("JS => " + sponsorCount + ". " + "Inserting Sponsor[" + sponsorCount + "]: " + sponsorRec );
    await spCoinContractDeployed.insertAccountSponsor(accountKey, sponsorRec);
  }
  logDetail("JS => Inserted = " + sponsorCount + " Sponsor Records");
  return --sponsorCount;
};

getAccountSponsorCount = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorCount = async(" + _accountKey + ")");

  let maxCount = await spCoinContractDeployed.getAccountSponsorCount(_accountKey);
  logDetail("JS => Found " + maxCount + " Sponsor Records For Account " + _accountKey
  );
  return maxCount;
};

getSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getSponsorKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getAccountSponsorCount(_accountKey);

  let accountSponsorKeys = {};

  for (let idx = 0; idx < maxCount; idx++) {
    let sponsor = await spCoinContractDeployed.getSponsorKeyAddress(_accountKey, idx );
    accountSponsorKeys[sponsor] = idx;
  }
  return accountSponsorKeys;
};

//////////////////////// ADD AGENT FUNCTIONS /////////////////////////

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
  agentCount = await spCoinContractDeployed.getSponsorAgentRecordCount(
    accountKey,
    sponsorAccountKey
  );
  logDetail("JS => "+ "Inserted = " + agentCount + " Agent Records");
  return agentCount;
};

getAccountAgentKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getAgentRecordCount(_accountKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxCount; idx++) {
    let patreon = await spCoinContractDeployed.getAgentKeyAddress(_accountKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
  return accountPatreonKeys;
};

getSponsorAgentKeys = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getSponsorAgentKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  let maxCount = await spCoinContractDeployed.getSponsorAgentRecordCount(_accountKey, _sponsorAccountKey);

  let accountAgentKeys = {};
  for (let idx = 0; idx < maxCount; idx++) {
    let agent = await spCoinContractDeployed.getSponsorAgentKeyAddress(_accountKey, _sponsorAccountKey, idx);
    logDetail("JS => Agent[" + idx + "]: " + agent);
    accountAgentKeys[agent] = idx;
  }
  return accountAgentKeys;
};
/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  addAccountField,
  addAccountRecord,
  addAccountRecord,
  addAccountRecords,
  addAccountSponsors,
  addSponsorAgents,
  getAccountCount,
  getAccountRecord,
  getAccountKeys,
  getAccountSponsorCount,
  getSponsorAgentKeys,
  getSponsorKeys,
  setContract,
};
