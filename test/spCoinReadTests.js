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
    // USAGE: addTestNetworkPatronSponsors(_accountRecIdx, _startSpIdx, _lastSpIdx);
    await addTestNetworkPatronSponsors(2, [1, 7, 14, 8, 18, 9]);
    await addTestNetworkPatronSponsors(2, [12]);
    await addTestNetworkPatronSponsors(3, [14, 17]);
    await addTestNetworkPatronSponsors(1, [5, 11, 13, 15]);
    await addTestNetworkPatronSponsors(14, [18, 19, 7]);
    await addTestNetworkPatronSponsors(3, [4]);
    await addTestNetworkPatronSponsors(1, [2, 5]);
    await addTestNetworkPatronSponsors(11, [5, 9, 0]);

    // USAGE: addNetworkSponsorAgents(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
    await addTestNetworkSponsorAgents(1, 5, 10, [7, 2, 17, 3, 9, 19]);
    await addTestNetworkSponsorAgents(11, 18, 10, [5, 7, 9, 6]);
    await addTestNetworkSponsorAgents(0, 2, 10, [6, 7, 16]);
    await addTestNetworkSponsorAgents(14, 6, 10, [1]);
    await addTestNetworkSponsorAgents(14, 0, 10, [1, 11, 5, 12, 2]);
    await addTestNetworkSponsorAgents(0, 1, 10, [2, 3]);
    await addTestNetworkSponsorAgents(3, 4, 10, [5]);

    await addTestNetworkSponsorAgents(0, 1, 10, [3,4,5,6]);
    await addTestNetworkSponsorAgents(2, 1, 10, [4]);
    await addTestNetworkSponsorAgents(0, 1, 10, [2,3,4]);
    await addTestNetworkSponsorAgents(1, 0, 10, [4]);

    await logJSONTree();

  });

  /**/
  
  it("VALIDATE THAT ACCOUNTS, PATRIOT/SPONSOR/AGENT, ARE ALL MUTUALLY EXCLUSIVE", async function () {
    setLogMode(LOG_MODE.LOG, true);
    let expectedErrMsg;

    // Test Successful Record Insertion of Patron and 
    // Sponsor Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are Successfully mutually exclusive.
    await addTestNetworkPatronSponsors(4, [3]);

    // Test Un-Successful Record Insertion of Patron
    // and Agent Accounts to the Blockchain Network.
    // Account and Sponsor are not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey and _sponsorKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkPatronSponsors(4, [4]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion of Patron,
    // Sponsor and Agent Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorKey and _agentKey must be Mutually Exclusive)'"
    try {
      await addTestNetworkSponsorAgents(6, 6, 10, [1]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Successful Record Insertion of Patron,
    // Sponsor and Agent to the Blockchain Network.
    // Patron, Sponsor and/or Agent Accounts are
    // Successfully mutually exclusive.
    await addTestNetworkSponsorAgents(14, 6, 10, [1]);

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Patron and Sponsor Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkSponsorAgents(6, 6, 10, [1]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Patron and Agent Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkSponsorAgents(6, 5, 10, [6]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Sponsor and Agent Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorKey and _agentKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkSponsorAgents(5, 6, 10, [6]);
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
  
  it("PRINT STRUCTURE SPONSORS DATA RECORD", async function () {
    setLogMode(LOG_MODE.LOG, true);
    setLogMode(LOG_MODE.LOG_TREE, true);

    // Test Record Insertions to Blockchain Network
    let arrayKey = await addTestNetworkPatronSponsors(14, [3, 2]);
    arrayKey = await addTestNetworkPatronSponsors(13, [3]);
  
    let AccountListize = (await getAccountListize()).toNumber();
    expect(AccountListize).to.equal(4);

    let accountArr = await getAccountRecords();
    logJSON(accountArr);

    // Test That Patron at Idx 3 has 2 Record Sponsors in the blockchain and
    // Validate they are the correct ones in the Patron Structure
    // Read from Blockchain Network
    let recipientKey = getTestHHAccountKey(3);

    let accountStruct = await getAccountRecord(recipientKey);
    logJSON(accountStruct);
    // let networkAccountKey = accountStruct.accountKey;
    // expect(networkAccountKey).to.equal(arrayKey);
  });

  /**/

  it("PRINT ACCOUNT SPONSOR ARRAY LISTS", async function () {
    setLogMode(LOG_MODE.LOG, true);
    setLogMode(LOG_MODE.LOG_TREE, true);
    let testAccountKey = 2;
    let accountKey = TEST_HH_ACCOUNT_LIST[testAccountKey];
    let testSponsorListKeys = [1, 7, 14, 8, 18, 9];
  
    await addTestNetworkPatronSponsors(testAccountKey, testSponsorListKeys);
    log("Tree For Account Key: " + accountKey + " With Inserted Sponsors:");
    await logJSONTree();

    AccountListize = (await getAccountListize()).toNumber();
    expect(AccountListize).to.equal(7);

    let sponsorSize = (await getAccountSponsorKeySize(accountKey));
    expect(sponsorSize).to.equal(6);

    let sponsorRecordList = await getAccountSponsorKeys(accountKey);

    logJSON(sponsorRecordList);
    let sponsorRecordListLength = Object.keys(sponsorRecordList).length;
    expect(sponsorRecordListLength).to.equal(6);

    getAccountSponsorKeys();
  });
  /**/
});
