const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct } = require("../prod/lib/dataTypes");

printTestHHAccounts = () => {
    return JSON.stringify(testHHAccounts, null, 2);
}

///////////////////////////////// Structure Data //////////////////////////////

printStructureTree = (_structure) => {
    let structure = getJSONStructureTree(_structure);
    console.log(structure);
}

printStructureAccountSponsors = async(_accountStruct) => {
    let accountSponsors = getJSONStructureAccountSponsors(_accountKey);
    console.log(accountSponsors);
}

printStructureAccountKYC = async(_accountStruct) => {
    let accountKYC = getJSONStructureAccountKYC(_accountKey);
    console.log(accountKYC);
}

printStructureSponsorAgents = async(_sponsorStruct) => {
    let sponsorAgents = getJSONStructureSponsorAgents(_accountKey, _sponsorKey);
    console.log(sponsorAgents);
}

///////////////////////////////// Structure Data //////////////////////////////

getJSONStructureTree = (_structure) => {
    return JSON.stringify(_structure, null, 2);
}

getJSONStructureAccountSponsors = async(_accountStruct) => {
    return JSON.stringify(_accountSponsors, null, 2);
}

getJSONStructureAccountKYC = async(_accountStruct) => {
    return JSON.stringify(_accountStruct, null, 2);
}

getJSONStructureSponsorAgents = async(_sponsorStruct) => {
    return JSON.stringify(_sponsorStruct, null, 2);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

printNetworkAccountSponsors = async(_accountKey) => {
    let accountSponsors = getJSONNetworkAccountSponsors(_accountKey);
    console.log(accountSponsors);
}

printNetworkAccountKYC = async(_accountKey) => {
    let accountKYC = getJSONNetworkAccountKYC(_accountKey);
    console.log(accountKYC);
}

printNetworkSponsorAgents = async(_accountKey, _sponsorKey) => {
    let sponsorAgents = getJSONNetworkSponsorAgents(_accountKey, _sponsorKey);
    console.log(sponsorAgents);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

getJSONNetworkAccountSponsors = async(_accountKey) => {
    accountSponsors = getNetworkAccountSponsors(_accountKey);
    return JSON.stringify(accountSponsors, null, 2);
}

getJSONNetworkAccountKYC = async(_accountKey) => {
    let accountKYC = getNetworkAccountKYC(_accountKey);
    return JSON.stringify(accountKYC, null, 2);
}

getJSONNetworkSponsorAgents = async(_accountKey, _sponsorKey) => {
    let sponsorAgents = getNetworkSponsorAgents(_accountKey, _sponsorKey);
    return JSON.stringify(sponsorAgents, null, 2);
}

////////////////////////// To Do Get From Network ////////////////////////////

getNetworkAccountSponsors = async(_accountKey) => {
}

getNetworkAccountKYC = async(_accountKey) => {
}

getNetworkSponsorAgents = async(_accountKey, _sponsorKey) => {
}

module.exports = {
// Local Calls
    printTestHHAccounts,
    printStructureTree,
    printStructureAccountSponsors,
    printStructureAccountKYC,
    printStructureSponsorAgents,
    getJSONStructureAccountSponsors,
    getJSONStructureAccountKYC,
    getJSONStructureSponsorAgents,
    // NetWork Calls
    printNetworkAccountSponsors,
    printNetworkAccountKYC,
    printNetworkSponsorAgents,
    getJSONNetworkAccountSponsors,
    getJSONNetworkAccountKYC,
    getJSONNetworkSponsorAgents,
    getNetworkAccountSponsors,
    getNetworkAccountKYC,
    getNetworkSponsorAgents
}