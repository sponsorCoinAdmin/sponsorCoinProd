const { LOG_MODE } = require("../test/hardhatSetup/hhConnectSetup");

describe("spCoinContract", function () {
  beforeEach(async () => {
    await initSPCoinTestConnect();
  });

it("1 VALIDATE ADD TRANSACTION RATES", async function () {
  setLogMode("LOG", true);

  // Test Successful Record Insertion of Sponsor and 
  // Recipient Account to the Blockchain Network.
  // Account, Recipient and/or Agent are Successfully mutually exclusive.
  await addSponsorship (
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[2],
    AGENT_ACCOUNT_KEYS[2],
    AGENT_RATES[10],
    TRANSACTION_QTY[3]
  );

  // await addSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[1],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[5],
  //   TRANSACTION_QTY[2]
  // );
  
  // await addSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[1],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[5],
  //   TRANSACTION_QTY[9]
  // );
  
  // await addSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   TRANSACTION_QTY[2]
  // );

  // await addSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[3],
  //   AGENT_RATES[9],
  //   TRANSACTION_QTY[4]
  // );

  // await addSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   TRANSACTION_QTY[2]
  // );

  // await addSponsorship (
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[2],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[10],
  //   TRANSACTION_QTY[8]
  // );

    // AccountListSize = (await getAccountListSize()).toNumber();
    // expect(AccountListSize).to.equal(3);
    await spCoinLogger.logJSONTree();

    // agentRateList = await getAgentRateList(
    //   RECIPIENT_ACCOUNT_KEYS[1],
    //   RECIPIENT_RATES[10],
    //   AGENT_ACCOUNT_KEYS[1]);
    //   spCoinLogger.logJSON(agentRateList);

    // VALIDATE ACCOUNT CREATION
    // VALIDATE SPONSOR ACCOUNT
    // let sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_SIGNERS[0);
    // spCoinLogger.logJSON(sponsorAccount);
  });
/**/
});
