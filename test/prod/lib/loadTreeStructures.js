const { testHHAccounts } = require("../../testMethods/hhTestAccounts");
const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct } = require("./dataTypes");
let spCoinContractDeployed;

loadTreeStructures = async(_spCoinContractDeployed) => {
    logFunctionHeader("loadTreeStructures(" + _spCoinContractDeployed + ")");
    spCoinContractDeployed = _spCoinContractDeployed;
    let accountArr = [];
    let insertedArrayAccounts = await getNetworkAccounts();
    let maxCount = insertedArrayAccounts.length;
    for(let idx = 0; idx < maxCount; idx++) {
        let accountKey = insertedArrayAccounts[idx];
        let accountStruct = new AccountStruct(accountKey);

        accountStruct.index = idx;
        accountStruct.accountKey = accountKey;
        sponsorKeys = await getNetworkSponsorKeys(accountKey);
        accountStruct.sponsorKeys = sponsorKeys;
        accountStruct.sponsorArr = await loadSponsorsByKeys(accountKey, sponsorKeys);
        accountArr.push(accountStruct);
    }
    return accountArr;
}

loadSponsorsByAccount = async(_accountKey) => {    
    logFunctionHeader("loadSponsorsByAccount("  + _accountKey + ")");
    sponsorKeys = await getNetworkSponsorKeys(_accountKey);
    sponsorArr = await loadSponsorsByKeys(_accountKey, sponsorKeys);
    return sponsorArr;
}

loadSponsorsByKeys = async(_accountKey, _sponsorKeys) => {
    let sponsorArr = [];
    let maxCount = sponsorKeys.length;
    for (let [sponsorKey, idx] of Object.entries(_sponsorKeys)) {
        logDetail(sponsorKey, idx);
        let agentKeys = await getNetworkAgentKeys(_accountKey, sponsorKey);
        let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorKey);
        let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorKey);
        let sponsorStruct = new SponsorStruct(sponsorKey);
        sponsorStruct.index = idx;
        sponsorStruct.parentAccountKey = _accountKey;
        sponsorStruct.sponsorKey = sponsorKey;

        sponsorStruct.agentKeys = agentKeys;
        sponsorStruct.agentArr = await loadAgentsByKeys(_accountKey, sponsorKey, agentKeys);
        sponsorArr.push(sponsorStruct);
    }
    return sponsorArr;
}

loadAgentsByAccountSponsor = async(_accountKey, _sponsorKey) => {
    logFunctionHeader("loadAgentsByAccountSponsor = async(" + _accountKey + ", " + _sponsorKey + ")");
    let agentKeys = await getNetworkAgentKeys(_accountKey, _sponsorKey);
    let agentArr = await loadAgentsByKeys(_accountKey, _sponsorKey, agentKeys);
    return agentArr;
}

loadAgentsByKeys = async(_accountKey, _sponsorKey, _agentKeys) => {
    let agentArr = [];
    let maxCount = _agentKeys.length;
    for (let [agentKey, idx] of Object.entries(_agentKeys)) {
        logDetail(agentKey, idx);
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorKey, agentKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentKey);
        agentStruct = new AgentStruct(agentKey);

        agentStruct.index = idx;
        agentStruct.accountKey = _accountKey;
        agentStruct.parentSponsorKey = _sponsorKey;
//        agentStruct.agentKey = agentKey;
//        agentStruct.agentKeys[agentKey] = idx;
        agentArr.push(agentStruct);
    }
    return agentArr;
}

module.exports = {
    loadTreeStructures,
    loadSponsorsByAccount,
    loadAgentsByAccountSponsor
}
