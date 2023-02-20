const { testHHAccounts } = require("./hhTestAccounts");
const {} = require("./dataTypes");

let spCoinContractDeployed;

loadTreeStructures = async(_spCoinContractDeployed) => {
//    accountStruct actStruct
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
        await loadAccountSponsors("   ", account);
    }
    return insertedArrayAccounts;
}

loadAccountSponsors = async(_prefix, _accountKey) => {
    logFunctionHeader("loadAccountSponsors = async(" + _accountKey + ")");
    insertedAccountSponsors = await getInsertedAccountSponsors("Sponsor", _accountKey);
    let maxCount = insertedAccountSponsors.length;
    logDetail("   DUMPING " + maxCount + " SPONSOR RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let sponsorKey = insertedAccountSponsors[idx];
        let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorKey);
        let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorKey);
        log(_prefix + "Sponsor[" + sponsorIndex + "] => Account[" + sponsorActIdx + "]:" + sponsorKey );
        await loadSponsorAgents("       ", _accountKey, sponsorKey);
    }
    return insertedAccountSponsors;
}
            
loadSponsorAgents = async(_prefix, _accountKey, _sponsorKey) => {
    logFunctionHeader("loadSponsorAgents = async(" + _accountKey + ", " + _sponsorKey + ")");
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
    loadAccountSponsors,
    loadSponsorAgents
}