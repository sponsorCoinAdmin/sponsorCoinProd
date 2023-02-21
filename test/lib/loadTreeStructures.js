const { testHHAccounts, LSA, loadJunk  } = require("./hhTestAccounts");
const { AccountStruct,
    SponsorStruct,
    AgentStruct,
    RateStruct,
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
    let accountMap = Map;
    logFunctionHeader("dumpAccounts = async()");
    log("************************* dumpAccounts() *************************");
    let insertedArrayAccounts = await getInsertedAccounts();
//    dumpArray("Record ", insertedArrayAccounts);
    let maxCount = insertedArrayAccounts.length;
//    logDetail("DUMPING " + maxCount + " ACCOUNT RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let accountKey = insertedArrayAccounts[idx];
       let accountStruct = new AccountStruct(accountKey);
//       accountMap.set(accountKey, accountStruct);
        log("Account[" + idx + "]:" + accountKey );
        await loadAccountSponsors("   ", accountKey);
    }
    return insertedArrayAccounts;
}

loadAccountSponsors = async(_prefix, _accountKey) => {
    logFunctionHeader("loadAccountSponsors = async(" + _accountKey + ")");
    let sponsorMap = Map;
    insertedAccountSponsors = await getInsertedAccountSponsors("Sponsor", _accountKey);
    let maxCount = insertedAccountSponsors.length;
    logDetail("   DUMPING " + maxCount + " SPONSOR RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let sponsorKey = insertedAccountSponsors[idx];
        let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorKey);
        let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorKey);
        sponsorStruct = new SponsorStruct(sponsorKey);
        // sponsorMap.set(sponsorKey, sponsorStruct);
        log(_prefix + "Sponsor[" + sponsorIndex + "] => Account[" + sponsorActIdx + "]:" + sponsorKey );
        await loadSponsorAgents("       ", _accountKey, sponsorKey);
    }
    return insertedAccountSponsors;
}

loadSponsorAgents = async(_prefix, _accountKey, _sponsorKey) => {
    logFunctionHeader("loadSponsorAgents = async(" + _accountKey + ", " + _sponsorKey + ")");
    let agentMap = Map;
    let insertedSponsorAgents = await getInsertedSponsorAgents("Agent", _accountKey, _sponsorKey);
    let maxCount = insertedSponsorAgents.length;
//    log("        DUMPING " + maxCount + " AGENT RECORDS FOR SPONSOR " + _sponsorKey);
    for(let idx = 0; idx < maxCount; idx++) {
        let agentKey = insertedSponsorAgents[idx];
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorKey, agentKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentKey);
        agentStruct = new AgentStruct(agentKey);
        // agentMap.set(agentKey, agentStruct);
        log(_prefix + "Agent[" + agentIndex + "] => Account[" + agentActIdx + "]:" + agentKey );
    }
    return insertedSponsorAgents;
}

module.exports = {
    loadTreeStructures,
    loadAccountSponsors,
    loadSponsorAgents
}