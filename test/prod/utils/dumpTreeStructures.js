const { testHHAccounts } = require("../../testMethods/hhTestAccounts");
const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct } = require("../lib/dataTypes");

dumpTestHHAccounts = () => {
    return JSON.stringify(testHHAccounts, null, 2);
}

///////////////////////////////// Structure Data //////////////////////////////

dumpStructureTree = (_structure) => {
    let structure = getJSONStructureTree(_structure);
    console.log(structure);
}

dumpStructureAccountSponsors = async(_accountStruct) => {
    let accountSponsors = getJSONStructureAccountSponsors(_accountKey);
    console.log(accountSponsors);
}

dumpStructureAccountKYC = async(_accountStruct) => {
    let accountKYC = getJSONStructureAccountKYC(_accountKey);
    console.log(accountKYC);
}

dumpStructureSponsorAgents = async(_sponsorStruct) => {
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

dumpNetworkAccountSponsors = async(_accountKey) => {
    let accountSponsors = getJSONNetworkAccountSponsors(_accountKey);
    console.log(accountSponsors);
}

dumpNetworkAccountKYC = async(_accountKey) => {
    let accountKYC = getJSONNetworkAccountKYC(_accountKey);
    console.log(accountKYC);
}

dumpNetworkSponsorAgents = async(_accountKey, _sponsorKey) => {
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
    dumpTestHHAccounts,
    dumpStructureTree,
    dumpStructureAccountSponsors,
    dumpStructureAccountKYC,
    dumpStructureSponsorAgents,
    getJSONStructureAccountSponsors,
    getJSONStructureAccountKYC,
    getJSONStructureSponsorAgents,
    // NetWork Calls
    dumpNetworkAccountSponsors,
    dumpNetworkAccountKYC,
    dumpNetworkSponsorAgents,
    getJSONNetworkAccountSponsors,
    getJSONNetworkAccountKYC,
    getJSONNetworkSponsorAgents,
    getNetworkAccountSponsors,
    getNetworkAccountKYC,
    getNetworkSponsorAgents
}