const { expect } = require("chai");
const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("../prod/lib/spCoinDataTypes");
const {
  TEST_HH_ACCOUNT_LIST,
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
const { LOG_MODE, LOG, setLogMode, log } = require("../prod/lib/utils/logging");
const { } = require("./testMethods/scTestMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("../test/deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    await deploySpCoinContract();
  });

 /**
  it("VALIDATE CREATE/DELETE SPONSOR", async function () {
    setLogMode(LOG, true);
    let PATREON_ACCOUNT_KEY = TEST_HH_ACCOUNT_KEY_0;
    let SPONSOR_ACCOUNT_KEY = TEST_HH_ACCOUNT_KEY_1;
    let AGENT_ACCOUNT_KEY = TEST_HH_ACCOUNT_KEY_2;

    // Test Successful Record Insertion of Patreon and 
    // Sponsor Accounts to the Blockchain Network.
    // Account, Sponsor and/or Agent are Successfully mutually exclusive.
    await addSponsorAgents(
      PATREON_ACCOUNT_KEY, SPONSOR_ACCOUNT_KEY, [AGENT_ACCOUNT_KEY]);
    // await addTestNetworkSponsorAgents(3, 1, [2]);
    accountKeySize = (await getAccountKeySize()).toNumber();
    expect(accountKeySize).to.equal(3);
    await logJSONTree();

    // VALIDATE ACCOUNT CREATION
    // VALIDATE PATREON ACCOUNT
    let patreonAccountRecord = await getAccountRecord(PATREON_ACCOUNT_KEY);
    // logJSON(patreonAccountRecord);
    expect(patreonAccountRecord.accountKey).to.equal(PATREON_ACCOUNT_KEY);
    expect(patreonAccountRecord.accountSponsorKeys[0]).to.equal(SPONSOR_ACCOUNT_KEY);
    expect(patreonAccountRecord.accountPatreonKeys.length).to.equal(0);
    expect(patreonAccountRecord.accountAgentKeys.length).to.equal(0);
    expect(patreonAccountRecord.accountSponsorRecords.length).to.equal(1);
  // VALIDATE NESTED SPONSOR RECORD
    let sponsorNestedRecord = await getSponsorRecordByKeys(PATREON_ACCOUNT_KEY, SPONSOR_ACCOUNT_KEY);
    // logJSON(sponsorNestedRecord);
    expect(sponsorNestedRecord.sponsorAccountKey).to.equal(SPONSOR_ACCOUNT_KEY);
    expect(sponsorNestedRecord.accountAgentKeys[0]).to.equal(AGENT_ACCOUNT_KEY);
    // VALIDATE SPONSOR ACCOUNT
    let sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_KEY);
    // logJSON(sponsorAccount);
    expect(sponsorAccount.accountKey).to.equal(SPONSOR_ACCOUNT_KEY);
    expect(sponsorAccount.accountPatreonKeys[0]).to.equal(PATREON_ACCOUNT_KEY);
    expect(sponsorAccount.accountAgentKeys[0]).to.equal(AGENT_ACCOUNT_KEY);
    expect(sponsorAccount.accountSponsorKeys.length).to.equal(0);
    expect(sponsorAccount.accountSponsorRecords.length).to.equal(0);
    // VALIDATE AGENT RECORD
    let agentNestedRecord = await getAgentRecordByKeys(PATREON_ACCOUNT_KEY, SPONSOR_ACCOUNT_KEY, AGENT_ACCOUNT_KEY);
    expect(agentNestedRecord.agentAccountKey).to.equal(AGENT_ACCOUNT_KEY);
    // VALIDATE AGENT ACCOUNT
    let agentAccount = await getAccountRecord(AGENT_ACCOUNT_KEY);
//    logJSON(agentAccount);
    expect(agentAccount.accountKey).to.equal(AGENT_ACCOUNT_KEY);
    expect(agentAccount.accountAgentKeys.length).to.equal(0);
    expect(agentAccount.accountPatreonKeys.length).to.equal(0);
    expect(agentAccount.accountSponsorKeys.length).to.equal(0);
    expect(agentAccount.accountSponsorRecords.length).to.equal(0);

    log("*** PATREON/SPONSOR/AGENT CREATION SUCCESS ***");

  // VALIDATE PATREON UN-SPONSORING
  await deletePatreonSponsorRecord(PATREON_ACCOUNT_KEY, SPONSOR_ACCOUNT_KEY);
  await logJSONTree();
  patreonAccountRecord = await getAccountRecord(PATREON_ACCOUNT_KEY);
  sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_KEY);
  agentAccount = await getAccountRecord(AGENT_ACCOUNT_KEY);

  expect(patreonAccountRecord.accountAgentKeys.length).to.equal(0);
  expect(patreonAccountRecord.accountPatreonKeys.length).to.equal(0);
  expect(patreonAccountRecord.accountSponsorKeys.length).to.equal(0);
  expect(patreonAccountRecord.accountSponsorRecords.length).to.equal(0);

  expect(sponsorAccount.accountPatreonKeys.length).to.equal(0);
  expect(sponsorAccount.accountSponsorKeys.length).to.equal(0);
  expect(sponsorAccount.accountSponsorRecords.length).to.equal(0);

  expect(agentAccount.accountPatreonKeys.length).to.equal(0);
  expect(agentAccount.accountSponsorKeys.length).to.equal(0);
  expect(agentAccount.accountAgentKeys.length).to.equal(0);
  expect(agentAccount.accountSponsorRecords.length).to.equal(0);

  });
 /**/

 it("VALIDATE ADD TRANSACTION RATES", async function () {
  setLogMode(LOG, true);
  let PATREON_ACCOUNT_KEY = TEST_HH_ACCOUNT_KEY_0;
  let SPONSOR_ACCOUNT_KEY = TEST_HH_ACCOUNT_KEY_1;
  let AGENT_ACCOUNT_KEY = TEST_HH_ACCOUNT_KEY_2;
  let AGENT_RATE = 2;
  let TRANSACTION_QTY = 10;

  // Test Successful Record Insertion of Patreon and 
  // Sponsor Accounts to the Blockchain Network.
  // Account, Sponsor and/or Agent are Successfully mutually exclusive.
  await addAgentRateTransaction(
    PATREON_ACCOUNT_KEY,
    SPONSOR_ACCOUNT_KEY,
    AGENT_ACCOUNT_KEY,
    AGENT_RATE,
    TRANSACTION_QTY
    );
    accountKeySize = (await getAccountKeySize()).toNumber();
    expect(accountKeySize).to.equal(3);
    await logJSONTree();
    // VALIDATE ACCOUNT CREATION
    // VALIDATE PATREON ACCOUNT
    let patreonAccountRecord = await getAccountRecord(PATREON_ACCOUNT_KEY);
    // logJSON(patreonAccountRecord);
  });
/**/
});
