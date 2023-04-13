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

getAccountListize = async () => {
  logFunctionHeader("getAccountListize = async()");
  let maxSize = await spCoinContractDeployed.getAccountListize();
  logDetail("JS => Found " + maxSize + " Account Keys");
  return maxSize;
};

getAccountList = async () => {
  logFunctionHeader("getAccountList = async()");
  let insertedAccountList = await spCoinContractDeployed.getAccountList();
  return insertedAccountList;
};

////////////////////////// ACCOUNT RECORD FUNCTIONS //////////////////////////

getAccountRecord = async (_patronKey) => {
  let accountStruct = await getSerializedAccountRecord(_patronKey);
  // console.log("ZZZZ accountStruct = " + JSON.stringify(accountStruct));
  accountStruct.accountKey = _patronKey;
  sponsorAccountList = await getAccountSponsorKeys(_patronKey);
  accountStruct.sponsorRecordList = await getSponsorRecordsByKeys(_patronKey, sponsorAccountList);
  return accountStruct;
}

getAccountSponsorKeySize = async (_patronKey) => {
  logFunctionHeader("getAccountSponsorKeySize = async(" + _patronKey + ")");

  let maxSize = (await getAccountSponsorKeys(_patronKey)).length;
  logDetail("JS => Found " + maxSize + " Account Sponsor Keys");
  return maxSize;
};

/*
getAccountParentSponsorKeys = async (_patronKey) => {
  logFunctionHeader("getAccountParentSponsorKeys = async(" + _patronKey + ")");
  let parentSponsorAccountList = spCoinContractDeployed.getAccountParentSponsorKeys(_patronKey);
  return parentSponsorAccountList;
}
*/

getAccountSponsorKeys = async (_patronKey) => {
  logFunctionHeader("getAccountSponsorKeys = async(" + _patronKey + ")");
  let sponsorAccountList = await spCoinContractDeployed.getSponsorKeys(_patronKey);
  return sponsorAccountList;
};

/////////////////////// SPONSOR RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_patronKey, _sponsorKey, _sponsorRateKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _patronKey + ", " + _sponsorKey+ ", " + _sponsorRateKey + ")" );
  agentAccountList = spCoinContractDeployed.getAgentRecordKeys(_patronKey, _sponsorKey, _sponsorRateKey);
  return agentAccountList;
};


/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

getSerializedAccountRecord = async (_patronKey) => {
  logFunctionHeader("getSerializedAccountRecord = async(" + _patronKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRecord(_patronKey);
  return deSerializedAccountRec(serializedAccountRec);
};

//////////////////// LOAD ACCOUNT DATA //////////////////////
getSponsorsByAccount = async(_patronKey) => {    
  logFunctionHeader("getSponsorsByAccount("  + _patronKey + ")");
  sponsorAccountList = await getAccountSponsorKeys(_patronKey);
  sponsorRecordList = await getSponsorRecordsByKeys(_patronKey, sponsorAccountList);
  return sponsorRecordList;
}
//////////////////// LOAD SPONSOR DATA //////////////////////

getSponsorRecordsByKeys = async(_patronKey, _sponsorAccountList) => {
  logFunctionHeader("getSponsorRecordsByKeys(" + _patronKey + ", " + _sponsorAccountList + ")");
  let sponsorRecordList = [];
  for (let [idx, sponsorKey] of Object.entries(_sponsorAccountList)) {
    logDetail("JS => Loading Sponsor Record " + sponsorKey, idx);
    let sponsorRecord = await getSponsorRecordByKeys(_patronKey, sponsorKey);
    sponsorRecordList.push(sponsorRecord);
    return sponsorRecord;
  }
//  return "RRRR";
  return sponsorRecordList;
}

getSponsorRecordByKeys = async(_patronKey, _sponsorKey) => {
  logFunctionHeader("getSponsorRecordByKeys(" + _patronKey + ", " + _sponsorKey + ")");
  let sponsorRecord = new SponsorStruct(_sponsorKey);
  sponsorRecord.sponsorKey = _sponsorKey;

  let recordStr = await getSerializedSponsorRecordList(_patronKey, _sponsorKey);
  sponsorRecord.insertionTime = hexToDecimal(recordStr[0]);
  sponsorRecord.stakedSPCoins = hexToDecimal(recordStr[1]);

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
    let sponsorRateRecord = await deSerializesponsorRateRecordByKeys(_patronKey, _sponsorKey, sponsorRateKey);
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
  let agentAccountList = await getAgentRecordKeys(_patronKey, _sponsorKey, _sponsorRateKey);
  sponsorRateRecord.agentAccountList = agentAccountList;
  sponsorRateRecord.agentRecordList = await getAgentRecordsByKeys(_patronKey, _sponsorKey, _sponsorRateKey, agentAccountList);

  return sponsorRateRecord;
}
//  End New Robin

//////////////////// LOAD SPONSOR TRANSACTION DATA //////////////////////

getAgentRecordsByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentAccountList) => {
  logFunctionHeader("getAgentRecordsByKeys(" + _patronKey + ", " + _sponsorKey + ", " + _sponsorRateKey + ", " + _agentAccountList + ")");
  let agentRecordList = [];
  for (let [idx, agentKey] of Object.entries(_agentAccountList)) {
      logDetail("JS => Loading Agent Records " + agentKey, idx);
      let agentRecord = await getSerializedAgentRecord(_patronKey, _sponsorKey, _sponsorRateKey, agentKey);
      agentRecordList.push(agentRecord);
  }
  return agentRecordList;
}

