const { logFunctionHeader } = require("./utils/logging");
const { AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct } = require("./spCoinDataTypes");
const {} = require("./utils/serialize");

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

getAccountSponsorKeySize = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorKeySize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountSponsorKeySize(_accountKey);
  logDetail("JS => Found " + maxSize + " Account Sponsor Keys");
  return maxSize;
};

getAccountPatreonKeySize = async (_accountKey) => {
  logFunctionHeader("getAccountPatreonKeySize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountPatreonKeySize(_accountKey);
  logDetail("JS => Found " + maxSize + " Account Patreon Keys");
  return maxSize;
};

getAccountAgentKeySize = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeySize = async(" + _accountKey + ")");

  let maxSize = await spCoinContractDeployed.getAccountAgentKeySize(_accountKey);
  logDetail("JS => Found " + maxSize + " Account Agent Records");
  return maxSize;
};

getAccountParentSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getAccountParentSponsorKeys = async(" + _accountKey + ")");
  let accountParentSponsorKeys = spCoinContractDeployed.getAccountParentSponsorKeys;
  return accountParentSponsorKeys;
}

getAccountParentSponsorKeySize = async () => {
  logFunctionHeader("getAccountParentSponsorKeySize = async()");
  let maxSize = await spCoinContractDeployed.getAccountParentSponsorKeySize();
  logDetail("JS => Found " + maxSize + " Account Keys");
  return maxSize;
};

getAccountPatreonKeys = async (_accountKey) => {
  logFunctionHeader("getAccountPatreonKeys = async(" + _accountKey + ")");
/*
  let maxSize = await spCoinContractDeployed.getAccountPatreonKeySize(_accountKey);

  let accountPatreonKeys = {};

  for (let idx = 0; idx < maxSize; idx++) {
    let patreon = await spCoinContractDeployed.getAccountPatreonKeyByIndex(_accountKey, idx );
    accountPatreonKeys[patreon] = idx;
  }
*/
  accountPatreonKeys = spCoinContractDeployed.getAccountPatreonKeys(_accountKey);
  return accountPatreonKeys;
};

getAccountSponsorKeys = async (_accountKey) => {
  logFunctionHeader("getAccountSponsorKeys = async(" + _accountKey + ")");
  let accountSponsorKeys = await spCoinContractDeployed.getSponsorKeys(_accountKey);
  return accountSponsorKeys;
};

getAccountAgentKeys = async (_accountKey) => {
  logFunctionHeader("getAccountAgentKeys = async(" + _accountKey + ")");
  let accountAgentKeys = await spCoinContractDeployed.getAccountAgentKeys(_accountKey);
  return accountAgentKeys;
};

/////////////////////// SPONSOR RECORD FUNCTIONS ///////////////////////

getAgentRecordKeys = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  accountAgentKeys = spCoinContractDeployed.getAgentRecordKeys(_accountKey, _sponsorAccountKey);
  return accountAgentKeys;
};

getAgentRecordKeySize = async (_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentRecordKeySize = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );

  let agentSize = await spCoinContractDeployed.getAgentRecordKeySize(
    _accountKey, _sponsorAccountKey );
  logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
  return agentSize;
};

/////////////////////// AGENT RECORD FUNCTIONS ////////////////////////

getAccountSerializedRecord = async (_accountKey) => {
  logFunctionHeader("getAccountSerializedRecord = async(" + _accountKey + ")");
  let serializedAccountRec =
    await spCoinContractDeployed.getSerializedAccountRec(_accountKey);
  return deSerializedAccountRec(serializedAccountRec);
};

//////////////////// LOAD ACCOUNT DATA //////////////////////
getSponsorsByAccount = async(_accountKey) => {    
  logFunctionHeader("getSponsorsByAccount("  + _accountKey + ")");
  accountSponsorKeys = await getAccountSponsorKeys(_accountKey);
  accountSponsorRecords = await getSponsorRecordsByKeys(_accountKey, accountSponsorKeys);
  return accountSponsorRecords;
}
//////////////////// LOAD SPONSOR DATA //////////////////////

getSponsorRecordsByKeys = async(_accountKey, _accountSponsorKeys) => {
  logFunctionHeader("getSponsorRecordsByKeys(" + _accountKey + ", " + _accountSponsorKeys + ")");
  let accountSponsorRecords = [];
  for (let [idx, sponsorAccountKey] of Object.entries(_accountSponsorKeys)) {
    logDetail("JS => Loading Sponsor Record " + sponsorAccountKey, idx);
    let sponsorStruct = await getSponsorRecordByKeys(_accountKey, sponsorAccountKey);
    sponsorStruct.index = idx;
    accountSponsorRecords.push(sponsorStruct);
  }
  return accountSponsorRecords;
}

