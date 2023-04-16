const { logFunctionHeader } = require("./utils/logging");
const {
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  RecipientStruct,
  RecipientRateStruct,
  TransactionStruct } = require("./spCoinDataTypes");
const { hexToDecimal, bigIntToDecimal } = require("./utils/serialize");

let spCoinContractDeployed;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

setContractReadMethods = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

getAccountListSize = async () => {
  logFunctionHeader("getAccountListSize = async()");
  let maxSize = await spCoinContractDeployed.getAccountListSize();
  logDetail("JS => Found " + maxSize + " Account Keys");
  return maxSize;
};

getAccountList = async () => {
  logFunctionHeader("getAccountList = async()");
  let insertedAccountList = await spCoinContractDeployed.getAccountList();
  return insertedAccountList;
};

////////////////////////// ACCOUNT RECORD FUNCTIONS //////////////////////////

getAccountRecord = async (_sponsorKey) => {
  let accountStruct = await getSerializedAccountRecord(_sponsorKey);
  // console.log("ZZZZ accountStruct = " + JSON.stringify(accountStruct));
  accountStruct.accountKey = _sponsorKey;
  recipientAccountList = await getAccountRecipientKeys(_sponsorKey);
  accountStruct.recipientRecordList = await getRecipientRecordsByKeys(_sponsorKey, recipientAccountList);
  return accountStruct;
}

getAccountRecipientKeySize = async (_sponsorKey) => {
  logFunctionHeader("getAccountRecipientKeySize = async(" + _sponsorKey + ")");

  let maxSize = (await getAccountRecipientKeys(_sponsorKey)).length;
  logDetail("JS => Found " + maxSize + " Account Recipient Keys");
  return maxSize;
};

/*
getAccountParentRecipientKeys = async (_sponsorKey) => {
  logFunctionHeader("getAccountParentRecipientKeys = async(" + _sponsorKey + ")");
  let parentRecipientAccountList = spCoinContractDeployed.getAccountParentRecipientKeys(_sponsorKey);
  return parentRecipientAccountList;
}
*/

getAccountRecipientKeys = async (_sponsorKey) => {
  logFunctionHeader("getAccountRecipientKeys = async(" + _sponsorKey + ")");
  let recipientAccountList = await spCoinContractDeployed.getRecipientKeys(_sponsorKey);
  return recipientAccountList;
};

/////////////////////// RECIPIENT RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_sponsorKey, _recipientKey, _recipientRateKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _sponsorKey + ", " + _recipientKey+ ", " + _recipientRateKey + ")" );
  agentAccountList = spCoinContractDeployed.getAgentRecordKeys(_sponsorKey, _recipientKey, _recipientRateKey);
  return agentAccountList;
};


/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

getSerializedAccountRecord = async (_sponsorKey) => {
  logFunctionHeader("getSerializedAccountRecord = async(" + _sponsorKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRecord(_sponsorKey);
  return deSerializedAccountRec(serializedAccountRec);
};

//////////////////// LOAD ACCOUNT DATA //////////////////////
getRecipientsByAccount = async(_sponsorKey) => {    
  logFunctionHeader("getRecipientsByAccount("  + _sponsorKey + ")");
  recipientAccountList = await getAccountRecipientKeys(_sponsorKey);
  recipientRecordList = await getRecipientRecordsByKeys(_sponsorKey, recipientAccountList);
  return recipientRecordList;
}
//////////////////// LOAD RECIPIENT DATA //////////////////////

getRecipientRecordsByKeys = async(_sponsorKey, _recipientAccountList) => {
  logFunctionHeader("getRecipientRecordsByKeys(" + _sponsorKey + ", " + _recipientAccountList + ")");
  let recipientRecordList = [];
  for (let [idx, recipientKey] of Object.entries(_recipientAccountList)) {
    logDetail("JS => Loading Recipient Record " + recipientKey, idx);
    let recipientRecord = await getRecipientRecordByKeys(_sponsorKey, recipientKey);
    recipientRecordList.push(recipientRecord);
  }
  return recipientRecordList;
}

getRecipientRecordByKeys = async(_sponsorKey, _recipientKey) => {
  logFunctionHeader("getRecipientRecordByKeys(" + _sponsorKey + ", " + _recipientKey + ")");
  let recipientRecord = new RecipientStruct(_recipientKey);
  recipientRecord.recipientKey = _recipientKey;

  let recordStr = await getSerializedRecipientRecordList(_sponsorKey, _recipientKey);
  recipientRecord.insertionTime = hexToDecimal(recordStr[0]);
  recipientRecord.stakedSPCoins = hexToDecimal(recordStr[1]);

  // ToDo New Robin
  recipientRecord.recipientRateList2 = await getRecipientRatesByKeys(_sponsorKey, _recipientKey);
  return recipientRecord;
}

getRecipientRatesByKeys = async(_sponsorKey, _recipientKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
  let recipientRateList = await getRecipientRateList(_sponsorKey, _recipientKey);
  let recipientRateList2 = [];
  for (let [idx, recipientRateKey] of Object.entries(recipientRateList)) {
    //log("JS => Loading Recipient Rates " + recipientRateKey + " idx = " + idx);
    let recipientRateRecord = await deSerializeRecipientRateRecordByKeys(_sponsorKey, _recipientKey, recipientRateKey);
    recipientRateList2.push(recipientRateRecord);
  }
  return recipientRateList2;
}

getRecipientRateList = async(_sponsorKey, _recipientKey) => {
  let networkRateKeys = await spCoinContractDeployed.getRecipientRateList(_sponsorKey, _recipientKey);
  let recipientRateList = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    recipientRateList.push(netWorkRateKey.toNumber());
  }
  return recipientRateList;
}

