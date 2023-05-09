const { } = require("./utils/logging");
const {
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  RecipientStruct,
  RecipientRateStruct,
  TransactionStruct } = require("./spCoinDataTypes");
const { SpCoinSerialize, bigIntToDecString } = require("./utils/serialize");

let spCoinContractDeployed;
let signer;


let spCoinSerialize = new SpCoinSerialize();

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

injectReadMethodsContract = (_spCoinContractDeployed) => {
  spCoinSerialize.setContract(_spCoinContractDeployed);
  spCoinContractDeployed = spCoinSerialize.spCoinContractDeployed;
};

injectReadMethodsSigner = (_signer) => {
  spCoinSerialize.setSigner(_signer);
  signer = spCoinSerialize.signer;
};

getAccountListSize = async () => {
  logFunctionHeader("getAccountListSize = async()");
  let maxSize = (await getAccountList()).length;
  logDetail("JS => Found " + maxSize + " Account Keys");
  logExitFunction();
  return maxSize;
};

getAccountList = async () => {
  logFunctionHeader("getAccountList = async()");
  let insertedAccountList = await spCoinContractDeployed.connect(signer).getAccountList();
  logExitFunction();
  return insertedAccountList;
};

////////////////////////// ACCOUNT RECORD FUNCTIONS //////////////////////////

getAccountRecords = async() => {
  // console.log("==>1 getAccountRecords()");
  logFunctionHeader("getAccountRecords()");
  let accountArr = [];
  let AccountList = await spCoinContractDeployed.connect(signer).getAccountList();

  for (let i in AccountList) {
      let accountStruct = await getAccountRecord(AccountList[i]);
      accountArr.push(accountStruct);
  }
  logExitFunction();
  return accountArr;
}

getAccountRecord = async (_accountKey) => {
  // console.log("==>2 getAccountRecord = async(", _accountKey,")");
  let accountStruct = await spCoinSerialize.getSerializedAccountRecord(_accountKey);
  accountStruct.accountKey = _accountKey;
  recipientAccountList = await getAccountRecipientList(_accountKey);
  accountStruct.recipientRecordList = await spCoinReadMethods.getRecipientRecordList(_accountKey, recipientAccountList);
  logExitFunction();
  return accountStruct;
}

getAccountRecipientListSize = async (_accountKey) => {
  // console.log("==>20 getAccountRecipientListSize = async(" + _accountKey + ")");
  logFunctionHeader("getAccountRecipientListSize = async(" + _accountKey + ")");

  let maxSize = (await getAccountRecipientList(_accountKey)).length;
  logDetail("JS => Found " + maxSize + " Account Recipient Keys");
  logExitFunction();
  return maxSize;
};

getAccountRecipientList = async (_accountKey) => {
  // console.log("==>4 getAccountRecipientList = async(" + _accountKey + ")");
  logFunctionHeader("getAccountRecipientList = async(" + _accountKey + ")");
  let recipientAccountList = await spCoinContractDeployed.connect(signer).getAccountRecipientList(_accountKey);
  logExitFunction();
  return recipientAccountList;
};

/////////////////////// RECIPIENT RECORD FUNCTIONS ///////////////////////

getRecipientRateAgentList = async (_sponsorKey, _recipientKey, _recipientRateKey) => {
  // console.log("==>13 getRecipientRateAgentList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")" );
  logFunctionHeader("getRecipientRateAgentList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")" );
  agentAccountList = await spCoinContractDeployed.connect(signer).getRecipientRateAgentList(_sponsorKey, _recipientKey, _recipientRateKey);
  logExitFunction();
  return agentAccountList;
};

//////////////////// LOAD RECIPIENT DATA //////////////////////

getRecipientRateList = async(_sponsorKey, _recipientKey) => {
  logFunctionHeader("getRecipientRateList = async(" + _sponsorKey +","  + _recipientKey + ")");
// console.log("==>9 getRecipientRateList = async(" + _sponsorKey +","  + _recipientKey + ")");

  let networkRateKeys = await spCoinContractDeployed.connect(signer).getRecipientRateList(_sponsorKey, _recipientKey);
  let recipientRateList = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    recipientRateList.push(netWorkRateKey.toNumber());
  }
  logExitFunction();
  return recipientRateList;
}

//////////////////// LOAD RECIPIENT TRANSACTION DATA //////////////////////

