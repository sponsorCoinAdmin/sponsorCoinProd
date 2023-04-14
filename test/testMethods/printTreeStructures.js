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

printStructurePatronBenificiarias = async(_accountStruct) => {
    logFunctionHeader("printStructurePatronBenificiarias (" + _accountStruct + ")");
    let accountBenificiarias = getJSONStructurePatronBenificiarias(_accountKey);
    console.log(accountBenificiarias);
}

printStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("printStructureAccountKYC (" + _accountStruct + ")");
    let accountKYC = getJSONStructureAccountKYC(_accountKey);
    console.log(accountKYC);
}

printStructureBenificiaryAgents = async(_benificiaryStruct) => {
    logFunctionHeader("printStructureBenificiaryAgents (" + _benificiaryStruct + ")");
    let benificiaryAgents = getJSONStructureBenificiaryAgents(_accountKey, _benificiaryKey);
    console.log(benificiaryAgents);
}

///////////////////////////////// Structure Data //////////////////////////////

getJSONStructureTree = (_structure) => {
    logFunctionHeader("getJSONStructureTree (" + _structure + ")");
    return JSON.stringify(_structure, null, 2);
}

getJSONStructurePatronBenificiarias = async(_accountStruct) => {
    logFunctionHeader("getJSONStructurePatronBenificiarias (" + _accountStruct + ")");
    return JSON.stringify(_accountBenificiarias, null, 2);
}

getJSONStructureAccountKYC = async(_accountStruct) => {
    logFunctionHeader("getJSONStructureAccountKYC (" + _accountStruct + ")");
    return JSON.stringify(_accountStruct.KYC, null, 2);
}

getJSONStructureBenificiaryAgents = async(_benificiaryStruct) => {
    logFunctionHeader("getJSONStructureBenificiaryAgents (" + _benificiaryStruct + ")");
    return JSON.stringify(_benificiaryStruct, null, 2);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

printNetworkPatronBenificiarias = async(_accountKey) => {
    logFunctionHeader("printNetworkPatronBenificiarias (" + _accountKey + ")");
    let accountBenificiarias = getJSONNetworkPatronBenificiarias(_accountKey);
    console.log(accountBenificiarias);
}

printNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("printNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getJSONNetworkAccountKYC(_accountKey);
    console.log(accountKYC);
}

printNetworkBenificiaryAgents = async(_accountKey, _benificiaryKey) => {
    logFunctionHeader("printNetworkBenificiaryAgents (" + _accountKey + ", " + _benificiaryKey + ")");
    let benificiaryAgents = getJSONNetworkBenificiaryAgents(_accountKey, _benificiaryKey);
    console.log(benificiaryAgents);
}

///////////////////////////////// NetWork Stuff //////////////////////////////

getJSONNetworkPatronBenificiarias = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkPatronBenificiarias (" + _accountKey + ")");
    let accountBenificiarias = getNetworkPatronBenificiarias(_accountKey);
    return JSON.stringify(accountBenificiarias, null, 2);
}

getJSONNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getJSONNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = getNetworkAccountKYC(_accountKey);
    return JSON.stringify(accountKYC, null, 2);
}

getJSONNetworkBenificiaryAgents = async(_accountKey, _benificiaryKey) => {
    logFunctionHeader("getJSONNetworkBenificiaryAgents (" + _accountKey + ", " + _benificiaryKey + ")");
    let benificiaryAgents = getNetworkBenificiaryAgents(_accountKey, _benificiaryKey);
    return JSON.stringify(benificiaryAgents, null, 2);
}

////////////////////////// To Do Get From Network ////////////////////////////

getNetworkPatronBenificiarias = async(_accountKey) => {
    logFunctionHeader("getNetworkPatronBenificiarias (" + _accountKey + ")");
    let accountBenificiarias = await getNetworkPatronBenificiarias(_accountKey);
    return JSON.stringify(accountBenificiarias, null, 2);
}

getNetworkAccountKYC = async(_accountKey) => {
    logFunctionHeader("getNetworkAccountKYC (" + _accountKey + ")");
    let accountKYC = await getNetworkAccountKYC(_accountKey);
    return JSON.stringify(accountKYC, null, 2);
}

getNetworkBenificiaryAgents = async(_accountKey, _benificiaryKey) => {
    logFunctionHeader("getNetworkBenificiaryAgents (" + _accountKey + ", " + _benificiaryKey + ")");
    let benificiaryAgents = await getNetworkBenificiaryAgents(_accountKey, _benificiaryKey);
    return JSON.stringify(benificiaryAgents, null, 2);
}

module.exports = {
// Local Calls
    printTestHHAccounts,
    printStructureTree,
    printStructurePatronBenificiarias,
    printStructureAccountKYC,
    printStructureBenificiaryAgents,
    getJSONStructurePatronBenificiarias,
    getJSONStructureAccountKYC,
    getJSONStructureBenificiaryAgents,
    // NetWork Calls
    printNetworkPatronBenificiarias,
    printNetworkAccountKYC,
    printNetworkBenificiaryAgents,
    getJSONNetworkPatronBenificiarias,
    getJSONNetworkAccountKYC,
    getJSONNetworkBenificiaryAgents,
    getNetworkPatronBenificiarias,
    getNetworkAccountKYC,
    getNetworkBenificiaryAgents
}