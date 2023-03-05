const { expect } = require("chai");

const {} = require("./prod/lib/loadTreeStructures");

const {
  addTestNetworkAccountSponsors,
  addTestNetworkSponsorAgents,
  addTestNetworkAccount,
  getTestHHAccountArrayKeys,
} = require("./testMethods/scTestMethods");
const { testHHAccounts } = require("./testMethods/hhTestAccounts");

const { setContract } = require("./prod/lib/scAccountMethods");

const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("./prod/lib/dataTypes");

const {
  LOG_MODE,
  logAccountStructure,
  logSetup,
  setLogDefaults,
  setIndentPrefixLevel,
  setLogMode,
  logTestHeader,
  logFunctionHeader,
  logDetail,
  log,
} = require("./prod/lib/utils/logging");

const { deployContract } = require("./prod/deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deployContract();
    setContract(spCoinContractDeployed);
  });

  /**/

  it("PRINT STRUCTURE TREE TESTS", async function () {
    // USAGE: addTestNetworkAccountSponsors(_accountRecIdx, _startSpIdx, _lastSpIdx);
    // await addTestNetworkAccountSponsors(2, [1, 7, 14, 8, 18, 9]);
    // await addTestNetworkAccountSponsors(2, [12]);
    // await addTestNetworkAccountSponsors(3, [14, 17]);
    // await addTestNetworkAccountSponsors(1, [5, 11, 13, 15]);
    // await addTestNetworkAccountSponsors(14, [18, 19, 7]);
    // await addTestNetworkAccountSponsors(3, [4]);
    // await addTestNetworkAccountSponsors(1, [2, 5]);
    // await addTestNetworkAccountSponsors(11, [5, 9, 0]);

    // // USAGE: addNetworkSponsorAgents(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
    // await addTestNetworkSponsorAgents(1, 5, [7, 2, 17, 3, 9, 19]);
    // await addTestNetworkSponsorAgents(11, 18, [5, 7, 9, 6]);
    // await addTestNetworkSponsorAgents(0, 2, [6, 7, 16]);
    // await addTestNetworkSponsorAgents(14, 6, [1]);
    // await addTestNetworkSponsorAgents(14, 0, [1, 11, 5, 12, 2]);
    // await addTestNetworkSponsorAgents(0, 1, [2, 3]);
    // await addTestNetworkSponsorAgents(3, 4, [5]);

    await addTestNetworkSponsorAgents(0, 1, [3]);
    await addTestNetworkSponsorAgents(2, 1, [4]);

    let accountArr = await loadTreeStructures(spCoinContractDeployed);

    logAccountStructure(accountArr);
    //    logTree(accountArr);
  });

  /**
  
  it("VALIDATE THAT ACCOUNTS, PATRIOT/SPONSOR/AGENT, ARE ALL MUTUALLY EXCLUSIVE", async function () {
    setLogMode(LOG_MODE.LOG, true);
    let expectedErrMsg;

    // Test Successful Record Insertion of Patreon and 
    // Sponsor Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are Successfully mutually exclusive.
    await addTestNetworkAccountSponsors(4, [3]);

    // Test Un-Successful Record Insertion of Patreon
    // and Agent Accounts to the Blockchain Network.
    // Account and Sponsor are not mutually exclusive.
    try {
      await addTestNetworkAccountSponsors(4, [4]);
      throw new Error("Trace point 0. Should have thrown an error");
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey and _sponsorAccountKey must be Mutually Exclusive)'";
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion of Patreon,
    // Sponsor and Agent Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are not mutually exclusive.
    try {
      await addTestNetworkSponsorAgents(6, 6, [1]);
      throw new Error("Trace point 1. Should have thrown an error");
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorAccountKey and _agentAccountKey must be Mutually Exclusive)'"
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Successful Record Insertion of Patreon,
    // Sponsor and Agent to the Blockchain Network.
    // Patreon, Sponsor and/or Agent Accounts are
    // Successfully mutually exclusive.
    await addTestNetworkSponsorAgents(14, 6, [1]);

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Patreon and Sponsor Accounts are Not mutually exclusive.
    try {
      await addTestNetworkSponsorAgents(6, 6, [1]);
      throw new Error("Trace point 2. Should have thrown an error");
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorAccountKey and _agentAccountKey must be Mutually Exclusive)'";
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Patreon and Agent Accounts are Not mutually exclusive.
    try {
      await addTestNetworkSponsorAgents(6, 5, [6]);
      throw new Error("Trace point 3. Should have thrown an error");
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorAccountKey and _agentAccountKey must be Mutually Exclusive)'";
      expect(err.message).to.equal(expectedErrMsg);
    }

    // Test Un-Successful Record Insertion to Blockchain Network.
    // Sponsor and Agent Accounts are Not mutually exclusive.
    try {
      await addTestNetworkSponsorAgents(5, 6, [6]);
      throw new Error("Trace point 4. Should have thrown an error");
    } catch (err) {
      // console.log ("err.message = " + err.message);
      expectedErrMsg = "VM Exception while processing transaction: reverted with reason string '_accountKey, _sponsorAccountKey and _agentAccountKey must be Mutually Exclusive)'";
      expect(err.message).to.equal(expectedErrMsg);
    }
  });

  /**
  
    it("PRINT STRUCTURE ACCOUNT DATA RECORD", async function () {
    setLogMode(LOG_MODE.LOG, true);
    // Test Record Insertion to Blockchain Network
    let accountKey = await addTestNetworkAccount(0);
    let accountRecCount = await getAccountCount();
    expect(accountRecCount).to.equal(1);

    // Test Record Structure Read from Blockchain Network
    let accountStruct = await getAccountRecord(accountKey);
    logAccountStructure(accountStruct);
    let networkAccountKey = accountStruct.accountKey;
    expect(networkAccountKey).to.equal(accountKey);

    // Test Duplicate Record Cannot be Inserted to Blockchain Network
    accountKey = await addTestNetworkAccount(0);
    accountRecCount = await getAccountCount();
    expect(accountRecCount).to.equal(1);

    // Test Second Record Insertion to blockchain Network
    accountKey = await addTestNetworkAccount(4);
    accountRecCount = await getAccountCount();
    expect(accountRecCount).to.equal(2);

    // Test N Record Insertions to blockchain Network
    accountKey = await addTestNetworkAccount(7);
    accountKey = await addTestNetworkAccount(6);
    accountKey = await addTestNetworkAccount(12);
    accountKey = await addTestNetworkAccount(15);
    accountRecCount = await getAccountCount();
    expect(accountRecCount).to.equal(6);
  });

  /**
  
  it("PRINT STRUCTURE SPONSORS DATA RECORD", async function () {
    setLogMode(LOG_MODE.LOG, true);
    setLogMode(LOG_MODE.LOG_TREE, true);

    // Test Record Insertions to Blockchain Network
    let arrayKey = await addTestNetworkAccountSponsors(14, [3, 2]);
    arrayKey = await addTestNetworkAccountSponsors(13, [3]);
  
    let accountRecCount = await getAccountCount();
    expect(accountRecCount).to.equal(4);

    let accountArr = await loadTreeStructures(spCoinContractDeployed);
    logTree(accountArr);

    // Test That Benefactor at Idx 3 has 2 Record Sponsors in the blockchain and
    // Validate they are the correct ones in the Benefactor Structure
    // Read from Blockchain Network
    let recipientKey = testHHAccounts[3].toLowerCase();

    let accountStruct = await getAccountRecord(recipientKey);
    logTree(accountStruct);
    // let networkAccountKey = accountStruct.accountKey;
    // expect(networkAccountKey).to.equal(arrayKey);
  });

  /**

  it("PRINT ACCOUNT SPONSOR ARRAY LISTS", async function () {
    setLogMode(LOG_MODE.LOG, true);
    setLogMode(LOG_MODE.LOG_TREE, true);
    let testAccountKey = 2;
    let accountKey = testHHAccounts[testAccountKey];
    let testSponsorArrayKeys = [1, 7, 14, 8, 18, 9];
  
    await addTestNetworkAccountSponsors(testAccountKey, testSponsorArrayKeys);
    let accountArr = await loadTreeStructures(spCoinContractDeployed);

    log("Tree For Account Key: " + accountKey + " With Inserted Sponsors:");
    logTree(accountArr);

    accountRecCount = await getAccountCount();
    expect(accountRecCount).to.equal(7);

    let sponsorCount = await getAccountSponsorCount(accountKey);
    expect(sponsorCount).to.equal(6);

    let accountSponsorObjects = await getAccountSponsorKeys(accountKey);

    logTree(accountSponsorObjects);
    let accountSponsorObjectsLength = Object.keys(accountSponsorObjects).length;
    expect(accountSponsorObjectsLength).to.equal(6);

    getAccountSponsorKeys();
  });
  /**/
});
