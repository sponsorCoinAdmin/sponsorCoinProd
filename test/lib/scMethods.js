const { testHHAccounts } = require("./hhTestAccounts");

let spCoinContractDeployed
setContract = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed
}

insertSponsorAccounts = async(_accountRecIdx, _sponsorArr ) => {
    console.log ("spCoinContractDeployed = " + spCoinContractDeployed);
    logFunctionHeader("insertSponsorAccounts = async(" + _accountRecIdx + ", " + _sponsorArr + ")");
    let accountRec = testHHAccounts[_accountRecIdx];

    logDetail("For Account[" + _accountRecIdx + "]: " + accountRec + ")");
    let recCount = 0;
    let sponsorCount = _sponsorArr.length;
    logDetail ("sponsorCount.length = " + sponsorCount);
    for (let i = 0; i < sponsorCount; i++) {
        let sponsorRec = testHHAccounts[_sponsorArr[i]];
        console.log("   "+ ++recCount + ". " + "Inserting Sponsor[" + _sponsorArr[i] + "]: " + sponsorRec);
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

module.exports = {
    setContract,
    insertSponsorAccounts,
    insertAgentAccounts
}
