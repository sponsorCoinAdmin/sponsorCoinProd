const { expect } = require("chai");
const {
  TEST_HH_ACCOUNT_LIST, TEST_HH_ACCOUNT_KEY_0, TEST_HH_ACCOUNT_KEY_1, TEST_HH_ACCOUNT_KEY_2,
  TEST_HH_ACCOUNT_KEY_3, TEST_HH_ACCOUNT_KEY_4, TEST_HH_ACCOUNT_KEY_5, TEST_HH_ACCOUNT_KEY_6,
  TEST_HH_ACCOUNT_KEY_7, TEST_HH_ACCOUNT_KEY_8, TEST_HH_ACCOUNT_KEY_9, TEST_HH_ACCOUNT_KEY_10,
  TEST_HH_ACCOUNT_KEY_11, TEST_HH_ACCOUNT_KEY_12, TEST_HH_ACCOUNT_KEY_13, TEST_HH_ACCOUNT_KEY_14,
  TEST_HH_ACCOUNT_KEY_15, TEST_HH_ACCOUNT_KEY_16, TEST_HH_ACCOUNT_KEY_17, TEST_HH_ACCOUNT_KEY_18,
  TEST_HH_ACCOUNT_KEY_19, SPONSOR_ACCOUNT_KEY_0,
  SPONSOR_ACCOUNT_KEY_1, SPONSOR_ACCOUNT_KEY_2, SPONSOR_ACCOUNT_KEY_3, SPONSOR_ACCOUNT_KEY_4,
  SPONSOR_ACCOUNT_KEY_5, SPONSOR_ACCOUNT_KEY_6, SPONSOR_ACCOUNT_KEY_7, SPONSOR_ACCOUNT_KEY_8,
  SPONSOR_ACCOUNT_KEY_9, SPONSOR_ACCOUNT_KEY_10,
  RECIPIENT_ACCOUNT_KEY_0, RECIPIENT_ACCOUNT_KEY_1, RECIPIENT_ACCOUNT_KEY_2, RECIPIENT_ACCOUNT_KEY_3,
  RECIPIENT_ACCOUNT_KEY_4, RECIPIENT_ACCOUNT_KEY_5, RECIPIENT_ACCOUNT_KEY_6, RECIPIENT_ACCOUNT_KEY_7,
  RECIPIENT_ACCOUNT_KEY_8, RECIPIENT_ACCOUNT_KEY_9, RECIPIENT_ACCOUNT_KEY_10,
  AGENT_ACCOUNT_KEY_0, AGENT_ACCOUNT_KEY_1, AGENT_ACCOUNT_KEY_2, AGENT_ACCOUNT_KEY_3,
  AGENT_ACCOUNT_KEY_4, AGENT_ACCOUNT_KEY_5, AGENT_ACCOUNT_KEY_6, AGENT_ACCOUNT_KEY_7,
  AGENT_ACCOUNT_KEY_8, AGENT_ACCOUNT_KEY_9, AGENT_ACCOUNT_KEY_10,
  RECIPIENT_RATE_1, RECIPIENT_RATE_2, RECIPIENT_RATE_3, RECIPIENT_RATE_4,
  RECIPIENT_RATE_5, RECIPIENT_RATE_6, RECIPIENT_RATE_7, RECIPIENT_RATE_8,
  RECIPIENT_RATE_9,  RECIPIENT_RATE_10,
  AGENT_RATE_1, AGENT_RATE_2, AGENT_RATE_3, AGENT_RATE_4, AGENT_RATE_5, AGENT_RATE_6,
  AGENT_RATE_7, AGENT_RATE_8, AGENT_RATE_9, AGENT_RATE_10,
  TRANSACTION_QTY_1, TRANSACTION_QTY_2, TRANSACTION_QTY_3, TRANSACTION_QTY_4, TRANSACTION_QTY_5,
  TRANSACTION_QTY_6, TRANSACTION_QTY_7, TRANSACTION_QTY_8, TRANSACTION_QTY_9, TRANSACTION_QTY_10
 } = require("./testMethods/hhTestAccounts");
 const { LOG_MODE } = require("../prod/lib/utils/logging");
const { } = require("./testMethods/scTestMethods");
const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("../prod/lib/spCoinDeleteMethods");
const { } = require("./testMethods/scTestMethods");
const { } = require("./deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

/**/

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deploySpCoinContract();
  });

