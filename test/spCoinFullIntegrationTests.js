const { expect } = require("chai");
const {
  AccountStruct,
  RecipientStruct,
  AgentStruct,
  AgentRateStruct,
  TransactionStruct,
} = require("../prod/lib/spCoinDataTypes");
const { initHHAccounts } = require("../test/testMethods/hhTestAccounts");
const { logSetup, setLogMode, logJSON,  LOG_MODE, LOG, LOG_DETAIL, 
        LOG_TEST_HEADER, LOG_FUNCTION_HEADER, LOG_SETUP,
        LOG_TREE } = require("../prod/lib/utils/logging");
const { } = require("../test/testMethods/scTestMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { unSponsorRecipient } = require("../prod/lib/spCoinDeleteMethods");
const { } = require("../test/deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");
setLogMode(LOG_MODE.LOG_FUNCTION_HEADER, false);

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deploySpCoinContract();
    const hhTestElements = await initHHAccounts();
    const signers = hhTestElements.signers;
    setSigners(signers);
    const accounts = hhTestElements.accounts;
    const rates = hhTestElements.rates;
    SPONSOR_ACCOUNT_SIGNERS = signers;
    RECIPIENT_ACCOUNT_KEYS = AGENT_ACCOUNT_KEYS = accounts;
    TRANSACTION_QTY = RECIPIENT_RATES = AGENT_RATES = hhTestElements.rates;
  });

 it("2. VALIDATE ADD TRANSACTION RATES", async function () {
  setLogMode("LOG", true);

  // Test Successful Record Insertion of Sponsor and 
  // Recipient Account to the Blockchain Network.
  // Account, Recipient and/or Agent are Successfully mutually exclusive.
  await addAgentSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    AGENT_ACCOUNT_KEYS[2],
    AGENT_RATES[1],
    "9999"
  );

  // await addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[4],
  //   AGENT_ACCOUNT_KEYS[12],
  //   AGENT_RATES[2],
  //   10
  // );

  // await addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   RECIPIENT_RATES[8],
  //   AGENT_ACCOUNT_KEYS[1],
  //   AGENT_RATES[3],
  //   29
  // );

  // await addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   RECIPIENT_RATES[3],
  //   AGENT_ACCOUNT_KEYS[0],
  //   AGENT_RATES[6],
  //   .00003422
  // );

  // await addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[1],
  //   RECIPIENT_ACCOUNT_KEYS[0],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[6],
  //   1
  // );
  
  // await addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[2],
  //   RECIPIENT_ACCOUNT_KEYS[0],
  //   RECIPIENT_RATES[0],
  //   AGENT_ACCOUNT_KEYS[1],
  //   AGENT_RATES[6],
  //   49
  // );

  // await addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[2],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[0],
  //   AGENT_RATES[6],
  //   5
  // );
  
    console.log("********************************************************************************");
    console.log("*** AFTER CREATE ***************************************************************");
    console.log("********************************************************************************");

    // AccountListSize = (await getAccountListSize()).toNumber();
    // expect(AccountListSize).to.equal(3);
    await logJSONTree();
    await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[1]);
    // await spCoinContractDeployed.deleteAccountFromMaster(RECIPIENT_ACCOUNT_KEYS[1]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[1]);
    console.log("********************************************************************************");
    console.log("*** AFTER DELETE ***************************************************************");
    console.log("********************************************************************************");
  
    // console.log("--- AFTER DELETE RECIPIENT -----------------------------------");
    await logJSONTree();
    // agentRateKeys = await getAgentRateKeys(
    //   SPONSOR_ACCOUNT_SIGNERS[1],
    //   RECIPIENT_ACCOUNT_KEYS[1],
    // RECIPIENT_RATES[10],
    //   AGENT_ACCOUNT_KEYS[1]);
    //   logJSON(agentRateKeys);

    // VALIDATE ACCOUNT CREATION
    // VALIDATE SPONSOR ACCOUNT
    // let sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_SIGNERS[1]);
    // logJSON(sponsorAccount);
  });
/**/
});
