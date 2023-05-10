const { } = require("../../prod//lib/utils/logging");

printTestHHAccounts = () => {
    return JSON.stringify(TEST_HH_ACCOUNT_LIST, null, 2);
}

///////////////////////////////// Structure Data //////////////////////////////

printStructureTree = (_structure) => {
    spCoinLoggingMethods.logFunctionHeader("printStructureTree (" + _structure + ")");
    let structure = getJSONStructureTree(_structure);
    console.log(structure);
    spCoinLoggingMethods.logExitFunction();
}

printStructureRecipients = async(_accountStruct) => {
    spCoinLoggingMethods.logFunctionHeader("printStructureRecipients (" + _accountStruct + ")");
    let accountRecipients = getJSONStructureRecipients(_accountKey);
    console.log(accountRecipients);
    spCoinLoggingMethods.logExitFunction();
}

printStructureAccountKYC = async(_accountStruct) => {
    spCoinLoggingMethods.logFunctionHeader("printStructureAccountKYC (" + _accountStruct + ")");
    let accountKYC = getJSONStructureAccountKYC(_accountKey);
    console.log(accountKYC);
    spCoinLoggingMethods.logExitFunction();
}

printStructureRecipientAgents = async(_recipientStruct) => {
    spCoinLoggingMethods.logFunctionHeader("printStructureRecipientAgents (" + _recipientStruct + ")");
    let recipientAgents = getJSONStructureRecipientAgents(_accountKey, _recipientKey);
    console.log(recipientAgents);
    spCoinLoggingMethods.logExitFunction();
}

///////////////////////////////// Structure Data //////////////////////////////

getJSONStructureTree = (_structure) => {
    spCoinLoggingMethods.logFunctionHeader("getJSONStructureTree (" + _structure + ")");
    spCoinLoggingMethods.logExitFunction();
    return JSON.stringify(_structure, null, 2);
}

getJSONStructureRecipients = async(_accountStruct) => {
    spCoinLoggingMethods.logFunctionHeader("getJSONStructureRecipients (" + _accountStruct + ")");
    spCoinLoggingMethods.logExitFunction();
    return JSON.stringify(_accountRecipients, null, 2);
}

getJSONStructureAccountKYC = async(_accountStruct) => {
    spCoinLoggingMethods.logFunctionHeader("getJSONStructureAccountKYC (" + _accountStruct + ")");
    spCoinLoggingMethods.logExitFunction();
    return JSON.stringify(_accountStruct.KYC, null, 2);
}

getJSONStructureRecipientAgents = async(_recipientStruct) => {
    spCoinLoggingMethods.logFunctionHeader("getJSONStructureRecipientAgents (" + _recipientStruct + ")");
    spCoinLoggingMethods.logExitFunction();
    return JSON.stringify(_recipientStruct, null, 2);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

printNetworkRecipients = async(_accountKey) => {
    spCoinLoggingMethods.logFunctionHeader("printNetworkRecipients (" + _accountKey + ")");
    let accountRecipients = getJSONNetworkRecipients(_accountKey);
    console.log(accountRecipients);
    spCoinLoggingMethods.logExitFunction();
}

printNetworkAccountKYC = async(_accountKey) => {
    spCoinLoggingMethods.logFunctionHeader("printNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getJSONNetworkAccountKYC(_accountKey);
    console.log(accountKYC);
    spCoinLoggingMethods.logExitFunction();
}

printNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    spCoinLoggingMethods.logFunctionHeader("printNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = getJSONNetworkRecipientAgents(_accountKey, _recipientKey);
    console.log(recipientAgents);
    spCoinLoggingMethods.logExitFunction();
}

///////////////////////////////// NetWork Stuff //////////////////////////////

getJSONNetworkRecipients = async(_accountKey) => {
    spCoinLoggingMethods.logFunctionHeader("getJSONNetworkRecipients (" + _accountKey + ")");
    let accountRecipients = getNetworkRecipients(_accountKey);
    spCoinLoggingMethods.logExitFunction();
    return JSON.stringify(accountRecipients, null, 2);
}

getJSONNetworkAccountKYC = async(_accountKey) => {
    spCoinLoggingMethods.logFunctionHeader("getJSONNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getNetworkAccountKYC(_accountKey);
    spCoinLoggingMethods.logExitFunction();
    return JSON.stringify(accountKYC, null, 2);
}

getJSONNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    spCoinLoggingMethods.logFunctionHeader("getJSONNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = getNetworkRecipientAgents(_accountKey, _recipientKey);
    spCoinLoggingMethods.logExitFunction();
    return JSON.stringify(recipientAgents, null, 2);
}

////////////////////////// To Do Get From Network ////////////////////////////

getNetworkRecipients = async(_accountKey) => {
    spCoinLoggingMethods.logFunctionHeader("getNetworkRecipients (" + _accountKey + ")");
    let accountRecipients = await getNetworkRecipients(_accountKey);
    spCoinLoggingMethods.logExitFunction();
    return JSON.stringify(accountRecipients, null, 2);
}

getNetworkAccountKYC = async(_accountKey) => {
    spCoinLoggingMethods.logFunctionHeader("getNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = await getNetworkAccountKYC(_accountKey);
    spCoinLoggingMethods.logExitFunction();
    return JSON.stringify(accountKYC, null, 2);
}

getNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    spCoinLoggingMethods.logFunctionHeader("getNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = await getNetworkRecipientAgents(_accountKey, _recipientKey);
    spCoinLoggingMethods.logExitFunction();
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