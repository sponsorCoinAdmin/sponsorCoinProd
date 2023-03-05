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
    let insertedArrayAccounts = await getAccounts();
    let maxCount = insertedArrayAccounts.length;
    for(let idx = 0; idx < maxCount; idx++) {
        let accountKey = insertedArrayAccounts[idx];
        let accountStruct = new AccountStruct(accountKey);

        accountStruct.index = idx;
        accountStruct.accountKey = accountKey;
        sponsoredAccountKeys = await getSponsorKeys(accountKey);
        accountStruct.sponsoredAccountKeys = sponsoredAccountKeys;
        accountStruct.sponsoredObjectArray = await loadSponsorsByKeys(accountKey, sponsoredAccountKeys);
        accountArr.push(accountStruct);

        accountStruct.patreonAccountKeys = await getPatreonKeys(accountKey);
        accountStruct.agentAccountKeys = await getNetworkAgentKeys(accountKey);
    }
    return accountArr;
}

loadSponsorsByAccount = async(_accountKey) => {    
    logFunctionHeader("loadSponsorsByAccount("  + _accountKey + ")");
    sponsoredAccountKeys = await getSponsorKeys(_accountKey);
    sponsoredObjectArray = await loadSponsorsByKeys(_accountKey, sponsoredAccountKeys);
    return sponsoredObjectArray;
}

loadSponsorsByKeys = async(_accountKey, _sponsoredAccountKeys) => {
    logFunctionHeader("loadSponsorsByKeys(" + _accountKey + ", " + _sponsoredAccountKeys + ")");

    let sponsoredObjectArray = [];
    for (let [sponsorAccountKey, idx] of Object.entries(_sponsoredAccountKeys)) {
        logDetail("JS => " + sponsorAccountKey, idx);
        let agentAccountKeys = await getSponsorAgentKeys(_accountKey, sponsorAccountKey);
        // let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorAccountKey);
        // let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorAccountKey);
        let sponsorStruct = new SponsorStruct(sponsorAccountKey);
        sponsorStruct.index = idx;
        sponsorStruct.sponsorAccountKey = sponsorAccountKey;

        sponsorStruct.agentAccountKeys = agentAccountKeys;
        sponsorStruct.agentObjectArray = await loadAgentsByKeys(_accountKey, sponsorAccountKey, agentAccountKeys);
        sponsoredObjectArray.push(sponsorStruct);
    }
    return sponsoredObjectArray;
}

loadBeneficiariesByKeys = async(_accountKey, _patreonAccountKeys) => {
    let patreonArr = [];
    for (let [patreonKey, idx] of Object.entries(_patreonAccountKeys)) {
        logDetail("JS => " + patreonKey, idx);
        let agentAccountKeys = await getPatreonKeys(_accountKey, patreonKey);
        let sponsorStruct = new SponsorStruct(patreonKey);
        sponsorStruct.index = idx;
        sponsorStruct.patreonKey = patreonKey;

        sponsorStruct.agentAccountKeys = agentAccountKeys;
        sponsorStruct.agentObjectArray = await loadAgentsByKeys(_accountKey, patreonKey, agentAccountKeys);
        patreonArr.push(sponsorStruct);
    }
    return patreonArr;
}

loadAgentsByAccountSponsor = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("loadAgentsByAccountSponsor = async(" + _accountKey + ", " + _sponsorAccountKey + ")");
    let agentAccountKeys = await getSponsorAgentKeys(_accountKey, _sponsorAccountKey);
    let agentObjectArray = await loadAgentsByKeys(_accountKey, _sponsorAccountKey, agentAccountKeys);
    return agentObjectArray;
}

loadAgentsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKeys) => {
    let agentObjectArray = [];
    let maxCount = _agentAccountKeys.length;
    for (let [agentAccountKey, idx] of Object.entries(_agentAccountKeys)) {
        logDetail("JS => " + agentAccountKey, idx);
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorAccountKey, agentAccountKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentAccountKey);
        agentStruct = new AgentStruct();

        agentStruct.index = idx;
        agentStruct.agentAccountKey = agentAccountKey;
        agentObjectArray.push(agentStruct);
    }
    return agentObjectArray;
}

loadBeneficiariesByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKeys) => {
    let agentObjectArray = [];
    let maxCount = _agentAccountKeys.length;
    for (let [agentAccountKey, idx] of Object.entries(_agentAccountKeys)) {
        logDetail("JS => " + agentAccountKey, idx);
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorAccountKey, agentAccountKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentAccountKey);
        agentStruct = new AgentStruct(agentAccountKey);

        agentStruct.index = idx;
        agentStruct.accountKey = _accountKey;
//        agentStruct.agentAccountKey = agentAccountKey;
//        agentStruct.agentAccountKeys[agentAccountKey] = idx;
        agentObjectArray.push(agentStruct);
    }
    return agentObjectArray;
}

module.exports = {
    loadTreeStructures,
    loadSponsorsByAccount,
    loadAgentsByAccountSponsor
}
