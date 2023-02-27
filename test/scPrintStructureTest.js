const { expect } = require("chai");
const {} = require("./lib/loadTreeStructures");
const { testHHAccounts } = require("./lib/hhTestAccounts");
const {
  setContract,
  addNetworkAccount,
  addNetworkAccountSponsors,
  addNetworkAccounts,
  getNetworkAccounts,
  getNetworkSponsorKeys,
  getNetworkAgentKeys,
} = require("./lib/scAccountMethods");

const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("./lib/dataTypes");

const {
  LOG_MODE,
  logSetup,
  setLogDefaults,
  setIndentPrefixLevel,
  setLogMode,
  logTestHeader,
  logFunctionHeader,
  logDetail,
  log,
} = require("./lib/logging");

const {
  dumpTestHHAccounts,
  dumpStructureTree,
  dumpStructureAccountSponsors,
  dumpStructureAccountKYC,
  dumpStructureSponsorAgents,
  getJSONStructureAccountSponsors,
  getJSONStructureAccountKYC,
  getJSONStructureSponsorAgents,
  // NetWork Calls
  dumpNetworkAccountSponsors,
  dumpNetworkAccountKYC,
  dumpNetworkSponsorAgents,
  getJSONNetworkAccountSponsors,
  getJSONNetworkAccountKYC,
  getJSONNetworkSponsorAgents,
  getNetworkAccountSponsors,
  getNetworkAccountKYC,
  getNetworkSponsorAgents,
} = require("./lib/dumpTreeStructures");

let account;
let sponsor;
let agent;

let spCoinContractDeployed;

logSetup("JAVASCRIPT => Setup Test");

describe("spCoinContract", function () {
  let spCoinContract;
  let msgSender;
  beforeEach(async () => {
    spCoinContract = await hre.ethers.getContractFactory("SPCoin");
    logSetup("JAVASCRIPT => spCoinContract retrieved from Factory");

    logSetup("JAVASCRIPT => Deploying spCoinContract to Network");
    spCoinContractDeployed = await spCoinContract.deploy();
    logSetup("JAVASCRIPT => spCoinContract is being mined");

    await spCoinContractDeployed.deployed();
    logSetup("JAVASCRIPT => spCoinContract Deployed to Network");
    msgSender = await spCoinContractDeployed.msgSender();

    setContract(spCoinContractDeployed);
    setLogDefaults();
  });

  /**/
  it("Dump Sponsor Coin Records", async function () {
    log("PRINT STRUCTURE TREE TESTS");
    // USAGE: addNetworkAccountSponsors(_accountRecIdx, _startSpIdx, _lastSpIdx);
    await addNetworkAccountSponsors(2, [1, 7, 14, 8, 18, 9]);
    await addNetworkAccountSponsors(2, [12]);
    await addNetworkAccountSponsors(3, [14, 17]);
    await addNetworkAccountSponsors(1, [5, 11, 13, 15]);
    await addNetworkAccountSponsors(14, [18, 19, 7]);
    await addNetworkAccountSponsors(3, [4]);
    await addNetworkAccountSponsors(1, [2, 5]);
    await addNetworkAccountSponsors(11, [5, 9, 0]);

    //        USAGE: addNetworkAccounts(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
    await addNetworkAccounts(1, 5, [7, 2, 17, 3, 9, 19]);
    await addNetworkAccounts(3, 6, [1]);
    await addNetworkAccounts(11, 18, [5, 7, 9, 6]);
    await addNetworkAccounts(14, 7, [1, 11, 0, 12, 2]);
    await addNetworkAccounts(14, 2, [3]);
    await addNetworkAccounts(14, 3, [1, 2]);
    await addNetworkAccounts(0, 2, [6, 7, 16]);

    let accountArr = await loadTreeStructures(spCoinContractDeployed);
    //        console.log(JSON.stringify(accountArr, null, 2));
    dumpStructureTree(accountArr);
  });
  /**/

  it("PRINT STRUCTURE ACCOUNT SPONSORS DATA", async function () {
    log("PRINT STRUCTURE ACCOUNT SPONSORS DATA");
    let accountKey = testHHAccounts[1];
    let recString = await addNetworkAccount(accountKey);
//    getAccountRecordCount();
  });
});
