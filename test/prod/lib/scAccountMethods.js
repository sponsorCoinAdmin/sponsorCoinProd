const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("./dataTypes");

const { logFunctionHeader, logDetail } = require("./utils/logging");

let spCoinContractDeployed;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

setCreateContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

getAccountListSize = async () => {
  logFunctionHeader("getAccountListSize = async()");
  let maxSize = await spCoinContractDeployed.getAccountListSize();
  logDetail("JS => Found " + maxSize + " Account Records");
  return maxSize;
};

getAccountKeys = async () => {
  logFunctionHeader("getAccountKeys = async()");
  let insertedAccountList = await spCoinContractDeployed.getAccountKeys();
  return insertedAccountList;
};

////////////////////////// ACCOUNT RECORD FUNCTIONS //////////////////////////

addAccountRecords = async (_accountListKeys) => {
  logFunctionHeader("addAccountRecord = async(arrayAccounts)");
  let maxSize = _accountListKeys.length;
  logDetail("JS => Inserting " + maxSize + " Records to Blockchain Network");

  for (idx = 0; idx < maxSize; idx++) {
    let account = _accountListKeys[idx];
    logDetail("JS => Inserting " + idx + ", " + account);
    await spCoinContractDeployed.addAccountRecord(account);
  }
  logDetail("JS => Inserted " + maxSize + " Accounts to Blockchain Network");

  return maxSize;
};

getSponsorListSize = async (_accountKey) => {
  logFunctionHeader("getSponsorListSize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getSponsorListSize(_accountKey);
  logDetail("JS => Found " + maxSize + " Sponsor Records For Account " + _accountKey
  );
  return maxSize;
};

getAccountPatreonListSize = async (_accountKey) => {
  logFunctionHeader("getAccountPatreonListSize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.c(_accountKey);
  logDetail("JS => Found " + maxSize + " Patreon Records For Account " + _accountKey
  );
  return maxSize;
};

getAccountAgentListSize = async (_accountKey) => {
  logFunctionHeader("getAccountAgentListSize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountAgentKeys(_accountKey);
  logDetail("JS => Found " + maxSize + " Agent Records For Account " + _accountKey
  );
  return maxSize;
};

getAccountAgentSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentSponsorKeys = async(" + _accountKey + ")");
  let maxSize = await spCoinContractDeployed.getAccountParentSponsorListSize(_accountKey);
  let accountParentSponsorKeys = {};
  for (let idx = 0; idx < maxSize; idx++) {
    let parentSponsor = await spCoinContractDeployed.getAccountAgentSponsorByIdx(_accountKey, idx );
    accountParentSponsorKeys[parentSponsor] = idx;
  }
  return accountParentSponsorKeys;
}

getAccountPatreonKeys = async (_accountKey) => {
  logFunctionHeader("getAccountPatreonKeys = async(" + _accountKey + ")");
  let maxSize = await spCoinContractDeployed.getAccountPatreonListSize(_accountKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountPatreonKeyByIndex(_accountKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
  return accountPatreonKeys;
};

getPatreonSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getPatreonSponsorKeys = async(" + _accountKey + ")");
  let accountSponsorKeys = await spCoinContractDeployed.getSponsorKeys(_accountKey);
  return accountSponsorKeys;
};

/* */
getAccountAgentKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _accountKey + ")");
  let accountAgentKeys = await spCoinContractDeployed.getAccountAgentKeys(_accountKey);
  return accountAgentKeys;
};

/* *
getAccountAgentKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _accountKey + ")");
  let maxSize = await getAccountAgentListSize(_accountKey);

  let accountAgentKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountAgentKeyByIndex(_accountKey, idx );
    accountAgentKeys[patreon] = idx;
  }
  return accountAgentKeys;
};
/* */
/////////////////////// SPONSOR RECORD FUNCTIONS ///////////////////////

addPatreonSponsor = async (_accountKey, _sponsorKey) => {
  logFunctionHeader(
    "addPatreonSponsor = async(" + _accountKey + ", " + _sponsorKey + ")"
  );

  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Inserting " + _sponsorKey + " Sponsors To Blockchain Network"
  );

  logDetail("JS => Inserting Sponsor " + _sponsorKey );
  await spCoinContractDeployed.addPatreonSponsor(_accountKey, _sponsorKey);
};

addPatreonSponsors = async (_accountKey, _accountSponsorKeys) => {
  logFunctionHeader(
    "addPatreonSponsors = async(" + _accountKey + ", " + _accountSponsorKeys + ")"
  );

  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Adding " + _accountSponsorKeys.length + " Sponsors To Blockchain Network"
  );

  let sponsorCount = 0;
  for (sponsorCount; sponsorCount < _accountSponsorKeys.length; sponsorCount++) {
    let _sponsorKey = _accountSponsorKeys[sponsorCount];
    await addPatreonSponsor(_accountKey, _sponsorKey);
  }
  logDetail("JS => Inserted = " + sponsorCount + " Sponsor Records");
  return --sponsorCount;
};

deletePatreonSponsor = async (_patreonKey, _sponsorKey) => {
  logFunctionHeader("deletePatreonSponsor(" + _patreonKey + ", " + _sponsorKey + ")");
  await spCoinContractDeployed.deletePatreonSponsor(_patreonKey, _sponsorKey);
}

getAgentRecordKeys = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  let maxSize = await spCoinContractDeployed.getAgentListSize(_accountKey, _sponsorAccountKey);

  let accountAgentKeys = {};
  for (let idx = 0; idx < maxSize; idx++) {
    let agent = await spCoinContractDeployed.getSponsorAgentKey(_accountKey, _sponsorAccountKey, idx);
    logDetail("JS => Agent[" + idx + "]: " + agent);
    accountAgentKeys[agent] = idx;
  }
  return accountAgentKeys;
};

getAgentListSize = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentListSize = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );

  let agentSize = await spCoinContractDeployed.getAgentListSize(
    _accountKey, _sponsorAccountKey );
  logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
  return agentSize;
};

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

addSponsorAgent = async (_accountKey, _sponsorAccountKey, _accountAgentKey) => {
  logFunctionHeader(
    "accountAgentKey = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKey + ")"
  );
  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");

  logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
  await spCoinContractDeployed.addSponsorAgent( _accountKey, _sponsorAccountKey, _accountAgentKey );
  logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to SponsorKey " + _sponsorAccountKey);
};

addSponsorAgents = async (_accountKey, _sponsorAccountKey, _accountAgentKeys) => {
  logFunctionHeader(
    "addSponsorAgents = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKeys + ")"
  );
  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => For Sponsor[" + _sponsorAccountKey + "]: " + _sponsorAccountKey + ")");
  logDetail("JS => Inserting " + _accountAgentKeys.length + " Agents To Blockchain Network"
  );
  logDetail("JS => _accountAgentKeys = " + _accountAgentKeys);

  let agentSize = _accountAgentKeys.length;
  logDetail("JS => agentSize.length = " + agentSize);
  let agentCount = 0;
  for (let agentCount = 0; agentCount < agentSize; agentCount++) {
    let agentAccountKey = _accountAgentKeys[agentCount];
    logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentAccountKey );
    await addSponsorAgent( _accountKey, _sponsorAccountKey, agentAccountKey );
  }
  logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
  return agentCount;
};

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  addAccountField,
  addAccountRecord,
  addAccountRecords,
  addPatreonSponsors,
  addSponsorAgent,
  addSponsorAgents,
  deletePatreonSponsor,
  getAccountListSize,
  getAccountKeys,
  getSponsorListSize,
  getAccountAgentKeys,
  getPatreonSponsorKeys,
  setCreateContract,
};
