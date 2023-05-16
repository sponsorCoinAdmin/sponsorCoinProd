const { LOG_MODE } = require("./hardhatSetup/hhConnectSetup");

describe("spCoinContract", function () {
  beforeEach(async () => {
    await initSPCoinTestConnect();
  });

 it("2. VALIDATE STAKING REWARDS CALCULATIONS", async function () {
  // Test Successful Record Insertion of Sponsor and 
  // Recipient Account to the Blockchain Network.
  // Account, Recipient and/or Agent are Successfully mutually exclusive.

  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[9],
    "1.000000000000000008"
  );

  await spCoinAddMethods.depositAccountStakingRewards(
    RECIPIENT_ACCOUNT_KEYS[1], 
    SPONSOR_ACCOUNT_KEYS[0],
    "SPONSOR",
    123
  );
  
  await spCoinAddMethods.depositAccountStakingRewards(
    RECIPIENT_ACCOUNT_KEYS[1], 
    SPONSOR_ACCOUNT_KEYS[0],
    "AGENT",
    456
  );

  await spCoinAddMethods.depositAccountStakingRewards(
    RECIPIENT_ACCOUNT_KEYS[1], 
    SPONSOR_ACCOUNT_KEYS[0],
    "SPONSOR",
    789
  );

  await spCoinERC20Methods.transfer(
     RECIPIENT_ACCOUNT_KEYS[12],
     "1000000000"
   )

  console.log("********************************************************************************");
  console.log("*** AFTER CREATE ***************************************************************");
  console.log("********************************************************************************");

  spCoinLogger.logJSONTree(await spCoinReadMethods.getAccountRecords());


  // await spCoinERC20Methods.transfer(
  //    RECIPIENT_ACCOUNT_KEYS[12],
  //    "1000000000"
  //  )

  // console.log("********************************************************************************");
  // console.log("*** AFTER CREATE ***************************************************************");
  // console.log("********************************************************************************");

  // spCoinLogger.logJSONTree(await spCoinReadMethods.getAccountRecords());

    // AccountListSize = (await getAccountListSize()).toNumber();
    // expect(AccountListSize).to.equal(3);
    // await spCoinDeleteMethods.unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[1]);
    // await spCoinContractDeployed.deleteAccountFromMaster(RECIPIENT_ACCOUNT_KEYS[1]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[2]);
   
    // spCoinLogger.logJSONTree(await spCoinReadMethods.getAccountRecords());
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
