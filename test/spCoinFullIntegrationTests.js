const { expect } = require("chai");
const {
  AccountStruct,
  RecipientStruct,
  AgentStruct,
  AgentRateStruct,
  TransactionStruct,
} = require("../prod/lib/spCoinDataTypes");
const { initHHAccounts } = require("../test/testMethods/hhTestAccounts");
const { LOG_MODE, LOG, setLogMode, log, logJSON } = require("../prod/lib/utils/logging");
const { } = require("../test/testMethods/scTestMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("../test/deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deploySpCoinContract();
    const hhTestElements = await initHHAccounts();
    const signers = hhTestElements.signers;
    setSigners(signers);
    const accounts = hhTestElements.accounts;
    const rates = hhTestElements.rates;
    SPONSOR_ACCOUNT_KEYS = signers;
    RECIPIENT_ACCOUNT_KEYS = AGENT_ACCOUNT_KEYS = accounts;
    TRANSACTION_QTY = RECIPIENT_RATES = AGENT_RATES = hhTestElements.rates;
  //   log("=== SIGNERS ==========================================");
  //   logJSON(signers);
  // // signers = await ethers.getSigners();
  //   log("=== ACCOUNTS ==========================================");
  //   logJSON(accounts);
  //   log("=== SIGNERS 1 ========================================");
  //   logJSON(signers[1]);
  //   [deployer, account0, account1] = await ethers.getSigners();
  //   log("=== DEPLOYER =========================================");
  //   logJSON(deployer);
  //   log("=== ACCOUNT 0 ========================================");
  //   logJSON(account0);
  //   log("=== ACCOUNT 1 ========================================");
  //   logJSON(account1);
  //   log("=== ACCOUNT ADDRESS========================================");
  });

 it("2. VALIDATE ADD TRANSACTION RATES", async function () {
  setLogMode("LOG", true);

  // Test Successful Record Insertion of Sponsor and 
  // Recipient Accounts to the Blockchain Network.
  // Account, Recipient and/or Agent are Successfully mutually exclusive.
  setSigner(6);
  await addAgentTransaction(
    SPONSOR_ACCOUNT_KEYS[3],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    AGENT_ACCOUNT_KEYS[2],
    AGENT_RATES[1],
    100
  );
  // await addAgentTransaction(
  //   SPONSOR_ACCOUNT_KEYS[3],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[9],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[1],
  //   100
  // );

  // await addAgentTransaction(
  //   SPONSOR_ACCOUNT_KEYS[12],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[9],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[1],
  //   100
  // );
  // await addAgentTransaction(
  //   SPONSOR_ACCOUNT_KEYS[9],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[9],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[1],
  //   100
  // );

    // await addAgentTransaction(
    //   SPONSOR_ACCOUNT_KEYS[1],
    //   RECIPIENT_ACCOUNT_KEYS[2],
    //   RECIPIENT_RATES[9],
    //   AGENT_ACCOUNT_KEYS[6],
    //   AGENT_RATES[1],
    //   TRANSACTION_QTY[2]
    // );

  //   await addAgentTransaction(
  //     SPONSOR_ACCOUNT_KEYS[0],
  //     RECIPIENT_ACCOUNT_KEYS[1],
  //     RECIPIENT_RATES[9],
  //     AGENT_ACCOUNT_KEYS[3],
  //     AGENT_RATES[3],
  //     TRANSACTION_QTY[5]
  //     );

  // await addAgentTransaction(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[6],
  //   RECIPIENT_RATES[9],
  //   AGENT_ACCOUNT_KEYS[3],
  //   AGENT_RATES[3],
  //   TRANSACTION_QTY[3]
  // );
          
    // await addAgentTransaction(
    //   SPONSOR_ACCOUNT_KEYS[1],
    //   RECIPIENT_ACCOUNT_KEYS[2],
    //   RECIPIENT_RATES[7],
    //   AGENT_ACCOUNT_KEYS[3],
    //   AGENT_RATES[6],
    //   TRANSACTION_QTY[9]
    // );

    // let agentRateKeys = await getAgentRateKeys(
    //   SPONSOR_ACCOUNT_KEYS[1],
    //   RECIPIENT_ACCOUNT_KEYS[1],
    // RECIPIENT_RATES[10,
    //   AGENT_ACCOUNT_KEYS[1]);
  
    // AccountListSize = (await getAccountListSize()).toNumber();
    // expect(AccountListSize).to.equal(3);
    await logJSONTree();
    // await deleteSponsorRecipientRecord(SPONSOR_ACCOUNT_KEYS[0], RECIPIENT_ACCOUNT_KEYS[1);
    // await deleteSponsorRecipientRecord(SPONSOR_ACCOUNT_KEYS[3], RECIPIENT_ACCOUNT_KEYS[1);
    // await deleteSponsorRecipientRecord(SPONSOR_ACCOUNT_KEYS[0], RECIPIENT_ACCOUNT_KEYS[2);
    console.log("********************************************************************************");
    console.log("*** AFTER DELETE ***************************************************************");
    console.log("********************************************************************************");
  
    // console.log("--- AFTER DELETE RECIPIENT -----------------------------------");
    // await logJSONTree();
    // agentRateKeys = await getAgentRateKeys(
    //   SPONSOR_ACCOUNT_KEYS[1],
    //   RECIPIENT_ACCOUNT_KEYS[1],
    // RECIPIENT_RATES[10],
    //   AGENT_ACCOUNT_KEYS[1]);
    //   logJSON(agentRateKeys);

    // VALIDATE ACCOUNT CREATION
    // VALIDATE SPONSOR ACCOUNT
    // let sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_KEYS[1]);
    // logJSON(sponsorAccount);
  });
/**/
});
