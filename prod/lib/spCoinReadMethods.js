const { logFunctionHeader } = require("./utils/logging");
const {
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  SponsorStruct,
  SponsorRateStruct,
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

getAgentRecordKeys = async (_accountKey, _sponsorKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _accountKey + ", " + _sponsorKey + ")" );
  agentRecordKeys = spCoinContractDeployed.getAgentRecordKeys(_accountKey, _sponsorKey);
  return agentRecordKeys;
};

getAgentRecordKeySize = async (_accountKey, _sponsorKey) => {
  logFunctionHeader("getAgentRecordKeySize = async(" + _accountKey + ", " + _sponsorKey + ")" );

  let agentSize = await spCoinContractDeployed.getAgentRecordKeySize(
    _accountKey, _sponsorKey );
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

getSponsorRecordByKeys = async(_index, _accountKey, _sponsorKey) => {
  logFunctionHeader("getSponsorRecordByKeys(" + _accountKey + ", " + _sponsorKey + ")");
  let sponsorRecord = new SponsorStruct(_sponsorKey);
  sponsorRecord.index = _index;
  sponsorRecord.sponsorAccountKey = _sponsorKey;
  sponsorRecord.totalAgentsSponsored = bigIntToDecimal(await spCoinContractDeployed.getSponsorTotalSponsored(_accountKey, _sponsorKey));
  let agentRecordKeys = await getAgentRecordKeys(_accountKey, _sponsorKey);

  // ToDo New Robin
  sponsorRecord.sponsorRateList = await getSponsorRatesByKeys(9999, _accountKey, _sponsorKey);
  // sponsorRecord.agentRecordKeys = agentRecordKeys;
  // sponsorRecord.agentRecordList = await getAgentRecordsByKeys(_accountKey, _sponsorKey, agentRecordKeys);
//  console.log("sponsorRecord = "+ sponsorRecord);

  return sponsorRecord;
}

//////////////////// LOAD SPONSOR RATE DATA //////////////////////

getSponsorRatesByKeys = async(_index, _accountKey, _sponsorKey) => {
  logFunctionHeader("getSponsorRatesByKeys(" + _index + ", " + _accountKey + ", " + _sponsorKey + ")");
  let sponsorRateRecord = new SponsorRateStruct();
  sponsorRateRecord.index = _index;
  sponsorRateRecord.sponsorAccountKey = _sponsorKey;
  sponsorRateRecord.totalAgentsSponsored = bigIntToDecimal(await spCoinContractDeployed.getSponsorTotalSponsored(_accountKey, _sponsorKey));
  let agentRecordKeys = await getAgentRecordKeys(_accountKey, _sponsorKey);
  sponsorRateRecord.agentRecordKeys = agentRecordKeys;
  sponsorRateRecord.agentRecordList = await getAgentRecordsByKeys(_accountKey, _sponsorKey, agentRecordKeys);

  return sponsorRateRecord;
}
//  End New Robin

getSponsorRateByKeys = async(_accountKey, _sponsorKey, _agentKey, _agentRateKey) => {
  // logFunctionHeader("getAgentsBySponsor = async(" + _accountKey + ", " + _agentRateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _agentRateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorKey, _agentRateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Rate";
}

//////////////////// LOAD SPONSOR TRANSACTION DATA //////////////////////

getSponsorTransactionsByKeys = async(_accountKey, _sponsorKey, _agentKey) => {
  // logFunctionHeader("getAgentsBySponsor = async(" + _accountKey + ", " + _agentRateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _agentRateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorKey, _agentRateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Transactions";
}
//////////////////// LOAD AGENT DATA //////////////////////

// getAgentsBySponsor = async(_accountKey, _sponsorKey) => {
//   logFunctionHeader("getAgentsBySponsor = async(" + _accountKey + ", " + _sponsorKey + ")");
//   let agentRecordKeys = await getAgentRecordKeys(_accountKey, _sponsorKey);
//   let agentRecordList = await getAgentRecordsByKeys(_accountKey, _sponsorKey, agentRecordKeys);
//   return agentRecordList;
// }

getAgentRecordsByKeys = async(_accountKey, _sponsorKey, _agentRecordKeys) => {
  logFunctionHeader("getAgentRecordsByKeys(" + _accountKey + ", " + _sponsorKey + ", " + _agentRecordKeys + ")");
  let agentRecordList = [];
  for (let [idx, agentAccountKey] of Object.entries(_agentRecordKeys)) {
      logDetail("JS => Loading Agent Records " + agentAccountKey, idx);
      let agentRecord = await getAgentRecordByKeys(idx, _accountKey, _sponsorKey, agentAccountKey);
      agentRecordList.push(agentRecord);
  }
  return agentRecordList;
}

getAgentRecordByKeys = async(_index, _accountKey, _sponsorKey, _agentKey) => {
  logFunctionHeader("getAgentRecordByKeys(" + _accountKey + ", " + _sponsorKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.index = _index;
  agentRecord.agentAccountKey = _agentKey;
  agentRecord.totalRatesSponsored = bigIntToDecimal(await spCoinContractDeployed.getAgentTotalSponsored(_accountKey, _sponsorKey, _agentKey));
  agentRecord.agentRateList = await getAgentRatesByKeys(_accountKey, _sponsorKey, _agentKey);
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_accountKey, _sponsorKey, _agentKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _accountKey + ", " + _sponsorKey+ ", " + _agentKey + ")");

  let agentRateKeys = await getAgentRateKeys(_accountKey, _sponsorKey, _agentKey);

  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
    agentRateKey = hexToDecimal(agentRateKey);
    logDetail("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
///log("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
    let agentRateRecord = await deSerializeAgentRateRecordByKeys(_accountKey, _sponsorKey, _agentKey, agentRateKey);
      agentRateList.push(agentRateRecord);
  }
  return agentRateList;
  return "ToDo Agent Rates";
}

getAgentRateKeys = async (_accountKey, _sponsorKey, _agentKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _accountKey + ", " + _sponsorKey + ")" );
  agentRecordKeys = await spCoinContractDeployed.getAgentRateKeys(_accountKey, _sponsorKey, _agentKey);
  return agentRecordKeys;
};

