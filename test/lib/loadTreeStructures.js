const { testHHAccounts, LSA, loadJunk  } = require("./hhTestAccounts");
const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct } = require("./dataTypes");

let spCoinContractDeployed;

/*
console.log( AccountStruct.toString() );
console.log( SponsorStruct.toString() );
console.log( AgentStruct.toString() );
console.log( RateStruct.toString() );
console.log( TransactionStruct.toString() );
*/

loadTreeStructures = async(_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
    let accountMap  = new Map;
    logFunctionHeader("dumpAccounts = async()");
    log("************************* dumpAccounts() *************************");
    let insertedArrayAccounts = await getInsertedAccounts();
//    dumpArray("Record ", insertedArrayAccounts);
    let maxCount = insertedArrayAccounts.length;
    let prefix = "";
//    logDetail("DUMPING " + maxCount + " ACCOUNT RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let accountKey = insertedArrayAccounts[idx];
        let accountStruct = new AccountStruct(accountKey);

        accountStruct.index = idx;
        accountStruct.accountKey = accountKey;
        logPrefix(prefix, "accountStruct(accountKey) = accountStruct(" + accountKey + ")");
        logPrefix(prefix, accountStruct.toString(prefix));

        accountMap.set(accountKey, accountStruct);

        log("Account[" + idx + "]:" + accountKey );
        await loadAccountSponsors("   ", accountKey);
    }
    return insertedArrayAccounts;
}

loadAccountSponsors = async(_prefix, _accountKey) => {
    logFunctionHeader("loadAccountSponsors = async(" + _accountKey + ")");
    let sponsorMap = new Map;
    insertedAccountSponsors = await getInsertedAccountSponsors("Sponsor", _accountKey);
    let maxCount = insertedAccountSponsors.length;
    logDetail("   DUMPING " + maxCount + " SPONSOR RECORDS");

    let prefix = setIndentPrefixLevel(_prefix, 2);
    for(let idx = 0; idx < maxCount; idx++) {
        let sponsorKey = insertedAccountSponsors[idx];
        let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorKey);
        let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorKey);
        sponsorStruct = new SponsorStruct(sponsorKey);

        sponsorStruct.index = idx;
        sponsorStruct.parentAccountKey = _accountKey;
        sponsorStruct.sponsorKey = sponsorKey;
        logPrefix(prefix, "sponsorStruct(accountKey) = sponsorStruct(" + sponsorKey + ")");
        logPrefix(prefix, sponsorStruct.toString(prefix));

        sponsorMap.set(sponsorKey, sponsorStruct);
        logPrefix(prefix, "Sponsor[" + sponsorIndex + "] => Account[" + sponsorActIdx + "]:" + sponsorKey);
        await loadSponsorAgents(_prefix, _accountKey, sponsorKey);
    }
    return insertedAccountSponsors;
}

loadSponsorAgents = async(_prefix, _accountKey, _sponsorKey) => {
    logFunctionHeader("loadSponsorAgents = async(" + _accountKey + ", " + _sponsorKey + ")");
    let agentMap  = new Map;
    let insertedSponsorAgents = await getInsertedSponsorAgents("Agent", _accountKey, _sponsorKey);
    let maxCount = insertedSponsorAgents.length;
    let prefix = setIndentPrefixLevel(_prefix, 4);
//    log("        DUMPING " + maxCount + " AGENT RECORDS FOR SPONSOR " + _sponsorKey);
    for(let idx = 0; idx < maxCount; idx++) {
        let agentKey = insertedSponsorAgents[idx];
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorKey, agentKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentKey);
        agentStruct = new AgentStruct(agentKey);

         agentStruct.index = idx;
         agentStruct.accountKey = _accountKey;
         agentStruct.parentSponsorKey = _sponsorKey;
         agentStruct.agentKey = agentKey;
         logPrefix(prefix, "agentStruct = \n", agentStruct.toString(prefix));

        agentMap.set(agentKey, agentStruct);
        logPrefix(_prefix + "Agent[" + agentIndex + "] => Account[" + agentActIdx + "]:" + agentKey);
    }
    return insertedSponsorAgents;
}

module.exports = {
    loadTreeStructures,
    loadAccountSponsors,
    loadSponsorAgents
}