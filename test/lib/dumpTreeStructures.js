const { testHHAccounts } = require("./hhTestAccounts");
const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct,
        dumpMap } = require("./dataTypes");

let spCoinContractDeployed;
let prefixText = "  ";
let indent = 2;

dumpTreeStructures = async(accountMap) => {
    dumpMap("accountMap", accountMap);

    // logFunctionHeader("dumpAccounts = async()");
    // log("****************************************** dumpAccounts() ******************************************************");
    // for (const [key, value] of accountMap) { 
    //     console.log(`The value for key ${key} is ${value}`);
    // }
    /*
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
        log(accountStruct.toString());

        accountMap.set(accountKey, accountStruct);

        log("Account[" + idx + "]:" + accountKey );
        await dumpAccountSponsors(2, accountKey);
    }
    return insertedArrayAccounts;
    */
}

dumpAccountSponsors = async(_logLevel, _accountKey) => {
    logFunctionHeader("dumpAccountSponsors = async(" + _accountKey + ")");
    let prefix = setIndentPrefixLevel(prefixText, _logLevel);
    let sponsorMap = new Map;
    insertedAccountSponsors = await getInsertedAccountSponsors(_accountKey);
    let maxCount = insertedAccountSponsors.length;
    logDetail("   DUMPING " + maxCount + " SPONSOR RECORDS");

    for(let idx = 0; idx < maxCount; idx++) {
        let sponsorKey = insertedAccountSponsors[idx];
        let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorKey);
        let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorKey);
        sponsorStruct = new SponsorStruct(sponsorKey);

        sponsorStruct.index = idx;
        sponsorStruct.parentAccountKey = _accountKey;
        sponsorStruct.sponsorKey = sponsorKey;
        // logPrefix(prefix, "sponsorStruct(sponsorKey) = sponsorStruct(" + sponsorKey + ")");
        // log(sponsorStruct.toString());

        sponsorMap.set(sponsorKey, sponsorStruct);
        // logPrefix(prefix, "Sponsor[" + sponsorIndex + "] => Account[" + sponsorActIdx + "]:" + sponsorKey);
        await dumpSponsorAgents(_logLevel + indent, _accountKey, sponsorKey);
    }
    return insertedAccountSponsors;
}

dumpSponsorAgents = async(_logLevel, _accountKey, _sponsorKey) => {
    logFunctionHeader("dumpSponsorAgents = async(" + _accountKey + ", " + _sponsorKey + ")");
    let prefix = setIndentPrefixLevel(prefixText, _logLevel);
    let agentMap  = new Map;
    let insertedSponsorAgents = await getInsertedSponsorAgents("Agent", _accountKey, _sponsorKey);
    let maxCount = insertedSponsorAgents.length;
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
        // logPrefix(prefix, "agentStruct(agentKey) = agentStruct(" + agentKey + ")");
        // log(agentStruct.toString();

        agentMap.set(agentKey, agentStruct);
        // logPrefix(prefix, "Agent[" + agentIndex + "] => Account[" + agentActIdx + "]:" + agentKey);
    }
    return insertedSponsorAgents;
}

module.exports = {
    dumpTreeStructures,
    dumpAccountSponsors,
    dumpSponsorAgents
}