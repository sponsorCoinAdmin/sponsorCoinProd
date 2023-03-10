const { expect } = require("chai");

const {} = require("./prod/lib/loadTreeStructures");

const {
  addTestNetworkPatreonSponsors,
  addTestNetworkSponsorAgents,
  addTestNetworkAccount,
  getTestHHAccountArrayKeys,
} = require("./testMethods/scTestMethods");
const { testHHAccounts } = require("./testMethods/hhTestAccounts");

const { setCreateContract } = require("./prod/lib/scAccountMethods");

const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("./prod/lib/dataTypes");

const {
  setDeleteContract,
} = require("./prod/lib/scAccountDeleteMethods");

const {
  addTestNetworkAccounts,
  deleteTestNetworkAccount,
} = require("./testMethods/scTestMethods");

const {
  LOG_MODE,
  logAccountStructure,
  logSetup,
  setLogDefaults,
  setIndentPrefixLevel,
  setLogMode,
  logTestHeader,
  logFunctionHeader,
  logDetail,
  log,
} = require("./prod/lib/utils/logging");

const { deployContract } = require("./prod/deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

/**/

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deployContract();
    setCreateContract(spCoinContractDeployed);
    setDeleteContract(spCoinContractDeployed);
  });

/**/

    it("SUCCESSFUL EXECUTION: 'SUCCESSFULLY DELETED ACCOUNT'", async function () {
      await addTestNetworkAccounts([0, 1, 2]);
      let keys = await getAccountKeys();
      console.log("============================================================");
      console.log("*** DELETE SECOND ACCOUNT EXAMPLE ***");
      console.log("*** ACCOUNT KEYS BEFORE DELETE ***\n", keys);
      console.log("============================================================");
      console.log("*** ACCOUNT STRUCTURE BEFORE DELETE ***");
      let accountArr = await loadTreeStructures(spCoinContractDeployed);
      console.log(accountArr);
  
      let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Patreon Account has a Sponsor, (Patreon must Un-sponsor Sponsored Account)'";
      try {
        await deleteTestNetworkAccount(1);
      }
      catch (err) {
        expect(err.message).to.equal(expectedErrMsg);
      }

      keys = await getAccountKeys();
      accountArr = await loadTreeStructures(spCoinContractDeployed);
      console.log("============================================================");
      console.log("*** ACCOUNTS KEYS AFTER DELETE ***\n", keys);
      console.log("============================================================");
      console.log("*** ACCOUNT STRUCTURE AFTER DELETE ***");
      console.log(accountArr);
      console.log("============================================================");
    });

  /**/

  it("SUCCESSFUL ERROR MSG CAUGHT: 'ACCOUNT DOES NOT EXIST'", async function () {
    await addTestNetworkPatreonSponsors(0, [1]);
    let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Account does not exists'";
    try {
      await deleteTestNetworkAccount(2);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    }
    catch (err) {
      expect(err.message).to.equal(expectedErrMsg);
    }
  });

  /**/

  it("SUCCESSFUL ERROR MSG CAUGHT: 'PATREON ACCOUNT HAS SPONSOR'", async function () {
    await addTestNetworkPatreonSponsors(0, [1]);
    let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Patreon Account has a Sponsor, (Patreon must Un-sponsor Sponsored Account)'";
    try {
      await deleteTestNetworkAccount(0);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    }
    catch (err) {
      expect(err.message).to.equal(expectedErrMsg);
    }
  });

/**/

    it("SUCCESSFUL ERROR MSG CAUGHT: 'SPONSOR ACCOUNT HAS PATREON'", async function () {
      await addTestNetworkPatreonSponsors(0, [1]);
      let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Sponsor Account has a Patreon, (Patreon must Un-sponsor Sponsored Account)'";
      try {
        await deleteTestNetworkAccount(1);
        throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
      }
      catch (err) {
        expect(err.message).to.equal(expectedErrMsg);
      }
    });
  
  /**/

  it("SUCCESSFUL ERROR MSG CAUGHT: 'AGENT ACCOUNT HAS PARENT SPONSOR'", async function () {
    await addTestNetworkSponsorAgents(1, 2, [3]);

    let expectedErrMsg = "VM Exception while processing transaction: reverted with reason string 'Agent Account has a Parent Sponsor, (Patreon must Un-sponsor Sponsored Account)'";
    try {
      await deleteTestNetworkAccount(3);
      throw new Error("Trace point 0. Should have thrown expected error:\n" + expectedErrMsg);
    }
    catch (err) {
      expect(err.message).to.equal(expectedErrMsg);
    }
  });
  /**/

});
