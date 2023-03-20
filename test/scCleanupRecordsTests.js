const { expect } = require("chai");

const {
  setContracts,
  addTestNetworkPatreonSponsor,
  addTestNetworkPatreonSponsors,
  addTestNetworkSponsorAgents,
  addTestNetworkAccount,
  deleteTestPatreonSponsor,
  deleteTestNetworkAccount,
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
  logJSON,
  logSetup,
  logJSONTree,
  setLogDefaults,
  setIndentPrefixLevel,
  setLogMode,
  logTestHeader,
  logFunctionHeader,
  logDetail,
  log,
} = require("./prod/lib/utils/logging");

const { 
  deployContract, 
  loadSpCoinContract 
} = require("./prod/deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    await loadSpCoinContract();
  });

 /**/
  it("VALIDATE CREATE SPONSOR", async function () {
    setLogMode(LOG_MODE.LOG, true);

    // Test Successful Record Insertion of Patreon and 
    // Sponsor Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are Successfully mutually exclusive.
    await addTestNetworkSponsorAgents(0, 1, [2]);
    // await addTestNetworkSponsorAgents(3, 1, [2]);
    accountSize = (await getAccountSize()).toNumber();
    expect(accountSize).to.equal(3);
    await logJSONTree();

    await deleteTestPatreonSponsor(0, 1);
    // await deleteTestPatreonSponsor(0, 3);
    log("*************************** AFTER Un-Sponsor ***************************");

    await logJSONTree();
    // await logTestHHAccountRecord(0);
    // await logTestHHAccountRecord(1);
    // await logTestHHAccountRecord(2);
    // START WIP
    //  sponsorChildAgentKeys = await getAccountAgentKeys(sponsorKey);
    // END WIP

  //  await logJSONTree();
  });
 /**/
});
