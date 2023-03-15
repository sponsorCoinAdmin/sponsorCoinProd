const { expect } = require("chai");

const {} = require("./prod/lib/loadTreeStructures");

const {
  addTestNetworkPatreonSponsor,
  addTestNetworkPatreonSponsors,
  addTestNetworkSponsorAgents,
  addTestNetworkAccount,
  deleteTestPatreonSponsor,
  deletePatreonSponsors,
  getTestHHAccountArrayKeys,
  getTestHHAccountKey,
} = require("./testMethods/scTestMethods");

const { testHHAccounts } = require("./testMethods/hhTestAccounts");

const { setCreateContract } = require("./prod/lib/scAccountMethods");

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
    setCreateContract(spCoinContractDeployed);
    setDeleteContract(spCoinContractDeployed);
  });

  /**

  it("PRINT STRUCTURE TREE TESTS", async function () {

    // Add Single Accounts Examples
    // USAGE: addTestNetworkAccounts([Account1, Account2, ... AccountN]);
    await addTestNetworkAccount(0);
    await addTestNetworkAccount(1);
    await addTestNetworkAccount(7);

    // Add multiple Accounts Example
    // USAGE: addTestNetworkAccounts([Account1, Account2, ... AccountN]);
    await addTestNetworkAccounts([0, 1, 2]);

    // Add Patreon Account with multiple Sponsors Examples
    // USAGE: addTestNetworkPatreonSponsors(_accountRecIdx, _startSpIdx, _lastSpIdx);
    await addTestNetworkPatreonSponsors(0, [1]);
    await addTestNetworkPatreonSponsors(0, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    await addTestNetworkPatreonSponsors(2, [12]);
    await addTestNetworkPatreonSponsors(3, [14, 17]);
    await addTestNetworkPatreonSponsors(1, [5, 11, 13, 15]);
    await addTestNetworkPatreonSponsors(14, [18, 19, 7]);
    await addTestNetworkPatreonSponsors(3, [4]);
    await addTestNetworkPatreonSponsors(1, [2, 5]);
    await addTestNetworkPatreonSponsors(11, [5, 9, 0]);

    // Add Patreon Account with Sponsor and multiple Agents Examples
    // USAGE: addNetworkSponsorAgents(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
    await addTestNetworkSponsorAgents(0, 1, [2, 3, 4, 5, 6, 7, 8, 9]);
    await addTestNetworkSponsorAgents(11, 18, [5, 7, 9, 6]);
    await addTestNetworkSponsorAgents(0, 2, [6, 7, 16]);
    await addTestNetworkSponsorAgents(14, 6, [1]);
    await addTestNetworkSponsorAgents(14, 0, [1, 11, 5, 12, 2]);
    await addTestNetworkSponsorAgents(0, 1, [2, 3]);
    await addTestNetworkSponsorAgents(3, 4, [5]);

    let accountArr = await loadTreeStructures(spCoinContractDeployed);

    logAccountStructure(accountArr);
  });

  /**/
  
  it("VALIDATE THAT ACCOUNTS, PATRIOT/SPONSOR/AGENT, ARE ALL MUTUALLY EXCLUSIVE", async function () {
    setLogMode(LOG_MODE.LOG, true);

    // Test Successful Record Insertion of Patreon and 
    // Sponsor Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are Successfully mutually exclusive.
    await addTestNetworkSponsorAgents(0, 1, [2]);
    await addTestNetworkSponsorAgents(0, 3, [2]);
    let accountArr = await loadTreeStructures(spCoinContractDeployed);
    logAccountStructure(accountArr);
    await deleteTestPatreonSponsor(0, 1);
    log("*************************** AFTER Un-Sponsor ***************************");

    // START WIP
//  sponsorChildAgentKeys = await getAccountAgentKeys(sponsorKey);
    // END WIP

    accountArr = await loadTreeStructures(spCoinContractDeployed);
    logAccountStructure(accountArr);
  });
 /**/
});
