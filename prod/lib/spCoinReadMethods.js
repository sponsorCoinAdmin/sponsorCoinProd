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

getAccountSponsorKeySize = async (_patreonKey) => {
  logFunctionHeader("getAccountSponsorKeySize = async(" + _patreonKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountSponsorKeySize(_patreonKey);
  logDetail("JS => Found " + maxSize + " Account Sponsor Keys");
  return maxSize;
};

getAccountPatreonKeySize = async (_patreonKey) => {
  logFunctionHeader("getAccountPatreonKeySize = async(" + _patreonKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountPatreonKeySize(_patreonKey);
  logDetail("JS => Found " + maxSize + " Account Patreon Keys");
  return maxSize;
};

getAccountAgentKeySize = async (_patreonKey) => {
  logFunctionHeader("getAccountAgentKeySize = async(" + _patreonKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountAgentKeySize(_patreonKey);
  logDetail("JS => Found " + maxSize + " Account Agent Records");
  return maxSize;
};

getAccountParentSponsorKeys = async (_patreonKey) => {
  logFunctionHeader("getAccountParentSponsorKeys = async(" + _patreonKey + ")");
  let accountParentSponsorKeys = spCoinContractDeployed.getAccountParentSponsorKeys;
  return accountParentSponsorKeys;
}

getAccountParentSponsorKeySize = async () => {
  logFunctionHeader("getAccountParentSponsorKeySize = async()");
  let maxSize = await spCoinContractDeployed.getAccountParentSponsorKeySize();
  logDetail("JS => Found " + maxSize + " Account Keys");
  return maxSize;
};

getAccountPatreonKeys = async (_patreonKey) => {
  logFunctionHeader("getAccountPatreonKeys = async(" + _patreonKey + ")");
/*
  let maxSize = await spCoinContractDeployed.getAccountPatreonKeySize(_patreonKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountPatreonKeyByIndex(_patreonKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
*/
  accountPatreonKeys = spCoinContractDeployed.getAccountPatreonKeys(_patreonKey);
  return accountPatreonKeys;
};

getAccountSponsorKeys = async (_patreonKey) => {
  logFunctionHeader("getAccountSponsorKeys = async(" + _patreonKey + ")");
  let sponsorRecKeys = await spCoinContractDeployed.getSponsorKeys(_patreonKey);
  return sponsorRecKeys;
};

getAccountAgentKeys = async (_patreonKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _patreonKey + ")");
  let agentAccountKeys = await spCoinContractDeployed.getAccountAgentKeys(_patreonKey);
  return agentAccountKeys;
};

/////////////////////// SPONSOR RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_patreonKey, _sponsorKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _patreonKey + ", " + _sponsorKey + ")" );
  agentAccountKeys = spCoinContractDeployed.getAgentRecordKeys(_patreonKey, _sponsorKey);
  return agentAccountKeys;
};

getAgentRecordKeySize = async (_patreonKey, _sponsorKey) => {
  logFunctionHeader("getAgentRecordKeySize = async(" + _patreonKey + ", " + _sponsorKey + ")" );

  let agentSize = await spCoinContractDeployed.getAgentRecordKeySize(
    _patreonKey, _sponsorKey );
  logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
  return agentSize;
};

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

getAccountSerializedRecord = async (_patreonKey) => {
  logFunctionHeader("getAccountSerializedRecord = async(" + _patreonKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRec(_patreonKey);
  return deSerializedAccountRec(serializedAccountRec);
};

//////////////////// LOAD ACCOUNT DATA //////////////////////
getSponsorsByAccount = async(_patreonKey) => {    
  logFunctionHeader("getSponsorsByAccount("  + _patreonKey + ")");
  sponsorRecKeys = await getAccountSponsorKeys(_patreonKey);
  sponsorRecordList = await getSponsorRecordsByKeys(_patreonKey, sponsorRecKeys);
  return sponsorRecordList;
}
//////////////////// LOAD SPONSOR DATA //////////////////////

getSponsorRecordsByKeys = async(_patreonKey, _sponsorRecKeys) => {
  logFunctionHeader("getSponsorRecordsByKeys(" + _patreonKey + ", " + _sponsorRecKeys + ")");
  let sponsorRecordList = [];
  for (let [idx, sponsorAccountKey] of Object.entries(_sponsorRecKeys)) {
    logDetail("JS => Loading Sponsor Record " + sponsorAccountKey, idx);
    let sponsorRec = await getSponsorRecordByKeys(idx, _patreonKey, sponsorAccountKey);
    sponsorRecordList.push(sponsorRec);
  }
  return sponsorRecordList;
}

getSponsorRecordByKeys = async(_index, _patreonKey, _sponsorKey) => {
  logFunctionHeader("getSponsorRecordByKeys(" + _patreonKey + ", " + _sponsorKey + ")");
  let sponsorRecord = new SponsorStruct(_sponsorKey);
  sponsorRecord.sponsorAccountKey = _sponsorKey;
  // sponsorRecord.index = _index;
  sponsorRecord.totalAgentsSponsored = bigIntToDecimal(await spCoinContractDeployed.getTotalSponsoredAmount(_patreonKey, _sponsorKey));

  // ToDo New Robin
  sponsorRecord.sponsorRateKeys = await getSponsorRateKeys(_patreonKey, _sponsorKey);
  console.log("ZZZZZ sponsorRecord.sponsorRateKeys.length = ", sponsorRecord.sponsorRateKeys.length);
  for (let [idx, sponsorRateKey] of Object.entries(sponsorRecord.sponsorRateKeys)) {
    console.log("ZZZZZ sponsorRateKey[" + idx + "] = " + sponsorRateKey);
    sponsorRecord.sponsorRateList = await getSponsorRateRecordByKeys(idx, _patreonKey, _sponsorKey, sponsorRateKey);
  }

  return sponsorRecord;
}

getSponsorRateKeys = async(_patreonKey, _sponsorKey) => {
  let networkRateKeys = await spCoinContractDeployed.getSponsorRateKeys(_patreonKey, _sponsorKey);
  let sponsorRateKeys = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    sponsorRateKeys.push(bigIntToDecimal(netWorkRateKey));
  }
  return sponsorRateKeys;
}

//////////////////// LOAD SPONSOR RATE DATA //////////////////////

getSponsorRateRecordByKeys = async(_index, _patreonKey, _sponsorKey, _sponsorRateKey) => {
  logFunctionHeader("getSponsorRateRecordByKeys(" + _index + ", " + _patreonKey + ", " + _sponsorKey + ")");
  let sponsorRateRecord = new SponsorRateStruct();
  // sponsorRateRecord.sponsorAccountKey = _sponsorKey;
  // sponsorRateRecord.index = _index;
  sponsorRateRecord.sponsorRate = _sponsorRateKey;
  sponsorRateRecord.totalAgentsSponsored = bigIntToDecimal(await spCoinContractDeployed.getTotalSponsoredAmount(_patreonKey, _sponsorKey));
  let agentAccountKeys = await getAgentRecordKeys(_patreonKey, _sponsorKey);
  sponsorRateRecord.agentAccountKeys = agentAccountKeys;
  sponsorRateRecord.agentRecordList = await getAgentRecordsByKeys(_patreonKey, _sponsorKey, agentAccountKeys);

  return sponsorRateRecord;
}
//  End New Robin

getSponsorRateByKeys = async(_patreonKey, _sponsorKey, _agentKey, _agentRateKey) => {
  // logFunctionHeader("getAgentsBySponsor = async(" + _patreonKey + ", " + _agentRateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_patreonKey, _agentRateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_patreonKey, _sponsorKey, _agentRateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Rate";
}

//////////////////// LOAD SPONSOR TRANSACTION DATA //////////////////////

getSponsorTransactionsByKeys = async(_patreonKey, _sponsorKey, _agentKey) => {
  // logFunctionHeader("getAgentsBySponsor = async(" + _patreonKey + ", " + _agentRateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_patreonKey, _agentRateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_patreonKey, _sponsorKey, _agentRateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Transactions";
}
//////////////////// LOAD AGENT DATA //////////////////////

// getAgentsBySponsor = async(_patreonKey, _sponsorKey) => {
//   logFunctionHeader("getAgentsBySponsor = async(" + _patreonKey + ", " + _sponsorKey + ")");
//   let agentAccountKeys = await getAgentRecordKeys(_patreonKey, _sponsorKey);
//   let agentRecordList = await getAgentRecordsByKeys(_patreonKey, _sponsorKey, agentAccountKeys);
//   return agentRecordList;
// }

getAgentRecordsByKeys = async(_patreonKey, _sponsorKey, _agentAccountKeys) => {
  logFunctionHeader("getAgentRecordsByKeys(" + _patreonKey + ", " + _sponsorKey + ", " + _agentAccountKeys + ")");
  let agentRecordList = [];
  for (let [idx, agentAccountKey] of Object.entries(_agentAccountKeys)) {
      logDetail("JS => Loading Agent Records " + agentAccountKey, idx);
      let agentRecord = await getAgentRecordByKeys(idx, _patreonKey, _sponsorKey, agentAccountKey);
      agentRecordList.push(agentRecord);
  }
  return agentRecordList;
}

getAgentRecordByKeys = async(_index, _patreonKey, _sponsorKey, _agentKey) => {
  logFunctionHeader("getAgentRecordByKeys(" + _patreonKey + ", " + _sponsorKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentAccountKey = _agentKey;
  // agentRecord.index = _index;
  agentRecord.totalRatesSponsored = bigIntToDecimal(await spCoinContractDeployed.getAgentTotalSponsored(_patreonKey, _sponsorKey, _agentKey));
  agentRecord.agentRateList = await getAgentRatesByKeys(_patreonKey, _sponsorKey, _agentKey);
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_patreonKey, _sponsorKey, _agentKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _patreonKey + ", " + _sponsorKey+ ", " + _agentKey + ")");

  let agentRateKeys = await getAgentRateKeys(_patreonKey, _sponsorKey, _agentKey);

  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
    agentRateKey = hexToDecimal(agentRateKey);
    logDetail("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
///log("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
    let agentRateRecord = await deSerializeAgentRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, agentRateKey);
      agentRateList.push(agentRateRecord);
  }
  return agentRateList;
  return "ToDo Agent Rates";
}

