const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct } = require("./dataTypes");
let spCoinContractDeployed;

const {} = require("./utils/serialize");

setStructureContract = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
}

loadSPCoinStructures = async() => {
    logFunctionHeader("loadSPCoinStructures()");
    let accountArr = [];
    let maxSize = await spCoinContractDeployed.getAccountListSize();
    let accountKeys = await spCoinContractDeployed.getAccountKeys();
    // console.log ("********************************");
    // logJSON(accountKeys);
    // console.log ("********************************");

    for (let i in accountKeys) {
        let accountStruct = await loadAccountStructure(accountKeys[i]);
        accountArr.push(accountStruct);
    }

    /*
    for(let idx = 0; idx < maxSize; idx++) {
        let accountStruct = await loadAccountStructure(idx);
        accountArr.push(accountStruct);
    }
    */
    return accountArr;
}

loadAccountStructure = async (accountKey) => {
//    let accountKey = await spCoinContractDeployed.getAccountKey(idx);
//    let accountKey = await spCoinContractDeployed.accountKeys(idx);

    let accountStruct = await getAccountRecord(accountKey);
//    accountStruct.index = idx;
    accountStruct.accountKey = accountKey;
    accountSponsorKeys = await getPatreonSponsorKeys(accountKey);
    accountStruct.accountSponsorKeys = accountSponsorKeys;
    accountStruct.accountSponsorRecords = await loadSponsorRecordsByKeys(accountKey, accountSponsorKeys);

    accountStruct.accountPatreonKeys = await getAccountPatreonKeys(accountKey);
    accountStruct.accountAgentKeys = await getAccountAgentKeys(accountKey);
    accountStruct.accountParentSponsorKeys = await getAccountAgentSponsorKeys(accountKey);
    return accountStruct;
}

getAccountRecord = async (_accountKey) => {
    logFunctionHeader("getAccountRecord = async(" + _accountKey + ")");
    let serializedAccountRec =
      await spCoinContractDeployed.getSerializedAccountRec(_accountKey);
    return deSerializedAccountRec(serializedAccountRec);
  };

addAccountRecord = async (_accountKey) => {
    logFunctionHeader("addAccountRecord = async(" + _accountKey + ")");
    logDetail("JS => Inserting Account " + _accountKey + " To Blockchain Network");
    await spCoinContractDeployed.addAccountRecord(_accountKey);
  };  

//////////////////// LOAD ACCOUNT DATA //////////////////////
loadSponsorsByAccount = async(_accountKey) => {    
    logFunctionHeader("loadSponsorsByAccount("  + _accountKey + ")");
    accountSponsorKeys = await getPatreonSponsorKeys(_accountKey);
    accountSponsorRecords = await loadSponsorRecordsByKeys(_accountKey, accountSponsorKeys);
    return accountSponsorRecords;
}

//////////////////// LOAD SPONSOR DATA //////////////////////

loadSponsorRecordsByKeys = async(_accountKey, _accountSponsorKeys) => {
    logFunctionHeader("loadSponsorRecordsByKeys(" + _accountKey + ", " + _accountSponsorKeys + ")");
    let accountSponsorRecords = [];
    for (let [sponsorAccountKey, idx] of Object.entries(_accountSponsorKeys)) {
        logDetail("JS => Loading Sponsor Record " + sponsorAccountKey, idx);
        let sponsorStruct = await loadSponsorRecordByKeys(_accountKey, sponsorAccountKey);
        sponsorStruct.index = idx;
        accountSponsorRecords.push(sponsorStruct);
    }
    return accountSponsorRecords;
}

loadSponsorRecordByKeys = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("loadSponsorRecordByKeys(" + _accountKey + ", " + _sponsorAccountKey + ")");
    let accountAgentKeys = await getAgentKeys(_accountKey, _sponsorAccountKey);
    let sponsorStruct = new SponsorStruct(_sponsorAccountKey);
    let sponsorKeys = await spCoinContractDeployed.getSponsorKeys(_accountKey);
    logJSON(sponsorKeys);
    console.log("ZZZZ", sponsorKeys.length);
    sponsorStruct.sponsorAccountKey = _sponsorAccountKey;
    sponsorStruct.accountAgentKeys = accountAgentKeys;
    sponsorStruct.agentRecordList = await loadAgentRecordsByKeys(_accountKey, _sponsorAccountKey, accountAgentKeys);
    return sponsorStruct;
}

loadAgentsByPatreonSponsor = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _sponsorAccountKey + ")");
    let accountAgentKeys = await getAgentKeys(_accountKey, _sponsorAccountKey);
    let agentRecordList = await loadAgentRecordsByKeys(_accountKey, _sponsorAccountKey, accountAgentKeys);
    return agentRecordList;
}

//////////////////// LOAD SPONSOR RATE DATA //////////////////////

loadSponsorRatesByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    // logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Sponsor Rates";
}

loadSponsorRateByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
    // logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Sponsor Rate";
}

//////////////////// LOAD SPONSOR TRANSACTION DATA //////////////////////

loadSponsorTransactionsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    // logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Sponsor Transactions";
}

loadSponsorTransactionKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
    // logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Sponsor Transaction";
}

//////////////////// LOAD AGENT DATA //////////////////////

loadAgentRecordsByKeys = async(_accountKey, _sponsorAccountKey, _accountAgentKeys) => {
    logFunctionHeader("loadAgentRecordsByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKeys + ")");
    let agentRecordList = [];
    for (let [agentAccountKey, idx] of Object.entries(_accountAgentKeys)) {
        logDetail("JS => Loading Agent Records " + agentAccountKey, idx);
        let agentStruct = await loadAgentRecordByKeys(_accountKey, _sponsorAccountKey, agentAccountKey);
        agentStruct.index = idx;
        agentRecordList.push(agentStruct);
    }
    return agentRecordList;
}

loadAgentRecordByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    logFunctionHeader("loadAgentRecordByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _agentAccountKey + ")");
    // let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorAccountKey, agentAccountKey);
    // let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentAccountKey);
    agentStruct = new AgentStruct();
    agentStruct.agentAccountKey = _agentAccountKey;
    //agentStruct.agentRecordList = await spCoinContractDeployed.getAgentRecordByKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);
    agentStruct.rates = ratesByAccountAgents = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);
    return agentStruct;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

loadAgentRatesByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    // logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Agent Rates";
}

loadAgentRateByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
    // logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Agent Rate";
}

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

loadAgentTransactionsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    // logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Agent Rate Transactions";
}

loadAgentTransactionKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
    // logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Agent Rate Transaction";
}

//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
    getAccountRecord,
    loadAgentRecordByKeys,
    loadAgentRecordsByKeys,
    loadAgentRateByKeys,
    loadAgentRatesByKeys,
    loadAgentsByPatreonSponsor,
    loadSponsorsByAccount,
    loadSponsorRecordByKeys,
    loadSponsorRecordsByKeys,
    loadSponsorRateByKeys,
    loadSponsorRatesByKeys,
    loadAccountStructure,
    loadSPCoinStructures,
    setStructureContract
}