/* */

    it("SUCCESSFUL EXECUTION: 'SUCCESSFULLY DELETED ACCOUNT'", async function () {
      await addTestNetworkAccounts([0, 1, 2]);
      let keys = await getAccountList();
      console.log("============================================================");
      console.log("*** DELETE SECOND ACCOUNT EXAMPLE ***");
      console.log("*** ACCOUNT KEYS BEFORE DELETE ***\n", keys);
      console.log("============================================================");
      console.log("*** ACCOUNT STRUCTURE BEFORE DELETE ***");
      await logJSONTree();
  
      let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Sponsor Account has a Recipient, (Sponsor must Un-recipient Recipiented Account)'";
      try {
        await deleteTestNetworkAccount(1);
      }
      catch (err) {
        expect(err.message).to.equal(expectedErrMsg);
      }

      keys = await getAccountList();
      console.log("============================================================");
      console.log("*** ACCOUNTS KEYS AFTER DELETE ***\n", keys);
      console.log("============================================================");
      console.log("*** ACCOUNT STRUCTURE AFTER DELETE ***");
      await logJSONTree();

      console.log("============================================================");
    });

  /* */

  it("SUCCESSFUL ERROR MSG CAUGHT: 'ACCOUNT DOES NOT EXIST'", async function () {
    await addTestNetworkRecipients(0, [1]);
    let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Account does not exists'";
    try {
      await deleteTestNetworkAccount(2);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    }
    catch (err) {
      expect(err.message).to.equal(expectedErrMsg);
    }
  });

  /* */

  it("SUCCESSFUL ERROR MSG CAUGHT: 'SPONSOR ACCOUNT HAS RECIPIENT'", async function () {
    await addTestNetworkRecipients(0, [1]);
    let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Sponsor Account has a Recipient, (Sponsor must Un-recipient Recipiented Account)'";
    try {
      await deleteTestNetworkAccount(0);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    }
    catch (err) {
      expect(err.message).to.equal(expectedErrMsg);
    }
  });

/* */

    it("SUCCESSFUL ERROR MSG CAUGHT: 'RECIPIENT ACCOUNT HAS SPONSOR'", async function () {
      await addTestNetworkRecipients(0, [1]);
      let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Recipient Account has a Sponsor, (Sponsor must Un-recipient Recipiented Account)'";
      try {
        await deleteTestNetworkAccount(1);
        throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
      }
      catch (err) {
        expect(err.message).to.equal(expectedErrMsg);
      }
    });
  
  /*

  it("SUCCESSFUL ERROR MSG CAUGHT: 'AGENT ACCOUNT HAS PARENT RECIPIENT'", async function () {
    await addAgents(RECIPIENT_ACCOUNT_KEY_1, RECIPIENT_RATE_10, [AGENT_ACCOUNT_KEY_0, RECIPIENT_ACCOUNT_KEY_2]);

    let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Agent Account has a Parent Recipient, (Sponsor must Un-recipient Recipiented Account)'";
    try {
      await deleteAccountRecord(RECIPIENT_ACCOUNT_KEY_2);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    }
    catch (err) {
      expect(err.message).to.equal(expectedErrMsg);
    }
  });

  it("VALIDATE THAT ACCOUNTS, PATRIOT/RECIPIENT/AGENT, ARE ALL MUTUALLY EXCLUSIVE", async function () {
    setLogMode(LOG_MODE.LOG, true);

    // Test Successful Record Insertion of Account Records 
    // Validate Account Size is zero
    let AccountListSize = (await getAccountListSize()).toNumber();
    expect(AccountListSize).to.equal(0);

    // Add 1 Record Validate Size is 1
    await addTestNetworkAccount(0);
    AccountListSize = (await getAccountListSize()).toNumber();
    expect(AccountListSize).to.equal(1);

    // Add duplicate Record Validate Size is still 1
    await addTestNetworkAccount(0);
    AccountListSize = (await getAccountListSize()).toNumber();

    // delete Record Validate Size should reduce to 1
    await deleteTestNetworkAccount(0);
    AccountListSize = (await getAccountListSize()).toNumber();
    expect(AccountListSize).to.equal(0);

    // Add additional Record Validate Size is 2
    await addTestNetworkAccount(0);
    await addTestNetworkAccount(1);
    AccountListSize = (await getAccountListSize()).toNumber();
    expect(AccountListSize).to.equal(2);

    // Add 5 additional Records Validate Size is now 7
    await addTestNetworkAccounts([4,6,9,10,8]);
    AccountListSize = (await getAccountListSize()).toNumber();
    expect(AccountListSize).to.equal(7);

    // Add 4 Records Validate Size is now 3
    await deleteTestNetworkAccounts([10,8,4,0]);
    AccountListSize = (await getAccountListSize()).toNumber();
    expect(AccountListSize).to.equal(3);

    accountArr = await getAccountRecords();
    logJSON(accountArr);
  });
  /**/
});
