const { testHHAccounts } = require("./hhTestAccounts");
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
    let insertedArrayAccounts = await getInsertedAccounts();
    let maxCount = insertedArrayAccounts.length;
    for(let idx = 0; idx < maxCount; idx++) {
        let accountKey = insertedArrayAccounts[idx];
        let accountStruct = new AccountStruct(accountKey);
        accountStruct.index = idx;
        accountStruct.accountKey = accountKey;
        accountStruct.sponsorKeys[accountKey] = idx;
        accountStruct.sponsorArr.push(await loadAccountSponsors(2, accountKey));
        accountArr.push(accountStruct);
    }
    return accountArr;
}

loadAccountSponsors = async(_logLevel, _accountKey) => {    
    logFunctionHeader("loadAccountSponsors(" + _logLevel + ", " + _accountKey + ")");
    let sponsorArr = [];
    insertedAccountSponsors = await getInsertedAccountSponsors("Sponsor", _accountKey);
    let maxCount = insertedAccountSponsors.length;

    for(let idx = 0; idx < maxCount; idx++) {
        let sponsorKey = insertedAccountSponsors[idx];
        let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorKey);
        let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorKey);
        let sponsorStruct = new SponsorStruct(sponsorKey);
        sponsorStruct.index = idx;
        sponsorStruct.parentAccountKey = _accountKey;
        sponsorStruct.sponsorKey = sponsorKey;
        sponsorStruct.agentKeys[sponsorKey] = idx;
        sponsorStruct.agentArr.push(await loadSponsorAgents(_accountKey, sponsorKey));
        sponsorArr.push(sponsorStruct);

    }
    return sponsorArr;
}

loadSponsorAgents = async(_accountKey, _sponsorKey) => {
    logFunctionHeader("loadSponsorAgents = async(" + _accountKey + ", " + _sponsorKey + ")");
    let agentArr = [];
    let insertedSponsorAgents = await getInsertedSponsorAgents("Agent", _accountKey, _sponsorKey);
    let maxCount = insertedSponsorAgents.length;
    for(let idx = 0; idx < maxCount; idx++) {
        let agentKey = insertedSponsorAgents[idx];
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
    loadAccountSponsors,
    loadSponsorAgents
}