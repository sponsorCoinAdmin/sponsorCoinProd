const { SpCoinLogger } = require("./utils/logging");
const {
  RewardAccountStruct,
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  RecipientStruct,
  RecipientRateStruct,
  RewardRateStruct,
  RewardsStruct,
  RewardTransactionStruct,
  RewardTypeStruct,
  StakingTransactionStruct
   } = require("./dataTypes/spCoinDataTypes");
const { SpCoinSerialize, bigIntToDecString, bigIntToDateTimeString, getLocation } = require("./utils/serialize");

const SPONSOR_REWARDS = "SPONSOR_REWARDS";
const RECIPIENT_REWARDS = "RECIPIENT_REWARDS";
const AGENT_REWARDS = "AGENT_REWARDS";
const SPONSOR_ACCOUNT_DELIMITER = "SPONSOR_ACCOUNT:";
const RECIPIENT_ACCOUNT_DELIMITER = "RECIPIENT_ACCOUNT:";
const AGENT_ACCOUNT_DELIMITER = "AGENT_ACCOUNT:";

let spCoinLogger;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////

class SpCoinReadMethods {
  constructor( _spCoinContractDeployed ) {
    this.spCoinContractDeployed = _spCoinContractDeployed;
    this.spCoinSerialize = new SpCoinSerialize(_spCoinContractDeployed);
    this.setSigner(_spCoinContractDeployed.signer);
    spCoinLogger = new SpCoinLogger(_spCoinContractDeployed);
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
    accountStruct.accountKey          = _accountKey;
    let recipientAccountList          = await this.getAccountRecipientList(_accountKey);
    accountStruct.recipientRecordList = await this.getRecipientRecordList(_accountKey, recipientAccountList);
    accountStruct.stakingRewardList   = await this.getAccountStakingRewards(_accountKey);
    spCoinLogger.logExitFunction();
    return accountStruct;
  }

  getAccountStakingRewards = async (_accountKey) => {
    // console.log("JS==>1 getAccountStakingRewards = async(", _accountKey,")");
    let rewardsRecord = new RewardsStruct();

    let accountRewardsStr = await this.spCoinContractDeployed.connect(this.signer).getSerializedAccountRewards(_accountKey);
    let accountRewardList = accountRewardsStr.split(",");
    rewardsRecord.totalStakingRewards  = bigIntToDecString(accountRewardList[3]);
    /* REPLACE LATER */
    // rewardsRecord.sponsorRewardsList   = await this.getRewardTypeRecord(_accountKey, SPONSOR_REWARDS , accountRewardList[0]);
    rewardsRecord.recipientRewardsList = await this.getRewardTypeRecord(_accountKey, RECIPIENT_REWARDS, accountRewardList[1]);
    // rewardsRecord.agentRewardsList     = await this.getRewardTypeRecord(_accountKey, AGENT_REWARDS, accountRewardList[2]);

    spCoinLogger.logExitFunction();

    return rewardsRecord;
  }

  getRewardTypeRecord = async ( _accountKey, _type, _reward) => {
    // console.log("JS==>2 getRewardTypeRecord = async(", _accountKey, ",", _type, ",", bigIntToDecString(_reward),")");
    let rewardTypeRecord = new RewardTypeStruct();
    rewardTypeRecord.TYPE = _type;
    rewardTypeRecord.stakingRewards = bigIntToDecString(_reward);
    switch(_type) {
      case SPONSOR_REWARDS:
           rewardTypeRecord.rewardAccountList = [];
      break;
      case RECIPIENT_REWARDS:
        rewardTypeRecord.rewardAccountList = await this.getRewardTransactionsByAccountList(_accountKey, _type);
      break;
      case AGENT_REWARDS:
        rewardTypeRecord.rewardAccountList = await this.getRewardTransactionsByAccountList(_accountKey, _type);
      break;
      default:
        rewardTypeRecord.rewardAccountList = [];
      break;
    } 
    spCoinLogger.logExitFunction();
    return rewardTypeRecord;
  }

