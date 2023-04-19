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
  let maxSize = (await getAccountList()).length;
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
  // console.log("HERE 1");
  let accountStruct = await getSerializedAccountRecord(_sponsorKey);
  // console.log("ZZZZ accountStruct = " + JSON.stringify(accountStruct));
  accountStruct.accountKey = _sponsorKey;
  recipientAccountList = await getAccountRecipientKeys(_sponsorKey);
  accountStruct.recipientRecordList = await getRecipientRecordsByKeys(recipientAccountList);
  return accountStruct;
}

getAccountRecipientKeySize = async (_sponsorKey) => {
  // console.log("HERE 2");
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
  // console.log("HERE 3");
  logFunctionHeader("getAccountRecipientKeys = async(" + _sponsorKey + ")");
  let recipientAccountList = await spCoinContractDeployed.getRecipientKeys(_sponsorKey);
  return recipientAccountList;
};

/////////////////////// RECIPIENT RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_recipientKey, _recipientRateKey) => {
  // console.log("HERE 4");
  logFunctionHeader("getAgentRecordKeys = async(" + _recipientKey + ", " + _recipientRateKey + ")" );
  log("getAgentRecordKeys = async(" + _recipientKey + ", " + _recipientRateKey + ")" );
  agentAccountList = spCoinContractDeployed.getAgentRecordKeys(_recipientKey, _recipientRateKey);
  // console.log("HERE 4.1");
  return agentAccountList;
};

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

getSerializedAccountRecord = async (_sponsorKey) => {
  // console.log("HERE 5");
  logFunctionHeader("getSerializedAccountRecord = async(" + _sponsorKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRecord(_sponsorKey);
  return deSerializedAccountRec(serializedAccountRec);
};

//////////////////// LOAD ACCOUNT DATA //////////////////////
getRecipientsByAccount = async(_sponsorKey) => {    
  // console.log("HERE 6");
  logFunctionHeader("getRecipientsByAccount("  + _sponsorKey + ")");
  recipientAccountList = await getAccountRecipientKeys(_sponsorKey);
  recipientRecordList = await getRecipientRecordsByKeys(recipientAccountList);
  return recipientRecordList;
}
//////////////////// LOAD RECIPIENT DATA //////////////////////

getRecipientRecordsByKeys = async(_recipientAccountList) => {
  // console.log("HERE 7");
  logFunctionHeader("getRecipientRecordsByKeys(" + _recipientAccountList + ")");
  let recipientRecordList = [];
  for (let [idx, recipientKey] of Object.entries(_recipientAccountList)) {
    logDetail("JS => Loading Recipient Record " + recipientKey, idx);
    let recipientRecord = await getRecipientRecordByKeys(recipientKey);
    recipientRecordList.push(recipientRecord);
  }
  return recipientRecordList;
}

getRecipientRecordByKeys = async(_recipientKey) => {
  // console.log("HERE 8");
  logFunctionHeader("getRecipientRecordByKeys(" + _recipientKey + ")");
  let recipientRecord = new RecipientStruct(_recipientKey);
  recipientRecord.recipientKey = _recipientKey;

  let recordStr = await getSerializedRecipientRecordList(_recipientKey);
  recipientRecord.insertionTime = hexToDecimal(recordStr[0]);
  recipientRecord.stakedSPCoins = hexToDecimal(recordStr[1]);

  // ToDo New Robin
  recipientRecord.recipientRateList2 = await getRecipientRatesByKeys(_recipientKey);
  return recipientRecord;
}

getRecipientRatesByKeys = async(_recipientKey) => {
  // console.log("HERE 9");
  logFunctionHeader("getAgentRatesByKeys = async(" + _recipientKey+ ", " + ")");
  let recipientRateList = await getRecipientRateList(_recipientKey);
  let recipientRateList2 = [];
  for (let [idx, recipientRateKey] of Object.entries(recipientRateList)) {
    //log("JS => Loading Recipient Rates " + recipientRateKey + " idx = " + idx);
    let recipientRateRecord = await deSerializeRecipientRateRecordByKeys(_recipientKey, recipientRateKey);
    recipientRateList2.push(recipientRateRecord);
  }
  return recipientRateList2;
}

getRecipientRateList = async(_recipientKey) => {
  // console.log("HERE 10");
  let networkRateKeys = await spCoinContractDeployed.getRecipientRateList(_recipientKey);
  // console.log("HERE 10.1");
  let recipientRateList = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    recipientRateList.push(netWorkRateKey.toNumber());
  }
  return recipientRateList;
}

//////////////////// LOAD RECIPIENT RATE DATA //////////////////////

getRecipientRateRecordByKeys = async(_recipientKey, _recipientRateKey) => {
  // console.log("HERE 11");
  logFunctionHeader("getRecipientRateRecordByKeys(" + _recipientKey + ")");
  // console.log("HERE 11.1");
  let recipientRateRecord = new RecipientRateStruct();
  // console.log("HERE 11.2");
  recipientRateRecord.recipientRate = _recipientRateKey;
  // console.log("HERE 11.3");
  let agentAccountList = await getAgentRecordKeys(_recipientKey, _recipientRateKey);
  // console.log("HERE 11.4");
  recipientRateRecord.agentAccountList = agentAccountList;
  // console.log("HERE 11.5");
  recipientRateRecord.agentRecordList = await getAgentRecordsByKeys(_recipientKey, _recipientRateKey, agentAccountList);
  // console.log("HERE 11.6");

  return recipientRateRecord;
}
//  End New Robin

