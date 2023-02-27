const { testHHAccounts } = require("./hhTestAccounts");
let spCoinContractDeployed;

setContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

addNetworkAccount = async (accountKey) => {
  logFunctionHeader("scAccountMethods.js: InsertAccount = async(" + accountKey + ")");
  console.log("Inserting Account " + accountKey);
  let recString = await spCoinContractDeployed.addNetworkAccount(accountKey);
};

getNetworkAccountRec = async (accountKey) => {
  let serializeAccount = await spCoinContractDeployed.getSerializedAccount(accountKey);

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log("scPrintStructureTest.js, serializeAccount:");
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
  console.log(serializeAccount);
  console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
  return recString;
}

addNetworkAccountSponsors = async (_testAccountHHIdx, _sponsorArr) => {
  logFunctionHeader(
    "addNetworkAccountSponsors = async(" +
      _testAccountHHIdx +
      ", " +
      _sponsorArr +
      ")"
  );
  let accountKey = testHHAccounts[_testAccountHHIdx];

  logDetail("For Account[" + _testAccountHHIdx + "]: " + accountKey + ")");
  let recCount = 0;
  let sponsorCount = _sponsorArr.length;
  logDetail("sponsorCount.length = " + sponsorCount);
  for (let i = 0; i < sponsorCount; i++) {
    let sponsorRec = testHHAccounts[_sponsorArr[i]];
    logDetail(
      "   " +
        ++recCount +
        ". " +
        "Inserting Sponsor[" +
        _sponsorArr[i] +
        "]: " +
        sponsorRec
    );
    await spCoinContractDeployed.insertAccountSponsor(accountKey, sponsorRec);
  }
  sponsorCount = await spCoinContractDeployed.getSponsorRecordCount(accountKey);
  logDetail("Inserted = " + sponsorCount + " Sponsor Records");
  return sponsorCount;
};

addNetworkAccounts = async (_testAccountHHIdx, _sponsorRecIdx, _agentArr) => {
  logFunctionHeader(
    "addNetworkAccounts = async(" + _sponsorRecIdx + ", " + _agentArr + ")"
  );
  let accountRec = testHHAccounts[_testAccountHHIdx];
  let sponsorRec = testHHAccounts[_sponsorRecIdx];
  let prefix = "        ";
  logDetail(
    prefix + "For Account [" + _testAccountHHIdx + "]: " + accountRec + ")"
  );
  logDetail(
    prefix + "For Sponsor [" + _sponsorRecIdx + "]: " + sponsorRec + ")"
  );
  let recCount = 0;
  let agentCount = _agentArr.length;
  logDetail("_agentArr = " + _agentArr);
  logDetail("agentCount.length = " + agentCount);
  for (let i = 0; i < agentCount; i++) {
    let agentRec = testHHAccounts[_agentArr[i]];
    logDetail(
      prefix +
        ++recCount +
        ". " +
        "Inserting Agent[" +
        _agentArr[i] +
        "]: " +
        agentRec
    );
    await spCoinContractDeployed.insertSponsorAgent(
      accountRec,
      sponsorRec,
      agentRec
    );
  }
  agentCount = await spCoinContractDeployed.getAgentRecordCount(
    accountRec,
    sponsorRec
  );
  logDetail(prefix + "Inserted = " + agentCount + " Agent Records");
  return agentCount;
};

addNetworkAccounts = async (_arrayAccounts) => {
  logFunctionHeader("addNetworkAccounts = async(arrayAccounts)");
  let recCount = _arrayAccounts.length;
  logDetail("Inserting " + recCount + " Records to Blockchain");

  for (idx = 0; idx < recCount; idx++) {
    let account = _arrayAccounts[idx];
    logDetail("Inserting " + idx + ", " + account);
    await spCoinContractDeployed.addNetworkAccount(account);
  }
  logDetail("JAVASCRIPT => ** Inserted " + recCount + " Accounts");
  return recCount;
};

getNetworkAccounts = async () => {
  logFunctionHeader("getNetworkAccounts = async()");
  let maxCount = await spCoinContractDeployed.getAccountRecordCount();

  var insertedArrayAccounts = [];
  for (idx = 0; idx < maxCount; idx++) {
    let account = await spCoinContractDeployed.getAccount(idx);
    logDetail("JAVASCRIPT => Address at Index " + idx + "  = " + account);
    insertedArrayAccounts.push(account);
  }
  return insertedArrayAccounts;
};

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
  addNetworkAccounts,
  getNetworkAccounts,
  getNetworkSponsorKeys,
  getNetworkAgentKeys,
};
