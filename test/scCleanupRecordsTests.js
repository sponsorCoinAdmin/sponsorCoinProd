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
  getTestHHAccountListKeys,
  getTestHHAccountKey,
} = require("./testMethods/scTestMethods");

const { TEST_HH_ACCOUNT_LIST } = require("./testMethods/hhTestAccounts");

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

const { 
  TEST_ACCOUNT_0,
  TEST_ACCOUNT_1,
  TEST_ACCOUNT_2,
  TEST_ACCOUNT_3,
  TEST_ACCOUNT_4,
  TEST_ACCOUNT_5,
  TEST_ACCOUNT_6,
  TEST_ACCOUNT_7,
  TEST_ACCOUNT_8,
  TEST_ACCOUNT_9,
  TEST_ACCOUNT_10,
  TEST_ACCOUNT_11,
  TEST_ACCOUNT_12,
  TEST_ACCOUNT_13,
  TEST_ACCOUNT_14,
  TEST_ACCOUNT_15,
  TEST_ACCOUNT_16,
  TEST_ACCOUNT_17,
  TEST_ACCOUNT_18,
  TEST_ACCOUNT_19,
 } = require("./testMethods/hhTestAccounts");

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
    accountListSize = (await getAccountListSize()).toNumber();
    expect(accountListSize).to.equal(3);
    await logJSONTree();

    let sponsorRecord = await loadSponsorRecordByKeys(TEST_ACCOUNT_0, TEST_ACCOUNT_1);

    await deleteTestPatreonSponsor(0, 1);
    // await deleteTestPatreonSponsor(0, 3);
    log("*************************** AFTER Un-Sponsor ***************************");

    await logJSONTree();
    // await logTestHHAccountRecord(0);
    // await logTestHHAccountRecord(1);
    // await logTestHHAccountRecord(2);
    // START WIP
    //  sponsorAgentKeys = await getAccountAgentKeys(sponsorKey);
    // END WIP

    //  await logJSONTree();
  });
 /**/
});