  getRewardTransactionsByAccountList = async (_accountKey, _type) => {
    console.log("JS==>6 getRewardTransactionsByAccountList = async(", _accountKey, ", ", _type,")");
    let rewardAccountList;
    let rewardsStr = "";
    switch(_type) {
      case SPONSOR_REWARDS:
        rewardsStr = "";
        rewardAccountList = rewardsStr.split(SPONSOR_ACCOUNT_DELIMITER);
      break;
      case RECIPIENT_REWARDS:
        rewardsStr = await this.spCoinContractDeployed.connect(this.signer).getRecipientRewardAccounts(_accountKey);
        rewardAccountList = rewardsStr.split(SPONSOR_ACCOUNT_DELIMITER);
        break;
      case AGENT_REWARDS:
        rewardsStr = await this.spCoinContractDeployed.connect(this.signer).getAgentRewardAccounts(_accountKey);
        rewardAccountList = rewardsStr.split(RECIPIENT_ACCOUNT_DELIMITER);
        break;
      default:
      break;
    } 
    // console.log ("JS=>1 BEFORE rewardsStr = ",rewardsStr)
    console.log ("JS==>6.1 AFTER rewardAccountList = ",rewardAccountList)
    return this.getAccountRewardTransactionList(rewardAccountList);
  }

  getAccountRewardTransactionList = (_rewardAccountList) => {
    console.log("JS==>5 getAccountRewardTransactionList = (_rewardAccountList = ", _rewardAccountList,")");

    let rewardTransactionsByAccountList = [];
    for (var idx = _rewardAccountList.length - 1; idx >= 1; idx--) {
      let rewardAccountRecord = this.getAccountRewardTransactionRecord(_rewardAccountList[idx]);
      rewardTransactionsByAccountList.push(rewardAccountRecord);
    }
    return rewardTransactionsByAccountList;
  }

  getAccountRewardTransactionRecord = (_rewardRecordStr) => {
    let rateRewardList = _rewardRecordStr.split("\nRATE:");

    // console.log ("rateRewardList.length = ",rateRewardList.length);
    // console.log ("JS=>2.0 BEFORE rateRewardList = ",rateRewardList);

    let rewardAccountRecord;
    if(rateRewardList.length > 0) {
      rewardAccountRecord = new RewardAccountStruct();
      let rewardRecordFields = rateRewardList.shift().split(",");
      // console.log ("JS=>2.1 AFTER rateRewardList = ",rateRewardList);
      if(rateRewardList.length > 0) {
        rewardAccountRecord.sourceKey = rewardRecordFields[0];
        rewardAccountRecord.stakingRewards = bigIntToDecString(rewardRecordFields[1]);
        rewardAccountRecord.rateList = this.getAccountRateRecordList(rateRewardList);
      }
    }
    spCoinLogger.logExitFunction();
    return rewardAccountRecord;
  }

// GOOD TO HERE

getAccountRateRecordList = ( rateRewardList ) => {
  spCoinLogger.logFunctionHeader("getAccountRateRecordList = (" + rateRewardList + ")");
  // console.log ("\n\n\n*********************** getRateRecord = (rateRecordRows) **************************");
  // console.log ("JS=>3.0 rateRewardList.length = ", rateRewardList.length);
  // console.log ("JS=>3.1 rateRewardList        = ", rateRewardList);
  
  let rateList = [];
  for (var idx = rateRewardList.length - 1; idx >= 0; idx--) {
    let rateReward = rateRewardList[idx];
    let rewardRateRecord = new RewardRateStruct();
    // console.log ("JS=>3.2 BEFORE rateReward = ",rateReward);
    let rateRewardTransactions = rateReward.split("\n");
    // console.log ("JS=>3.3 AFTER rateReward = ",rateReward);
    // console.log ("JS=>3.4 BEFORE rateRewardTransactions.length = ", rateRewardTransactions.length);
    let rateRewardHeaderFields = rateRewardTransactions.shift().split(",");
    rewardRateRecord.rate = bigIntToDecString( rateRewardHeaderFields[0] );
    rewardRateRecord.stakingRewards = bigIntToDecString( rateRewardHeaderFields[1] );
    // console.log ("JS=>3.5 AFTER rateRewardTransactions.length = ", rateRewardTransactions.length);
    // console.log ("JS=>3.6 AFTER rateRewardTransactions = ", rateRewardTransactions);
    rewardRateRecord.rewardTransactionList = this.getRateTransactionList(rateRewardTransactions);
    rateList.push(rewardRateRecord);
  }
  spCoinLogger.logExitFunction();
  return  rateList;
}

