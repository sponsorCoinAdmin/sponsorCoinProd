const { expect } = require("chai");
const { } = require("./testMethods/scTestMethods");
const { TEST_HH_ACCOUNT_LIST } = require("./testMethods/hhTestAccounts");
const { } = require("./prod/lib/spCoinReadMethods");
const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("./prod/lib/dataTypes");

const { LOG_MODE } = require("./prod/lib/utils/logging");
const { } = require("./prod/deployContract");
const { 
  TEST_HH_ACCOUNT_KEY_0,
  TEST_HH_ACCOUNT_KEY_1,
  TEST_HH_ACCOUNT_KEY_2,
  TEST_HH_ACCOUNT_KEY_3,
  TEST_HH_ACCOUNT_KEY_4,
  TEST_HH_ACCOUNT_KEY_5,
  TEST_HH_ACCOUNT_KEY_6,
  TEST_HH_ACCOUNT_KEY_7,
  TEST_HH_ACCOUNT_KEY_8,
  TEST_HH_ACCOUNT_KEY_9,
  TEST_HH_ACCOUNT_KEY_10,
  TEST_HH_ACCOUNT_KEY_11,
  TEST_HH_ACCOUNT_KEY_12,
  TEST_HH_ACCOUNT_KEY_13,
  TEST_HH_ACCOUNT_KEY_14,
  TEST_HH_ACCOUNT_KEY_15,
  TEST_HH_ACCOUNT_KEY_16,
  TEST_HH_ACCOUNT_KEY_17,
  TEST_HH_ACCOUNT_KEY_18,
  TEST_HH_ACCOUNT_KEY_19,
 } = require("./testMethods/hhTestAccounts");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    await deploySpCoinContract();
  });

 /**/
  it("VALIDATE CREATE SPONSOR", async function () {
    setLogMode(LOG_MODE.LOG, true);

    // Test Successful Record Insertion of Patreon and 
    // Sponsor Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are Successfully mutually exclusive.
    await addTestNetworkSponsorAgents(0, 1, [2]);
    // await addTestNetworkSponsorAgents(3, 1, [2]);
    accountKeySize = (await getAccountKeySize()).toNumber();
    expect(accountKeySize).to.equal(3);
    await logJSONTree();

  //  let sponsorRecord = await getSponsorRecordByKeys(TEST_HH_ACCOUNT_KEY_0, TEST_HH_ACCOUNT_KEY_1);
  //  logJSON(sponsorRecord);
  //  await deleteTestPatreonSponsor(0, 1);
    // await deleteTestPatreonSponsor(0, 3);
  //  log("*************************** AFTER Un-Sponsor ***************************");
  //  sponsorRecord = await getSponsorRecordByKeys(TEST_HH_ACCOUNT_KEY_0, TEST_HH_ACCOUNT_KEY_1);
  //  logJSON(sponsorRecord);

    // await logJSONTree();
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
