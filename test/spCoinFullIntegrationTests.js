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
const { SpCoinERC20Methods } = require("../prod/lib/spCoinTransferMethods");
const { unSponsorRecipient } = require("../prod/lib/spCoinDeleteMethods");
const { SpCoinAddMethods } = require("../prod/lib/spCoinAddMethods");
const { } = require("../test/deployContract");
const { SpCoinContract } = require("../prod/lib/contracts/spCoin");

let spCoinContractDeployed;
let BURN_ACCOUNT;
let spCoinAddMethods;
let spCoinERC20Methods;

// let spCoinContractDeployed;

logSetup("JS => Setup Test");
setLogMode(LOG_MODE.LOG_FUNCTION_HEADER, false);

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deploySpCoinContract();
    spCoinAddMethods = new SpCoinAddMethods(spCoinContractDeployed);
    spCoinERC20Methods = new SpCoinERC20Methods(spCoinContractDeployed);
    const hhTestElements = await initHHAccounts();
    SPONSOR_ACCOUNT_SIGNERS = hhTestElements.signers;
    RECIPIENT_ACCOUNT_KEYS = AGENT_ACCOUNT_KEYS = hhTestElements.accounts;
    TRANSACTION_QTY = RECIPIENT_RATES = AGENT_RATES = hhTestElements.rates;
    BURN_ACCOUNT = hhTestElements.burnAddress;
  });

 it("2. VALIDATE ADD TRANSACTION RATES", async function () {
  // Test Successful Record Insertion of Sponsor and 
  // Recipient Account to the Blockchain Network.
  // Account, Recipient and/or Agent are Successfully mutually exclusive.

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[9],
  //   BURN_ACCOUNT,
  //   AGENT_RATES[1],
  //   "1.000000000000000008"
  // );

  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    BURN_ACCOUNT,
    AGENT_RATES[1],
    "1.000000000000000008"
  );

  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    BURN_ACCOUNT,
    AGENT_RATES[1],
    "3.000000000000000008"
  );
  
  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    BURN_ACCOUNT,
    AGENT_RATES[1],
    "9.000000000000000008"
  );

  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    AGENT_ACCOUNT_KEYS[2],
    AGENT_RATES[1],
    "123.000000000000000008"
  );

  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    AGENT_ACCOUNT_KEYS[2],
    AGENT_RATES[1],
    "456.000000000000000008"
  );

  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    AGENT_ACCOUNT_KEYS[2],
    AGENT_RATES[1],
    "789.000000000000000008"
  );

  await spCoinERC20Methods.transfer(
    RECIPIENT_ACCOUNT_KEYS[12],
    "1000000000"
  )

  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    AGENT_ACCOUNT_KEYS[12],
    AGENT_RATES[2],
    "9123.12985"
  );

  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[2],
    RECIPIENT_RATES[8],
    AGENT_ACCOUNT_KEYS[1],
    AGENT_RATES[3],
    29
  );

  // await transfer(
  //   RECIPIENT_ACCOUNT_KEYS[12],
  //   "1000000000"
  // )

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[9],
  //   AGENT_ACCOUNT_KEYS[12],
  //   AGENT_RATES[2],
  //   "9123.12985"
  // );

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   RECIPIENT_RATES[8],
  //   AGENT_ACCOUNT_KEYS[1],
  //   AGENT_RATES[3],
  //   29
  // );

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   RECIPIENT_RATES[3],
  //   AGENT_ACCOUNT_KEYS[0],
  //   AGENT_RATES[6],
  //   .00003422
  // );

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[1],
  //   RECIPIENT_ACCOUNT_KEYS[0],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[6],
  //   1
  // );
  
  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[2],
  //   RECIPIENT_ACCOUNT_KEYS[0],
  //   RECIPIENT_RATES[0],
  //   AGENT_ACCOUNT_KEYS[1],
  //   AGENT_RATES[6],
  //   49
  // );

  // await spCoinAddMethods.addSponsorship(
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
    await spCoinContractDeployed.deleteAccountFromMaster(RECIPIENT_ACCOUNT_KEYS[1]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[1]);
    console.log("********************************************************************************");
    console.log("*** AFTER DELETE ***************************************************************");
    console.log("********************************************************************************");
  
    console.log("--- AFTER DELETE RECIPIENT -----------------------------------");
    await logJSONTree();
    // agentRateList = await getAgentRateList(
    //   SPONSOR_ACCOUNT_SIGNERS[1],
    //   RECIPIENT_ACCOUNT_KEYS[1],
    // RECIPIENT_RATES[10],
    //   AGENT_ACCOUNT_KEYS[1]);
    //   logJSON(agentRateList);

    // VALIDATE ACCOUNT CREATION
    // VALIDATE SPONSOR ACCOUNT
    // let sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_SIGNERS[1]);
    // logJSON(sponsorAccount);
  });
/**/
});