//////////////////// LOAD RECIPIENT TRANSACTION DATA //////////////////////

getAgentRecordsByKeys = async(_recipientKey, _recipientRateKey, _agentAccountList) => {
  // console.log("HERE 12");
  logFunctionHeader("getAgentRecordsByKeys(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentAccountList + ")");
  let agentRecordList = [];
  for (let [idx, agentKey] of Object.entries(_agentAccountList)) {
      logDetail("JS => Loading Agent Records " + agentKey, idx);
      let agentRecord = await getSerializedAgentRecord(_recipientKey, _recipientRateKey, agentKey);
      agentRecordList.push(agentRecord);
  }
  return agentRecordList;
}

getSerializedAgentRecord = async(_recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("HERE 13");
  logFunctionHeader("getSerializedAgentRecord(" + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentKey = _agentKey;
  agentRecord.stakedSPCoins = bigIntToDecimal(await spCoinContractDeployed.getAgentTotalRecipient(_recipientKey, _recipientRateKey, _agentKey));
  agentRecord.agentRateList = await getAgentRatesByKeys(_recipientKey, _recipientRateKey, _agentKey);
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("HERE 14");
  logFunctionHeader("getAgentRatesByKeys = async(" +
   _recipientKey+ ", " + _agentKey + ")");

   // console.log("HERE 14.1");
   let agentRateKeys = await getAgentRateKeys(_recipientKey, _recipientRateKey, _agentKey);

   // console.log("HERE 14.2");
  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
    logDetail("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
   let agentRateRecord = await deSerializeAgentRateRecordByKeys(_recipientKey, _recipientRateKey, _agentKey, agentRateKey);
    agentRateList.push(agentRateRecord);
  }
  return agentRateList;
}

getAgentRateKeys = async (_recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("HERE 15");
  logFunctionHeader("getAgentRateKeys = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")" );
  networkRateKeys = await spCoinContractDeployed.getAgentRateKeys(_recipientKey, _recipientRateKey, _agentKey);
  let agentRateKeys = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    agentRateKeys.push(netWorkRateKey.toNumber());
  }
  // console.log("HERE 15.1");
  return agentRateKeys;
};

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getRateTransactionsByKeys = async(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("HERE 16");
  logFunctionHeader("getRateTransactionsByKeys = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  // console.log("HERE 16.1");
  let agentRateTransactionList = await spCoinContractDeployed.getRateTransactionList(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  // console.log("HERE 16.2");
  return getRateTransactionRecords(agentRateTransactionList);
}

getAgentRateRecordDataList = async(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("HERE 17");
  logFunctionHeader("getAgentRateRecordDataList = async(" + _recipientKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  // console.log("HERE 17.1");
  // console.log("GGGGGG", _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  let agentRateRecordStr = await spCoinContractDeployed.serializeAgentRateRecordStr(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  // console.log("HERE 17.2");
  let agentRateRecordList = agentRateRecordStr.split(",");
  // console.log("HERE 17.3");
  return agentRateRecordList;
}

getRateTransactionRecords = (transactionStr) => {
  // console.log("HERE 18");
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
  // console.log("HERE 19");
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

deSerializeAgentRateRecordByKeys = async(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("HERE 20");
  logFunctionHeader("getAgentRateByKeys(" + _recipientKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let recordStr = await getAgentRateRecordDataList(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  agentRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  agentRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  
  agentRateRecord.transactions = await getRateTransactionsByKeys(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  return agentRateRecord;
}

getSerializedRecipientRecordList = async(_recipientKey) => {
  // console.log("HERE 21");
  logFunctionHeader("getSerializedRecipientRecordList = async(" + _recipientKey+ ", " + ")");
  let recipientRecordStr = await spCoinContractDeployed.serializeRecipientRecordStr(_recipientKey);
  let recipientRecordList = recipientRecordStr.split(",");
  return recipientRecordList;
}

getSerializedRecipientRateRecordList = async(_recipientKey, _recipientRateKey) => {
  // console.log("HERE 22");
  logFunctionHeader("getSerializedRecipientRateRecordList = async(" + _recipientKey+ ", " + _recipientRateKey + ")");
  let recipientRateRecordStr = await spCoinContractDeployed.serializeRecipientRateRecordStr(_recipientKey, _recipientRateKey);
  let recipientRateRecordList = recipientRateRecordStr.split(",");
  return recipientRateRecordList;
}

deSerializeRecipientRateRecordByKeys = async(_recipientKey, _recipientRateKey) => {
  // console.log("HERE 23");
  logFunctionHeader("deSerializeRecipientRateRecordByKeys(" + _recipientKey + ", " + _recipientRateKey + ")");
  let recipientRateRecord = new RecipientRateStruct();
  let recordStr = await getSerializedRecipientRateRecordList(_recipientKey, _recipientRateKey);
  recipientRateRecord.recipientRate = _recipientRateKey;
  recipientRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  recipientRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  recipientRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  
  // ToDo Robin Here
  // recipientAccountList = await getAccountRecipientKeys(_sponsorKey);
  recipientRateRecord.recipientRecordList = await getRecipientRateRecordByKeys(_recipientKey, _recipientRateKey);
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
