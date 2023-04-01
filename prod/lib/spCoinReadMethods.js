const { logFunctionHeader } = require("./utils/logging");
const { AccountStruct,
  SponsorStruct,
  AgentStruct,
  AgentRateStruct,
  TransactionStruct } = require("./spCoinDataTypes");
const { hexToDecimal, bigIntToDecimal } = require("./utils/serialize");

let spCoinContractDeployed;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

setContractReadMethods = (_spCoinContractDeployed) => {
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
/*
  let maxSize = await spCoinContractDeployed.getAccountPatreonKeySize(_accountKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountPatreonKeyByIndex(_accountKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
*/
  accountPatreonKeys = spCoinContractDeployed.getAccountPatreonKeys(_accountKey);
  return accountPatreonKeys;
};

getAccountSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorKeys = async(" + _accountKey + ")");
  let agentRecKeys = await spCoinContractDeployed.getSponsorKeys(_accountKey);
  return agentRecKeys;
};

getAccountAgentKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _accountKey + ")");
  let agentRecordKeys = await spCoinContractDeployed.getAccountAgentKeys(_accountKey);
  return agentRecordKeys;
};

/////////////////////// SPONSOR RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  agentRecordKeys = spCoinContractDeployed.getAgentRecordKeys(_accountKey, _sponsorAccountKey);
  return agentRecordKeys;
};

getAgentRecordKeySize = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentRecordKeySize = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );

  let agentSize = await spCoinContractDeployed.getAgentRecordKeySize(
    _accountKey, _sponsorAccountKey );
  logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
  return agentSize;
};

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

getAccountSerializedRecord = async (_accountKey) => {
  logFunctionHeader("getAccountSerializedRecord = async(" + _accountKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRec(_accountKey);
  return deSerializedAccountRec(serializedAccountRec);
};

//////////////////// LOAD ACCOUNT DATA //////////////////////
getSponsorsByAccount = async(_accountKey) => {    
  logFunctionHeader("getSponsorsByAccount("  + _accountKey + ")");
  agentRecKeys = await getAccountSponsorKeys(_accountKey);
  sponsorRecordList = await getSponsorRecordsByKeys(_accountKey, agentRecKeys);
  return sponsorRecordList;
}
//////////////////// LOAD SPONSOR DATA //////////////////////

getSponsorRecordsByKeys = async(_accountKey, _agentRecKeys) => {
  logFunctionHeader("getSponsorRecordsByKeys(" + _accountKey + ", " + _agentRecKeys + ")");
  let sponsorRecordList = [];
  for (let [idx, sponsorAccountKey] of Object.entries(_agentRecKeys)) {
    logDetail("JS => Loading Sponsor Record " + sponsorAccountKey, idx);
    let sponsorRec = await getSponsorRecordByKeys(idx, _accountKey, sponsorAccountKey);
    sponsorRecordList.push(sponsorRec);
  }
  return sponsorRecordList;
}

getSponsorRecordByKeys = async(_index, _accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getSponsorRecordByKeys(" + _accountKey + ", " + _sponsorAccountKey + ")");
  let sponsorRecord = new SponsorStruct(_sponsorAccountKey);
  sponsorRecord.index = _index;
  sponsorRecord.sponsorAccountKey = _sponsorAccountKey;
  sponsorRecord.totalAgentsSponsored = bigIntToDecimal(await spCoinContractDeployed.getSponsorTotalSponsored(_accountKey, _sponsorAccountKey));
  let agentRecordKeys = await getAgentRecordKeys(_accountKey, _sponsorAccountKey);
  sponsorRecord.agentRecordKeys = agentRecordKeys;
  sponsorRecord.agentRecordList = await getAgentRecordsByKeys(_accountKey, _sponsorAccountKey, agentRecordKeys);
  return sponsorRecord;
}

getAgentsByPatreonSponsor = async(_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _sponsorAccountKey + ")");
  let agentRecordKeys = await getAgentRecordKeys(_accountKey, _sponsorAccountKey);
  let agentRecordList = await getAgentRecordsByKeys(_accountKey, _sponsorAccountKey, agentRecordKeys);
  return agentRecordList;
}

//////////////////// LOAD SPONSOR RATE DATA //////////////////////

getSponsorRatesByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _agentRateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _agentRateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _agentRateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Rates";
}

getSponsorRateByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _agentRateKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _agentRateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _agentRateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _agentRateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Rate";
}

//////////////////// LOAD SPONSOR TRANSACTION DATA //////////////////////

getSponsorTransactionsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _agentRateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _agentRateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _agentRateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Transactions";
}
//////////////////// LOAD AGENT DATA //////////////////////

getAgentRecordsByKeys = async(_accountKey, _sponsorAccountKey, _agentRecordKeys) => {
  logFunctionHeader("getAgentRecordsByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _agentRecordKeys + ")");
  let agentRecordList = [];
  for (let [idx, agentAccountKey] of Object.entries(_agentRecordKeys)) {
      logDetail("JS => Loading Agent Records " + agentAccountKey, idx);
      let agentRecord = await getAgentRecordByKeys(idx, _accountKey, _sponsorAccountKey, agentAccountKey);
      agentRecordList.push(agentRecord);
  }
  return agentRecordList;
}

