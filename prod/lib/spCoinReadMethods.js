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

getAccountRecord = async (_patronKey) => {
  let accountStruct = await getAccountSerializedRecord(_patronKey);
  accountStruct.accountKey = _patronKey;
  sponsorAccountKeys = await getAccountSponsorKeys(_patronKey);
  accountStruct.patronAccountKeys = await getAccountPatronKeys(_patronKey);
  accountStruct.parentSponsorAccountKeys = await getAccountParentSponsorKeys(_patronKey);
  accountStruct.sponsorAccountKeys = sponsorAccountKeys;
  accountStruct.agentAccountKeys = await getAccountAgentKeys(_patronKey);
  accountStruct.sponsorRecordList = await getSponsorRecordsByKeys(_patronKey, sponsorAccountKeys);
  return accountStruct;
}

getAccountSponsorKeySize = async (_patronKey) => {
  logFunctionHeader("getAccountSponsorKeySize = async(" + _patronKey + ")");

  let maxSize = (await getAccountSponsorKeys(_patronKey)).length;
  logDetail("JS => Found " + maxSize + " Account Sponsor Keys");
  return maxSize;
};

getAccountParentSponsorKeys = async (_patronKey) => {
  logFunctionHeader("getAccountParentSponsorKeys = async(" + _patronKey + ")");
  let parentSponsorAccountKeys = spCoinContractDeployed.getAccountParentSponsorKeys(_patronKey);
  return parentSponsorAccountKeys;
}

getAccountPatronKeys = async (_patronKey) => {
  logFunctionHeader("getAccountPatronKeys = async(" + _patronKey + ")");
  patronAccountKeys = spCoinContractDeployed.getAccountPatronKeys(_patronKey);
  return patronAccountKeys;
};

getAccountSponsorKeys = async (_patronKey) => {
  logFunctionHeader("getAccountSponsorKeys = async(" + _patronKey + ")");
  let sponsorAccountKeys = await spCoinContractDeployed.getSponsorKeys(_patronKey);
  return sponsorAccountKeys;
};

getAccountAgentKeys = async (_patronKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _patronKey + ")");
  let agentAccountKeys = await spCoinContractDeployed.getAccountAgentKeys(_patronKey);
  return agentAccountKeys;
};

/////////////////////// SPONSOR RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_patronKey, _sponsorKey, _sponsorRateKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _patronKey + ", " + _sponsorKey+ ", " + _sponsorRateKey + ")" );
  agentAccountKeys = spCoinContractDeployed.getAgentRecordKeys(_patronKey, _sponsorKey, _sponsorRateKey);
  return agentAccountKeys;
};

getAgentRecordKeySize = async (_patronKey, _sponsorKey, _sponsorRateKey) => {
  logFunctionHeader("getAgentRecordKeySize = async(" + _patronKey + ", " + _sponsorKey+ ", " + _sponsorRateKey + ")" );

  let agentSize = await (getAgentRecordKeys(
    _patronKey, _sponsorKey, _sponsorRateKey )).length;
  logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
  return agentSize;
};

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

