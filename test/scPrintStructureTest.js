const { expect } = require("chai");
const {} = require("./lib/loadTreeStructures");
const { testHHAccounts } = require("./lib/hhTestAccounts");
const {
  setContract,
  addNetworkAccount,
  addNetworkAccountSponsors,
  addNetworkSponsorAgents,
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
  logAccountStructure,
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

logSetup("JS => Setup Test");

describe("spCoinContract", function () {
  let spCoinContract;
  let msgSender;
  beforeEach(async () => {
    spCoinContract = await hre.ethers.getContractFactory("SPCoin");
    logSetup("JS => spCoinContract retrieved from Factory");

    logSetup("JS => Deploying spCoinContract to Network");
    spCoinContractDeployed = await spCoinContract.deploy();
    logSetup("JS => spCoinContract is being mined");

    await spCoinContractDeployed.deployed();
    logSetup("JS => spCoinContract Deployed to Network");
    msgSender = await spCoinContractDeployed.msgSender();

    setContract(spCoinContractDeployed);
    setLogDefaults();
  });

  /*
  it("PRINT STRUCTURE TREE TESTS", async function () {
    // USAGE: addNetworkAccountSponsors(_accountRecIdx, _startSpIdx, _lastSpIdx);
    // await addNetworkAccountSponsors(2, [1, 7, 14, 8, 18, 9]);
    // await addNetworkAccountSponsors(2, [12]);
    // await addNetworkAccountSponsors(3, [14, 17]);
    // await addNetworkAccountSponsors(1, [5, 11, 13, 15]);
    // await addNetworkAccountSponsors(14, [18, 19, 7]);
    // await addNetworkAccountSponsors(3, [4]);
    // await addNetworkAccountSponsors(1, [2, 5]);
    // await addNetworkAccountSponsors(11, [5, 9, 0]);

    //        USAGE: addNetworkSponsorAgents(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
    await addNetworkSponsorAgents(1, 5, [7, 2, 17, 3, 9, 19]);
    // await addNetworkSponsorAgents(3, 6, [1]);
    // await addNetworkSponsorAgents(11, 18, [5, 7, 9, 6]);
    // await addNetworkSponsorAgents(14, 7, [1, 11, 0, 12, 2]);
    // await addNetworkSponsorAgents(14, 2, [3]);
    // await addNetworkSponsorAgents(14, 3, [1, 2]);
    // await addNetworkSponsorAgents(0, 2, [6, 7, 16]);

    let accountArr = await loadTreeStructures(spCoinContractDeployed);
    //        console.log(JSON.stringify(accountArr, null, 2));
    dumpStructureTree(accountArr);
  });
  /**/

  it("PRINT STRUCTURE ACCOUNT SPONSORS DATA", async function () {
    setLogMode(LOG_MODE.LOG, true);
    // Test Record Insertion to Blockchain Network
    let accountKey = await addAccountTestRecordToNetwork(0);
    let accountRecCount = await getAccountRecordCount();
    expect(accountRecCount).to.equal(1);

    // Test Record Structure Read from Blockchain Network
    let accountStruct = await getNetworkAccountRec(accountKey);
    logAccountStructure(accountStruct);
    let networkAccountKey = accountStruct.accountKey;
    expect(networkAccountKey).to.equal(accountKey);

    // Test Duplicate Record Cannot be Inserted to Blockchain Network
    accountKey = await addAccountTestRecordToNetwork(0);
    accountRecCount = await getAccountRecordCount();
    expect(accountRecCount).to.equal(1);

    // Test Second Record Insertion to blockchain Network
    accountKey = await addAccountTestRecordToNetwork(4);
    accountRecCount = await getAccountRecordCount();
    expect(accountRecCount).to.equal(2);

    // Test N Record Insertions to blockchain Network
    accountKey = await addAccountTestRecordToNetwork(7);
    accountKey = await addAccountTestRecordToNetwork(6);
    accountKey = await addAccountTestRecordToNetwork(12);
    accountKey = await addAccountTestRecordToNetwork(15);
    accountRecCount = await getAccountRecordCount();
    expect(accountRecCount).to.equal(6);
  });
  /**/

  // TEST FUNCTIONS ONLY
  addAccountTestRecordToNetwork = async (testRecordNumber) => {
    let accountKey = testHHAccounts[testRecordNumber].toLowerCase();
    await addNetworkAccount(accountKey);
    return accountKey;
    
  }

});
