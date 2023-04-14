const { logFunctionHeader } = require("./utils/logging");
const {
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  BenificiaryStruct,
  BenificiaryRateStruct,
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
  benificiaryAccountList = await getAccountBenificiaryKeys(_patronKey);
  accountStruct.benificiaryRecordList = await getBenificiaryRecordsByKeys(_patronKey, benificiaryAccountList);
  return accountStruct;
}

getAccountBenificiaryKeySize = async (_patronKey) => {
  logFunctionHeader("getAccountBenificiaryKeySize = async(" + _patronKey + ")");

  let maxSize = (await getAccountBenificiaryKeys(_patronKey)).length;
  logDetail("JS => Found " + maxSize + " Account Benificiary Keys");
  return maxSize;
};

/*
getAccountParentBenificiaryKeys = async (_patronKey) => {
  logFunctionHeader("getAccountParentBenificiaryKeys = async(" + _patronKey + ")");
  let parentBenificiaryAccountList = spCoinContractDeployed.getAccountParentBenificiaryKeys(_patronKey);
  return parentBenificiaryAccountList;
}
*/

getAccountBenificiaryKeys = async (_patronKey) => {
  logFunctionHeader("getAccountBenificiaryKeys = async(" + _patronKey + ")");
  let benificiaryAccountList = await spCoinContractDeployed.getBenificiaryKeys(_patronKey);
  return benificiaryAccountList;
};

/////////////////////// BENIFICIARY RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_patronKey, _benificiaryKey, _benificiaryRateKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _patronKey + ", " + _benificiaryKey+ ", " + _benificiaryRateKey + ")" );
  agentAccountList = spCoinContractDeployed.getAgentRecordKeys(_patronKey, _benificiaryKey, _benificiaryRateKey);
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
getBenificiariasByAccount = async(_patronKey) => {    
  logFunctionHeader("getBenificiariasByAccount("  + _patronKey + ")");
  benificiaryAccountList = await getAccountBenificiaryKeys(_patronKey);
  benificiaryRecordList = await getBenificiaryRecordsByKeys(_patronKey, benificiaryAccountList);
  return benificiaryRecordList;
}
//////////////////// LOAD BENIFICIARY DATA //////////////////////

getBenificiaryRecordsByKeys = async(_patronKey, _benificiaryAccountList) => {
  logFunctionHeader("getBenificiaryRecordsByKeys(" + _patronKey + ", " + _benificiaryAccountList + ")");
  let benificiaryRecordList = [];
  for (let [idx, benificiaryKey] of Object.entries(_benificiaryAccountList)) {
    logDetail("JS => Loading Benificiary Record " + benificiaryKey, idx);
    let benificiaryRecord = await getBenificiaryRecordByKeys(_patronKey, benificiaryKey);
    benificiaryRecordList.push(benificiaryRecord);
    return benificiaryRecord;
  }
//  return "RRRR";
  return benificiaryRecordList;
}

getBenificiaryRecordByKeys = async(_patronKey, _benificiaryKey) => {
  logFunctionHeader("getBenificiaryRecordByKeys(" + _patronKey + ", " + _benificiaryKey + ")");
  let benificiaryRecord = new BenificiaryStruct(_benificiaryKey);
  benificiaryRecord.benificiaryKey = _benificiaryKey;

  let recordStr = await getSerializedBenificiaryRecordList(_patronKey, _benificiaryKey);
  benificiaryRecord.insertionTime = hexToDecimal(recordStr[0]);
  benificiaryRecord.stakedSPCoins = hexToDecimal(recordStr[1]);

  // ToDo New Robin
  benificiaryRecord.benificiaryRateList2 = await getBenificiaryRatesByKeys(_patronKey, _benificiaryKey);
  return benificiaryRecord;
}

