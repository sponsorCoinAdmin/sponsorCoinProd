const { testHHAccounts } = require("./hhTestAccounts");
const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("./dataTypes");
const { logFunctionHeader } = require("./logging");
let spCoinContractDeployed;

setContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

addNetworkAccount = async (accountKey) => {
  logFunctionHeader(
    "scAccountMethods.js: InsertAccount = async(" + accountKey + ")"
  );
  logDetail("Inserting Account " + accountKey + " To Blockchain Network");
  let recString = await spCoinContractDeployed.addNetworkAccount(accountKey);
};

getNetworkAccountRec = async (accountKey) => {
  logFunctionHeader("getNetworkAccountRec = async(" + accountKey + ")");
  let serializeAccountRec =
  await spCoinContractDeployed.getSerializedAccountRec(accountKey);
  logDetail("serializeAccountRec:\n" + serializeAccountRec);
  let accountStruct = new AccountStruct(accountKey);
  let elements = serializeAccountRec.split(",");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i].trim();
    let keyValue = element.split(":");
    let key = keyValue[0].trim();
    let value = keyValue[1].trim();
    // logDetail("key     = " + key);
    // logDetail("value   = " + value);
    addAccountField(key, value, accountStruct);
  }

  logDetail("scPrintStructureTest.js, accountStruct:");
  logDetail("accountStruct               = " + JSON.stringify(accountStruct,0,2));
  logDetail(
    "============================================================================"
  );
  return accountStruct;
};

addAccountField = (key, value, accountStruct) => {
  logFunctionHeader("addAccountField = (" + key + "," + value + ")");
  switch (key.trim()) {
    case "index":
      logDetail("setting accountStruct.index = " + value);
      accountStruct.index = value;
      break;
    case "accountKey":
      logDetail("setting accountStruct.index = " + value);
      accountStruct.accountKey = value;
      break;
    case "insertionTime":
      logDetail("setting accountStruct.insertionTime = " + value);
      accountStruct.insertionTime = value;
      break;
    case "inserted":
      logDetail("setting accountStruct.inserted = " + value);
      accountStruct.inserted = value;
      break;
    case "verified":
      logDetail("setting accountStruct.verified = " + value);
      accountStruct.verified = value;
      break;
    case "KYC":
      logDetail("setting accountStruct.KYC = " + value);
      accountStruct.KYC = value;
      break;
    case "sponsorKeys":
      logDetail("setting accountStruct.sponsorKeys = " + value);
      accountStruct.sponsorKeys = value;
      break;
    case "sponsorArr":
      logDetail("setting accountStruct.sponsorArr = " + value);
      accountStruct.sponsorArr = value;
      break;
    default:
      break;
  }
};

addNetworkAccountSponsors = async (accountKey, _sponsorArr) => {
  logFunctionHeader(
    "addNetworkAccountSponsors = async(" + accountKey + ", " + _sponsorArr + ")"
  );
 
  logDetail("For Account[" + accountKey + "]: " + accountKey + ")");
  logDetail("Inserting " + _sponsorArr.length + " Sponsors To Blockchain Network");

  let sponsorCount = 0;
  for (sponsorCount; sponsorCount < _sponsorArr.length; sponsorCount++) {
    let sponsorRec = _sponsorArr[sponsorCount];
    logDetail( "   " + sponsorCount +  ". " + "Inserting Sponsor[" + sponsorCount + "]: " + sponsorRec );
    await spCoinContractDeployed.insertAccountSponsor(accountKey, sponsorRec);
  }
  logDetail("Inserted = " + sponsorCount + " Sponsor Records");
  return --sponsorCount;
};

addNetworkSponsorAgents = async (_testAccountHHIdx, _sponsorRecIdx, _agentArr) => {
  logFunctionHeader( "addNetworkSponsorAgents = async(" + _sponsorRecIdx + ", " + _agentArr + ")" );
  let accountRec = testHHAccounts[_testAccountHHIdx];
  let sponsorRec = testHHAccounts[_sponsorRecIdx];
  let prefix = "        ";
  logDetail( prefix + "For Account [" + _testAccountHHIdx + "]: " + accountRec + ")" );
  logDetail( prefix + "For Sponsor [" + _sponsorRecIdx + "]: " + sponsorRec + ")" );
  let recCount = 0;
  let agentCount = _agentArr.length;
  logDetail("_agentArr = " + _agentArr);
  logDetail("agentCount.length = " + agentCount);
  for (let i = 0; i < agentCount; i++) {
    let agentRec = testHHAccounts[_agentArr[i]];
    logDetail( prefix + ++recCount +  ". " + "Inserting Agent[" + _agentArr[i] + "]: " + agentRec );
    await spCoinContractDeployed.insertSponsorAgent( accountRec, sponsorRec, agentRec );
  }
  agentCount = await spCoinContractDeployed.getAgentRecordCount( accountRec, sponsorRec );
  logDetail(prefix + "Inserted = " + agentCount + " Agent Records");
  return agentCount;
};

