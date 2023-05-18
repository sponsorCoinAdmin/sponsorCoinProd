const { LOG_MODE } = require("./hardhatSetup/hhConnectSetup");

const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * (365 + hour * 8);
const month = year/12;
const millennium = year * 1000;

spCoinConnectMethods
// let spCoinAddMethods;
// let spCoinDeleteMethods;
// let spCoinERC20Methods;
// let spCoinReadMethods;
// let spCoinStakingMethods;
// let spCoinLogger;


describe("spCoinContract", function () {
  beforeEach(async () => {
    await initSPCoinTestConnect();
  });

 it("2. VALIDATE STAKING REWARDS CALCULATIONS", async function () {
  // Test Successful Record Insertion of Sponsor and 
  // Recipient Account to the Blockchain Network.
  // Account, Recipient and/or Agent are Successfully mutually exclusive.

  console.log("spCoinStakingRewardTests:second     = ", second);
  console.log("spCoinStakingRewardTests:minute     = ", minute);
  console.log("spCoinStakingRewardTests:hour       = ", hour);
  console.log("spCoinStakingRewardTests:day        = ", day);
  console.log("spCoinStakingRewardTests:week       = ", week);
  console.log("spCoinStakingRewardTests:year       = ", year);
  console.log("spCoinStakingRewardTests:month      = ", month);
  console.log("spCoinStakingRewardTests:millennium = ", millennium);
  millenniumDivisor = await spCoinStakingMethods.getMillenniumTimeIntervalDivisor( second );
  console.log("Second Portion", millenniumDivisor);
  millenniumDivisor = await spCoinStakingMethods.getMillenniumTimeIntervalDivisor( minute );
  console.log("Minute Portion", millenniumDivisor);
  millenniumDivisor = await spCoinStakingMethods.getMillenniumTimeIntervalDivisor( hour );
  console.log("Hour Portion", millenniumDivisor);
  millenniumDivisor = await spCoinStakingMethods.getMillenniumTimeIntervalDivisor( day );
  console.log("Millennial Portion", millenniumDivisor);
  millenniumDivisor = await spCoinStakingMethods.getMillenniumTimeIntervalDivisor( week );
  console.log("Week Portion", millenniumDivisor);
  millenniumDivisor = await spCoinStakingMethods.getMillenniumTimeIntervalDivisor( month );
  console.log("Month Portion", millenniumDivisor);
  millenniumDivisor = await spCoinStakingMethods.getMillenniumTimeIntervalDivisor( year);
  console.log("Year Portion", millenniumDivisor);
  millenniumDivisor = await spCoinStakingMethods.getMillenniumTimeIntervalDivisor( millennium);
  console.log("Millennial Portion", millenniumDivisor);

  console.log("********************************************************************************");

  let lastUpdateTime = millennium;
  let testUpdateTime = millennium * 2;
  let interestRate = 10;
  let quantity = 100;

  console.log("SOL=> spCoinStakingRewardTests:lastUpdateTime =", lastUpdateTime);
  console.log("SOL=> spCoinStakingRewardTests:testUpdateTime =", testUpdateTime);
  console.log("SOL=> spCoinStakingRewardTests:interestRate   =", interestRate);
  console.log("SOL=> spCoinStakingRewardTests:quantity       =", quantity);

  // rewards = await spCoinStakingMethods.testStakingRewards( lastUpdateTime, testUpdateTime, interestRate, quantity );
  rewards = await spCoinStakingMethods.testStakingRewards( );
  console.log(" Token Rewards", rewards);


  // await spCoinAddMethods.depositAccountStakingRewards(
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   "SPONSOR",
  //   123
  // );
  
  // await spCoinAddMethods.depositAccountStakingRewards(
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   "AGENT",
  //   456
  // );

  // await spCoinAddMethods.depositAccountStakingRewards(
  //   RECIPIENT_ACCOUNT_KEYS[1], 
  //   SPONSOR_ACCOUNT_KEYS[0],
  //   "SPONSOR",
  //   789
  // );

  // await spCoinERC20Methods.transfer(
  //    RECIPIENT_ACCOUNT_KEYS[12],
  //    "1000000000"
  //  )

  // console.log("********************************************************************************");
  // console.log("*** AFTER CREATE ***************************************************************");
  // console.log("********************************************************************************");

  // spCoinLogger.logJSONTree(await spCoinReadMethods.getAccountRecords());


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