getSerializedAgentRecord = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey) => {
  logFunctionHeader("getSerializedAgentRecord(" + _patronKey + ", " + _sponsorKey + ", " + _sponsorRateKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentKey = _agentKey;
  agentRecord.stakedSPCoins = bigIntToDecimal(await spCoinContractDeployed.getAgentTotalSponsored(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey));
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

getAgentRateRecordDataList = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateRecordDataList = async(" + _patronKey + ", " + _sponsorKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateRecordStr = await spCoinContractDeployed.serializeAgentRateRecordStr(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
  let agentRateRecordList = agentRateRecordStr.split(",");
  return agentRateRecordList;
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
  let AccountList = await spCoinContractDeployed.getAccountList();

  for (let i in AccountList) {
      let accountStruct = await getAccountRecord(AccountList[i]);
      accountArr.push(accountStruct);
  }
  return accountArr;
}

////////////////  RECORD DE-SERIALIZATION FUNCTIONS ///////////////////

deSerializeAgentRateRecordByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateByKeys(" + _patronKey + ", " + _sponsorKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let recordStr = await getAgentRateRecordDataList(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  agentRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  agentRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  
  agentRateRecord.transactions = await getRateTransactionsByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
  return agentRateRecord;
}

getSerializedSponsorRecordList = async(_patronKey, _sponsorKey) => {
  logFunctionHeader("getSerializedSponsorRecordList = async(" + _patronKey + ", " + _sponsorKey+ ", " + ")");
  let sponsorRecordStr = await spCoinContractDeployed.serializeSponsorRecordStr(_patronKey, _sponsorKey);
  let sponsorRecordList = sponsorRecordStr.split(",");
  return sponsorRecordList;
}

getSerializedSponsorRateRecordList = async(_patronKey, _sponsorKey, _sponsorRateKey) => {
  logFunctionHeader("getSerializedSponsorRateRecordList = async(" + _patronKey + ", " + _sponsorKey+ ", " + _sponsorRateKey + ")");
  let sponsorRateRecordStr = await spCoinContractDeployed.serializesponsorRateRecordStr(_patronKey, _sponsorKey, _sponsorRateKey);
  let sponsorRateRecordList = sponsorRateRecordStr.split(",");
  return sponsorRateRecordList;
}

deSerializesponsorRateRecordByKeys = async(_patronKey, _sponsorKey, _sponsorRateKey) => {
  logFunctionHeader("deSerializesponsorRateRecordByKeys(" + _patronKey + ", " + _sponsorKey + ", " + _sponsorRateKey + ")");
  let sponsorRateRecord = new SponsorRateStruct();
  let recordStr = await getSerializedSponsorRateRecordList(_patronKey, _sponsorKey, _sponsorRateKey);
  sponsorRateRecord.sponsorRate = _sponsorRateKey;
  sponsorRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  sponsorRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  sponsorRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  
  // ToDo Robin Here
  // sponsorAccountList = await getAccountSponsorKeys(_patronKey);
  sponsorRateRecord.sponsorRecordList = await getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
  return sponsorRateRecord;
}

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  deSerializeAgentRateRecordByKeys,
  getAccountList,
  getAccountListize,
  getAccountRecord,
  getAccountRecords,
  getAccountSponsorKeys,
  getAccountSponsorKeySize,
  getAgentRatesByKeys,
  getAgentRecordKeys,
  getAgentRecordsByKeys,
  getSerializedAccountRecord,
  getSerializedAgentRecord,
  getSponsorRateRecordByKeys,
  getSponsorRecordByKeys,
  getSponsorRecordsByKeys,
  getSponsorsByAccount,
  setContractReadMethods,
};
