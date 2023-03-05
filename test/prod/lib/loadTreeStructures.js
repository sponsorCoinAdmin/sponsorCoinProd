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
    let insertedArrayAccounts = await getAccountKeys();
    let maxSize = insertedArrayAccounts.length;
    for(let idx = 0; idx < maxSize; idx++) {
        let accountKey = insertedArrayAccounts[idx];
        let accountStruct = new AccountStruct(accountKey);

        accountStruct.index = idx;
        accountStruct.accountKey = accountKey;
        accountSponsorKeys = await getAccountSponsorKeys(accountKey);
        accountStruct.accountSponsorKeys = accountSponsorKeys;
        accountStruct.accountSponsorObjects = await loadSponsorsByKeys(accountKey, accountSponsorKeys);
        accountArr.push(accountStruct);

        accountStruct.accountPatreonKeys = await getAccountPatreonKeys(accountKey);
        accountStruct.accountAgentKeys = await getAccountAgentKeys(accountKey);
    }
    return accountArr;
}

loadSponsorsByAccount = async(_accountKey) => {    
    logFunctionHeader("loadSponsorsByAccount("  + _accountKey + ")");
    accountSponsorKeys = await getAccountSponsorKeys(_accountKey);
    accountSponsorObjects = await loadSponsorsByKeys(_accountKey, accountSponsorKeys);
    return accountSponsorObjects;
}

loadSponsorsByKeys = async(_accountKey, _accountSponsorKeys) => {
    logFunctionHeader("loadSponsorsByKeys(" + _accountKey + ", " + _accountSponsorKeys + ")");

    let accountSponsorObjects = [];
    for (let [sponsorAccountKey, idx] of Object.entries(_accountSponsorKeys)) {
        logDetail("JS => " + sponsorAccountKey, idx);
        let accountAgentKeys = await getSponsorAgentKeys(_accountKey, sponsorAccountKey);
        // let sponsorIndex = await spCoinContractDeployed.getAccountSponsorIndex(_accountKey, sponsorAccountKey);
        // let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorAccountKey);
        let sponsorStruct = new SponsorStruct(sponsorAccountKey);
        sponsorStruct.index = idx;
        sponsorStruct.sponsorAccountKey = sponsorAccountKey;

        sponsorStruct.accountAgentKeys = accountAgentKeys;
        sponsorStruct.agentObjectArray = await loadAgentsByKeys(_accountKey, sponsorAccountKey, accountAgentKeys);
        accountSponsorObjects.push(sponsorStruct);
    }
    return accountSponsorObjects;
}

loadBeneficiariesByKeys = async(_accountKey, _accountPatreonKeys) => {
    let patreonArr = [];
    for (let [patreonKey, idx] of Object.entries(_accountPatreonKeys)) {
        logDetail("JS => " + patreonKey, idx);
        let accountAgentKeys = await getAccountPatreonKeys(_accountKey, patreonKey);
        let sponsorStruct = new SponsorStruct(patreonKey);
        sponsorStruct.index = idx;
        sponsorStruct.patreonKey = patreonKey;

        sponsorStruct.accountAgentKeys = accountAgentKeys;
        sponsorStruct.agentObjectArray = await loadAgentsByKeys(_accountKey, patreonKey, accountAgentKeys);
        patreonArr.push(sponsorStruct);
    }
    return patreonArr;
}

loadAgentsByAccountSponsor = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("loadAgentsByAccountSponsor = async(" + _accountKey + ", " + _sponsorAccountKey + ")");
    let accountAgentKeys = await getSponsorAgentKeys(_accountKey, _sponsorAccountKey);
    let agentObjectArray = await loadAgentsByKeys(_accountKey, _sponsorAccountKey, accountAgentKeys);
    return agentObjectArray;
}

loadAgentsByKeys = async(_accountKey, _sponsorAccountKey, _accountAgentKeys) => {
    let agentObjectArray = [];
    let maxSize = _accountAgentKeys.length;
    for (let [agentAccountKey, idx] of Object.entries(_accountAgentKeys)) {
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

loadBeneficiariesByKeys = async(_accountKey, _sponsorAccountKey, _accountAgentKeys) => {
    let agentObjectArray = [];
    let maxSize = _accountAgentKeys.length;
    for (let [agentAccountKey, idx] of Object.entries(_accountAgentKeys)) {
        logDetail("JS => " + agentAccountKey, idx);
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorAccountKey, agentAccountKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentAccountKey);
        agentStruct = new AgentStruct(agentAccountKey);

        agentStruct.index = idx;
        agentStruct.accountKey = _accountKey;
//        agentStruct.agentAccountKey = agentAccountKey;
//        agentStruct.accountAgentKeys[agentAccountKey] = idx;
        agentObjectArray.push(agentStruct);
    }
    return agentObjectArray;
}

module.exports = {
    loadTreeStructures,
    loadSponsorsByAccount,
    loadAgentsByAccountSponsor
}