deSerializeAgentRateRecordByKeys = async(_accountKey, _sponsorKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateByKeys(" + _accountKey + ", " + _sponsorKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let headerStr = await getRateHeaderDataList(_accountKey, _sponsorKey, _agentKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = hexToDecimal(headerStr[0]);
  agentRateRecord.lastUpdateTime = hexToDecimal(headerStr[1]);
  agentRateRecord.totalTransactionsSponsored = hexToDecimal(headerStr[2]);
  agentRateRecord.transactions = await getRateTransactionsByKeys(_accountKey, _sponsorKey, _agentKey, _agentRateKey);
  return agentRateRecord;
}

/*
getAgentRateRecordsByKeys = async(_accountKey, _sponsorKey, _agentKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _accountKey + ", " + _sponsorKey+ ", " + _agentKey + ")");

  let agentRateKeys = await getAgentRateKeys(_accountKey, _sponsorKey, _agentKey);

  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
      logDetail("JS => Loading Agent Rates " + agentRateKeys, idx);
      let agentRateRecord = await getAgentRateByKeys(_accountKey, _sponsorKey, agentRateKey);
      agentRateRecord.index = idx;
      agentRecordList.push(agentRateRecord);
  }
  return agentRateList;
*/
//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getRateTransactionsByKeys = async(_accountKey, _sponsorKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getRateTransactionsByKeys = async(" + _accountKey + ", " + _sponsorKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateTransactionList = await spCoinContractDeployed.getRateTransactionList(_accountKey, _sponsorKey, _agentKey, _agentRateKey);
  return getRateTransactionRecords(agentRateTransactionList);
}

getRateHeaderDataList = async(_accountKey, _sponsorKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getRateHeaderDataList = async(" + _accountKey + ", " + _sponsorKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateHeaderStr = await spCoinContractDeployed.serializeAgentRateRecordStr(_accountKey, _sponsorKey, _agentKey, _agentRateKey);
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

getAccountRecords = async(_accountKey, _sponsorKey, _agentKey, _agentRateKey) => {
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
  deSerializeAgentRateRecordByKeys,
  getAgentRatesByKeys,
  getAgentRecordByKeys,
  getAgentRecordKeys,
  getAgentRecordKeySize,
  getAgentRecordsByKeys,
  //getAgentsBySponsor,
  getSponsorRateByKeys,
  getSponsorRatesByKeys,
  getSponsorRecordByKeys,
  getSponsorRecordsByKeys,
  getSponsorsByAccount,
  setContractReadMethods,
};
