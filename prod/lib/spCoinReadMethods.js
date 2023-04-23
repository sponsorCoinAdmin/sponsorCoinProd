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
let signer;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

injectReadMethodsContract = (_spCoinContractDeployed) => {
  spCoinContractDeployed = _spCoinContractDeployed;
};

injectReadMethodsSigner = (_signer) => {
  signer = _signer;
};

getAccountListSize = async () => {
  logFunctionHeader("getAccountListSize = async()");
  let maxSize = (await getAccountList()).length;
  logDetail("JS => Found " + maxSize + " Account Keys");
  return maxSize;
};

getAccountList = async () => {
  logFunctionHeader("getAccountList = async()");
  let insertedAccountList = await spCoinContractDeployed.connect(signer).getAccountList();
  return insertedAccountList;
};

////////////////////////// ACCOUNT RECORD FUNCTIONS //////////////////////////

getAccountRecord = async (_accountKey) => {
  // console.log("HERE 1",_accountKey);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",_accountKey);
  let accountStruct = await getSerializedAccountRecord(_accountKey);
  // console.log("ZZZZ accountStruct = " + JSON.stringify(accountStruct));
  accountStruct.accountKey = _accountKey;
  recipientAccountList = await getAccountRecipientKeys(_accountKey);
  accountStruct.recipientRecordList = await getRecipientRecordsByKeys(_accountKey, recipientAccountList);
  return accountStruct;
}

getRecipientKeySize = async (_accountKey) => {
  // console.log("HERE  2");
  logFunctionHeader("getRecipientKeySize = async(" + _accountKey + ")");

  let maxSize = (await getAccountRecipientKeys(_accountKey)).length;
  logDetail("JS => Found " + maxSize + " Account Recipient Keys");
  return maxSize;
};

getAccountRecipientKeys = async (_accountKey) => {
  // console.log("HERE  3");
  logFunctionHeader("getAccountRecipientKeys = async(" + _accountKey + ")");
  let recipientAccountList = await spCoinContractDeployed.connect(signer).getRecipientKeys(_accountKey);
  return recipientAccountList;
};

/////////////////////// RECIPIENT RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_recipientKey, _recipientRateKey) => {
  // console.log("HERE  4");
  logFunctionHeader("getAgentRecordKeys = async(" + _recipientKey + ", " + _recipientRateKey + ")" );
  log("getAgentRecordKeys = async(" + _recipientKey + ", " + _recipientRateKey + ")" );
  agentAccountList = spCoinContractDeployed.connect(signer).getAgentRecordKeys(_recipientKey, _recipientRateKey);
  // console.log("HERE  4.1");
  return agentAccountList;
};

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

