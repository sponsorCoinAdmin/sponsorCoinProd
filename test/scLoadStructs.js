const { expect } = require("chai");
const {} = require("./lib/loadTreeStructures");
const { testHHAccounts } = require("./lib/hhTestAccounts");
const {   setContract,
          insertAccounts,
          insertSponsorAccounts,
          insertAgentAccounts,
          getInsertedAccounts,
          getInsertedAccountSponsors, 
          getInsertedSponsorAgents,
    } = require("./lib/scAccountMethods");

const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct
    } = require("./lib/dataTypes");

const {     
    LOG_MODE,
    setLogDefaults,
    setIndentPrefixLevel,
    logSetup,
    setLogMode,
    logTestHeader,
    logFunctionHeader,
    logDetail,
    log
} = require("./lib/logging");

let account;
let sponsor;
let agent;

let spCoinContractDeployed;

logSetup("JAVASCRIPT => Setup Test");

describe("spCoinContract", function() {
    let spCoinContract;
    let msgSender;
    beforeEach(async() =>  {
        spCoinContract = await hre.ethers.getContractFactory("SPCoin");
        logSetup("JAVASCRIPT => spCoinContract retreived from Factory");

        logSetup("JAVASCRIPT => Deploying spCoinContract to Network");
        spCoinContractDeployed = await spCoinContract.deploy();
        logSetup("JAVASCRIPT => spCoinContract is being mined");

        await spCoinContractDeployed.deployed();
        logSetup("JAVASCRIPT => spCoinContract Deployed to Network");
        msgSender = await spCoinContractDeployed.msgSender();

        setContract(spCoinContractDeployed);
        setLogDefaults();
    });

    it("Dump Sponsor Coin Records", async function () {
        log("DUMP Sponsor Coin Records");
        // USAGE: insertSponsorAccounts(_accountRecIdx, _startSpIdx, _lastSpIdx);
        await insertSponsorAccounts(2, [1, 7, 14, 7, 18, 9]);
        await insertSponsorAccounts(3, [14, 17]);
        await insertSponsorAccounts(1, [5, 11, 13,15]);
        await insertSponsorAccounts(14, [18, 19, 7]);
        await insertSponsorAccounts(3, [4]);
        await insertSponsorAccounts(1, [2, 5]);
        await insertSponsorAccounts(11, [5, 9, 0]);

//        USAGE: insertAgentAccounts(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
        await insertAgentAccounts(1, 5, [7, 2, 17, 3, 9, 19]);
        await insertAgentAccounts(3, 6, [1]);
        await insertAgentAccounts(11, 18, [5, 7, 9, 6]);
        await insertAgentAccounts(14, 7, [1, 11, 0, 12, 2]);
        await insertAgentAccounts(14, 2, [3]);
        await insertAgentAccounts(14, 3, [1, 2]);
        await insertAgentAccounts(0, 2, [6, 7, 16]);

        let accountStruct = await loadTreeStructures(spCoinContractDeployed);
    });
});
