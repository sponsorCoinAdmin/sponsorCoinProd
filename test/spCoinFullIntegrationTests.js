const { expect } = require("chai");
const {
  AccountStruct,
  SponsorStruct,
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
  TEST_HH_ACCOUNT_KEY_19, PATRON_ACCOUNT_KEY_0,
  PATRON_ACCOUNT_KEY_1, PATRON_ACCOUNT_KEY_2, PATRON_ACCOUNT_KEY_3, PATRON_ACCOUNT_KEY_4,
  PATRON_ACCOUNT_KEY_5, PATRON_ACCOUNT_KEY_6, PATRON_ACCOUNT_KEY_7, PATRON_ACCOUNT_KEY_8,
  PATRON_ACCOUNT_KEY_9, PATRON_ACCOUNT_KEY_10,
  SPONSOR_ACCOUNT_KEY_0, SPONSOR_ACCOUNT_KEY_1, SPONSOR_ACCOUNT_KEY_2, SPONSOR_ACCOUNT_KEY_3,
  SPONSOR_ACCOUNT_KEY_4, SPONSOR_ACCOUNT_KEY_5, SPONSOR_ACCOUNT_KEY_6, SPONSOR_ACCOUNT_KEY_7,
  SPONSOR_ACCOUNT_KEY_8, SPONSOR_ACCOUNT_KEY_9, SPONSOR_ACCOUNT_KEY_10,
  AGENT_ACCOUNT_KEY_0, AGENT_ACCOUNT_KEY_1, AGENT_ACCOUNT_KEY_2, AGENT_ACCOUNT_KEY_3,
  AGENT_ACCOUNT_KEY_4, AGENT_ACCOUNT_KEY_5, AGENT_ACCOUNT_KEY_6, AGENT_ACCOUNT_KEY_7,
  AGENT_ACCOUNT_KEY_8, AGENT_ACCOUNT_KEY_9, AGENT_ACCOUNT_KEY_10,
  SPONSOR_RATE_KEY_1, SPONSOR_RATE_KEY_2, SPONSOR_RATE_KEY_3, SPONSOR_RATE_KEY_4,
  SPONSOR_RATE_KEY_5, SPONSOR_RATE_KEY_6, SPONSOR_RATE_KEY_7, SPONSOR_RATE_KEY_8,
  SPONSOR_RATE_KEY_9,  SPONSOR_RATE_KEY_10,
  AGENT_RATE_1, AGENT_RATE_2, AGENT_RATE_3, AGENT_RATE_4, AGENT_RATE_5, AGENT_RATE_6,
  AGENT_RATE_7, AGENT_RATE_8, AGENT_RATE_9, AGENT_RATE_10,
  TRANSACTION_QTY_1, TRANSACTION_QTY_2, TRANSACTION_QTY_3, TRANSACTION_QTY_4, TRANSACTION_QTY_5,
  TRANSACTION_QTY_6, TRANSACTION_QTY_7, TRANSACTION_QTY_8, TRANSACTION_QTY_9, TRANSACTION_QTY_10
 } = require("./testMethods/hhTestAccounts");
const { LOG_MODE, LOG, setLogMode, log, logJSON } = require("../prod/lib/utils/logging");
const { } = require("./testMethods/scTestMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("./deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    await deploySpCoinContract();
  });

 it("2. VALIDATE ADD TRANSACTION RATES", async function () {
  setLogMode("LOG", true);


  // Test Successful Record Insertion of Patron and 
  // Sponsor Accounts to the Blockchain Network.
  // Account, Sponsor and/or Agent are Successfully mutually exclusive.
  // await addAgentRateTransaction(
  //   PATRON_ACCOUNT_KEY_0,
  //   SPONSOR_ACCOUNT_KEY_1,
  //   SPONSOR_RATE_KEY_9,
  //   AGENT_ACCOUNT_KEY_2,
  //   AGENT_RATE_1,
  //   TRANSACTION_QTY_1
  //   );

    await addAgentRateTransaction(
      PATRON_ACCOUNT_KEY_3,
      SPONSOR_ACCOUNT_KEY_1,
      SPONSOR_RATE_KEY_9,
      AGENT_ACCOUNT_KEY_2,
      AGENT_RATE_1,
      TRANSACTION_QTY_2
      );
      
    await addAgentRateTransaction(
      PATRON_ACCOUNT_KEY_1,
      SPONSOR_ACCOUNT_KEY_2,
      SPONSOR_RATE_KEY_10,
      AGENT_ACCOUNT_KEY_3,
      AGENT_RATE_1,
      TRANSACTION_QTY_2
    );

    // let agentRateKeys = await getAgentRateKeys(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_1,
    // SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_1);
  
    // accountKeySize = (await getAccountKeySize()).toNumber();
    // expect(accountKeySize).to.equal(3);
    await logJSONTree();
    // await deletePatronSponsorRecord(PATRON_ACCOUNT_KEY_0, SPONSOR_ACCOUNT_KEY_1);
    await deletePatronSponsorRecord(PATRON_ACCOUNT_KEY_3, SPONSOR_ACCOUNT_KEY_1);
    console.log("********************************************************************************");
    console.log("*** AFTER DELETE ***************************************************************");
    console.log("********************************************************************************");
  
    // console.log("--- AFTER DELETE SPONSOR -----------------------------------");
    await logJSONTree();
    // agentRateKeys = await getAgentRateKeys(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_1,
    // SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_1);
    //   logJSON(agentRateKeys);

    // VALIDATE ACCOUNT CREATION
    // VALIDATE PATRON ACCOUNT
    // let patronAccount = await getAccountRecord(PATRON_ACCOUNT_KEY_1);
    // logJSON(patronAccount);
  });
/**/
});
