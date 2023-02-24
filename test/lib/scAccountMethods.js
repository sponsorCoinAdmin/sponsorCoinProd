const { testHHAccounts } = require("./hhTestAccounts");

let spCoinContractDeployed
setContract = ( _spCoinContractDeployed ) => {
    spCoinContractDeployed = _spCoinContractDeployed
}

insertSponsorAccounts = async(_accountRecIdx, _sponsorArr ) => {
    logFunctionHeader("insertSponsorAccounts = async(" + _accountRecIdx + ", " + _sponsorArr + ")");
    let accountRec = testHHAccounts[_accountRecIdx];

    logDetail("For Account[" + _accountRecIdx + "]: " + accountRec + ")");
    let recCount = 0;
    let sponsorCount = _sponsorArr.length;
    logDetail ("sponsorCount.length = " + sponsorCount);
    for (let i = 0; i < sponsorCount; i++) {
        let sponsorRec = testHHAccounts[_sponsorArr[i]];
        logDetail("   "+ ++recCount + ". " + "Inserting Sponsor[" + _sponsorArr[i] + "]: " + sponsorRec);
        await spCoinContractDeployed.insertAccountSponsor(accountRec, sponsorRec);
    }
    sponsorCount = await spCoinContractDeployed.getSponsorRecordCount(accountRec);
    logDetail("Inserted = " + sponsorCount + " Sponsor Records");
    return sponsorCount;
}

insertAgentAccounts = async(_accountRecIdx, _sponsorRecIdx, _agentArr ) => {
    logFunctionHeader("insertAgentAccounts = async(" + _sponsorRecIdx + ", " + _agentArr + ")");
    let accountRec = testHHAccounts[_accountRecIdx];
    let sponsorRec = testHHAccounts[_sponsorRecIdx];
    let prefix = "        ";
    logDetail(prefix + "For Account [" + _accountRecIdx + "]: " + accountRec + ")");
    logDetail(prefix + "For Sponsor [" + _sponsorRecIdx + "]: " + sponsorRec + ")");
    let recCount = 0;
    let agentCount = _agentArr.length;
    logDetail ("_agentArr = " + _agentArr);
    logDetail ("agentCount.length = " + agentCount);
    for (let i = 0; i < agentCount; i++) {
        let agentRec = testHHAccounts[_agentArr[i]];
        logDetail(prefix + ++recCount + ". " + "Inserting Agent[" + _agentArr[i] + "]: " + agentRec);
        await spCoinContractDeployed.insertSponsorAgent(accountRec, sponsorRec, agentRec);
    }
    agentCount = await spCoinContractDeployed.getAgentRecordCount(accountRec, sponsorRec);
    logDetail(prefix + "Inserted = " + agentCount + " Agent Records");
    return agentCount;
}

insertAccounts = async(_arrayAccounts) => {
    logFunctionHeader("insertAccounts = async(arrayAccounts)");
    let recCount = _arrayAccounts.length;
    logDetail("Inserting " + recCount + " Records to Blockchain");

    for(idx = 0; idx < recCount; idx++){
        let account = _arrayAccounts[idx];
        logDetail("Inserting " + idx + ", " + account);
        await spCoinContractDeployed.insertAccount(account);
    }
    logDetail("JAVASCRIPT => ** Inserted " + recCount + " Accounts");
    return recCount;
}

getInsertedAccounts = async() => {
    logFunctionHeader("getInsertedAccounts = async()");
    let maxCount = await spCoinContractDeployed.getAccountRecordCount();

    var insertedArrayAccounts = [];
    for(idx = 0; idx < maxCount; idx++){
       let account = await spCoinContractDeployed.getAccount(idx);
       logDetail("JAVASCRIPT => Address at Index " + idx + "  = "+ account );
       insertedArrayAccounts.push(account);
    }
    return insertedArrayAccounts;
}

getInsertedAccountSponsors = async(_prefix, _accountKey) => {
    logFunctionHeader("getInsertedAccountSponsors = async(" + _prefix + ", " + _accountKey + ")");
    let maxCount = await spCoinContractDeployed.getSponsorRecordCount(_accountKey);
    
    let insertedAccountSponsors = [];
    for(let idx = 0; idx < maxCount; idx++) {
        let sponsor = await spCoinContractDeployed.getAccountSponsorAddress(_accountKey, idx);
        logDetail(_prefix + "[" + idx + "]: " + sponsor );
        insertedAccountSponsors.push(sponsor);
    }
    return insertedAccountSponsors;
}

getInsertedSponsorAgents = async(_prefix, _accountKey, _sponsorKey) => {
    //    logFunctionHeader("getInsertedSponsorAgents = async(" + _prefix + ", " + _sponsorKey + ")");
        let maxCount = await spCoinContractDeployed.getAgentRecordCount(_accountKey, _sponsorKey);
    //    logDetail("        JAVASCRIPT => Found " + maxCount + " Agents for Sponsor account " + _sponsorKey)
        let insertedSponsorAgents = [];
        for(let idx = 0; idx < maxCount; idx++) {
            let agent = await spCoinContractDeployed.getAgentKeyAddress(_accountKey, _sponsorKey, idx);
    //        logDetail(_prefix + "[" + idx + "]: " + agent );
            insertedSponsorAgents.push(agent);
        }
        return insertedSponsorAgents;
    }

module.exports = {
    setContract,
    insertAccounts,
    insertSponsorAccounts,
    insertAgentAccounts,
    getInsertedAccounts,
    getInsertedAccountSponsors,
    getInsertedSponsorAgents,
}