  getRateTransactionList = (rewardRateRowList) => {
    // console.log ("\n\n\n*********************** getRateTransactionList = (rewardRateRowList) **************************");
    // console.log ("JS=>6 rewardRateRowList.length = ", rewardRateRowList.length);
    // console.log ("JS=>7 rewardRateRowList        = ", rewardRateRowList);

    let rateTransactionList = [];
    for (var row = rewardRateRowList.length - 1; row >= 0; row--) {
      // console.log ("JS=>8 rewardRateRowList["+row+"] = ", rewardRateRowList[row]);

      let accountRewardsFields = rewardRateRowList[row].split(",");
      let rewardTransactionRecord = new RewardTransactionStruct();
      let count = 0;
      // rewardTransactionRecord.sourceKey = accountRewardsFields[count++];
      // console.log ("JS=>9 accountRewardsFields[count] = ", accountRewardsFields[count]);
      rewardTransactionRecord.updateTime = bigIntToDateTimeString(accountRewardsFields[count++]);
      // console.log ("JS=>11 rewardTransactionRecord.updateTime = ", rewardTransactionRecord.updateTime);
      rewardTransactionRecord.stakingRewards = bigIntToDecString(accountRewardsFields[count++]);
      // console.log ("JS=>12 rewardTransactionRecord.stakingRewards = ", rewardTransactionRecord.stakingRewards);
      // console.log ("JS=>3 rewardTransactionRecord = ",rewardTransactionRecord);

      rateTransactionList.push(rewardTransactionRecord);
    }
    // ToDo: call getRateTransactionList BELOW
    // console.log(JSON.stringify(rateTransactionList, null, 2));
    // spCoinLogger.logJSON(rateTransactionList);
    spCoinLogger.logExitFunction();
    return  rateTransactionList;

    /*
    let rewardRateRecordList = [];
console.log("JS=>6 BEFORE rewardAccountFieldList =", rewardAccountFieldList);
    let rewardRateRowList = rewardAccountFieldList.split("\nRATE:");
console.log("JS=>7 BEFORE rewardRateRowList =", rewardRateRowList);
    for (rateIdx = 0; rateIdx < rewardRateRowList; rateIdx++) {
      let rewardRateRecord = new RewardRateStruct();
console.log("JS=>8 DURING rewardRateRowList =", rewardRateRowList);
      rewardRateRecord.rate = rewardRateRowList.shift;
console.log("JS=>9 AFTER rewardRateRowList  =", rewardRateRowList);
console.log("JS=>10 rewardRateRecord.rate      =", rewardRateRecord.rate);
      rewardRateRecord.rewardTransactionList = this.getAccountRateRecordList(rewardRateRowList);
      rewardRateRecordList.push(rewardRateRecord);
    }
    return rewardRateRecordList;
    */
  //  return this.getAccountRateRecordList(rewardAccountFieldList);
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
  
  //////////////////// LOAD AGENT _rewardTransactionList DATA //////////////////////
  
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
    let agentRateTransactionList = await this.spCoinContractDeployed.connect(this.signer).getSerializedRateTransactionList(_sponsorCoin, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
    spCoinLogger.logExitFunction();
    return this.deserializeRateTransactionRecords(agentRateTransactionList);
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
    recipientRateRecord.recipientRate  = _recipientRateKey;
    recipientRateRecord.creationTime  = bigIntToDateTimeString(recordStr[0]);
    recipientRateRecord.lastUpdateTime   = bigIntToDateTimeString(recordStr[1]);
    recipientRateRecord.stakedSPCoins  = bigIntToDecString(recordStr[2]);
    recipientRateRecord.transactions   = await this.getRecipientRateTransactionList(_sponsorKey, _recipientKey, _recipientRateKey);
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
    return this.deserializeRateTransactionRecords(agentRateTransactionList);
  }

  deserializeRateTransactionRecords = (transactionStr) => {
    spCoinLogger.logFunctionHeader("deserializeRateTransactionRecords = async(" + transactionStr + ")");
    //spCoinLogger.log("deserializeRateTransactionRecords = async(" + transactionStr + ")");
    let transactionRecs = [];
    if(transactionStr.length > 0) {
    // console.log("==>19 deserializeRateTransactionRecords = async(" + transactionStr + ")");
    let transactionRows = transactionStr.split("\n");
    // for (let row in transactionRows) {
    for (var row = transactionRows.length - 1; row >= 0; row--) {
      let transactionFields = transactionRows[row].split(",");
      let transactionRec = new StakingTransactionStruct();
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
