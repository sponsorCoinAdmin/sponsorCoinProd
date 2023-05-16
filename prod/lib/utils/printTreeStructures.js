const { } = require("../../prod//lib/utils/logging");

printTestHHAccounts = () => {
    return JSON.stringify(TEST_HH_ACCOUNT_LIST, null, 2);
}

///////////////////////////////// Structure Data //////////////////////////////

printStructureTree = (_structure) => {
    spCoinLogger.logFunctionHeader("printStructureTree (" + _structure + ")");
    let structure = getJSONStructureTree(_structure);
    console.log(structure);
    spCoinLogger.logExitFunction();
}

printStructureRecipients = async(_accountStruct) => {
    spCoinLogger.logFunctionHeader("printStructureRecipients (" + _accountStruct + ")");
    let accountRecipients = getJSONStructureRecipients(_accountKey);
    console.log(accountRecipients);
    spCoinLogger.logExitFunction();
}

printStructureAccountKYC = async(_accountStruct) => {
    spCoinLogger.logFunctionHeader("printStructureAccountKYC (" + _accountStruct + ")");
    let accountKYC = getJSONStructureAccountKYC(_accountKey);
    console.log(accountKYC);
    spCoinLogger.logExitFunction();
}

printStructureRecipientAgents = async(_recipientStruct) => {
    spCoinLogger.logFunctionHeader("printStructureRecipientAgents (" + _recipientStruct + ")");
    let recipientAgents = getJSONStructureRecipientAgents(_accountKey, _recipientKey);
    console.log(recipientAgents);
    spCoinLogger.logExitFunction();
}

///////////////////////////////// Structure Data //////////////////////////////

getJSONStructureTree = (_structure) => {
    spCoinLogger.logFunctionHeader("getJSONStructureTree (" + _structure + ")");
    spCoinLogger.logExitFunction();
    return JSON.stringify(_structure, null, 2);
}

getJSONStructureRecipients = async(_accountStruct) => {
    spCoinLogger.logFunctionHeader("getJSONStructureRecipients (" + _accountStruct + ")");
    spCoinLogger.logExitFunction();
    return JSON.stringify(_accountRecipients, null, 2);
}

getJSONStructureAccountKYC = async(_accountStruct) => {
    spCoinLogger.logFunctionHeader("getJSONStructureAccountKYC (" + _accountStruct + ")");
    spCoinLogger.logExitFunction();
    return JSON.stringify(_accountStruct.KYC, null, 2);
}

getJSONStructureRecipientAgents = async(_recipientStruct) => {
    spCoinLogger.logFunctionHeader("getJSONStructureRecipientAgents (" + _recipientStruct + ")");
    spCoinLogger.logExitFunction();
    return JSON.stringify(_recipientStruct, null, 2);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

printNetworkRecipients = async(_accountKey) => {
    spCoinLogger.logFunctionHeader("printNetworkRecipients (" + _accountKey + ")");
    let accountRecipients = getJSONNetworkRecipients(_accountKey);
    console.log(accountRecipients);
    spCoinLogger.logExitFunction();
}

printNetworkAccountKYC = async(_accountKey) => {
    spCoinLogger.logFunctionHeader("printNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getJSONNetworkAccountKYC(_accountKey);
    console.log(accountKYC);
    spCoinLogger.logExitFunction();
}

printNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    spCoinLogger.logFunctionHeader("printNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = getJSONNetworkRecipientAgents(_accountKey, _recipientKey);
    console.log(recipientAgents);
    spCoinLogger.logExitFunction();
}

///////////////////////////////// NetWork Stuff //////////////////////////////

getJSONNetworkRecipients = async(_accountKey) => {
    spCoinLogger.logFunctionHeader("getJSONNetworkRecipients (" + _accountKey + ")");
    let accountRecipients = getNetworkRecipients(_accountKey);
    spCoinLogger.logExitFunction();
    return JSON.stringify(accountRecipients, null, 2);
}

getJSONNetworkAccountKYC = async(_accountKey) => {
    spCoinLogger.logFunctionHeader("getJSONNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getNetworkAccountKYC(_accountKey);
    spCoinLogger.logExitFunction();
    return JSON.stringify(accountKYC, null, 2);
}

getJSONNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    spCoinLogger.logFunctionHeader("getJSONNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = getNetworkRecipientAgents(_accountKey, _recipientKey);
    spCoinLogger.logExitFunction();
    return JSON.stringify(recipientAgents, null, 2);
}

////////////////////////// To Do Get From Network ////////////////////////////

getNetworkRecipients = async(_accountKey) => {
    spCoinLogger.logFunctionHeader("getNetworkRecipients (" + _accountKey + ")");
    let accountRecipients = await getNetworkRecipients(_accountKey);
    spCoinLogger.logExitFunction();
    return JSON.stringify(accountRecipients, null, 2);
}

getNetworkAccountKYC = async(_accountKey) => {
    spCoinLogger.logFunctionHeader("getNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = await getNetworkAccountKYC(_accountKey);
    spCoinLogger.logExitFunction();
    return JSON.stringify(accountKYC, null, 2);
}

getNetworkRecipientAgents = async(_accountKey, _recipientKey) => {
    spCoinLogger.logFunctionHeader("getNetworkRecipientAgents (" + _accountKey + ", " + _recipientKey + ")");
    let recipientAgents = await getNetworkRecipientAgents(_accountKey, _recipientKey);
    spCoinLogger.logExitFunction();
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