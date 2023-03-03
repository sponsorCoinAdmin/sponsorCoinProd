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

addNetworkAccount = async (accountKey) => {
  logFunctionHeader("addNetworkAccount = async(" + accountKey + ")");
  logDetail("Inserting Account " + accountKey + " To Blockchain Network");
  await spCoinContractDeployed.addNetworkAccount(accountKey);
};

getNetworkAccountRec = async (accountKey) => {
  logFunctionHeader("getNetworkAccountRec = async(" + accountKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRec(accountKey);
  return deSerializedAccountRec(serializedAccountRec);
};

addNetworkAccountSponsors = async (accountKey, _sponsorArr) => {
  logFunctionHeader(
    "addNetworkAccountSponsors = async(" + accountKey + ", " + _sponsorArr + ")"
  );

  logDetail("For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail(
    "Inserting " + _sponsorArr.length + " Sponsors To Blockchain Network"
  );

  let sponsorCount = 0;
  for (sponsorCount; sponsorCount < _sponsorArr.length; sponsorCount++) {
    let sponsorRec = _sponsorArr[sponsorCount];
    logDetail( "   " + sponsorCount + ". " + "Inserting Sponsor[" + sponsorCount + "]: " + sponsorRec );
    await spCoinContractDeployed.insertAccountSponsor(accountKey, sponsorRec);
  }
  logDetail("Inserted = " + sponsorCount + " Sponsor Records");
  return --sponsorCount;
};

addNetworkSponsorAgents = async (accountKey, sponsorKey, _agentArrayKeys) => {
  logFunctionHeader(
    "addNetworkSponsorAgents = async(" + accountKey + ", " + sponsorKey + ", " + _agentArrayKeys + ")"
  );
  logDetail("For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("For Sponsor[" + sponsorKey + "]: " + sponsorKey + ")");
  logDetail(
    "Inserting " + _agentArrayKeys.length + " Agents To Blockchain Network"
  );
  logDetail("_agentArrayKeys = " + _agentArrayKeys);

  let agentKeyCount = 0;
  let agentCount = _agentArrayKeys.length;
  logDetail("agentCount.length = " + agentCount);
  for (let i = 0; i < agentCount; i++) {
    let agentKey = _agentArrayKeys[i];
    logDetail( "        " + ++agentKeyCount + ". " + "Inserting Agent[" + i + "]: " + agentKey );
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
  logDetail(prefix + "Inserted = " + agentCount + " Agent Records");
  return agentCount;
};

addNetworkAccounts = async (_accountArrayKeys) => {
  logFunctionHeader("addNetworkAccount = async(arrayAccounts)");
  let maxCount = _accountArrayKeys.length;
  logDetail("Inserting " + maxCount + " Records to Blockchain Network");

  for (idx = 0; idx < maxCount; idx++) {
    let account = _accountArrayKeys[idx];
    logDetail("Inserting " + idx + ", " + account);
    await spCoinContractDeployed.addNetworkAccount(account);
  }
  logDetail("JS => Inserted " + maxCount + " Accounts to Blockchain Network");

  return maxCount;
};

addNetworkAccount = async (_accountKey) => {
  logFunctionHeader("addNetworkAccount = async(arrayAccounts)");
  await spCoinContractDeployed.addNetworkAccount(_accountKey);
  logDetail("JS => ** Inserted Account " + _accountKey);
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

getAccountSponsorCount = async (_account) => {
  logFunctionHeader("getAccountSponsorCount = async(" + _account + ")");

  let maxCount = await spCoinContractDeployed.getAccountSponsorCount(_account);
  logDetail(
    "JS => Found " + maxCount + " Sponsor Records For Account " + _account
  );
  return maxCount;
};

getNetworkAccountCount = async () => {
  logFunctionHeader("getNetworkAccountCount = async()");
  let maxCount = await spCoinContractDeployed.getNetworkAccountCount();
  logDetail("JS => Found " + maxCount + " Account Records");
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
    logDetail("Agent[" + idx + "]: " + agent);
    agentKeys[agent] = idx;
  }
  return agentKeys;
};

module.exports = {
  setContract,
  addNetworkAccount,
  getNetworkAccountRec,
  addAccountField,
  addNetworkAccountSponsors,
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
