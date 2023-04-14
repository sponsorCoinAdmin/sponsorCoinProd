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

printStructureSponsorRecipients = async(_accountStruct) => {
    logFunctionHeader("printStructureSponsorRecipients (" + _accountStruct + ")");
    let accountRecipients = getJSONStructureSponsorRecipients(_accountKey);
    console.log(accountRecipients);
}

printStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("printStructureAccountKYC (" + _accountStruct + ")");
    let accountKYC = getJSONStructureAccountKYC(_accountKey);
    console.log(accountKYC);
}

printStructureRecipientAgents = async(_recipientStruct) => {
    logFunctionHeader("printStructureRecipientAgents (" + _recipientStruct + ")");
    let recipientAgents = getJSONStructureRecipientAgents(_accountKey, _recipientKey);
    console.log(recipientAgents);
}

///////////////////////////////// Structure Data //////////////////////////////

getJSONStructureTree = (_structure) => {
    logFunctionHeader("getJSONStructureTree (" + _structure + ")");
    return JSON.stringify(_structure, null, 2);
}

getJSONStructureSponsorRecipients = async(_accountStruct) => {
    logFunctionHeader("getJSONStructureSponsorRecipients (" + _accountStruct + ")");
    return JSON.stringify(_accountRecipients, null, 2);
}

getJSONStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("getJSONStructureAccountKYC (" + _accountStruct + ")");
    return JSON.stringify(_accountStruct.KYC, null, 2);
}

getJSONStructureRecipientAgents = async(_recipientStruct) => {
    logFunctionHeader("getJSONStructureRecipientAgents (" + _recipientStruct + ")");
    return JSON.stringify(_recipientStruct, null, 2);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

printNetworkSponsorRecipients = async(_accountKey) => {
    logFunctionHeader("printNetworkSponsorRecipients (" + _accountKey + ")");
    let accountRecipients = getJSONNetworkSponsorRecipients(_accountKey);
    console.log(accountRecipients);
}

printNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("printNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getJSONNetworkAccountKYC(_accountKey);
    console.log(accountKYC);
}

printNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    logFunctionHeader("printNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = getJSONNetworkRecipientAgents(_accountKey, _recipientKey);
    console.log(recipientAgents);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

getJSONNetworkSponsorRecipients = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkSponsorRecipients (" + _accountKey + ")");
    let accountRecipients = getNetworkSponsorRecipients(_accountKey);
    return JSON.stringify(accountRecipients, null, 2);
}

getJSONNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getNetworkAccountKYC(_accountKey);
    return JSON.stringify(accountKYC, null, 2);
}

getJSONNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    logFunctionHeader("getJSONNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = getNetworkRecipientAgents(_accountKey, _recipientKey);
    return JSON.stringify(recipientAgents, null, 2);
}

////////////////////////// To Do Get From Network ////////////////////////////

getNetworkSponsorRecipients = async(_accountKey) => {
    logFunctionHeader("getNetworkSponsorRecipients (" + _accountKey + ")");
    let accountRecipients = await getNetworkSponsorRecipients(_accountKey);
    return JSON.stringify(accountRecipients, null, 2);
}

getNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = await getNetworkAccountKYC(_accountKey);
    return JSON.stringify(accountKYC, null, 2);
}

getNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    logFunctionHeader("getNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = await getNetworkRecipientAgents(_accountKey, _recipientKey);
    return JSON.stringify(recipientAgents, null, 2);
}

module.exports = {
// Local Calls
    printTestHHAccounts,
    printStructureTree,
    printStructureSponsorRecipients,
    printStructureAccountKYC,
    printStructureRecipientAgents,
    getJSONStructureSponsorRecipients,
    getJSONStructureAccountKYC,
    getJSONStructureRecipientAgents,
    // NetWork Calls
    printNetworkSponsorRecipients,
    printNetworkAccountKYC,
    printNetworkRecipientAgents,
    getJSONNetworkSponsorRecipients,
    getJSONNetworkAccountKYC,
    getJSONNetworkRecipientAgents,
    getNetworkSponsorRecipients,
    getNetworkAccountKYC,
    getNetworkRecipientAgents
}