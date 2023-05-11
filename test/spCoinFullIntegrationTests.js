const { LOG_MODE } = require("./testMethods/spCoinTestMethods");

describe("spCoinContract", function () {
  beforeEach(async () => {
    await initSPCoinTestConnect();
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
let spCoinStructure = await spCoinReadMethods.getAccountRecords();
console.log("return JSON.stringify(spCoinStructure, null, 2)",JSON.stringify(spCoinStructure, null, 2))
    spCoinLogger.logJSONTree(await spCoinReadMethods.getAccountRecords());
    await spCoinDeleteMethods.unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[1]);
    await spCoinContractDeployed.deleteAccountFromMaster(RECIPIENT_ACCOUNT_KEYS[1]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[1]);
    console.log("********************************************************************************");
    console.log("*** AFTER DELETE ***************************************************************");
    console.log("********************************************************************************");
  
    spCoinLogger.logJSONTree(await spCoinReadMethods.getAccountRecords());
    // agentRateList = await getAgentRateList(
    //   SPONSOR_ACCOUNT_SIGNERS[1],
    //   RECIPIENT_ACCOUNT_KEYS[1],
    // RECIPIENT_RATES[10],
    //   AGENT_ACCOUNT_KEYS[1]);
    //   spCoinLogger.logJSON(agentRateList);

    // VALIDATE ACCOUNT CREATION
    // VALIDATE SPONSOR ACCOUNT
    // let sponsorAccount = await getAccountRecord(SPONSOR_ACCOUNT_SIGNERS[1]);
    // spCoinLogger.logJSON(sponsorAccount);
  });
/**/
});