getSponsorRecordByKeys = async(_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getSponsorRecordByKeys(" + _accountKey + ", " + _sponsorAccountKey + ")");
  let accountAgentKeys = await getAgentRecordKeys(_accountKey, _sponsorAccountKey);
  let sponsorStruct = new SponsorStruct(_sponsorAccountKey);
  let sponsorKeys = await spCoinContractDeployed.getSponsorKeys(_accountKey);
  sponsorStruct.sponsorAccountKey = _sponsorAccountKey;
  sponsorStruct.accountAgentKeys = accountAgentKeys;
  sponsorStruct.agentRecordList = await getAgentRecordsByKeys(_accountKey, _sponsorAccountKey, accountAgentKeys);
  return sponsorStruct;
}

getAgentsByPatreonSponsor = async(_accountKey, _sponsorAccountKey) => {
  logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _sponsorAccountKey + ")");
  let accountAgentKeys = await getAgentRecordKeys(_accountKey, _sponsorAccountKey);
  let agentRecordList = await getAgentRecordsByKeys(_accountKey, _sponsorAccountKey, accountAgentKeys);
  return agentRecordList;
}

//////////////////// LOAD SPONSOR RATE DATA //////////////////////

getSponsorRatesByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Rates";
}

getSponsorRateByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Rate";
}

//////////////////// LOAD SPONSOR TRANSACTION DATA //////////////////////

getSponsorTransactionsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Transactions";
}

getSponsorTransactionKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
  // return agentRateRecordList;
  return "ToDo Sponsor Transaction";
}

//////////////////// LOAD AGENT DATA //////////////////////

getAgentRecordsByKeys = async(_accountKey, _sponsorAccountKey, _accountAgentKeys) => {
  logFunctionHeader("getAgentRecordsByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKeys + ")");
  let agentRecordList = [];
  for (let [idx, agentAccountKey] of Object.entries(_accountAgentKeys)) {
      logDetail("JS => Loading Agent Records " + agentAccountKey, idx);
      let agentRecord = await getAgentRecordByKeys(_accountKey, _sponsorAccountKey, agentAccountKey);
      agentRecord.index = idx;
      agentRecordList.push(agentRecord);
  }
  return agentRecordList;
}

getAgentRecordByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  logFunctionHeader("getAgentRecordByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _agentAccountKey + ")");
  agentRecord = new AgentStruct();
  agentRecord.agentAccountKey = _agentAccountKey;
  agentRecord.rates = ratesByAccountAgents = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);
  return agentRecord;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  logFunctionHeader("getAgentRatesByKeys = async(" +
  _accountKey + ", " +
  _sponsorAccountKey+ ", " +
  _agentAccountKey + ")");

  let agentRateKeys = await getAgentRateKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);

  // console.log("*** agentRateKeys = " + agentRateKeys);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
  // return agentRateRecordList;
  return "ToDo Agent Rates";
}

getAgentRateKeys = async (_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  logFunctionHeader("getAgentRecordKeys = async(" + _accountKey + ", " + _sponsorAccountKey + ")" );
  accountAgentKeys = await spCoinContractDeployed.getAgentRateKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);
  return accountAgentKeys;
};

getAgentRateByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
  // return agentRateRecordList;
  return "ToDo Agent Rate";
}

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getAgentTransactionsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
  // return agentRateRecordList;
  return "ToDo Agent Rate Transactions";
}

getAgentTransactionKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
  // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
  // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
  // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
  // return agentRateRecordList;
  return "ToDo Agent Rate Transaction";
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

getAccountRecord = async (_accountKey) => {
  let accountStruct = await getAccountSerializedRecord(_accountKey);
  accountStruct.accountKey = _accountKey;
  accountSponsorKeys = await getAccountSponsorKeys(_accountKey);
  accountStruct.accountSponsorKeys = accountSponsorKeys;
  accountStruct.accountPatreonKeys = await getAccountPatreonKeys(_accountKey);
  accountStruct.accountAgentKeys = await getAccountAgentKeys(_accountKey);
  accountStruct.accountParentSponsorKeys = await getAccountParentSponsorKeys(_accountKey);
  accountStruct.accountSponsorRecords = await getSponsorRecordsByKeys(_accountKey, accountSponsorKeys);
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
  getAgentRateByKeys,
  getAgentRatesByKeys,
  getAgentRecordByKeys,
  getAgentRecordKeys,
  getAgentRecordKeySize,
  getAgentRecordsByKeys,
  getAgentsByPatreonSponsor,
  getSponsorRateByKeys,
  getSponsorRatesByKeys,
  getSponsorRecordByKeys,
  getSponsorRecordsByKeys,
  getSponsorsByAccount,
  setContractReadMethods,
};
