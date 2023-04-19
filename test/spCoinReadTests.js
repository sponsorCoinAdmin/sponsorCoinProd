const { expect } = require("chai");
const { LOG_MODE } = require("../prod/lib/utils/logging");
const {
  TEST_HH_ACCOUNT_LIST, TEST_HH_ACCOUNT_KEY_0, TEST_HH_ACCOUNT_KEY_1, TEST_HH_ACCOUNT_KEY_2,
  TEST_HH_ACCOUNT_KEY_3, TEST_HH_ACCOUNT_KEY_4, TEST_HH_ACCOUNT_KEY_5, TEST_HH_ACCOUNT_KEY_6,
  TEST_HH_ACCOUNT_KEY_7, TEST_HH_ACCOUNT_KEY_8, TEST_HH_ACCOUNT_KEY_9, TEST_HH_ACCOUNT_KEY_10,
  TEST_HH_ACCOUNT_KEY_11, TEST_HH_ACCOUNT_KEY_12, TEST_HH_ACCOUNT_KEY_13, TEST_HH_ACCOUNT_KEY_14,
  TEST_HH_ACCOUNT_KEY_15, TEST_HH_ACCOUNT_KEY_16, TEST_HH_ACCOUNT_KEY_17, TEST_HH_ACCOUNT_KEY_18,
  TEST_HH_ACCOUNT_KEY_19, SPONSOR_ACCOUNT_KEY_0,
  SPONSOR_ACCOUNT_KEY_1, SPONSOR_ACCOUNT_KEY_2, SPONSOR_ACCOUNT_KEY_3, SPONSOR_ACCOUNT_KEY_4,
  SPONSOR_ACCOUNT_KEY_5, SPONSOR_ACCOUNT_KEY_6, SPONSOR_ACCOUNT_KEY_7, SPONSOR_ACCOUNT_KEY_8,
  SPONSOR_ACCOUNT_KEY_9, SPONSOR_ACCOUNT_KEY_10,
  RECIPIENT_ACCOUNT_KEY_0, RECIPIENT_ACCOUNT_KEY_1, RECIPIENT_ACCOUNT_KEY_2, RECIPIENT_ACCOUNT_KEY_3,
  RECIPIENT_ACCOUNT_KEY_4, RECIPIENT_ACCOUNT_KEY_5, RECIPIENT_ACCOUNT_KEY_6, RECIPIENT_ACCOUNT_KEY_7,
  RECIPIENT_ACCOUNT_KEY_8, RECIPIENT_ACCOUNT_KEY_9, RECIPIENT_ACCOUNT_KEY_10,
  AGENT_ACCOUNT_KEY_0, AGENT_ACCOUNT_KEY_1, AGENT_ACCOUNT_KEY_2, AGENT_ACCOUNT_KEY_3,
  AGENT_ACCOUNT_KEY_4, AGENT_ACCOUNT_KEY_5, AGENT_ACCOUNT_KEY_6, AGENT_ACCOUNT_KEY_7,
  AGENT_ACCOUNT_KEY_8, AGENT_ACCOUNT_KEY_9, AGENT_ACCOUNT_KEY_10,
  RECIPIENT_RATE_1, RECIPIENT_RATE_2, RECIPIENT_RATE_3, RECIPIENT_RATE_4,
  RECIPIENT_RATE_5, RECIPIENT_RATE_6, RECIPIENT_RATE_7, RECIPIENT_RATE_8,
  RECIPIENT_RATE_9,  RECIPIENT_RATE_10,
  AGENT_RATE_1, AGENT_RATE_2, AGENT_RATE_3, AGENT_RATE_4, AGENT_RATE_5, AGENT_RATE_6,
  AGENT_RATE_7, AGENT_RATE_8, AGENT_RATE_9, AGENT_RATE_10,
  TRANSACTION_QTY_1, TRANSACTION_QTY_2, TRANSACTION_QTY_3, TRANSACTION_QTY_4, TRANSACTION_QTY_5,
  TRANSACTION_QTY_6, TRANSACTION_QTY_7, TRANSACTION_QTY_8, TRANSACTION_QTY_9, TRANSACTION_QTY_10
 } = require("./testMethods/hhTestAccounts");
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
    // USAGE: addTestNetworkSponsorRecipients(_accountRecIdx, _startSpIdx, _lastSpIdx);
    await addTestNetworkSponsorRecipients(2, [1, 7, 14, 8, 18, 9]);
    await addTestNetworkSponsorRecipients(2, [12]);
    await addTestNetworkSponsorRecipients(3, [14, 17]);
    await addTestNetworkSponsorRecipients(1, [5, 11, 13, 15]);
    await addTestNetworkSponsorRecipients(14, [18, 19, 7]);
    await addTestNetworkSponsorRecipients(3, [4]);
    await addTestNetworkSponsorRecipients(1, [2, 5]);

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
    // Recipient Accounts to the Blockchain Network.
    // Account, Recipient and/or Agent are Successfully mutually exclusive.
    await addTestNetworkSponsorRecipients(4, [3]);

    // Test Un-Successful Record Insertion of Sponsor
    // and Agent Accounts to the Blockchain Network.
    // Account and Recipient are not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey and _recipientKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkSponsorRecipients(4, [4]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion of Sponsor,
    // Recipient and Agent Accounts to the Blockchain Network.
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
    // Sponsor, Recipient and/or Agent Accounts are
    // Successfully mutually exclusive.
    await addTestNetworkRecipientAgents(6, 10, [1]);

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Sponsor and Recipient Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _recipientKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkRecipientAgents(6, 10, [1]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Sponsor and Agent Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _recipientKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkRecipientAgents(5, 10, [6]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Recipient and Agent Accounts are Not mutually exclusive.
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
    let arrayKey = await addTestNetworkSponsorRecipients(14, [3, 2]);
    arrayKey = await addTestNetworkSponsorRecipients(13, [3]);
  
    let AccountListSize = (await getAccountListSize());
    expect(AccountListSize).to.equal(3);

    let accountArr = await getAccountRecords();
    logJSON(accountArr);

    // Test That Sponsor at Idx 3 has 2 Record Recipients in the blockchain and
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
    let accountKey = TEST_HH_ACCOUNT_KEY_0;
    let recipientListKeys = [TEST_HH_ACCOUNT_KEY_3,
      TEST_HH_ACCOUNT_KEY_7, TEST_HH_ACCOUNT_KEY_14,
      TEST_HH_ACCOUNT_KEY_8, TEST_HH_ACCOUNT_KEY_18,
      TEST_HH_ACCOUNT_KEY_9];
  
    await addSponsorRecipients(accountKey, recipientListKeys);

    log("Tree For Account Key: " + accountKey + " With Inserted Recipients:");
    await logJSONTree();

    AccountListSize = (await getAccountListSize());
    expect(AccountListSize).to.equal(7);

    let recipientSize = (await getAccountRecipientKeySize(accountKey));
    expect(recipientSize).to.equal(6);

    let recipientRecordList = await getAccountRecipientKeys(accountKey);

    logJSON(recipientRecordList);
    let recipientRecordListLength = Object.keys(recipientRecordList).length;
    expect(recipientRecordListLength).to.equal(6);

    getAccountRecipientKeys();
  });
  /**/
});
