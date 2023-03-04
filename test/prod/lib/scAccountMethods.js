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

addNetworkAccount = async (accountKey) => {
  logFunctionHeader("addNetworkAccount = async(" + accountKey + ")");
  logDetail("JS => Inserting Account " + accountKey + " To Blockchain Network");
  await spCoinContractDeployed.addNetworkAccount(accountKey);
};

getNetworkAccountRec = async (accountKey) => {
  logFunctionHeader("getNetworkAccountRec = async(" + accountKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRec(accountKey);
  return deSerializedAccountRec(serializedAccountRec);
};

addNetworkAccounts = async (_accountArrayKeys) => {
  logFunctionHeader("addNetworkAccount = async(arrayAccounts)");
  let maxCount = _accountArrayKeys.length;
  logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");

  for (idx = 0; idx < maxCount; idx++) {
    let account = _accountArrayKeys[idx];
    logDetail("JS => Inserting " + idx + ", " + account);
    await spCoinContractDeployed.addNetworkAccount(account);
  }
  logDetail("JS => Inserted " + maxCount + " Accounts to Blockchain Network");

  return maxCount;
};

getNetworkAccounts = async () => {
  logFunctionHeader("getNetworkAccounts = async()");
  let maxCount = await spCoinContractDeployed.getNetworkAccountCount();

  var insertedArrayAccounts = [];
  for (idx = 0; idx < maxCount; idx++) {
    let account = await spCoinContractDeployed.getAccountKey(idx);
    logDetail("JS => Address at Index " + idx + "  = " + account);
    insertedArrayAccounts.push(account);
  }
  return insertedArrayAccounts;
};

getNetworkAccountCount = async () => {
  logFunctionHeader("getNetworkAccountCount = async()");
  let maxCount = await spCoinContractDeployed.getNetworkAccountCount();
  logDetail("JS => Found " + maxCount + " Account Records");
  return maxCount;
};

////////////////////// ADD SPONSOR FUNCTIONS ///////////////////////

addAccountSponsors = async (accountKey, _sponsorArr) => {
  logFunctionHeader(
    "addAccountSponsors = async(" + accountKey + ", " + _sponsorArr + ")"
  );

  logDetail("JS => For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("JS => Inserting " + _sponsorArr.length + " Sponsors To Blockchain Network"
  );

  let sponsorCount = 0;
  for (sponsorCount; sponsorCount < _sponsorArr.length; sponsorCount++) {
    let sponsorRec = _sponsorArr[sponsorCount];
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

getNetworkAccountSponsorsCount = async (_accountKey) => {
  logFunctionHeader("getNetworkAccountSponsors = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getSponsorRecordCount(
    _accountKey
  );

  logDetail("JS => Found " + maxCount + " Account Records");
  return maxCount;
};

getNetworkSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getNetworkSponsorKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getSponsorRecordCount(_accountKey);

  let sponsoredAccountKeys = {};

  for (let idx = 0; idx < maxCount; idx++) {
    let sponsor = await spCoinContractDeployed.getSponsorKeyAddress(_accountKey, idx );
    sponsoredAccountKeys[sponsor] = idx;
  }
  return sponsoredAccountKeys;
};

getNetworkBeneficiaryKeys = async (_accountKey) => {
  logFunctionHeader("getNetworkBeneficiaryKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getBeneficiaryRecordCount(_accountKey);

  let contributorAccountKeys = {};

  for (let idx = 0; idx < maxCount; idx++) {
    let contributor = await spCoinContractDeployed.getBeneficiaryKeyAddress(_accountKey, idx );
    contributorAccountKeys[contributor] = idx;
  }
  return contributorAccountKeys;
};

//////////////////////// ADD AGENT FUNCTIONS /////////////////////////

addNetworkSponsorAgents = async (accountKey, sponsorKey, _agentArrayKeys) => {
  logFunctionHeader(
    "addNetworkSponsorAgents = async(" + accountKey + ", " + sponsorKey + ", " + _agentArrayKeys + ")"
  );
  logDetail("JS => For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("JS => For Sponsor[" + sponsorKey + "]: " + sponsorKey + ")");
  logDetail("JS => Inserting " + _agentArrayKeys.length + " Agents To Blockchain Network"
  );
  logDetail("JS => _agentArrayKeys = " + _agentArrayKeys);

  let agentKeyCount = 0;
  let agentCount = _agentArrayKeys.length;
  logDetail("JS => agentCount.length = " + agentCount);
  for (let i = 0; i < agentCount; i++) {
    let agentKey = _agentArrayKeys[i];
    logDetail("JS =>  " + ++agentKeyCount + ". " + "Inserting Agent[" + i + "]: " + agentKey );
    await spCoinContractDeployed.insertSponsorAgent(
      accountKey,
      sponsorKey,
      agentKey
    );
  }
  agentCount = await spCoinContractDeployed.getSponsorAgentRecordCount(
    accountKey,
    sponsorKey
  );
  logDetail("JS => "+ "Inserted = " + agentCount + " Agent Records");
  return agentCount;
};

getNetworkAgentKeys = async (_accountKey) => {
  logFunctionHeader("getNetworkAgentKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getAgentRecordCount(_accountKey);

  let contributorAccountKeys = {};

  for (let idx = 0; idx < maxCount; idx++) {
    let contributor = await spCoinContractDeployed.getAgentKeyAddress(_accountKey, idx );
    contributorAccountKeys[contributor] = idx;
  }
  return contributorAccountKeys;
};

getNetworkSponsorAgentKeys = async (_accountKey, _sponsorKey) => {
  logFunctionHeader("getNetworkSponsorAgentKeys = async(" + _accountKey + ", " + _sponsorKey + ")" );
  let maxCount = await spCoinContractDeployed.getSponsorAgentRecordCount(_accountKey, _sponsorKey);

  let agentKeys = {};
  for (let idx = 0; idx < maxCount; idx++) {
    let agent = await spCoinContractDeployed.getSponsorAgentKeyAddress(_accountKey, _sponsorKey, idx);
    logDetail("JS => Agent[" + idx + "]: " + agent);
    agentKeys[agent] = idx;
  }
  return agentKeys;
};
/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  setContract,
  addNetworkAccount,
  getNetworkAccountRec,
  addAccountField,
  addAccountSponsors,
  addNetworkSponsorAgents,
  addNetworkAccounts,
  addNetworkAccount,
  getNetworkAccounts,
  getAccountSponsorCount,
  getNetworkAccountCount,
  getNetworkAccountSponsorsCount,
  getNetworkSponsorKeys,
  getNetworkSponsorAgentKeys,
};
