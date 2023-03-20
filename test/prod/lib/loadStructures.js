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
    let maxSize = await spCoinContractDeployed.getAccountSize();

    for(let idx = 0; idx < maxSize; idx++) {
        let accountStruct = await loadAccountStructure(idx);
        accountArr.push(accountStruct);
    }
    return accountArr;
}

loadAccountStructure = async (idx) => {
    let accountKey = await spCoinContractDeployed.getAccountKey(idx);

    let accountStruct = await getAccountRecord(accountKey);
    accountStruct.index = idx;
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
    sponsorStruct.sponsorAccountKey = _sponsorAccountKey;
    sponsorStruct.accountAgentKeys = accountAgentKeys;
    sponsorStruct.agentRecordArray = await loadAgentRecordsByKeys(_accountKey, _sponsorAccountKey, accountAgentKeys);
    return sponsorStruct;
}

loadAgentsByPatreonSponsor = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _sponsorAccountKey + ")");
    let accountAgentKeys = await getAgentKeys(_accountKey, _sponsorAccountKey);
    let agentRecordArray = await loadAgentRecordsByKeys(_accountKey, _sponsorAccountKey, accountAgentKeys);
    return agentRecordArray;
}

//////////////////// LOAD AGENT DATA //////////////////////

loadAgentRecordsByKeys = async(_accountKey, _sponsorAccountKey, _accountAgentKeys) => {
    logFunctionHeader("loadAgentRecordsByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKeys + ")");
    let agentRecordArray = [];
    for (let [agentAccountKey, idx] of Object.entries(_accountAgentKeys)) {
        logDetail("JS => Loading Agent Records " + agentAccountKey, idx);
        let agentStruct = await loadAgentRecordByKeys(_accountKey, _sponsorAccountKey, agentAccountKey);
        agentStruct.index = idx;
        agentRecordArray.push(agentStruct);
    }
    return agentRecordArray;
}

loadAgentRecordByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    logFunctionHeader("loadAgentRecordByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _agentAccountKey + ")");
    // let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorAccountKey, agentAccountKey);
    // let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentAccountKey);
    agentStruct = new AgentStruct();
    agentStruct.agentAccountKey = _agentAccountKey;
    //agentStruct.agentRecordArray = await spCoinContractDeployed.getAgentRecordByKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);
    agentStruct.rates = ratesByAccountAgents = await loadRatesByAccountAgents(_accountKey, _sponsorAccountKey, _agentAccountKey);
    return agentStruct;
}

loadRatesByAccountAgents = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    // logFunctionHeader("loadAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateArray = await loadAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateArray;
    return "ToDo Rates";
}

//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
    getAccountRecord,
    loadAgentsByPatreonSponsor,
    loadSponsorsByAccount,
    loadAccountStructure,
    loadSPCoinStructures,
    setStructureContract
}
