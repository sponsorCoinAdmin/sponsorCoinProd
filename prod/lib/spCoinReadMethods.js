const { SpCoinLogger } = require("./utils/logging");
const {
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  RecipientStruct,
  RecipientRateStruct,
  TransactionStruct } = require("./dataTypes/spCoinDataTypes");
const { SpCoinSerialize, bigIntToDecString, bigIntToDateTimeString, getLocation } = require("./utils/serialize");

let spCoinLogger;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

  class SpCoinReadMethods {
    constructor( _spCoinContractDeployed) {
      // if ( _spCoinContractDeployed != undefined) {
        this.spCoinContractDeployed = _spCoinContractDeployed;
        this.spCoinSerialize = new SpCoinSerialize(_spCoinContractDeployed);
        this.setSigner(_spCoinContractDeployed.signer);
        spCoinLogger = new SpCoinLogger(_spCoinContractDeployed);
      // }
    }
    
    setSigner(_signer) {
      this.signer = _signer;
    }
    
    getAccountList = async () => {
      spCoinLogger.logFunctionHeader("getAccountList = async()");
      let insertedAccountList = await this.spCoinContractDeployed.connect(this.signer).getAccountList();
      spCoinLogger.logExitFunction();
      return insertedAccountList;
    };
    
    getAccountListSize = async () => {
      spCoinLogger.logFunctionHeader("getAccountListSize = async()");
      let maxSize = (await this.getAccountList()).length;
      spCoinLogger.logDetail("JS => Found " + maxSize + " Account Keys");
      spCoinLogger.logExitFunction();
      return maxSize;
    };
    
    getAccountRecipientList = async (_accountKey) => {
      // console.log("==>4 getAccountRecipientList = async(" + _accountKey + ")");
      spCoinLogger.logFunctionHeader("getAccountRecipientList = async(" + _accountKey + ")");
      let recipientAccountList = await this.spCoinContractDeployed.connect(this.signer).getAccountRecipientList(_accountKey);
      spCoinLogger.logExitFunction();
      return recipientAccountList;
    };
    
    getAccountRecipientListSize = async (_accountKey) => {
      // console.log("==>20 getAccountRecipientListSize = async(" + _accountKey + ")");
      spCoinLogger.logFunctionHeader("getAccountRecipientListSize = async(" + _accountKey + ")");
    
      let maxSize = (await this.getAccountRecipientList(_accountKey)).length;
      spCoinLogger.logDetail("JS => Found " + maxSize + " Account Recipient Keys");
      spCoinLogger.logExitFunction();
      return maxSize;
    };

    getAccountRecord = async (_accountKey) => {
      // console.log("==>2 getAccountRecord = async(", _accountKey,")");
      let accountStruct = await this.spCoinSerialize.getSerializedAccountRecord(_accountKey);
      accountStruct.accountKey = _accountKey;
      let recipientAccountList = await this.getAccountRecipientList(_accountKey);
      accountStruct.recipientRecordList = await this.getRecipientRecordList(_accountKey, recipientAccountList);
      spCoinLogger.logExitFunction();
      return accountStruct;
    }

    getAccountRecords = async() => {
      // console.log("==>1 getAccountRecords()");
      spCoinLogger.logFunctionHeader("getAccountRecords()");
      let accountArr = [];
      let accountList = await this.spCoinContractDeployed.connect(this.signer).getAccountList();
    
      for (let i in accountList) {
          let accountStruct = await this.getAccountRecord(accountList[i]);
          accountArr.push(accountStruct);
      }
      spCoinLogger.logExitFunction();
      return accountArr;
    }
    
    //////////////////// LOAD AGENT RATE DATA //////////////////////
    
    getAgentRateList = async (_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
      // console.log("==>17 getAgentRateList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")" );
      spCoinLogger.logFunctionHeader("getAgentRateList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")" );
      let networkRateKeys = await this.spCoinContractDeployed.connect(this.signer).getAgentRateList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
      let agentRateList = [];
      for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
        agentRateList.push(netWorkRateKey.toNumber());
      }
      spCoinLogger.logExitFunction();
      return agentRateList;
    };

    getAgentRateRecord = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
      // console.log("==>18 getAgentRateRecord(" + _sponsorKey   + _recipientKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
      spCoinLogger.logFunctionHeader("getAgentRateRecord(" + _sponsorKey   + _recipientKey + ", " + _agentKey+ ", " + _agentRateKey + ")");
      let agentRateRecord = new AgentRateStruct();
      let recordStr = await this.spCoinSerialize.getSerializedAgentRateList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
      agentRateRecord.agentRate = _agentRateKey;
      agentRateRecord.creationTime = bigIntToDateTimeString(recordStr[0]);
      agentRateRecord.lastUpdateTime = bigIntToDateTimeString(recordStr[1]);
      agentRateRecord.stakedSPCoins = bigIntToDecString(recordStr[2]);
        agentRateRecord.transactions = await this.getAgentRateTransactionList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
      spCoinLogger.logExitFunction();
      return agentRateRecord;
    }

    getAgentRateRecordList = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
      // console.log("==>16 getAgentRateRecordList = async(" + _recipientKey+ ", " + _agentKey + ")");
      spCoinLogger.logFunctionHeader("getAgentRateRecordList(" + ", " + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
      
      let agentRateList = await this.getAgentRateList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
    
      let agentRateRecordList = [];
      for (let [idx, agentRateKey] of Object.entries(agentRateList)) {
      let agentRateRecord = await this.getAgentRateRecord(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, agentRateKey);
      agentRateRecordList.push(agentRateRecord);
      }
      spCoinLogger.logExitFunction();
      return agentRateRecordList;
    }
    
    //////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

    getAgentRecord = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey) => {
      // console.log("==>15 getAgentRecord = async(" + ", " + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
      spCoinLogger.logFunctionHeader("getAgentRecord = async(" + ", " + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ")");
      let agentRecord = new AgentStruct();
      agentRecord.agentKey = _agentKey;
      agentRecord.stakedSPCoins = bigIntToDecString(await this.spCoinContractDeployed.connect(this.signer).getAgentTotalRecipient(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey));
      agentRecord.agentRateList = await this.getAgentRateRecordList(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
      spCoinLogger.logExitFunction();
      return agentRecord;
    }
    
    getAgentRecordList = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentAccountList) => {
      // console.log("==>14 getAgentRecordList = async("+_sponsorKey, + ", " + _recipientKey + ", " + _recipientRateKey + ")");
      spCoinLogger.logFunctionHeader("getAgentRecordList = async("+_sponsorKey, + ", " + _recipientKey + ", " + _recipientRateKey + ")");
      let agentRecordList = [];
      for (let [idx, agentKey] of Object.entries(_agentAccountList)) {
        let agentRecord = await this.getAgentRecord(_sponsorKey, _recipientKey, _recipientRateKey, agentKey);
          agentRecordList.push(agentRecord);
      }
      spCoinLogger.logExitFunction();
      return agentRecordList;
    }
    
    getAgentRateTransactionList = async(_sponsorCoin, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
      // console.log("==>18 getAgentRateTransactionList = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
      spCoinLogger.logFunctionHeader("getAgentRateTransactionList = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentKey + ", " + _agentRateKey + ")");
      let agentRateTransactionList = await this.spCoinContractDeployed.connect(this.signer).getAgentRateTransactionList(_sponsorCoin, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
      spCoinLogger.logExitFunction();
      return this.getRateTransactionRecords(agentRateTransactionList);
    }  

  /////////////////////// RECIPIENT RECORD FUNCTIONS ///////////////////////

    getRecipientRateAgentList = async (_sponsorKey, _recipientKey, _recipientRateKey) => {
      // console.log("==>13 getRecipientRateAgentList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")" );
      spCoinLogger.logFunctionHeader("getRecipientRateAgentList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")" );
      let agentAccountList = await this.spCoinContractDeployed.connect(this.signer).getRecipientRateAgentList(_sponsorKey, _recipientKey, _recipientRateKey);
      spCoinLogger.logExitFunction();
      return agentAccountList;
    };

    getRecipientRateRecord = async(_sponsorKey, _recipientKey, _recipientRateKey) => {
    // console.log("==>10 getRecipientRateRecord(" + _sponsorKey + ", " + _recipientKey + ", " + _recipientRateKey + ")");
      spCoinLogger.logFunctionHeader("getRecipientRateRecord(" + _sponsorKey  + _recipientKey + ", " + _recipientRateKey + ")");
      let recipientRateRecord = new RecipientRateStruct();
      let recordStr = await this.spCoinSerialize.getSerializedRecipientRateList(_sponsorKey, _recipientKey, _recipientRateKey);
      let agentAccountList = await this.getRecipientRateAgentList(_sponsorKey, _recipientKey, _recipientRateKey);
      recipientRateRecord.recipientRate    = _recipientRateKey;
      recipientRateRecord.creationTime    = bigIntToDateTimeString(recordStr[0]);
      recipientRateRecord.lastUpdateTime   = bigIntToDateTimeString(recordStr[1]);
      recipientRateRecord.stakedSPCoins    = bigIntToDecString(recordStr[2]);
      recipientRateRecord.transactions     = await this.getRecipientRateTransactionList(_sponsorKey, _recipientKey, _recipientRateKey);
      recipientRateRecord.agentRecordList  = await this.getAgentRecordList(_sponsorKey, _recipientKey, _recipientRateKey, agentAccountList);
      spCoinLogger.logExitFunction();
      return recipientRateRecord;
    }

    getRecipientRateRecordList = async(_sponsorKey, _recipientKey) => {
      // console.log("==>8 getRecipientRateRecordList = async(" + _sponsorKey +","  + _recipientKey + ")");
      spCoinLogger.logFunctionHeader("getRecipientRateRecordList = async(" + _sponsorKey +","  + _recipientKey + ")");
      let networkRateList = await this.getRecipientRateList(_sponsorKey, _recipientKey);
      let recipientRateRecordList = [];
      
      for (let [idx, recipientRateKey] of Object.entries(networkRateList)) {
        //log("JS => Loading Recipient Rates " + recipientRateKey + " idx = " + idx);
        let recipientRateRecord = await this.getRecipientRateRecord(_sponsorKey, _recipientKey, recipientRateKey);
        recipientRateRecordList.push(recipientRateRecord);
      }
      spCoinLogger.logExitFunction();
      return recipientRateRecordList;
    }
      
    getRecipientRecord = async(_sponsorKey, _recipientKey) => {
      // console.log("==>6 getRecipientRecord = async(" + _sponsorKey + ", ", + _recipientKey + ")");
      spCoinLogger.logFunctionHeader("getRecipientRecord = async(" +_sponsorKey, + ",", + _recipientKey + ")");
      let recipientRecord = new RecipientStruct(_recipientKey);
      recipientRecord.recipientKey = _recipientKey;
      
      let recordStr = await this.spCoinSerialize.getSerializedRecipientRecordList(_sponsorKey, _recipientKey);
      recipientRecord.creationTime = bigIntToDateTimeString(recordStr[0]);
      recipientRecord.stakedSPCoins = bigIntToDecString(recordStr[1]);
      
      // ToDo New Robin
      recipientRecord.recipientRateList = await this.getRecipientRateRecordList(_sponsorKey, _recipientKey);
      spCoinLogger.logExitFunction();
      return recipientRecord;
    }

    getRecipientRecordList = async(_sponsorKey, _recipientAccountList) => {
      // console.log("==>5 getRecipientRecordList = async(" +_sponsorKey + ","+ _recipientAccountList + ")");
      spCoinLogger.logFunctionHeader("getRecipientRecordList = async(" +_sponsorKey + ","+ _recipientAccountList + ")");
      let recipientRecordList = [];
      for (let [idx, recipientKey] of Object.entries(_recipientAccountList)) {
        spCoinLogger.logDetail("JS => Loading Recipient Record " + recipientKey, idx);
        let recipientRecord = await this.getRecipientRecord(_sponsorKey, recipientKey);
        recipientRecordList.push(recipientRecord);
      }
      spCoinLogger.logExitFunction();
      return recipientRecordList;
    }
    
    getRecipientRateList = async(_sponsorKey, _recipientKey) => {
      spCoinLogger.logFunctionHeader("getRecipientRateList = async(" + _sponsorKey +","  + _recipientKey + ")");
      // console.log("==>9 getRecipientRateList = async(" + _sponsorKey +","  + _recipientKey + ")");
      
      let networkRateKeys = await this.spCoinContractDeployed.connect(this.signer).getRecipientRateList(_sponsorKey, _recipientKey);
      let recipientRateList = [];
      for (let [idx, netWorkRateKey] of Object.entries(networkRateKeys)) {
        recipientRateList.push(netWorkRateKey.toNumber());
      }
      spCoinLogger.logExitFunction();
      return recipientRateList;
    }
      
    getRecipientRateTransactionList = async(_sponsorCoin, _recipientKey, _recipientRateKey) => {
      // console.log("==>18 getRecipientRateTransactionList = async(" + _recipientKey + ", " + _recipientRateKey + ")");
      spCoinLogger.logFunctionHeader("getRecipientRateTransactionList = async(" + _recipientKey + ", " + _recipientRateKey + ")");
      let agentRateTransactionList = await this.spCoinContractDeployed.connect(this.signer).getRecipientRateTransactionList(_sponsorCoin, _recipientKey, _recipientRateKey);
      spCoinLogger.logExitFunction();
      return this.getRateTransactionRecords(agentRateTransactionList);
    }

    getRateTransactionRecords = (transactionStr) => {
      spCoinLogger.logFunctionHeader("getRateTransactionRecords = async(" + transactionStr + ")");
      //spCoinLogger.log("getRateTransactionRecords = async(" + transactionStr + ")");
      let transactionRecs = [];
        if(transactionStr.length > 0) {
        // console.log("==>19 getRateTransactionRecords = async(" + transactionStr + ")");
        let transactionRows = transactionStr.split("\n");
        // for (let row in transactionRows) {
        for (var row = transactionRows.length - 1; row >= 0; row--) {
          let transactionFields = transactionRows[row].split(",");
          let transactionRec = new TransactionStruct();
          transactionRec.location = getLocation();
          transactionRec.insertionTime = bigIntToDateTimeString(transactionFields[0]);
          transactionRec.quantity = bigIntToDecString(transactionFields[1]);
          transactionRecs.push(transactionRec);
          // spCoinLogger.logJSON(transactionRec);
        }
        spCoinLogger.logExitFunction();
      }
      return transactionRecs;
    }
}

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  SpCoinReadMethods,
};
