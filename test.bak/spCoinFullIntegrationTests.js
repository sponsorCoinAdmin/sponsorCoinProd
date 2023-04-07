const { expect } = require("chai");
const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  AgentRateStruct,
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
  let PATRON_ACCOUNT_KEY_1 = TEST_HH_ACCOUNT_KEY_0;
  let PATRON_ACCOUNT_KEY_2 = TEST_HH_ACCOUNT_KEY_1;
  let SPONSOR_ACCOUNT_KEY_1 = TEST_HH_ACCOUNT_KEY_2;
  let SPONSOR_ACCOUNT_KEY_2 = TEST_HH_ACCOUNT_KEY_3;
  let AGENT_ACCOUNT_KEY_1 = TEST_HH_ACCOUNT_KEY_4;
  let AGENT_ACCOUNT_KEY_2 = TEST_HH_ACCOUNT_KEY_5;
  let AGENT_ACCOUNT_KEY_3 = TEST_HH_ACCOUNT_KEY_6;
  let SPONSOR_RATE_KEY_10 = 10;
  let AGENT_RATE_1 = 1;
  let TRANSACTION_QTY_1 = 9;
  let AGENT_RATE_2 = 2;
  let TRANSACTION_QTY_2 = 3;
  let AGENT_RATE_3 = 3;
  let TRANSACTION_QTY_3 = 6;
  let AGENT_RATE_4 = 4;
  let TRANSACTION_QTY_4 = 5;
  let TRANSACTION_QTY_5 = 5;
  let TRANSACTION_QTY_6 = 6;
  let TRANSACTION_QTY_7 = 7;

  // Test Successful Record Insertion of Patron and 
  // Sponsor Accounts to the Blockchain Network.
  // Account, Sponsor and/or Agent are Successfully mutually exclusive.
  await addAgentRateTransaction(
    PATRON_ACCOUNT_KEY_1,
    SPONSOR_ACCOUNT_KEY_1,
    SPONSOR_RATE_KEY_10,
    AGENT_ACCOUNT_KEY_1,
    AGENT_RATE_1,
    TRANSACTION_QTY_1
    );

    // await addAgentRateTransaction(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_2,
    //   SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_2,
    //   AGENT_RATE_1,
    //   TRANSACTION_QTY_1
    // );

    // await addAgentRateTransaction(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_1,
    // SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_3,
    //   AGENT_RATE_1,
    //   TRANSACTION_QTY_3
    // );

    // await addAgentRateTransaction(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_2,
    // SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_3,
    //   AGENT_RATE_4,
    //   TRANSACTION_QTY_4
    // );
  
    // await addAgentRateTransaction(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_2,
    // SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_3,
    //   AGENT_RATE_4,
    //   TRANSACTION_QTY_7
    // );
  
      // await addAgentRateTransaction(
      //   PATRON_ACCOUNT_KEY_2,
      //   SPONSOR_ACCOUNT_KEY_1,
    // SPONSOR_RATE_KEY_10,
      //   AGENT_ACCOUNT_KEY_1,
      //   AGENT_RATE_1,
      //   TRANSACTION_QTY_3*3
      //   );
  
      // await addAgentRateTransaction(
      //   PATRON_ACCOUNT_KEY_2,
      //   SPONSOR_ACCOUNT_KEY_1,
    // SPONSOR_RATE_KEY_10,
      //   AGENT_ACCOUNT_KEY_1,
      //   AGENT_RATE_2,
      //   TRANSACTION_QTY_2
      //   );
    
    // await addAgentRateTransaction(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_1,
    // SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_1,
    //   AGENT_RATE_2,
    //   TRANSACTION_QTY_2
    // );
    
    // await addAgentRateTransaction(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_1,
    // SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_1,
    //   AGENT_RATE_3,
    //   TRANSACTION_QTY_3
    // );
    // await addAgentRateTransaction(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_1,
    // SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_1,
    //   AGENT_RATE_2,
    //   TRANSACTION_QTY_4
    // );

    // let agentRateKeys = await getAgentRateKeys(
    //   PATRON_ACCOUNT_KEY_1,
    //   SPONSOR_ACCOUNT_KEY_1,
    // SPONSOR_RATE_KEY_10,
    //   AGENT_ACCOUNT_KEY_1);
  
    // accountKeySize = (await getAccountKeySize()).toNumber();
    // expect(accountKeySize).to.equal(3);
    await logJSONTree();
    await deletePatronSponsorRecord(PATRON_ACCOUNT_KEY_1, SPONSOR_ACCOUNT_KEY_1);

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
    // let patreonAccountRecord = await getAccountRecord(PATRON_ACCOUNT_KEY_1);
    // logJSON(patreonAccountRecord);
  });
/**/
});