getAgentRateRecordList = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("==>16 getAgentRateRecordList = async(" + _recipientKey+ ", " + _agentKey + ")");
  logFunctionHeader("getAgentRateRecordList(" + ", " + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
  
  let agentRateList = await getAgentRateList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);

  let agentRateRecordList = [];
  for (let [idx, agentRateKey] of Object.entries(agentRateList)) {
   let agentRateRecord = await getAgentRateRecord(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, agentRateKey);
   agentRateRecordList.push(agentRateRecord);
  }
  logExitFunction();
  return agentRateRecordList;
}

getAgentRecordList = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentAccountList) => {
  // console.log("==>14 getAgentRecordList = async("+_sponsorKey, + ", " + _recipientKey + ", " + _recipientRateKey + ")");
  logFunctionHeader("getAgentRecordList = async("+_sponsorKey, + ", " + _recipientKey + ", " + _recipientRateKey + ")");
  let agentRecordList = [];
  for (let [idx, agentKey] of Object.entries(_agentAccountList)) {
    let agentRecord = await getAgentRecord(_sponsorKey, _recipientKey, _recipientRateKey, agentKey);
      agentRecordList.push(agentRecord);
  }
  logExitFunction();
  return agentRecordList;
}

getAgentRecord = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("==>15 getAgentRecord = async(" + ", " + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
  logFunctionHeader("getAgentRecord = async(" + ", " + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentKey = _agentKey;
  agentRecord.stakedSPCoins = bigIntToDecString(await spCoinContractDeployed.connect(signer).getAgentTotalRecipient(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey));
  agentRecord.agentRateList = await getAgentRateRecordList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
  logExitFunction();
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////


getAgentRateList = async (_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
  // console.log("==>17 getAgentRateList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")" );
  logFunctionHeader("getAgentRateList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")" );
  networkRateKeys = await spCoinContractDeployed.connect(signer).getAgentRateList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
  let agentRateList = [];
  for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
    agentRateList.push(netWorkRateKey.toNumber());
  }
  logExitFunction();
  return agentRateList;
};

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getAgentRateTransactionList = async(_sponsorCoin, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("==>18 getAgentRateTransactionList = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  logFunctionHeader("getAgentRateTransactionList = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
  let agentRateTransactionList = await spCoinContractDeployed.connect(signer).getAgentRateTransactionList(_sponsorCoin, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  logExitFunction();
  return getRateTransactionRecords(agentRateTransactionList);
}

getRecipientRateTransactionList = async(_sponsorCoin, _recipientKey, _recipientRateKey) => {
  // console.log("==>18 getRecipientRateTransactionList = async(" + _recipientKey + ", " + _recipientRateKey + ")");
  logFunctionHeader("getRecipientRateTransactionList = async(" + _recipientKey + ", " + _recipientRateKey + ")");
  let agentRateTransactionList = await spCoinContractDeployed.connect(signer).getRecipientRateTransactionList(_sponsorCoin, _recipientKey, _recipientRateKey);
  logExitFunction();
  return getRateTransactionRecords(agentRateTransactionList);
}

getRateTransactionRecords = (transactionStr) => {
logFunctionHeader("getRateTransactionRecords = async(" + transactionStr + ")");
// log("getRateTransactionRecords = async(" + transactionStr + ")");
let transactionRecs = [];
  if(transactionStr.length > 0) {
    // console.log("==>19 getRateTransactionRecords = async(" + transactionStr + ")");
    let transactionRows = transactionStr.split("\n");
    for (let row in transactionRows) {
      let transactionFields = transactionRows[row].split(",");
      let transactionRec = new TransactionStruct();
      transactionRec.insertionTime = bigIntToDecString(transactionFields[0]);
      transactionRec.quantity = bigIntToDecString(transactionFields[1]);
      transactionRecs.push(transactionRec);
      // logJSON(transactionRec);
    }
    logExitFunction();
  }
  return transactionRecs;
}

////////////////  RECORD DE-SERIALIZATION FUNCTIONS ///////////////////

getAgentRateRecord = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
  // console.log("==>18 getAgentRateRecord(" + _sponsorKey   + _recipientKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  logFunctionHeader("getAgentRateRecord(" + _sponsorKey   + _recipientKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
  let agentRateRecord = new AgentRateStruct();
  let recordStr = await spCoinSerialize.getSerializedAgentRateList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  agentRateRecord.agentRate = _agentRateKey;
  agentRateRecord.insertionTime = bigIntToDecString(recordStr[0]);
  agentRateRecord.lastUpdateTime = bigIntToDecString(recordStr[1]);
  agentRateRecord.stakedSPCoins = bigIntToDecString(recordStr[2]);
    agentRateRecord.transactions = await getAgentRateTransactionList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
  logExitFunction();
  return agentRateRecord;
}

class SpCoinReadMethods {
  constructor() {
  }

  getRecipientRateRecord = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
  // console.log("==>10 getRecipientRateRecord(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")");
    logFunctionHeader("getRecipientRateRecord(" + _sponsorKey  + _recipientKey + ", " + _recipientRateKey + ")");
    let recipientRateRecord = new RecipientRateStruct();
    let recordStr = await spCoinSerialize.getSerializedRecipientRateList(_sponsorKey, _recipientKey, _recipientRateKey);
    recipientRateRecord.recipientRate    = _recipientRateKey;
    recipientRateRecord.insertionTime    = bigIntToDecString(recordStr[0]);
    recipientRateRecord.lastUpdateTime   = bigIntToDecString(recordStr[1]);
    recipientRateRecord.stakedSPCoins    = bigIntToDecString(recordStr[2]);
    recipientRateRecord.transactions     = await getRecipientRateTransactionList(_sponsorKey, _recipientKey, _recipientRateKey);
    recipientRateRecord.agentAccountList = await getRecipientRateAgentList(_sponsorKey, _recipientKey, _recipientRateKey);
    recipientRateRecord.agentRecordList  = await getAgentRecordList(_sponsorKey, _recipientKey, _recipientRateKey, agentAccountList);
    logExitFunction();
    return recipientRateRecord;
  }

  getRecipientRateRecordList = async(_sponsorKey, _recipientKey) => {
    // console.log("==>8 getRecipientRateRecordList = async(" + _sponsorKey +","  + _recipientKey + ")");
      logFunctionHeader("getRecipientRateRecordList = async(" + _sponsorKey +","  + _recipientKey + ")");
      let networkRateList = await getRecipientRateList(_sponsorKey, _recipientKey);
      let recipientRateRecordList = [];
    
      for (let [idx, recipientRateKey] of Object.entries(networkRateList)) {
        //log("JS => Loading Recipient Rates " + recipientRateKey + " idx = " + idx);
        let recipientRateRecord = await this.getRecipientRateRecord(_sponsorKey, _recipientKey, recipientRateKey);
    
        recipientRateRecordList.push(recipientRateRecord);
      }
      logExitFunction();
      return recipientRateRecordList;
    }
    
    getRecipientRecord = async(_sponsorKey, _recipientKey) => {
      // console.log("==>6 getRecipientRecord = async(" + _sponsorKey + ", ", + _recipientKey + ")");
      logFunctionHeader("getRecipientRecord = async(" +_sponsorKey, + ",", + _recipientKey + ")");
      let recipientRecord = new RecipientStruct(_recipientKey);
      recipientRecord.recipientKey = _recipientKey;
    
      let recordStr = await spCoinSerialize.getSerializedRecipientRecordList(_sponsorKey, _recipientKey);
      recipientRecord.insertionTime = bigIntToDecString(recordStr[0]);
      recipientRecord.stakedSPCoins = bigIntToDecString(recordStr[1]);
    
      // ToDo New Robin
      recipientRecord.recipientRateList = await this.getRecipientRateRecordList(_sponsorKey, _recipientKey);
      logExitFunction();
      return recipientRecord;
    }

    getRecipientRecordList = async(_sponsorKey, _recipientAccountList) => {
      // console.log("==>5 getRecipientRecordList = async(" +_sponsorKey + ","+ _recipientAccountList + ")");
      logFunctionHeader("getRecipientRecordList = async(" +_sponsorKey + ","+ _recipientAccountList + ")");
      let recipientRecordList = [];
      for (let [idx, recipientKey] of Object.entries(_recipientAccountList)) {
        logDetail("JS => Loading Recipient Record " + recipientKey, idx);
        let recipientRecord = await this.getRecipientRecord(_sponsorKey, recipientKey);
        recipientRecordList.push(recipientRecord);
      }
      logExitFunction();
      return recipientRecordList;
    }
    
    

}

spCoinReadMethods = new SpCoinReadMethods();

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  getAccountList,
  getAccountListSize,
  getAccountRecipientList,
  getAccountRecipientListSize,
  getAccountRecord,
  getAccountRecords,

  getAgentRateList,
  getAgentRateRecord,
  getAgentRateRecordList,
  getAgentRateTransactionList,
  getAgentRecord,
  getAgentRecordList,

  getRecipientRateAgentList,
  getRecipientRateList,
  // getRecipientRateRecord,
  // getRecipientRateRecordList,
  getRecipientRateTransactionList,
  // getRecipientRecord,
  // getRecipientRecordList,

  SpCoinReadMethods,

  injectReadMethodsContract,
};