getSerializedAccountRecord = async (_accountKey) => {
  // console.log("HERE  5");
  logFunctionHeader("getSerializedAccountRecord = async(" + _accountKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.connect(signer).getSerializedAccountRecord(_accountKey);
  return deSerializedAccountRec(serializedAccountRec);
};

//////////////////// LOAD ACCOUNT DATA //////////////////////
getRecipientsByAccount = async(_accountKey) => {    
  // console.log("HERE  6");
  logFunctionHeader("getRecipientsByAccount("  + _accountKey + ")");
  recipientAccountList = await getAccountRecipientKeys(_accountKey);
  recipientRecordList = await getRecipientRecordsByKeys(_accountKey,recipientAccountList);
  return recipientRecordList;
}
//////////////////// LOAD RECIPIENT DATA //////////////////////

getRecipientRecordsByKeys = async(_sponsorKey, _recipientAccountList) => {
  // console.log("HERE  7");
  logFunctionHeader("getRecipientRecordsByKeys(" +_sponsorKey + ","+ _recipientAccountList + ")");
  log("BBBBBBBBBBBBBBBBBBB getRecipientRecordsByKeys(" +_sponsorKey + ","+ _recipientAccountList + ")");
  let recipientRecordList = [];
  for (let [idx, recipientKey] of Object.entries(_recipientAccountList)) {
    logDetail("JS => Loading Recipient Record " + recipientKey, idx);
    let recipientRecord = await getRecipientRecordByKeys(_sponsorKey, recipientKey);
    recipientRecordList.push(recipientRecord);
  }
  return recipientRecordList;
}

getRecipientRecordByKeys = async(_sponsorKey, _recipientKey) => {
  // console.log("HERE  8");
  logFunctionHeader("getRecipientRecordByKeys(" +_sponsorKey, + ",", + _recipientKey + ")");
  log("CCCCCCCCCCCCCCCCCCCCCC getRecipientRecordByKeys(" + _sponsorKey + ", ", + _recipientKey + ")");
  let recipientRecord = new RecipientStruct(_recipientKey);
  recipientRecord.recipientKey = _recipientKey;

  let recordStr = await getSerializedRecipientRecordList(_sponsorKey, _recipientKey);
  recipientRecord.insertionTime = hexToDecimal(recordStr[0]);
  recipientRecord.stakedSPCoins = hexToDecimal(recordStr[1]);

  // ToDo New Robin
  recipientRecord.recipientRateRecordList = await getRecipientRatesByKeys(_sponsorKey, _recipientKey);
  return recipientRecord;
}

getRecipientRatesByKeys = async(_sponsorKey, _recipientKey) => {
// console.log("HERE  9");
logFunctionHeader("getAgentRatesByKeys = async(" + _sponsorKey +","  + _recipientKey + ")");
log("EEEEEEEEEEEEEEEEEE getAgentRatesByKeys = async(" + _sponsorKey +","  + _recipientKey + ")");
let networkRateList = await getRecipientRateRecordList(_sponsorKey, _recipientKey);
  let recipientRateRecordList = [];

// console.log("HERE  9.1 recipientRateRecordList.length = " + recipientRateRecordList.length);

  for (let [idx, recipientRateKey] of Object.entries(networkRateList)) {
    //log("JS => Loading Recipient Rates " + recipientRateKey + " idx = " + idx);
    let recipientRateRecord = await deSerializeRecipientRateRecordByKeys(_sponsorKey, _recipientKey, recipientRateKey);

    recipientRateRecordList.push(recipientRateRecord);
  }
  return recipientRateRecordList;
}

getRecipientRateRecordList = async(_sponsorKey, _recipientKey) => {
  logFunctionHeader("getRecipientRateRecordList = async(" + _sponsorKey +","  + _recipientKey + ")");
  log("FFFFFFFFFFFF getRecipientRateRecordList = async(" + _sponsorKey +","  + _recipientKey + ")");

// console.log("HERE  10 _recipientKey = " + _recipientKey);
  let networkRateKeys = await spCoinContractDeployed.connect(signer).getRecipientRateRecordList(_sponsorKey, _recipientKey);
  logJSON(networkRateKeys);
  // console.log("HERE  10.1");
  let recipientRateRecordList = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    recipientRateRecordList.push(netWorkRateKey.toNumber());
  }
  return recipientRateRecordList;
}

//////////////////// LOAD RECIPIENT RATE DATA //////////////////////

getRecipientRateRecordByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
  // console.log("HERE  11");
  logFunctionHeader("getRecipientRateRecordByKeys("+_sponsorKey,  + _recipientKey + ")");
  log("getRecipientRateRecordByKeys("+_sponsorKey,  + _recipientKey + ")");
  // console.log("HERE  11.1");
  let recipientRateRecord = new RecipientRateStruct();
  // console.log("HERE  11.2");
  recipientRateRecord.recipientRate = _recipientRateKey;
  console.log("VVVVVVVVVVVVVVV", _sponsorKey, _recipientKey);
  // console.log("HERE  11.3");
  let agentAccountList = await getAgentRecordKeys(_recipientKey, _recipientRateKey);
  // console.log("HERE  11.4");
  recipientRateRecord.agentAccountList = agentAccountList;
  // console.log("HERE  11.5");
  recipientRateRecord.agentRecordList = await getAgentRecordsByKeys(_recipientKey, _recipientRateKey, agentAccountList);
  // console.log("HERE  11.6");

  return recipientRateRecord;
}

//////////////////// LOAD RECIPIENT TRANSACTION DATA //////////////////////

