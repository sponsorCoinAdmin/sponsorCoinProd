const { expect } = require("chai");
const { LOG_MODE } = require("../prod/lib/utils/logging");
const { TEST_HH_ACCOUNT_LIST } = require("./testMethods/hhTestAccounts");
const { } = require("../prod/lib/spCoinAddMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("../prod/lib/spCoinAddMethods");
const { } = require("./deployContract");
const { } = require("./testMethods/scTestMethods");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deploySpCoinContract();
  });

  /**/

  it("PRINT STRUCTURE TREE TESTS", async function () {
    // USAGE: addTestNetworkPatronBenificiarias(_accountRecIdx, _startSpIdx, _lastSpIdx);
    await addTestNetworkPatronBenificiarias(2, [1, 7, 14, 8, 18, 9]);
    await addTestNetworkPatronBenificiarias(2, [12]);
    await addTestNetworkPatronBenificiarias(3, [14, 17]);
    await addTestNetworkPatronBenificiarias(1, [5, 11, 13, 15]);
    await addTestNetworkPatronBenificiarias(14, [18, 19, 7]);
    await addTestNetworkPatronBenificiarias(3, [4]);
    await addTestNetworkPatronBenificiarias(1, [2, 5]);
    await addTestNetworkPatronBenificiarias(11, [5, 9, 0]);

    // USAGE: addNetworkBenificiaryAgents(_accountRecIdx, _benificiaryRecIdx, _startAgIdx, _lastAgIdx);
    await addTestNetworkBenificiaryAgents(1, 5, 10, [7, 2, 17, 3, 9, 19]);
    await addTestNetworkBenificiaryAgents(11, 18, 10, [5, 7, 9, 6]);
    await addTestNetworkBenificiaryAgents(0, 2, 10, [6, 7, 16]);
    await addTestNetworkBenificiaryAgents(14, 6, 10, [1]);
    await addTestNetworkBenificiaryAgents(14, 0, 10, [1, 11, 5, 12, 2]);
    await addTestNetworkBenificiaryAgents(0, 1, 10, [2, 3]);
    await addTestNetworkBenificiaryAgents(3, 4, 10, [5]);

    await addTestNetworkBenificiaryAgents(0, 1, 10, [3,4,5,6]);
    await addTestNetworkBenificiaryAgents(2, 1, 10, [4]);
    await addTestNetworkBenificiaryAgents(0, 1, 10, [2,3,4]);
    await addTestNetworkBenificiaryAgents(1, 0, 10, [4]);

    await logJSONTree();

  });

  /**/
  
  it("VALIDATE THAT ACCOUNTS, PATRIOT/BENIFICIARY/AGENT, ARE ALL MUTUALLY EXCLUSIVE", async function () {
    setLogMode(LOG_MODE.LOG, true);
    let expectedErrMsg;

    // Test Successful Record Insertion of Patron and 
    // Benificiary Accounts to the Blockchain Network.
    // Account, Benificiary and/or Agent are Successfully mutually exclusive.
    await addTestNetworkPatronBenificiarias(4, [3]);

    // Test Un-Successful Record Insertion of Patron
    // and Agent Accounts to the Blockchain Network.
    // Account and Benificiary are not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey and _benificiaryKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkPatronBenificiarias(4, [4]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion of Patron,
    // Benificiary and Agent Accounts to the Blockchain Network.
    // Account, Benificiary and/or Agent are not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _benificiaryKey and _agentKey must be Mutually Exclusive)'"
    try {
      await addTestNetworkBenificiaryAgents(6, 6, 10, [1]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Successful Record Insertion of Patron,
    // Benificiary and Agent to the Blockchain Network.
    // Patron, Benificiary and/or Agent Accounts are
    // Successfully mutually exclusive.
    await addTestNetworkBenificiaryAgents(14, 6, 10, [1]);

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Patron and Benificiary Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _benificiaryKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkBenificiaryAgents(6, 6, 10, [1]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Patron and Agent Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _benificiaryKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkBenificiaryAgents(6, 5, 10, [6]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Benificiary and Agent Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _benificiaryKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkBenificiaryAgents(5, 6, 10, [6]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }
  });

  /**/
  
    it("PRINT STRUCTURE ACCOUNT DATA RECORD", async function () {
    setLogMode(LOG_MODE.LOG, true);
    // Test Record Insertion to Blockchain Network
    let accountKey = await addTestNetworkAccount(0);
    let AccountListize = (await getAccountListize()).toNumber();
    expect(AccountListize).to.equal(1);

    // Test Record Structure Read from Blockchain Network
    let accountStruct = await getAccountRecord(accountKey);
    logJSON(accountStruct);
    let networkAccountKey = accountStruct.accountKey;
    expect(networkAccountKey).to.equal(accountKey);

    // Test Duplicate Record Cannot be Inserted to Blockchain Network
    accountKey = await addTestNetworkAccount(0);
    AccountListize = (await getAccountListize()).toNumber();
    expect(AccountListize).to.equal(1);

    // Test Second Record Insertion to blockchain Network
    accountKey = await addTestNetworkAccount(4);
    AccountListize = (await getAccountListize()).toNumber();
    expect(AccountListize).to.equal(2);

    // Test N Record Insertions to blockchain Network
    accountKey = await addTestNetworkAccount(7);
    accountKey = await addTestNetworkAccount(6);
    accountKey = await addTestNetworkAccount(12);
    accountKey = await addTestNetworkAccount(15);
    AccountListize = (await getAccountListize()).toNumber();
    expect(AccountListize).to.equal(6);
  });

  /**/
  
  it("PRINT STRUCTURE BENIFICIARYS DATA RECORD", async function () {
    setLogMode(LOG_MODE.LOG, true);
    setLogMode(LOG_MODE.LOG_TREE, true);

    // Test Record Insertions to Blockchain Network
    let arrayKey = await addTestNetworkPatronBenificiarias(14, [3, 2]);
    arrayKey = await addTestNetworkPatronBenificiarias(13, [3]);
  
    let AccountListize = (await getAccountListize()).toNumber();
    expect(AccountListize).to.equal(4);

    let accountArr = await getAccountRecords();
    logJSON(accountArr);

    // Test That Patron at Idx 3 has 2 Record Benificiarias in the blockchain and
    // Validate they are the correct ones in the Patron Structure
    // Read from Blockchain Network
    let recipientKey = getTestHHAccountKey(3);

    let accountStruct = await getAccountRecord(recipientKey);
    logJSON(accountStruct);
    // let networkAccountKey = accountStruct.accountKey;
    // expect(networkAccountKey).to.equal(arrayKey);
  });

  /**/

  it("PRINT ACCOUNT BENIFICIARY ARRAY LISTS", async function () {
    setLogMode(LOG_MODE.LOG, true);
    setLogMode(LOG_MODE.LOG_TREE, true);
    let testAccountKey = 2;
    let accountKey = TEST_HH_ACCOUNT_LIST[testAccountKey];
    let testBenificiaryListKeys = [1, 7, 14, 8, 18, 9];
  
    await addTestNetworkPatronBenificiarias(testAccountKey, testBenificiaryListKeys);
    log("Tree For Account Key: " + accountKey + " With Inserted Benificiarias:");
    await logJSONTree();

    AccountListize = (await getAccountListize()).toNumber();
    expect(AccountListize).to.equal(7);

    let benificiarySize = (await getAccountBenificiaryKeySize(accountKey));
    expect(benificiarySize).to.equal(6);

    let benificiaryRecordList = await getAccountBenificiaryKeys(accountKey);

    logJSON(benificiaryRecordList);
    let benificiaryRecordListLength = Object.keys(benificiaryRecordList).length;
    expect(benificiaryRecordListLength).to.equal(6);

    getAccountBenificiaryKeys();
  });
  /**/
});
