const { expect } = require("chai");

const {} = require("../test/prod/lib/loadTreeStructures");

const {
  addTestNetworkPatreonSponsors,
  addTestNetworkSponsorAgents,
  addTestNetworkAccount,
  getTestHHAccountArrayKeys,
} = require("../test/testMethods/scTestMethods");
const { testHHAccounts } = require("./testMethods/hhTestAccounts");

const { setCreateContract } = require("../test/prod/lib/scAccountMethods");

const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("../test/prod/lib/dataTypes");

const {
  setDeleteContract,
} = require("../test/prod/lib/scAccountDeleteMethods");

const {
  addTestNetworkAccounts,
  deleteTestNetworkAccount,
} = require("../test/testMethods/scTestMethods");

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
} = require("../test/prod/lib/utils/logging");

const { deployContract } = require("../test/prod/deployContract");

let spCoinContractDeployed;

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  beforeEach(async () => {
    spCoinContractDeployed = await deployContract();
    setCreateContract(spCoinContractDeployed);
    setDeleteContract(spCoinContractDeployed);
  });

  /**/

  it("PRINT STRUCTURE TREE TESTS", async function () {
    // // USAGE: addTestNetworkPatreonSponsors(_accountRecIdx, _startSpIdx, _lastSpIdx);
    // await addTestNetworkPatreonSponsors(2, [1, 7, 14, 8, 18, 9]);
    // await addTestNetworkPatreonSponsors(2, [12]);
    // await addTestNetworkPatreonSponsors(3, [14, 17]);
    // await addTestNetworkPatreonSponsors(1, [5, 11, 13, 15]);
    // await addTestNetworkPatreonSponsors(14, [18, 19, 7]);
    // await addTestNetworkPatreonSponsors(3, [4]);
    // await addTestNetworkPatreonSponsors(1, [2, 5]);
    // await addTestNetworkPatreonSponsors(11, [5, 9, 0]);

    // // USAGE: addNetworkSponsorAgents(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
    // await addTestNetworkSponsorAgents(1, 5, [7, 2, 17, 3, 9, 19]);
    // await addTestNetworkSponsorAgents(11, 18, [5, 7, 9, 6]);
    // await addTestNetworkSponsorAgents(0, 2, [6, 7, 16]);
    // await addTestNetworkSponsorAgents(14, 6, [1]);
    // await addTestNetworkSponsorAgents(14, 0, [1, 11, 5, 12, 2]);
    // await addTestNetworkSponsorAgents(0, 1, [2, 3]);
    // await addTestNetworkSponsorAgents(3, 4, [5]);

    // await addTestNetworkSponsorAgents(0, 1, [3,4,5,6]);
    // await addTestNetworkSponsorAgents(2, 1, [4]);
    // await addTestNetworkSponsorAgents(0, 1, [2,3,4]);
    // await addTestNetworkSponsorAgents(1, 0, [4]);

    await addTestNetworkAccounts([0, 1, 2, 3, 4, 5, 6, 7, 8 ]);

    console.log("BEFORE DELETE");
    // let accountArr = await loadTreeStructures(spCoinContractDeployed);
    // logAccountStructure(accountArr);
    let keys = await getAccountKeys();
    console.log(keys);
    deleteTestNetworkAccount(8);
    // accountArr = await loadTreeStructures(spCoinContractDeployed);
    keys = await getAccountKeys();

    // logAccountStructure(accountArr);
    console.log(keys);
    console.log("AFTER DELETE");
  });

});
