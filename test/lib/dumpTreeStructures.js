const { testHHAccounts } = require("./hhTestAccounts");
const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct} = require("./dataTypes");

let spCoinContractDeployed;
let prefixText = "  ";
let indent = 2;

dumpTreeStructures = async(accountArr) => {
}

dumpAccountSponsors = async(_accountKey) => {
}

dumpSponsorAgents = async(_accountKey, _sponsorKey) => {
}

module.exports = {
    dumpTreeStructures,
    dumpAccountSponsors,
    dumpSponsorAgents
}