getAccountSerializedRecord = async (_patronKey) => {
  logFunctionHeader("getAccountSerializedRecord = async(" + _patronKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRec(_patronKey);
  return deSerializedAccountRec(serializedAccountRec);
};

//////////////////// LOAD ACCOUNT DATA //////////////////////
getSponsorsByAccount = async(_patronKey) => {    
  logFunctionHeader("getSponsorsByAccount("  + _patronKey + ")");
  sponsorAccountKeys = await getAccountSponsorKeys(_patronKey);
  sponsorRecordList = await getSponsorRecordsByKeys(_patronKey, sponsorAccountKeys);
  return sponsorRecordList;
}
//////////////////// LOAD SPONSOR DATA //////////////////////

getSponsorRecordsByKeys = async(_patronKey, _sponsorAccountKeys) => {
  logFunctionHeader("getSponsorRecordsByKeys(" + _patronKey + ", " + _sponsorAccountKeys + ")");
  let sponsorRecordList = [];
  for (let [idx, sponsorAccountKey] of Object.entries(_sponsorAccountKeys)) {
    logDetail("JS => Loading Sponsor Record " + sponsorAccountKey, idx);
    let sponsorRec = await getSponsorRecordByKeys(_patronKey, sponsorAccountKey);
    sponsorRecordList.push(sponsorRec);
    return sponsorRec;
  }
//  return "RRRR";
  return sponsorRecordList;
}

getSponsorRecordByKeys = async(_patronKey, _sponsorKey) => {
  logFunctionHeader("getSponsorRecordByKeys(" + _patronKey + ", " + _sponsorKey + ")");
  let sponsorRecord = new SponsorStruct(_sponsorKey);
  sponsorRecord.sponsorAccountKey = _sponsorKey;
  sponsorRecord.stakedAgentsSponsored = (await spCoinContractDeployed.getTotalSponsoredAmount(_patronKey, _sponsorKey)).toNumber();

  // ToDo New Robin
  sponsorRecord.sponsorRateList = await getSponsorRatesByKeys(_patronKey, _sponsorKey);
  return sponsorRecord;
}

getSponsorRatesByKeys = async(_patronKey, _sponsorKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" + _patronKey + ", " + _sponsorKey+ ", " + ")");
  let sponsorRateKeys = await getSponsorRateKeys(_patronKey, _sponsorKey);
  let sponsorRateList = [];
  for (let [idx, sponsorRateKey] of Object.entries(sponsorRateKeys)) {
    //log("JS => Loading Sponsor Rates " + sponsorRateKey + " idx = " + idx);
    let sponsorRateRecord = await deSerializeSponsorRateRecordByKeys(_patronKey, _sponsorKey, sponsorRateKey);
    sponsorRateList.push(sponsorRateRecord);
  }
  return sponsorRateList;
}

getSponsorRateKeys = async(_patronKey, _sponsorKey) => {
  let networkRateKeys = await spCoinContractDeployed.getSponsorRateKeys(_patronKey, _sponsorKey);
  let sponsorRateKeys = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    sponsorRateKeys.push(netWorkRateKey.toNumber());
  }
  return sponsorRateKeys;
}

//////////////////// LOAD SPONSOR RATE DATA //////////////////////

getSponsorRateRecordByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey) => {
  logFunctionHeader("getSponsorRateRecordByKeys(" + _patronKey + ", " + _sponsorKey + ")");
  let sponsorRateRecord = new SponsorRateStruct();
  sponsorRateRecord.sponsorRate = _sponsorRateKey;
  sponsorRateRecord.stakedAgentsSponsored = bigIntToDecimal(await spCoinContractDeployed.getTotalSponsoredAmount(_patronKey, _sponsorKey));
  let agentAccountKeys = await getAgentRecordKeys(_patronKey, _sponsorKey, _sponsorRateKey);
  sponsorRateRecord.agentAccountKeys = agentAccountKeys;
  sponsorRateRecord.agentRecordList = await getAgentRecordsByKeys(_patronKey, _sponsorKey, _sponsorRateKey, agentAccountKeys);

  return sponsorRateRecord;
}
//  End New Robin

//////////////////// LOAD SPONSOR TRANSACTION DATA //////////////////////

getAgentRecordsByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentAccountKeys) => {
  logFunctionHeader("getAgentRecordsByKeys(" + _patronKey + ", " + _sponsorKey + ", " + _sponsorRateKey + ", " + _agentAccountKeys + ")");
  let agentRecordList = [];
  for (let [idx, agentAccountKey] of Object.entries(_agentAccountKeys)) {
      logDetail("JS => Loading Agent Records " + agentAccountKey, idx);
      let agentRecord = await getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, agentAccountKey);
      agentRecordList.push(agentRecord);
  }
  return agentRecordList;
}

getAgentRecordByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey) => {
  logFunctionHeader("getAgentRecordByKeys(" + _patronKey + ", " + _sponsorKey + ", " + _sponsorRateKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentAccountKey = _agentKey;
  agentRecord.stakedRatesSponsored = bigIntToDecimal(await spCoinContractDeployed.getAgentTotalSponsored(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey));
  agentRecord.agentRateList = await getAgentRatesByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _patronKey + ", " + _sponsorKey+ ", " + _agentKey + ")");

  let agentRateKeys = await getAgentRateKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);

  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
    // agentRateKey = hexToDecimal(agentRateKey);
    // agentRateKey = agentRateKey.toNumber();
    logDetail("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
    // log("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
    // log("JS => Loading hexToDecimal Agent Rates " + bigIntToDecimal(agentRateKey) + " idx = " + idx);
    let agentRateRecord = await deSerializeAgentRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, agentRateKey);
    agentRateList.push(agentRateRecord);
  }
  return agentRateList;
}

