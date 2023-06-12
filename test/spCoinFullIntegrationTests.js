const { LOG_MODE } = require("./hardhatSetup/hhConnectSetup");

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
  //   "1.000000000000000008"
  // );

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[1],
  //   RECIPIENT_ACCOUNT_KEYS[5],
  //   RECIPIENT_RATES[9],
  //   "1.000000000000000008"
  // );

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[9],
  //   "123.1"
  // );
  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[3],
  //   "456"
  // );

  // await spCoinAddMethods.addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[6],
  //   AGENT_ACCOUNT_KEYS[1],
  //   AGENT_RATES[2],
  //   "1.000000000000000008"
  // );
  
  // await spCoinAddMethods.addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[5],
  //   AGENT_ACCOUNT_KEYS[1],
  //   AGENT_RATES[9],
  //   "1.000000000000000008"
  // );


  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[5],
  //   "111"
  // );
 
  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[5],
  //   123
  // );
  
  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[5],
  //   456
  // );

  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[5],
  //   789
  // );

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   RECIPIENT_RATES[5],
  //   "99.9"
  // );

  
  // await spCoinERC20Methods.transfer(
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   "90000000000000000000000"
  // )

  // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[5],
  //   "1.000000000000000008"
  // );

  // await spCoinERC20Methods.transfer(
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   "90000000000000000000000"
  // )  
  
 // await spCoinAddMethods.addSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2],
  //   RECIPIENT_RATES[5],
  //   "2.000000000000000008"
  // );
 
  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[4],
  //   333
  // );

  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[4],
  //   444
  // );

  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[4],
  //   123
  // );

  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[5],
  //   555
  // );

  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[5],
  //   666
  // );

  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[7],
  //   777
  // );

  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[1],
  //   RECIPIENT_ACCOUNT_KEYS[2], 
  //   RECIPIENT_RATES[7],
  //   777
  // );

  // await spCoinAddMethods.depositRecipientStakingRewards(
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   RECIPIENT_RATES[4],
  //   444
  // );

    /* START THIS WORKS
  await spCoinAddMethods.addAgentSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[5],
    AGENT_ACCOUNT_KEYS[2],
    AGENT_RATES[9],
    "1.000000000000000008"
  );
  
   await spCoinAddMethods.depositRecipientStakingRewards(
    SPONSOR_ACCOUNT_KEYS[0],
    RECIPIENT_ACCOUNT_KEYS[1], 
    RECIPIENT_RATES[4],
    333
  );

  await spCoinAddMethods.depositAgentStakingRewards(
    RECIPIENT_ACCOUNT_KEYS[1],
    AGENT_ACCOUNT_KEYS[2],
    RECIPIENT_RATES[4],
    444
  );
  END THIS WORKS */
  
  // await spCoinAddMethods.addAgentSponsorship(
  //   SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   RECIPIENT_RATES[5],
  //   AGENT_ACCOUNT_KEYS[2],
  //   AGENT_RATES[9],
  //   "1.000000000000000008"
  // );
  
  await spCoinAddMethods.addSponsorship(
    SPONSOR_ACCOUNT_SIGNERS[0],
    RECIPIENT_ACCOUNT_KEYS[1],
    RECIPIENT_RATES[4],
    "1.000000000000000008"
  );

  await spCoinAddMethods.depositSponsorStakingRewards(
    SPONSOR_ACCOUNT_KEYS[0],
    RECIPIENT_ACCOUNT_KEYS[1], 
    RECIPIENT_RATES[4],
    999
  );

  await spCoinAddMethods.depositRecipientStakingRewards(
    SPONSOR_ACCOUNT_KEYS[0],
    RECIPIENT_ACCOUNT_KEYS[1], 
    RECIPIENT_RATES[4],
    333
  );

  // await spCoinAddMethods.depositAgentStakingRewards(
  //   RECIPIENT_ACCOUNT_KEYS[1],
  //   AGENT_ACCOUNT_KEYS[2],
  //   RECIPIENT_RATES[4],
  //   444
  // );

  // console.log("********************************************************************************");
  console.log("\n\n*** AFTER CREATE ******************************************************************************************************\n\n");
  // console.log("********************************************************************************");

  let accountRecords = await spCoinReadMethods.getAccountRecords()
  spCoinLogger.logJSONTree(accountRecords);

  // await spCoinERC20Methods.transfer(
  //    RECIPIENT_ACCOUNT_KEYS[12],
  //    "1000000000"
  //  )
  
  // await spCoinDeleteMethods.unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[1]);

  // await spCoinDeleteMethods.unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0],
  //   RECIPIENT_ACCOUNT_KEYS[2]);
 
  // console.log("********************************************************************************");
  // console.log("*** AFTER DELETE ***************************************************************");
  // console.log("********************************************************************************");
 
    //  spCoinLogger.logJSONTree(await spCoinReadMethods.getAccountRecords());


    // AccountListSize = (await getAccountListSize()).toNumber();
    // expect(AccountListSize).to.equal(3);
    // await spCoinDeleteMethods.unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[1]);
    // await spCoinContractDeployed.deleteAccountFromMaster(RECIPIENT_ACCOUNT_KEYS[1]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[0], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[2]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[1], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[0]);
    // await unSponsorRecipient(SPONSOR_ACCOUNT_SIGNERS[2], RECIPIENT_ACCOUNT_KEYS[1]);
   
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