getAgentRateKeys = async (_patreonKey, _sponsorKey, _agentKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _patreonKey + ", " + _sponsorKey + ")" );
  agentAccountKeys = await spCoinContractDeployed.getAgentRateKeys(_patreonKey, _sponsorKey, _agentKey);
  return agentAccountKeys;
};

deSerializeAgentRateRecordByKeys = async(_patreonKey, _sponsorKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateByKeys(" + _patreonKey + ", " + _sponsorKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let headerStr = await getRateHeaderDataList(_patreonKey, _sponsorKey, _agentKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = hexToDecimal(headerStr[0]);
  agentRateRecord.lastUpdateTime = hexToDecimal(headerStr[1]);
  agentRateRecord.totalTransactionsSponsored = hexToDecimal(headerStr[2]);
  agentRateRecord.transactions = await getRateTransactionsByKeys(_patreonKey, _sponsorKey, _agentKey, _agentRateKey);
  return agentRateRecord;
}

/*
getAgentRateRecordsByKeys = async(_patreonKey, _sponsorKey, _agentKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _patreonKey + ", " + _sponsorKey+ ", " + _agentKey + ")");

  let agentRateKeys = await getAgentRateKeys(_patreonKey, _sponsorKey, _agentKey);

  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
      logDetail("JS => Loading Agent Rates " + agentRateKeys, idx);
      let agentRateRecord = await getAgentRateByKeys(_patreonKey, _sponsorKey, agentRateKey);
      agentRateRecord.index = idx;
      agentRecordList.push(agentRateRecord);
  }
  return agentRateList;
*/
//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getRateTransactionsByKeys = async(_patreonKey, _sponsorKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getRateTransactionsByKeys = async(" + _patreonKey + ", " + _sponsorKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateTransactionList = await spCoinContractDeployed.getRateTransactionList(_patreonKey, _sponsorKey, _agentKey, _agentRateKey);
  return getRateTransactionRecords(agentRateTransactionList);
}

