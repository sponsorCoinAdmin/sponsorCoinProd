const { } = require("../../prod//lib/utils/logging");

printTestHHAccounts = () => {
    return JSON.stringify(TEST_HH_ACCOUNT_LIST, null, 2);
}

///////////////////////////////// Structure Data //////////////////////////////

printStructureTree = (_structure) => {
    logFunctionHeader("printStructureTree (" + _structure + ")");
    let structure = getJSONStructureTree(_structure);
    console.log(structure);
    logExitFunction();
}

printStructureRecipients = async(_accountStruct) => {
    logFunctionHeader("printStructureRecipients (" + _accountStruct + ")");
    let accountRecipients = getJSONStructureRecipients(_accountKey);
    console.log(accountRecipients);
    logExitFunction();
}

printStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("printStructureAccountKYC (" + _accountStruct + ")");
    let accountKYC = getJSONStructureAccountKYC(_accountKey);
    console.log(accountKYC);
    logExitFunction();
}

printStructureRecipientAgents = async(_recipientStruct) => {
    logFunctionHeader("printStructureRecipientAgents (" + _recipientStruct + ")");
    let recipientAgents = getJSONStructureRecipientAgents(_accountKey, _recipientKey);
    console.log(recipientAgents);
    logExitFunction();
}

///////////////////////////////// Structure Data //////////////////////////////

getJSONStructureTree = (_structure) => {
    logFunctionHeader("getJSONStructureTree (" + _structure + ")");
    logExitFunction();
    return JSON.stringify(_structure, null, 2);
}

getJSONStructureRecipients = async(_accountStruct) => {
    logFunctionHeader("getJSONStructureRecipients (" + _accountStruct + ")");
    logExitFunction();
    return JSON.stringify(_accountRecipients, null, 2);
}

getJSONStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("getJSONStructureAccountKYC (" + _accountStruct + ")");
    logExitFunction();
    return JSON.stringify(_accountStruct.KYC, null, 2);
}

getJSONStructureRecipientAgents = async(_recipientStruct) => {
    logFunctionHeader("getJSONStructureRecipientAgents (" + _recipientStruct + ")");
    logExitFunction();
    return JSON.stringify(_recipientStruct, null, 2);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

printNetworkRecipients = async(_accountKey) => {
    logFunctionHeader("printNetworkRecipients (" + _accountKey + ")");
    let accountRecipients = getJSONNetworkRecipients(_accountKey);
    console.log(accountRecipients);
    logExitFunction();
}

printNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("printNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getJSONNetworkAccountKYC(_accountKey);
    console.log(accountKYC);
    logExitFunction();
}

printNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    logFunctionHeader("printNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = getJSONNetworkRecipientAgents(_accountKey, _recipientKey);
    console.log(recipientAgents);
    logExitFunction();
}

///////////////////////////////// NetWork Stuff //////////////////////////////

getJSONNetworkRecipients = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkRecipients (" + _accountKey + ")");
    let accountRecipients = getNetworkRecipients(_accountKey);
    logExitFunction();
    return JSON.stringify(accountRecipients, null, 2);
}

getJSONNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getNetworkAccountKYC(_accountKey);
    logExitFunction();
    return JSON.stringify(accountKYC, null, 2);
}

getJSONNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    logFunctionHeader("getJSONNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = getNetworkRecipientAgents(_accountKey, _recipientKey);
    logExitFunction();
    return JSON.stringify(recipientAgents, null, 2);
}

////////////////////////// To Do Get From Network ////////////////////////////

getNetworkRecipients = async(_accountKey) => {
    logFunctionHeader("getNetworkRecipients (" + _accountKey + ")");
    let accountRecipients = await getNetworkRecipients(_accountKey);
    logExitFunction();
    return JSON.stringify(accountRecipients, null, 2);
}

getNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = await getNetworkAccountKYC(_accountKey);
    logExitFunction();
    return JSON.stringify(accountKYC, null, 2);
}

getNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    logFunctionHeader("getNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = await getNetworkRecipientAgents(_accountKey, _recipientKey);
    logExitFunction();
    return JSON.stringify(recipientAgents, null, 2);
}

module.exports = {
// Local Calls
    printTestHHAccounts,
    printStructureTree,
    printStructureRecipients,
    printStructureAccountKYC,
    printStructureRecipientAgents,
    getJSONStructureRecipients,
    getJSONStructureAccountKYC,
    getJSONStructureRecipientAgents,
    // NetWork Calls
    printNetworkRecipients,
    printNetworkAccountKYC,
    printNetworkRecipientAgents,
    getJSONNetworkRecipients,
    getJSONNetworkAccountKYC,
    getJSONNetworkRecipientAgents,
    getNetworkRecipients,
    getNetworkAccountKYC,
    getNetworkRecipientAgents
}