getAgentRateKeys = async (_patronKey, _sponsorKey, _sponsorRateKey, _agentKey) => {
  logFunctionHeader("getAgentRateKeys = async(" + _patronKey + ", " + _sponsorKey + ", " + _sponsorRateKey + ", " + _agentKey + ")" );
  networkRateKeys = await spCoinContractDeployed.getAgentRateKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
  let agentRateKeys = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    agentRateKeys.push(netWorkRateKey.toNumber());
  }
  return agentRateKeys;
};

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getRateTransactionsByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getRateTransactionsByKeys = async(" + _patronKey + ", " + _sponsorKey + ", " + _sponsorRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateTransactionList = await spCoinContractDeployed.getRateTransactionList(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
  return getRateTransactionRecords(agentRateTransactionList);
}

getAgentRateHeaderDataList = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateHeaderDataList = async(" + _patronKey + ", " + _sponsorKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateHeaderStr = await spCoinContractDeployed.serializeAgentRateRecordStr(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
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

getAccountRecords = async() => {
  logFunctionHeader("getAccountRecords()");
  let accountArr = [];
  let accountKeys = await spCoinContractDeployed.getAccountKeys();

  for (let i in accountKeys) {
      let accountStruct = await getAccountRecord(accountKeys[i]);
      accountArr.push(accountStruct);
  }
  return accountArr;
}

////////////////  RECORD DE-SERIALIZATION FUNCTIONS ///////////////////

deSerializeAgentRateRecordByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateByKeys(" + _patronKey + ", " + _sponsorKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let headerStr = await getAgentRateHeaderDataList(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = hexToDecimal(headerStr[0]);
  agentRateRecord.lastUpdateTime = hexToDecimal(headerStr[1]);
  agentRateRecord.stakedTransactionsSponsored = hexToDecimal(headerStr[2]);
  agentRateRecord.transactions = await getRateTransactionsByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
  return agentRateRecord;
}

getSponsorRateHeaderDataList = async(_patronKey, _sponsorKey, _sponsorRateKey) => {
  logFunctionHeader("getSponsorRateHeaderDataList = async(" + _patronKey + ", " + _sponsorKey+ ", " + _sponsorRateKey + ")");
  // log("getSponsorRateHeaderDataList = async(" + _patronKey + ", " + _sponsorKey+ ", " + _sponsorRateKey + ")");
  let sponsorRateHeaderStr = await spCoinContractDeployed.serializeSponsorRateRecordStr(_patronKey, _sponsorKey, _sponsorRateKey);
  let sponsorRateHeaderList = sponsorRateHeaderStr.split(",");
  return sponsorRateHeaderList;
}

deSerializeSponsorRateRecordByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey) => {
  logFunctionHeader("deSerializeSponsorRateRecordByKeys(" + _patronKey + ", " + _sponsorKey + ", " + _sponsorRateKey + ")");
  let sponsorRateRecord = new SponsorRateStruct();
  let headerStr = await getSponsorRateHeaderDataList(_patronKey, _sponsorKey, _sponsorRateKey);
  sponsorRateRecord.sponsorRate = _sponsorRateKey;
  sponsorRateRecord.insertionTime = hexToDecimal(headerStr[0]);
  sponsorRateRecord.lastUpdateTime = hexToDecimal(headerStr[1]);
  // ToDo Robin Here
  // sponsorAccountKeys = await getAccountSponsorKeys(_patronKey);
  sponsorRateRecord.sponsorRecordList = await getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);

  return sponsorRateRecord;
}

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  getAccountAgentKeys,
  getAccountKeys,
  getAccountKeySize,
  getAccountParentSponsorKeys,
  getAccountPatronKeys,
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
  getSponsorRateRecordByKeys,
  getSponsorRecordByKeys,
  getSponsorRecordsByKeys,
  getSponsorsByAccount,
  setContractReadMethods,
};