getBenificiaryRatesByKeys = async(_patronKey, _benificiaryKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" + _patronKey + ", " + _benificiaryKey+ ", " + ")");
  let benificiaryRateList = await getbenificiaryRateList(_patronKey, _benificiaryKey);
  let benificiaryRateList2 = [];
  for (let [idx, benificiaryRateKey] of Object.entries(benificiaryRateList)) {
    //log("JS => Loading Benificiary Rates " + benificiaryRateKey + " idx = " + idx);
    let benificiaryRateRecord = await deSerializebenificiaryRateRecordByKeys(_patronKey, _benificiaryKey, benificiaryRateKey);
    benificiaryRateList2.push(benificiaryRateRecord);
  }
  return benificiaryRateList2;
}

getbenificiaryRateList = async(_patronKey, _benificiaryKey) => {
  let networkRateKeys = await spCoinContractDeployed.getbenificiaryRateList(_patronKey, _benificiaryKey);
  let benificiaryRateList = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    benificiaryRateList.push(netWorkRateKey.toNumber());
  }
  return benificiaryRateList;
}

//////////////////// LOAD BENIFICIARY RATE DATA //////////////////////

getBenificiaryRateRecordByKeys = async(_patronKey, _benificiaryKey, _benificiaryRateKey) => {
  logFunctionHeader("getBenificiaryRateRecordByKeys(" + _patronKey + ", " + _benificiaryKey + ")");
  let benificiaryRateRecord = new BenificiaryRateStruct();
  benificiaryRateRecord.benificiaryRate = _benificiaryRateKey;
  let agentAccountList = await getAgentRecordKeys(_patronKey, _benificiaryKey, _benificiaryRateKey);
  benificiaryRateRecord.agentAccountList = agentAccountList;
  benificiaryRateRecord.agentRecordList = await getAgentRecordsByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, agentAccountList);

  return benificiaryRateRecord;
}
//  End New Robin

//////////////////// LOAD BENIFICIARY TRANSACTION DATA //////////////////////

getAgentRecordsByKeys = async(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentAccountList) => {
  logFunctionHeader("getAgentRecordsByKeys(" + _patronKey + ", " + _benificiaryKey + ", " + _benificiaryRateKey + ", " + _agentAccountList + ")");
  let agentRecordList = [];
  for (let [idx, agentKey] of Object.entries(_agentAccountList)) {
      logDetail("JS => Loading Agent Records " + agentKey, idx);
      let agentRecord = await getSerializedAgentRecord(_patronKey, _benificiaryKey, _benificiaryRateKey, agentKey);
      agentRecordList.push(agentRecord);
  }
  return agentRecordList;
}

getSerializedAgentRecord = async(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey) => {
  logFunctionHeader("getSerializedAgentRecord(" + _patronKey + ", " + _benificiaryKey + ", " + _benificiaryRateKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentKey = _agentKey;
  agentRecord.stakedSPCoins = bigIntToDecimal(await spCoinContractDeployed.getAgentTotalBenificiaryed(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey));
  agentRecord.agentRateList = await getAgentRatesByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey);
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _patronKey + ", " + _benificiaryKey+ ", " + _agentKey + ")");

  let agentRateKeys = await getAgentRateKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey);

  let agentRateList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateKeys)) {
    // agentRateKey = hexToDecimal(agentRateKey);
    // agentRateKey = agentRateKey.toNumber();
    logDetail("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
    // log("JS => Loading Agent Rates " + agentRateKey + " idx = " + idx);
    // log("JS => Loading hexToDecimal Agent Rates " + bigIntToDecimal(agentRateKey) + " idx = " + idx);
    let agentRateRecord = await deSerializeAgentRateRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, agentRateKey);
    agentRateList.push(agentRateRecord);
  }
  return agentRateList;
}

