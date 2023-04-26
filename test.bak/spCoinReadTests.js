const { expect } = require("chai");
const { LOG_MODE } = require("../prod/lib/utils/logging");
const { initHHAccounts } = require("../test/testMethods/hhTestAccounts");
const { } = require("../prod/lib/spCoinAddMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("../prod/lib/spCoinAddMethods");
const { } = require("../test/deployContract");
const { } = require("../test/testMethods/scTestMethods");

let spCoinContractDeployed;
let accounts;
let RECIPIENT_ACCOUNT_KEYS;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deploySpCoinContract();
    const hhTestElements = await initHHAccounts();
    accounts = hhTestElements.accounts;
    RECIPIENT_ACCOUNT_KEYS = accounts;
  });

  /**/

  it("PRINT STRUCTURE TREE TESTS", async function () {
    // USAGE: addTestNetworkRecipients(_accountRecIdx, _startSpIdx, _lastSpIdx);
    await addTestNetworkRecipients(2, [1, 7, 14, 8, 18, 9]);
    await addTestNetworkRecipients(2, [12]);
    await addTestNetworkRecipients(3, [14, 17]);
    await addTestNetworkRecipients(1, [5, 11, 13, 15]);
    await addTestNetworkRecipients(14, [18, 19, 7]);
    await addTestNetworkRecipients(3, [4]);
    await addTestNetworkRecipients(1, [2, 5]);

    // USAGE: addNetworkRecipientAgents(_accountRecIdx, _recipientRecIdx, _startAgIdx, _lastAgIdx);
    await addTestNetworkRecipientAgents(5, 10, [7, 2, 17, 3, 9, 19]);
    await addTestNetworkRecipientAgents(18, 10, [5, 7, 9, 6]);
    await addTestNetworkRecipientAgents(2, 10, [6, 7, 16]);
    await addTestNetworkRecipientAgents(6, 10, [1]);
    await addTestNetworkRecipientAgents(1, 10, [2, 3]);
    await addTestNetworkRecipientAgents(4, 10, [5]);

    await addTestNetworkRecipientAgents(1, 10, [3,4,5,6]);
    await addTestNetworkRecipientAgents(1, 10, [4]);
    await addTestNetworkRecipientAgents(1, 10, [2,3,4]);
    await addTestNetworkRecipientAgents(2, 10, [4]);

    await logJSONTree();

  });

  /*
  
  it("VALIDATE THAT ACCOUNTS, RECIPIENT/AGENT, ARE ALL MUTUALLY EXCLUSIVE", async function () {
    setLogMode(LOG_MODE.LOG, true);
    let expectedErrMsg;

    // Test Successful Record Insertion of Sponsor and 
    // Recipient Account to the Blockchain Network.
    // Account, Recipient and/or Agent are Successfully mutually exclusive.
    await addTestNetworkRecipients(4, [3]);

    // Test Un-Successful Record Insertion of Sponsor
    // and Agent Account to the Blockchain Network.
    // Account and Recipient are not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey and _recipientKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkRecipients(4, [4]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion of Sponsor,
    // Recipient and Agent Account to the Blockchain Network.
    // Account, Recipient and/or Agent are not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _recipientKey and _agentKey must be Mutually Exclusive)'"
    try {
      await addTestNetworkRecipientAgents(6, 10, [1]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Successful Record Insertion of Sponsor,
    // Recipient and Agent to the Blockchain Network.
    // Sponsor, Recipient and/or Agent Account are
    // Successfully mutually exclusive.
    await addTestNetworkRecipientAgents(6, 10, [1]);

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Sponsor and Recipient Account are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _recipientKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkRecipientAgents(6, 10, [1]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Sponsor and Agent Account are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _recipientKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkRecipientAgents(5, 10, [6]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Recipient and Agent Account are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _recipientKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkRecipientAgents(6, 10, [6]);
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
    let AccountListSize = (await getAccountListSize());
    expect(AccountListSize).to.equal(1);

    // Test Record Structure Read from Blockchain Network
    let accountStruct = await getAccountRecord(accountKey);
    logJSON(accountStruct);
    let networkAccountKey = accountStruct.accountKey;
    expect(networkAccountKey).to.equal(accountKey);

    // Test Duplicate Record Cannot be Inserted to Blockchain Network
    accountKey = await addTestNetworkAccount(0);
    AccountListSize = (await getAccountListSize());
    expect(AccountListSize).to.equal(1);

    // Test Second Record Insertion to blockchain Network
    accountKey = await addTestNetworkAccount(4);
    AccountListSize = (await getAccountListSize());
    expect(AccountListSize).to.equal(2);

    // Test N Record Insertions to blockchain Network
    accountKey = await addTestNetworkAccount(7);
    accountKey = await addTestNetworkAccount(6);
    accountKey = await addTestNetworkAccount(12);
    accountKey = await addTestNetworkAccount(15);
    AccountListSize = (await getAccountListSize());
    expect(AccountListSize).to.equal(6);
  });

  /**/
  
  it("PRINT STRUCTURE RECIPIENTS DATA RECORD", async function () {
    setLogMode(LOG_MODE.LOG, true);
    setLogMode(LOG_MODE.LOG_TREE, true);

    // Test Record Insertions to Blockchain Network
    let arrayKey = await addTestNetworkRecipients(14, [3, 2]);
    arrayKey = await addTestNetworkRecipients(13, [3]);
  
    let AccountListSize = (await getAccountListSize());
    expect(AccountListSize).to.equal(3);

    let accountArr = await getAccountRecords();
    logJSON(accountArr);

    // Test That Sponsor at Idx 3 has 2 Record Recipient in the blockchain and
    // Validate they are the correct ones in the Sponsor Structure
    // Read from Blockchain Network
    let recipientKey = getTestHHAccountKey(3);

    let accountStruct = await getAccountRecord(recipientKey);
    logJSON(accountStruct);
    // let networkAccountKey = accountStruct.accountKey;
    // expect(networkAccountKey).to.equal(arrayKey);
  });

  /**/

  it("PRINT ACCOUNT RECIPIENT ARRAY LISTS", async function () {
    setLogMode(LOG_MODE.LOG, true);
    setLogMode(LOG_MODE.LOG_TREE, true);
    let testAccountKey = 2;
    let accountKey = accounts[0];
    let recipientListKeys = [RECIPIENT_ACCOUNT_KEYS[3],
    RECIPIENT_ACCOUNT_KEYS[7], RECIPIENT_ACCOUNT_KEYS[14],
    RECIPIENT_ACCOUNT_KEYS[8], RECIPIENT_ACCOUNT_KEYS[18],
    RECIPIENT_ACCOUNT_KEYS[9]];
  
    await addRecipients(accountKey, recipientListKeys);

    log("Tree For Account Key: " + accountKey + " With Inserted Recipient:");
    await logJSONTree();

    AccountListSize = (await getAccountListSize());
    expect(AccountListSize).to.equal(7);

    let recipientSize = (await getRecipientKeySize(accountKey));
    expect(recipientSize).to.equal(6);

    let recipientRecordList = await getAccountRecipientKeys(accountKey);

    logJSON(recipientRecordList);
    let recipientRecordListLength = Object.keys(recipientRecordList).length;
    expect(recipientRecordListLength).to.equal(6);

    getAccountRecipientKeys();
  });
  /**/
});
