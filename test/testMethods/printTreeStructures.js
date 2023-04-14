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

printStructurePatronRecipients = async(_accountStruct) => {
    logFunctionHeader("printStructurePatronRecipients (" + _accountStruct + ")");
    let accountRecipients = getJSONStructurePatronRecipients(_accountKey);
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

getJSONStructurePatronRecipients = async(_accountStruct) => {
    logFunctionHeader("getJSONStructurePatronRecipients (" + _accountStruct + ")");
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

printNetworkPatronRecipients = async(_accountKey) => {
    logFunctionHeader("printNetworkPatronRecipients (" + _accountKey + ")");
    let accountRecipients = getJSONNetworkPatronRecipients(_accountKey);
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

getJSONNetworkPatronRecipients = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkPatronRecipients (" + _accountKey + ")");
    let accountRecipients = getNetworkPatronRecipients(_accountKey);
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

getNetworkPatronRecipients = async(_accountKey) => {
    logFunctionHeader("getNetworkPatronRecipients (" + _accountKey + ")");
    let accountRecipients = await getNetworkPatronRecipients(_accountKey);
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
    printStructurePatronRecipients,
    printStructureAccountKYC,
    printStructureRecipientAgents,
    getJSONStructurePatronRecipients,
    getJSONStructureAccountKYC,
    getJSONStructureRecipientAgents,
    // NetWork Calls
    printNetworkPatronRecipients,
    printNetworkAccountKYC,
    printNetworkRecipientAgents,
    getJSONNetworkPatronRecipients,
    getJSONNetworkAccountKYC,
    getJSONNetworkRecipientAgents,
    getNetworkPatronRecipients,
    getNetworkAccountKYC,
    getNetworkRecipientAgents
}