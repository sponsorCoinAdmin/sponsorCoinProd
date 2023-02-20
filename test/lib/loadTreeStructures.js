const { testHHAccounts } = require("./hhTestAccounts");
let spCoinContractDeployed;

loadTreeStructures = async(_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
    logFunctionHeader("dumpAccounts = async()");
    log("************************* dumpAccounts() *************************");
    let insertedArrayAccounts = await getInsertedAccounts();
//    dumpArray("Record ", insertedArrayAccounts);
    let maxCount = insertedArrayAccounts.length;
//    logDetail("DUMPING " + maxCount + " ACCOUNT RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let account = insertedArrayAccounts[idx];
        log("Account[" + idx + "]:" + account );
        await dumpAccountSponsors("   ", account);
    }
    return insertedArrayAccounts;
}

dumpAccountSponsors = async(_prefix, _accountKey) => {
    logFunctionHeader("dumpAccountSponsors = async(" + _accountKey + ")");
    insertedAccountSponsors = await getInsertedAccountSponsors("Sponsor", _accountKey);
    let maxCount = insertedAccountSponsors.length;
    logDetail("   DUMPING " + maxCount + " SPONSOR RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let sponsorKey = insertedAccountSponsors[idx];
        let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorKey);
        let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorKey);
        log(_prefix + "Sponsor[" + sponsorIndex + "] => Account[" + sponsorActIdx + "]:" + sponsorKey );
        await dumpSponsorAgents("       ", _accountKey, sponsorKey);
    }
    return insertedAccountSponsors;
}
            
dumpSponsorAgents = async(_prefix, _accountKey, _sponsorKey) => {
    logFunctionHeader("dumpSponsorAgents = async(" + _accountKey + ", " + _sponsorKey + ")");
    let insertedSponsorAgents = await getInsertedSponsorAgents("Agent", _accountKey, _sponsorKey);
    let maxCount = insertedSponsorAgents.length;
//    log("        DUMPING " + maxCount + " AGENT RECORDS FOR SPONSOR " + _sponsorKey);
    for(let idx = 0; idx < maxCount; idx++) {
        let agentKey = insertedSponsorAgents[idx];
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorKey, agentKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentKey);
        log(_prefix + "Agent[" + agentIndex + "] => Account[" + agentActIdx + "]:" + agentKey );
    }
    return insertedSponsorAgents;
}

module.exports = {
    loadTreeStructures,
    dumpAccountSponsors,
    dumpSponsorAgents
}