//////////////////// LOAD RECIPIENT RATE DATA //////////////////////

getRecipientRateRecordByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
  logFunctionHeader("getRecipientRateRecordByKeys(" + _sponsorKey + ", " + _recipientKey + ")");
  let recipientRateRecord = new RecipientRateStruct();
  recipientRateRecord.recipientRate = _recipientRateKey;
  let agentAccountList = await getAgentRecordKeys(_sponsorKey, _recipientKey, _recipientRateKey);
  recipientRateRecord.agentAccountList = agentAccountList;
  recipientRateRecord.agentRecordList = await getAgentRecordsByKeys(_sponsorKey, _recipientKey, _recipientRateKey, agentAccountList);

  return recipientRateRecord;
}
//  End New Robin

//////////////////// LOAD RECIPIENT TRANSACTION DATA //////////////////////

getAgentRecordsByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentAccountList) => {
  logFunctionHeader("getAgentRecordsByKeys(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentAccountList + ")");
  let agentRecordList = [];
  for (let [idx, agentKey] of Object.entries(_agentAccountList)) {
      logDetail("JS => Loading Agent Records " + agentKey, idx);
      let agentRecord = await getSerializedAgentRecord(_sponsorKey, _recipientKey, _recipientRateKey, agentKey);
      agentRecordList.push(agentRecord);
  }
  return agentRecordList;
}

getSerializedAgentRecord = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
  logFunctionHeader("getSerializedAgentRecord(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentKey = _agentKey;
  agentRecord.stakedSPCoins = bigIntToDecimal(await spCoinContractDeployed.getAgentTotalRecipiented(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey));
  agentRecord.agentRateList = await getAgentRatesByKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _sponsorKey + ", " + _recipientKey+ ", " + _agentKey + ")");

  let agentRateKeys = await getAgentRateKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);

  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
    logDetail("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
   let agentRateRecord = await deSerializeAgentRateRecordByKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, agentRateKey);
    agentRateList.push(agentRateRecord);
  }
  return agentRateList;
}

getAgentRateKeys = async (_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
  logFunctionHeader("getAgentRateKeys = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")" );
  networkRateKeys = await spCoinContractDeployed.getAgentRateKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
  let agentRateKeys = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    agentRateKeys.push(netWorkRateKey.toNumber());
  }
  return agentRateKeys;
};

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getRateTransactionsByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getRateTransactionsByKeys = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateTransactionList = await spCoinContractDeployed.getRateTransactionList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  return getRateTransactionRecords(agentRateTransactionList);
}

getAgentRateRecordDataList = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateRecordDataList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateRecordStr = await spCoinContractDeployed.serializeAgentRateRecordStr(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
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

deSerializeAgentRateRecordByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateByKeys(" + _sponsorKey + ", " + _recipientKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let recordStr = await getAgentRateRecordDataList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  agentRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  agentRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  
  agentRateRecord.transactions = await getRateTransactionsByKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  return agentRateRecord;
}

getSerializedRecipientRecordList = async(_sponsorKey, _recipientKey) => {
  logFunctionHeader("getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
  let recipientRecordStr = await spCoinContractDeployed.serializeRecipientRecordStr(_sponsorKey, _recipientKey);
  let recipientRecordList = recipientRecordStr.split(",");
  return recipientRecordList;
}

getSerializedRecipientRateRecordList = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
  logFunctionHeader("getSerializedRecipientRateRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + _recipientRateKey + ")");
  let recipientRateRecordStr = await spCoinContractDeployed.serializerecipientRateRecordStr(_sponsorKey, _recipientKey, _recipientRateKey);
  let recipientRateRecordList = recipientRateRecordStr.split(",");
  return recipientRateRecordList;
}

deSerializeRecipientRateRecordByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
  logFunctionHeader("deSerializeRecipientRateRecordByKeys(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")");
  let recipientRateRecord = new RecipientRateStruct();
  let recordStr = await getSerializedRecipientRateRecordList(_sponsorKey, _recipientKey, _recipientRateKey);
  recipientRateRecord.recipientRate = _recipientRateKey;
  recipientRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  recipientRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  recipientRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  
  // ToDo Robin Here
  // recipientAccountList = await getAccountRecipientKeys(_sponsorKey);
  recipientRateRecord.recipientRecordList = await getRecipientRateRecordByKeys(_sponsorKey, _recipientKey, _recipientRateKey);
  return recipientRateRecord;
}

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  deSerializeAgentRateRecordByKeys,
  getAccountList,
  getAccountListSize,
  getAccountRecord,
  getAccountRecords,
  getAccountRecipientKeys,
  getAccountRecipientKeySize,
  getAgentRatesByKeys,
  getAgentRecordKeys,
  getAgentRecordsByKeys,
  getSerializedAccountRecord,
  getSerializedAgentRecord,
  getRecipientRateRecordByKeys,
  getRecipientRecordByKeys,
  getRecipientRecordsByKeys,
  getRecipientsByAccount,
  setContractReadMethods,
};
