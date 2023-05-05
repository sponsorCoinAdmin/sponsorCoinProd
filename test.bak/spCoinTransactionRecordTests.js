const { expect } = require("chai");
const {
  AccountStruct,
  RecipientStruct,
  AgentStruct,
  AgentRateStruct,
  TransactionStruct,
} = require("../prod/lib/spCoinDataTypes");
const { initHHAccounts } = require("./testMethods/hhTestAccounts");
const { LOG_MODE, LOG, setLogMode, log, logJSON } = require("../prod/lib/utils/logging");
const { } = require("./testMethods/scTestMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("./deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deploySpCoinContract();
    const hhTestElements = await initHHAccounts();
    const accounts = hhTestElements.accounts;
    SPONSOR_ACCOUNT_SIGNERS = accounts;
    RECIPIENT_ACCOUNT_KEYS = AGENT_ACCOUNT_KEYS = accounts;
    TRANSACTION_QTY = RECIPIENT_RATES = AGENT_RATES = hhTestElements.rates;
  });

it("1 VALIDATE ADD TRANSACTION RATES", async function () {
  setLogMode("LOG", true);

  // Test Successful Record Insertion of Sponsor and 
  // Recipient Account to the Blockchain Network.
  // Account, Recipient and/or Agent are Successfully mutually exclusive.
  await addAgentSponsorship (
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[2],
    AGENT_ACCOUNT_KEYS[2],
    AGENT_RATES[10],
    TRANSACTION_QTY[3]
  );

  // await addAgentSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[1],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[5],
  //   TRANSACTION_QTY[2]
  // );
  
  // await addAgentSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[1],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[5],
  //   TRANSACTION_QTY[9]
  // );
  
  // await addAgentSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   TRANSACTION_QTY[2]
  // );

  // await addAgentSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[3],
  //   AGENT_RATES[9],
  //   TRANSACTION_QTY[4]
  // );

  // await addAgentSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   TRANSACTION_QTY[2]
  // );

  // await addAgentSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   TRANSACTION_QTY[8]
  // );

    // AccountListSize = (await getAccountListSize()).toNumber();
    // expect(AccountListSize).to.equal(3);
    await logJSONTree();

    // agentRateList = await getAgentRateList(
    //   RECIPIENT_ACCOUNT_KEYS[1],
    //   RECIPIENT_RATES[10],
    //   AGENT_ACCOUNT_KEYS[1]);
    //   logJSON(agentRateList);

    // VALIDATE ACCOUNT CREATION
    // VALIDATE SPONSOR ACCOUNT
    // let sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_SIGNERS[0);
    // logJSON(sponsorAccount);
  });
/**/
});