getAgentRecordsByKeys = async(_recipientKey, _recipientRateKey, _agentAccountList) => {
  // console.log("HERE  12");
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
  // console.log("HERE  13");
  logFunctionHeader("getSerializedAgentRecord(" + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentKey = _agentKey;
  agentRecord.stakedSPCoins = bigIntToDecimal(await spCoinContractDeployed.connect(signer).getAgentTotalRecipient(_recipientKey, _recipientRateKey, _agentKey));
  agentRecord.agentRateRecordList = await getAgentRatesByKeys(_recipientKey, _recipientRateKey, _agentKey);
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("HERE  14");
  logFunctionHeader("getAgentRatesByKeys = async(" +
   _recipientKey+ ", " + _agentKey + ")");

   // console.log("HERE  14.1");
   let agentRateKeys = await getAgentRateKeys(_recipientKey, _recipientRateKey, _agentKey);

   // console.log("HERE  14.2");
  let agentRateRecordList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
    logDetail("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
   let agentRateRecord = await deSerializeAgentRateRecordByKeys(_recipientKey, _recipientRateKey, _agentKey, agentRateKey);
    agentRateRecordList.push(agentRateRecord);
  }
  return agentRateRecordList;
}

getAgentRateKeys = async (_recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("HERE  15");
  logFunctionHeader("getAgentRateKeys = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")" );
  networkRateKeys = await spCoinContractDeployed.connect(signer).getAgentRateKeys(_recipientKey, _recipientRateKey, _agentKey);
  let agentRateKeys = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    agentRateKeys.push(netWorkRateKey.toNumber());
  }
  // console.log("HERE  15.1");
  return agentRateKeys;
};

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getRateTransactionsByKeys = async(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("HERE  16");
  logFunctionHeader("getRateTransactionsByKeys = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  // console.log("HERE  16.1");
  let agentRateTransactionList = await spCoinContractDeployed.connect(signer).getRateTransactionList(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  // console.log("HERE  16.2");
  return getRateTransactionRecords(agentRateTransactionList);
}

getAgentRateRecordDataList = async(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("HERE  17");
  logFunctionHeader("getAgentRateRecordDataList = async(" + _recipientKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  // console.log("HERE  17.1");
  // console.log("GGGGGG", _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  let agentRateRecordStr = await spCoinContractDeployed.connect(signer).serializeAgentRateRecordStr(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  // console.log("HERE  17.2");
  let agentRateRecordList = agentRateRecordStr.split(",");
  // console.log("HERE  17.3");
  return agentRateRecordList;
}

getRateTransactionRecords = (transactionStr) => {
  // console.log("HERE  18");
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
  // console.log("HERE  19");
  logFunctionHeader("getAccountRecords()");
  let accountArr = [];
  let AccountList = await spCoinContractDeployed.connect(signer).getAccountList();

  for (let i in AccountList) {
      let accountStruct = await getAccountRecord(AccountList[i]);
      accountArr.push(accountStruct);
  }
  return accountArr;
}

////////////////  RECORD DE-SERIALIZATION FUNCTIONS ///////////////////

deSerializeAgentRateRecordByKeys = async(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("HERE  20");
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

getSerializedRecipientRecordList = async(_sponsorKey, _recipientKey) => {
  // console.log("HERE  21");
  logFunctionHeader("getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
  log("DDDDDDDDDDDDDDDD getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
  let recipientRecordStr = await spCoinContractDeployed.connect(signer).serializeRecipientRecordStr(_sponsorKey, _recipientKey);
  let recipientRecordList = recipientRecordStr.split(",");
  return recipientRecordList;
}

getSerializedRecipientRateRecordList = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
  // console.log("HERE  22");
  logFunctionHeader("getSerializedRecipientRateRecordList = async(" + _sponsorKey + _recipientKey + ", " + _recipientRateKey + ")");
  log("HHHHHHHHHHHHHH getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey + ", "+ _recipientRateKey + ", " + ")");
  // console.log("HERE  22.1");
  let recipientRateRecordStr = await spCoinContractDeployed.connect(signer).serializeRecipientRateRecordStr(_sponsorKey, _recipientKey, _recipientRateKey);
  // console.log("HERE  22.2");
  let recipientRateRecordList = recipientRateRecordStr.split(",");
  logJSON(recipientRateRecordList);
  return recipientRateRecordList;
}

deSerializeRecipientRateRecordByKeys = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
// console.log("HERE  23");
logFunctionHeader("deSerializeRecipientRateRecordByKeys(" + _sponsorKey  + _recipientKey + ", " + _recipientRateKey + ")");
log("GGGGGGG deSerializeRecipientRateRecordByKeys(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")");
let recipientRateRecord = new RecipientRateStruct();
  let recordStr = await getSerializedRecipientRateRecordList(_sponsorKey, _recipientKey, _recipientRateKey);
logJSON(recordStr);
  recipientRateRecord.recipientRate = _recipientRateKey;
  recipientRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  recipientRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  recipientRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
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
  getRecipientKeySize,
  getAgentRatesByKeys,
  getAgentRecordKeys,
  getAgentRecordsByKeys,
  getSerializedAccountRecord,
  getSerializedAgentRecord,
  getRecipientRateRecordByKeys,
  getRecipientRecordByKeys,
  getRecipientRecordsByKeys,
  getRecipientsByAccount,
  injectReadMethodsContract,
};
