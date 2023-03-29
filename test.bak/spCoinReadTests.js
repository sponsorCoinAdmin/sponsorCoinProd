const { expect } = require("chai");
const { LOG_MODE } = require("../prod/lib/utils/logging");
const { TEST_HH_ACCOUNT_LIST } = require("./testMethods/hhTestAccounts");
const {} = require("../prod/lib/spCoinAddMethods");
const { } = require("./testMethods/scTestMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("../prod/lib/spCoinAddMethods");
const { } = require("./deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deploySpCoinContract();
  });

  /**/

  it("PRINT STRUCTURE TREE TESTS", async function () {
    // USAGE: addTestNetworkPatreonSponsors(_accountRecIdx, _startSpIdx, _lastSpIdx);
    await addTestNetworkPatreonSponsors(2, [1, 7, 14, 8, 18, 9]);
    await addTestNetworkPatreonSponsors(2, [12]);
    await addTestNetworkPatreonSponsors(3, [14, 17]);
    await addTestNetworkPatreonSponsors(1, [5, 11, 13, 15]);
    await addTestNetworkPatreonSponsors(14, [18, 19, 7]);
    await addTestNetworkPatreonSponsors(3, [4]);
    await addTestNetworkPatreonSponsors(1, [2, 5]);
    await addTestNetworkPatreonSponsors(11, [5, 9, 0]);

    // USAGE: addNetworkSponsorAgents(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
    await addTestNetworkSponsorAgents(1, 5, [7, 2, 17, 3, 9, 19]);
    await addTestNetworkSponsorAgents(11, 18, [5, 7, 9, 6]);
    await addTestNetworkSponsorAgents(0, 2, [6, 7, 16]);
    await addTestNetworkSponsorAgents(14, 6, [1]);
    await addTestNetworkSponsorAgents(14, 0, [1, 11, 5, 12, 2]);
    await addTestNetworkSponsorAgents(0, 1, [2, 3]);
    await addTestNetworkSponsorAgents(3, 4, [5]);

    await addTestNetworkSponsorAgents(0, 1, [3,4,5,6]);
    await addTestNetworkSponsorAgents(2, 1, [4]);
    await addTestNetworkSponsorAgents(0, 1, [2,3,4]);
    await addTestNetworkSponsorAgents(1, 0, [4]);

    await logJSONTree();

  });

  /**/
  
  it("VALIDATE THAT ACCOUNTS, PATRIOT/SPONSOR/AGENT, ARE ALL MUTUALLY EXCLUSIVE", async function () {
    setLogMode(LOG_MODE.LOG, true);
    let expectedErrMsg;

    // Test Successful Record Insertion of Patreon and 
    // Sponsor Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are Successfully mutually exclusive.
    await addTestNetworkPatreonSponsors(4, [3]);

    // Test Un-Successful Record Insertion of Patreon
    // and Agent Accounts to the Blockchain Network.
    // Account and Sponsor are not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey and _sponsorAccountKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkPatreonSponsors(4, [4]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion of Patreon,
    // Sponsor and Agent Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorAccountKey and _agentAccountKey must be Mutually Exclusive)'"
    try {
      await addTestNetworkSponsorAgents(6, 6, [1]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Successful Record Insertion of Patreon,
    // Sponsor and Agent to the Blockchain Network.
    // Patreon, Sponsor and/or Agent Accounts are
    // Successfully mutually exclusive.
    await addTestNetworkSponsorAgents(14, 6, [1]);

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Patreon and Sponsor Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorAccountKey and _agentAccountKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkSponsorAgents(6, 6, [1]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Patreon and Agent Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorAccountKey and _agentAccountKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkSponsorAgents(6, 5, [6]);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Sponsor and Agent Accounts are Not mutually exclusive.
    expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorAccountKey and _agentAccountKey must be Mutually Exclusive)'";
    try {
      await addTestNetworkSponsorAgents(5, 6, [6]);
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
    let accountKeySize = (await getAccountKeySize()).toNumber();
    expect(accountKeySize).to.equal(1);

    // Test Record Structure Read from Blockchain Network
    let accountStruct = await getAccountRecord(accountKey);
    logJSON(accountStruct);
    let networkAccountKey = accountStruct.accountKey;
    expect(networkAccountKey).to.equal(accountKey);

    // Test Duplicate Record Cannot be Inserted to Blockchain Network
    accountKey = await addTestNetworkAccount(0);
    accountKeySize = (await getAccountKeySize()).toNumber();
    expect(accountKeySize).to.equal(1);

    // Test Second Record Insertion to blockchain Network
    accountKey = await addTestNetworkAccount(4);
    accountKeySize = (await getAccountKeySize()).toNumber();
    expect(accountKeySize).to.equal(2);

    // Test N Record Insertions to blockchain Network
    accountKey = await addTestNetworkAccount(7);
    accountKey = await addTestNetworkAccount(6);
    accountKey = await addTestNetworkAccount(12);
    accountKey = await addTestNetworkAccount(15);
    accountKeySize = (await getAccountKeySize()).toNumber();
    expect(accountKeySize).to.equal(6);
  });

  /**/
  
  it("PRINT STRUCTURE SPONSORS DATA RECORD", async function () {
    setLogMode(LOG_MODE.LOG, true);
    setLogMode(LOG_MODE.LOG_TREE, true);

    // Test Record Insertions to Blockchain Network
    let arrayKey = await addTestNetworkPatreonSponsors(14, [3, 2]);
    arrayKey = await addTestNetworkPatreonSponsors(13, [3]);
  
    let accountKeySize = (await getAccountKeySize()).toNumber();
    expect(accountKeySize).to.equal(4);

    let accountArr = await getAccountRecords(spCoinContractDeployed);
    logJSON(accountArr);

    // Test That Patreon at Idx 3 has 2 Record Sponsors in the blockchain and
    // Validate they are the correct ones in the Patreon Structure
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
  
    await addTestNetworkPatreonSponsors(testAccountKey, testSponsorListKeys);
    log("Tree For Account Key: " + accountKey + " With Inserted Sponsors:");
    await logJSONTree();

    accountKeySize = (await getAccountKeySize()).toNumber();
    expect(accountKeySize).to.equal(7);

    let sponsorSize = (await getAccountSponsorKeySize(accountKey)).toNumber();
    expect(sponsorSize).to.equal(6);

    let accountSponsorRecords = await getAccountSponsorKeys(accountKey);

    logJSON(accountSponsorRecords);
    let accountSponsorRecordsLength = Object.keys(accountSponsorRecords).length;
    expect(accountSponsorRecordsLength).to.equal(6);

    getAccountSponsorKeys();
  });
  /**/
});
