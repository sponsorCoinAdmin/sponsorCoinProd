const { expect } = require("chai");
const {
  AccountStruct,
  RecipientStruct,
  AgentStruct,
  AgentRateStruct,
  TransactionStruct,
} = require("../prod/lib/spCoinDataTypes");
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
const { LOG_MODE, LOG, setLogMode, log, logJSON } = require("../prod/lib/utils/logging");
const { } = require("../test/testMethods/scTestMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("../test/deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    await deploySpCoinContract();
  });

it("1 VALIDATE ADD TRANSACTION RATES", async function () {
  setLogMode("LOG", true);

  // Test Successful Record Insertion of Sponsor and 
  // Recipient Accounts to the Blockchain Network.
  // Account, Recipient and/or Agent are Successfully mutually exclusive.
  await addAgentTransaction (
    SPONSOR_ACCOUNT_KEY_0,
    RECIPIENT_ACCOUNT_KEY_1,
    RECIPIENT_RATE_1,
    AGENT_ACCOUNT_KEY_2,
    AGENT_RATE_10,
    TRANSACTION_QTY_1
  );

  // await addAgentTransaction (
  //   SPONSOR_ACCOUNT_KEY_3,
  //   RECIPIENT_ACCOUNT_KEY_1,
  //   RECIPIENT_RATE_1,
  //   AGENT_ACCOUNT_KEY_2,
  //   AGENT_RATE_5,
  //   TRANSACTION_QTY_2
  // );
  
  // await addAgentTransaction (
  //   SPONSOR_ACCOUNT_KEY_0,
  //   RECIPIENT_ACCOUNT_KEY_1,
  //   RECIPIENT_RATE_1,
  //   AGENT_ACCOUNT_KEY_2,
  //   AGENT_RATE_5,
  //   TRANSACTION_QTY_9
  // );
  
  // await addAgentTransaction (
  //   SPONSOR_ACCOUNT_KEY_0,
  //   RECIPIENT_ACCOUNT_KEY_1,
  //   RECIPIENT_RATE_2,
  //   AGENT_ACCOUNT_KEY_2,
  //   AGENT_RATE_10,
  //   TRANSACTION_QTY_2
  // );

  // await addAgentTransaction (
  //   SPONSOR_ACCOUNT_KEY_0,
  //   RECIPIENT_ACCOUNT_KEY_1,
  //   RECIPIENT_RATE_2,
  //   AGENT_ACCOUNT_KEY_3,
  //   AGENT_RATE_9,
  //   TRANSACTION_QTY_4
  // );

  // await addAgentTransaction (
  //   SPONSOR_ACCOUNT_KEY_0,
  //   RECIPIENT_ACCOUNT_KEY_1,
  //   RECIPIENT_RATE_2,
  //   AGENT_ACCOUNT_KEY_2,
  //   AGENT_RATE_10,
  //   TRANSACTION_QTY_2
  // );

  // await addAgentTransaction (
  //   SPONSOR_ACCOUNT_KEY_0,
  //   RECIPIENT_ACCOUNT_KEY_1,
  //   RECIPIENT_RATE_2,
  //   AGENT_ACCOUNT_KEY_2,
  //   AGENT_RATE_10,
  //   TRANSACTION_QTY_8
  // );

    // AccountListSize = (await getAccountListSize()).toNumber();
    // expect(AccountListSize).to.equal(3);
    await logJSONTree();

    // agentRateKeys = await getAgentRateKeys(
    //   SPONSOR_ACCOUNT_KEY_0,
    //   RECIPIENT_ACCOUNT_KEY_1,
    //   RECIPIENT_RATE_10,
    //   AGENT_ACCOUNT_KEY_1);
    //   logJSON(agentRateKeys);

    // VALIDATE ACCOUNT CREATION
    // VALIDATE SPONSOR ACCOUNT
    // let sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_KEY_0);
    // logJSON(sponsorAccount);
  });
/**/
});
