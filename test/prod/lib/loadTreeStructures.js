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
        sponsoredAccountKeys = await getSponsorKeys(accountKey);
        accountStruct.sponsoredAccountKeys = sponsoredAccountKeys;
        accountStruct.sponsorArr = await loadSponsorsByKeys(accountKey, sponsoredAccountKeys);
        accountArr.push(accountStruct);

        accountStruct.contributorAccountKeys = await getPatreonKeys(accountKey);
        accountStruct.agentKeys = await getNetworkAgentKeys(accountKey);
    }
    return accountArr;
}

loadSponsorsByAccount = async(_accountKey) => {    
    logFunctionHeader("loadSponsorsByAccount("  + _accountKey + ")");
    sponsoredAccountKeys = await getSponsorKeys(_accountKey);
    sponsorArr = await loadSponsorsByKeys(_accountKey, sponsoredAccountKeys);
    return sponsorArr;
}

loadSponsorsByKeys = async(_accountKey, _sponsoredAccountKeys) => {
    logFunctionHeader("loadSponsorsByKeys(" + _accountKey + ", " + _sponsoredAccountKeys + ")");

    let sponsorArr = [];
    for (let [sponsorKey, idx] of Object.entries(_sponsoredAccountKeys)) {
        logDetail("JS => " + sponsorKey, idx);
        let agentKeys = await getNetworkSponsorAgentKeys(_accountKey, sponsorKey);
        // let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorKey);
        // let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorKey);
        let sponsorStruct = new SponsorStruct(sponsorKey);
        sponsorStruct.index = idx;
        sponsorStruct.sponsorKey = sponsorKey;

        sponsorStruct.agentKeys = agentKeys;
        sponsorStruct.agentArr = await loadAgentsByKeys(_accountKey, sponsorKey, agentKeys);
        sponsorArr.push(sponsorStruct);
    }
    return sponsorArr;
}

loadBeneficiariesByKeys = async(_accountKey, _contributorAccountKeys) => {
    let contributorArr = [];
    for (let [contributorKey, idx] of Object.entries(_contributorAccountKeys)) {
        logDetail("JS => " + contributorKey, idx);
        let agentKeys = await getPatreonKeys(_accountKey, contributorKey);
        let sponsorStruct = new SponsorStruct(contributorKey);
        sponsorStruct.index = idx;
        sponsorStruct.contributorKey = contributorKey;

        sponsorStruct.agentKeys = agentKeys;
        sponsorStruct.agentArr = await loadAgentsByKeys(_accountKey, contributorKey, agentKeys);
        contributorArr.push(sponsorStruct);
    }
    return contributorArr;
}

loadAgentsByAccountSponsor = async(_accountKey, _sponsorKey) => {
    logFunctionHeader("loadAgentsByAccountSponsor = async(" + _accountKey + ", " + _sponsorKey + ")");
    let agentKeys = await getNetworkSponsorAgentKeys(_accountKey, _sponsorKey);
    let agentArr = await loadAgentsByKeys(_accountKey, _sponsorKey, agentKeys);
    return agentArr;
}

loadAgentsByKeys = async(_accountKey, _sponsorKey, _agentKeys) => {
    let agentArr = [];
    let maxCount = _agentKeys.length;
    for (let [agentKey, idx] of Object.entries(_agentKeys)) {
        logDetail("JS => " + agentKey, idx);
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorKey, agentKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentKey);
        agentStruct = new AgentStruct();

        agentStruct.index = idx;
        agentStruct.agentKey = agentKey;
        agentArr.push(agentStruct);
    }
    return agentArr;
}

loadBeneficiariesByKeys = async(_accountKey, _sponsorKey, _agentKeys) => {
    let agentArr = [];
    let maxCount = _agentKeys.length;
    for (let [agentKey, idx] of Object.entries(_agentKeys)) {
        logDetail("JS => " + agentKey, idx);
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorKey, agentKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentKey);
        agentStruct = new AgentStruct(agentKey);

        agentStruct.index = idx;
        agentStruct.accountKey = _accountKey;
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