getAgentRateKeys = async (_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey) => {
  logFunctionHeader("getAgentRateKeys = async(" + _patronKey + ", " + _benificiaryKey + ", " + _benificiaryRateKey + ", " + _agentKey + ")" );
  networkRateKeys = await spCoinContractDeployed.getAgentRateKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey);
  let agentRateKeys = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    agentRateKeys.push(netWorkRateKey.toNumber());
  }
  return agentRateKeys;
};

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getRateTransactionsByKeys = async(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getRateTransactionsByKeys = async(" + _patronKey + ", " + _benificiaryKey + ", " + _benificiaryRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateTransactionList = await spCoinContractDeployed.getRateTransactionList(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _agentRateKey);
  return getRateTransactionRecords(agentRateTransactionList);
}

getAgentRateRecordDataList = async(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateRecordDataList = async(" + _patronKey + ", " + _benificiaryKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateRecordStr = await spCoinContractDeployed.serializeAgentRateRecordStr(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _agentRateKey);
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

deSerializeAgentRateRecordByKeys = async(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _agentRateKey) => {
  logFunctionHeader("getAgentRateByKeys(" + _patronKey + ", " + _benificiaryKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let recordStr = await getAgentRateRecordDataList(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  agentRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  agentRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  
  agentRateRecord.transactions = await getRateTransactionsByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _agentRateKey);
  return agentRateRecord;
}

getSerializedBenificiaryRecordList = async(_patronKey, _benificiaryKey) => {
  logFunctionHeader("getSerializedBenificiaryRecordList = async(" + _patronKey + ", " + _benificiaryKey+ ", " + ")");
  let benificiaryRecordStr = await spCoinContractDeployed.serializeBenificiaryRecordStr(_patronKey, _benificiaryKey);
  let benificiaryRecordList = benificiaryRecordStr.split(",");
  return benificiaryRecordList;
}

getSerializedBenificiaryRateRecordList = async(_patronKey, _benificiaryKey, _benificiaryRateKey) => {
  logFunctionHeader("getSerializedBenificiaryRateRecordList = async(" + _patronKey + ", " + _benificiaryKey+ ", " + _benificiaryRateKey + ")");
  let benificiaryRateRecordStr = await spCoinContractDeployed.serializebenificiaryRateRecordStr(_patronKey, _benificiaryKey, _benificiaryRateKey);
  let benificiaryRateRecordList = benificiaryRateRecordStr.split(",");
  return benificiaryRateRecordList;
}

deSerializebenificiaryRateRecordByKeys = async(_patronKey, _benificiaryKey, _benificiaryRateKey) => {
  logFunctionHeader("deSerializebenificiaryRateRecordByKeys(" + _patronKey + ", " + _benificiaryKey + ", " + _benificiaryRateKey + ")");
  let benificiaryRateRecord = new BenificiaryRateStruct();
  let recordStr = await getSerializedBenificiaryRateRecordList(_patronKey, _benificiaryKey, _benificiaryRateKey);
  benificiaryRateRecord.benificiaryRate = _benificiaryRateKey;
  benificiaryRateRecord.insertionTime = hexToDecimal(recordStr[0]);
  benificiaryRateRecord.lastUpdateTime = hexToDecimal(recordStr[1]);
  benificiaryRateRecord.stakedSPCoins = hexToDecimal(recordStr[2]);
  
  // ToDo Robin Here
  // benificiaryAccountList = await getAccountBenificiaryKeys(_patronKey);
  benificiaryRateRecord.benificiaryRecordList = await getBenificiaryRateRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey);
  return benificiaryRateRecord;
}

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  deSerializeAgentRateRecordByKeys,
  getAccountList,
  getAccountListize,
  getAccountRecord,
  getAccountRecords,
  getAccountBenificiaryKeys,
  getAccountBenificiaryKeySize,
  getAgentRatesByKeys,
  getAgentRecordKeys,
  getAgentRecordsByKeys,
  getSerializedAccountRecord,
  getSerializedAgentRecord,
  getBenificiaryRateRecordByKeys,
  getBenificiaryRecordByKeys,
  getBenificiaryRecordsByKeys,
  getBenificiariasByAccount,
  setContractReadMethods,
};