getRateHeaderDataList = async(_patreonKey, _sponsorKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getRateHeaderDataList = async(" + _patreonKey + ", " + _sponsorKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateHeaderStr = await spCoinContractDeployed.serializeAgentRateRecordStr(_patreonKey, _sponsorKey, _agentKey, _agentRateKey);
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

getAccountRecords = async(_patreonKey, _sponsorKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAccountRecords()");
  let accountArr = [];
  let accountKeys = await spCoinContractDeployed.getAccountKeys();

  for (let i in accountKeys) {
      let accountStruct = await getAccountRecord(accountKeys[i]);
      accountArr.push(accountStruct);
  }
  return accountArr;
}

getAccountRecord = async (_patreonKey) => {
  let accountStruct = await getAccountSerializedRecord(_patreonKey);
  accountStruct.accountKey = _patreonKey;
  sponsorRecKeys = await getAccountSponsorKeys(_patreonKey);
  accountStruct.sponsorRecKeys = sponsorRecKeys;
  accountStruct.accountPatreonKeys = await getAccountPatreonKeys(_patreonKey);
  accountStruct.agentAccountKeys = await getAccountAgentKeys(_patreonKey);
  accountStruct.accountParentSponsorKeys = await getAccountParentSponsorKeys(_patreonKey);
  accountStruct.sponsorRecordList = await getSponsorRecordsByKeys(_patreonKey, sponsorRecKeys);
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
  getSponsorRateRecordByKeys,
  getSponsorRecordByKeys,
  getSponsorRecordsByKeys,
  getSponsorsByAccount,
  setContractReadMethods,
};