addNetworkAccounts = async (_arrayAccounts) => {
  logFunctionHeader("addNetworkAccount = async(arrayAccounts)");
  let recCount = _arrayAccounts.length;
  logDetail("Inserting " + recCount + " Records to Blockchain Network");

  for (idx = 0; idx < recCount; idx++) {
    let account = testHHAccounts[idx];
    logDetail("Inserting " + idx + ", " + account);
    await spCoinContractDeployed.addNetworkAccount(account);
  }
  logDetail("JS => Inserted " + recCount + " Accounts to Blockchain Network");

  return recCount;
};

addNetworkAccount = async (_accountKey) => {
  logFunctionHeader("addNetworkAccount = async(arrayAccounts)");
  await spCoinContractDeployed.addNetworkAccount(_accountKey);
  logDetail("JS => ** Inserted Account " + _accountKey);
};

getNetworkAccounts = async () => {
  logFunctionHeader("getNetworkAccounts = async()");
  let maxCount = await spCoinContractDeployed.getAccountRecordCount();

  var insertedArrayAccounts = [];
  for (idx = 0; idx < maxCount; idx++) {
    let account = await spCoinContractDeployed.getAccount(idx);
    logDetail("JS => Address at Index " + idx + "  = " + account);
    insertedArrayAccounts.push(account);
  }
  return insertedArrayAccounts;
};

getAccountSponsorCount= async (_account) => {
  logFunctionHeader("getAccountSponsorCount = async(" + _account + ")");
 
  let recCount = await spCoinContractDeployed.getAccountSponsorCount(_account);
  logDetail("JS => Found " + recCount + " Sponsor Records For Account " + _account);
  return recCount;
}

getAccountRecordCount = async () => {
  let recCount = await spCoinContractDeployed.getAccountRecordCount();
  logDetail("JS => Found " + recCount + " Account Records");
  return recCount;
}

getNetworkAccountSponsorsCount = async (_accountKey) => {
  logFunctionHeader("getNetworkAccountSponsors = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getSponsorRecordCount(_accountKey);

  let recCount = await spCoinContractDeployed.getAccountRecordCount();
  logDetail("JS => Found " + recCount + " Account Records");
  return recCount;
}

getNetworkSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getNetworkSponsorKeys = async(" + _accountKey + ")");
  let maxCount = await spCoinContractDeployed.getSponsorRecordCount(
    _accountKey
  );

  let sponsorKeys = {};
  for (let idx = 0; idx < maxCount; idx++) {
    let sponsor = await spCoinContractDeployed.getSponsorKeyAddress(
      _accountKey,
      idx
    );
    logDetail("Sponsor[" + idx + "]: " + sponsor);
    sponsorKeys[sponsor] = idx;
    //        sponsorKeys.push(sponsor);
  }
  return sponsorKeys;
};

getNetworkAgentKeys = async (_accountKey, _sponsorKey) => {
  logFunctionHeader(
    "getNetworkAgentKeys = async(" + _accountKey + ", " + _sponsorKey + ")"
  );
  let maxCount = await spCoinContractDeployed.getAgentRecordCount(
    _accountKey,
    _sponsorKey
  );

  let agentKeys = {};
  for (let idx = 0; idx < maxCount; idx++) {
    let agent = await spCoinContractDeployed.getAgentKeyAddress(
      _accountKey,
      _sponsorKey,
      idx
    );
    logDetail("Agent[" + idx + "]: " + agent);
    agentKeys[agent] = idx;
  }
  return agentKeys;
};

module.exports = {
  setContract,
  addNetworkAccount,
  addNetworkAccountSponsors,
  addNetworkSponsorAgents,
  getNetworkAccounts,
  getNetworkSponsorKeys,
  getNetworkAgentKeys,
};
