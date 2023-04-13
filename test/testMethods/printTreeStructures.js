const { } = require("../../prod//lib/utils/logging");

printTestHHAccounts = () => {
    return JSON.stringify(TEST_HH_ACCOUNT_LIST, null, 2);
}

///////////////////////////////// Structure Data //////////////////////////////

printStructureTree = (_structure) => {
    logFunctionHeader("printStructureTree (" + _structure + ")");
    let structure = getJSONStructureTree(_structure);
    console.log(structure);
}

printStructurePatronSponsors = async(_accountStruct) => {
    logFunctionHeader("printStructurePatronSponsors (" + _accountStruct + ")");
    let accountSponsors = getJSONStructurePatronSponsors(_accountKey);
    console.log(accountSponsors);
}

printStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("printStructureAccountKYC (" + _accountStruct + ")");
    let accountKYC = getJSONStructureAccountKYC(_accountKey);
    console.log(accountKYC);
}

printStructureSponsorAgents = async(_sponsorStruct) => {
    logFunctionHeader("printStructureSponsorAgents (" + _sponsorStruct + ")");
    let sponsorAgents = getJSONStructureSponsorAgents(_accountKey, _sponsorKey);
    console.log(sponsorAgents);
}

///////////////////////////////// Structure Data //////////////////////////////

getJSONStructureTree = (_structure) => {
    logFunctionHeader("getJSONStructureTree (" + _structure + ")");
    return JSON.stringify(_structure, null, 2);
}

getJSONStructurePatronSponsors = async(_accountStruct) => {
    logFunctionHeader("getJSONStructurePatronSponsors (" + _accountStruct + ")");
    return JSON.stringify(_accountSponsors, null, 2);
}

getJSONStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("getJSONStructureAccountKYC (" + _accountStruct + ")");
    return JSON.stringify(_accountStruct.KYC, null, 2);
}

getJSONStructureSponsorAgents = async(_sponsorStruct) => {
    logFunctionHeader("getJSONStructureSponsorAgents (" + _sponsorStruct + ")");
    return JSON.stringify(_sponsorStruct, null, 2);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

printNetworkPatronSponsors = async(_accountKey) => {
    logFunctionHeader("printNetworkPatronSponsors (" + _accountKey + ")");
    let accountSponsors = getJSONNetworkPatronSponsors(_accountKey);
    console.log(accountSponsors);
}

printNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("printNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getJSONNetworkAccountKYC(_accountKey);
    console.log(accountKYC);
}

printNetworkSponsorAgents = async(_accountKey, _sponsorKey) => {
    logFunctionHeader("printNetworkSponsorAgents (" + _accountKey + ", " + _sponsorKey + ")");
    let sponsorAgents = getJSONNetworkSponsorAgents(_accountKey, _sponsorKey);
    console.log(sponsorAgents);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

getJSONNetworkPatronSponsors = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkPatronSponsors (" + _accountKey + ")");
    let accountSponsors = getNetworkPatronSponsors(_accountKey);
    return JSON.stringify(accountSponsors, null, 2);
}

getJSONNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getNetworkAccountKYC(_accountKey);
    return JSON.stringify(accountKYC, null, 2);
}

getJSONNetworkSponsorAgents = async(_accountKey, _sponsorKey) => {
    logFunctionHeader("getJSONNetworkSponsorAgents (" + _accountKey + ", " + _sponsorKey + ")");
    let sponsorAgents = getNetworkSponsorAgents(_accountKey, _sponsorKey);
    return JSON.stringify(sponsorAgents, null, 2);
}

////////////////////////// To Do Get From Network ////////////////////////////

getNetworkPatronSponsors = async(_accountKey) => {
    logFunctionHeader("getNetworkPatronSponsors (" + _accountKey + ")");
    let accountSponsors = await getNetworkPatronSponsors(_accountKey);
    return JSON.stringify(accountSponsors, null, 2);
}

getNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = await getNetworkAccountKYC(_accountKey);
    return JSON.stringify(accountKYC, null, 2);
}

getNetworkSponsorAgents = async(_accountKey, _sponsorKey) => {
    logFunctionHeader("getNetworkSponsorAgents (" + _accountKey + ", " + _sponsorKey + ")");
    let sponsorAgents = await getNetworkSponsorAgents(_accountKey, _sponsorKey);
    return JSON.stringify(sponsorAgents, null, 2);
}

module.exports = {
// Local Calls
    printTestHHAccounts,
    printStructureTree,
    printStructurePatronSponsors,
    printStructureAccountKYC,
    printStructureSponsorAgents,
    getJSONStructurePatronSponsors,
    getJSONStructureAccountKYC,
    getJSONStructureSponsorAgents,
    // NetWork Calls
    printNetworkPatronSponsors,
    printNetworkAccountKYC,
    printNetworkSponsorAgents,
    getJSONNetworkPatronSponsors,
    getJSONNetworkAccountKYC,
    getJSONNetworkSponsorAgents,
    getNetworkPatronSponsors,
    getNetworkAccountKYC,
    getNetworkSponsorAgents
}