getAgentRecordByKeys = async(_index, _accountKey, _sponsorAccountKey, _agentAccountKey) => {
  logFunctionHeader("getAgentRecordByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _agentAccountKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.index = _index;
  agentRecord.agentAccountKey = _agentAccountKey;
  agentRecord.totalRatesSponsored = bigIntToDecimal(await spCoinContractDeployed.getAgentTotalSponsored(_accountKey, _sponsorAccountKey, _agentAccountKey));
  agentRecord.agentRateList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _accountKey + ", " + _sponsorAccountKey+ ", " + _agentAccountKey + ")");

  let agentRateKeys = await getAgentRateKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);

  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
    agentRateKey = hexToDecimal(agentRateKey);
    logDetail("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
///log("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
    let agentRateRecord = await getAgentRateRecordByKeys(_accountKey, _sponsorAccountKey, _agentAccountKey, agentRateKey);
      agentRateList.push(agentRateRecord);
  }
  return agentRateList;
  return "ToDo Agent Rates";
}

getAgentRateKeys = async (_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  agentRecordKeys = await spCoinContractDeployed.getAgentRateKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);
  return agentRecordKeys;
};

getAgentRateRecordByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _agentAccountKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let headerStr = await getRateHeaderDataList(_accountKey, _sponsorAccountKey, _agentAccountKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = hexToDecimal(headerStr[0]);
  agentRateRecord.lastUpdateTime = hexToDecimal(headerStr[1]);
  agentRateRecord.totalTransactionsSponsored = hexToDecimal(headerStr[2]);
  agentRateRecord.transactions = await getRateTransactionsByKeys(_accountKey, _sponsorAccountKey, _agentAccountKey, _agentRateKey);
  return agentRateRecord;
}

/*
getAgentRateRecordsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _accountKey + ", " + _sponsorAccountKey+ ", " + _agentAccountKey + ")");

  let agentRateKeys = await getAgentRateKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);

  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
      logDetail("JS => Loading Agent Rates " + agentRateKeys, idx);
      let agentRateRecord = await getAgentRateByKeys(_accountKey, _sponsorAccountKey, agentRateKey);
      agentRateRecord.index = idx;
      agentRecordList.push(agentRateRecord);
  }
  return agentRateList;
*/
//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getRateTransactionsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _agentRateKey) => {
  logFunctionHeader("getRateTransactionsByKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _agentAccountKey + ", " + _agentRateKey + ")");
  let agentRateTransactionList = await spCoinContractDeployed.getRateTransactionList(_accountKey, _sponsorAccountKey, _agentAccountKey, _agentRateKey);
  return getRateTransactionRecords(agentRateTransactionList);
}

getRateHeaderDataList = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _agentRateKey) => {
  logFunctionHeader("getRateHeaderDataList = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _agentAccountKey + ", " + _agentRateKey + ")");
  let agentRateHeaderStr = await spCoinContractDeployed.getRateHeaderDataStr(_accountKey, _sponsorAccountKey, _agentAccountKey, _agentRateKey);
  let agentRateHeaderList = agentRateHeaderStr.split(",");
  return agentRateHeaderList;
}

getRateTransactionRecords = (transactionStr) => {
  let transactionRows = transactionStr.split("\n");
  let transactionRecs = [];
  for (let row in transactionRows) {
    let transactionFields = transactionRows[row].split(",");
    let transactionRec = new TransactionStruct();
    transactionRec.insertionTime = hexToDecimal(transactionFields[0]);
    transactionRec.quantity = hexToDecimal(transactionFields[1]);
    transactionRecs.push(transactionRec);
    // logJSON(transactionRec);
  }
  return transactionRecs;
}

getAccountRecords = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _agentRateKey) => {
  logFunctionHeader("getAccountRecords()");
  let accountArr = [];
  let accountKeys = await spCoinContractDeployed.getAccountKeys();

  for (let i in accountKeys) {
      let accountStruct = await getAccountRecord(accountKeys[i]);
      accountArr.push(accountStruct);
  }
  return accountArr;
}

getAccountRecord = async (_accountKey) => {
  let accountStruct = await getAccountSerializedRecord(_accountKey);
  accountStruct.accountKey = _accountKey;
  agentRecKeys = await getAccountSponsorKeys(_accountKey);
  accountStruct.agentRecKeys = agentRecKeys;
  accountStruct.accountPatreonKeys = await getAccountPatreonKeys(_accountKey);
  accountStruct.agentRecordKeys = await getAccountAgentKeys(_accountKey);
  accountStruct.accountParentSponsorKeys = await getAccountParentSponsorKeys(_accountKey);
  accountStruct.sponsorRecordList = await getSponsorRecordsByKeys(_accountKey, agentRecKeys);
  return accountStruct;
}

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
  getAccountRecord,
  getAccountRecords,
  getAccountSerializedRecord,
  getAccountSponsorKeys,
  getAccountSponsorKeySize,
  getAgentRateRecordByKeys,
  getAgentRatesByKeys,
  getAgentRecordByKeys,
  getAgentRecordKeys,
  getAgentRecordKeySize,
  getAgentRecordsByKeys,
  getAgentsByPatreonSponsor,
  getSponsorRateByKeys,
  getSponsorRatesByKeys,
  getSponsorRecordByKeys,
  getSponsorRecordsByKeys,
  getSponsorsByAccount,
  setContractReadMethods,
};
