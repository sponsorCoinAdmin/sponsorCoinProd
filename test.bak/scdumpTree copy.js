const { expect } = require("chai");
const { testHHAccounts } = require("./lib/hhTestAccounts");
const {} = require("../test/lib/scAccountMethods");
const {} = require("../test/lib/logging");

let account;
let sponsor;
let agent;

let spCoinContractDeployed;

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

        await dumpAccounts();
    });
});

dumpAccounts = async() => {
    logFunctionHeader("dumpAccounts = async()");
    log("************************* dumpAccounts() *************************");
    let insertedArrayAccounts = await getInsertedAccounts();
//    dumpArray("Record ", insertedArrayAccounts);
    let maxCount = insertedArrayAccounts.length;
//    logDetail("DUMPING " + maxCount + " ACCOUNT RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let account = insertedArrayAccounts[idx];
        log("Account[" + idx + "]:" + account );
        await dumpAccountSponsors("   ", account);
    }
    return insertedArrayAccounts;
}

dumpAccountSponsors = async(_prefix, _accountKey) => {
    logFunctionHeader("dumpAccountSponsors = async(" + _accountKey + ")");
    insertedAccountSponsors = await getInsertedAccountSponsors("Sponsor", _accountKey);
    let maxCount = insertedAccountSponsors.length;
    logDetail("   DUMPING " + maxCount + " SPONSOR RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let sponsorKey = insertedAccountSponsors[idx];
        let sponsorIndex = await spCoinContractDeployed.getSponsorIndex(_accountKey, sponsorKey);
        let sponsorActIdx = await spCoinContractDeployed.getAccountIndex(sponsorKey);
        log(_prefix + "Sponsor[" + sponsorIndex + "] => Account[" + sponsorActIdx + "]:" + sponsorKey );
        await dumpSponsorAgents("       ", _accountKey, sponsorKey);
    }
    return insertedAccountSponsors;
}
            
dumpSponsorAgents = async(_prefix, _accountKey, _sponsorKey) => {
    logFunctionHeader("dumpSponsorAgents = async(" + _accountKey + ", " + _sponsorKey + ")");
    let insertedSponsorAgents = await getInsertedSponsorAgents("Agent", _accountKey, _sponsorKey);
    let maxCount = insertedSponsorAgents.length;
//    log("        DUMPING " + maxCount + " AGENT RECORDS FOR SPONSOR " + _sponsorKey);
    for(let idx = 0; idx < maxCount; idx++) {
        let agentKey = insertedSponsorAgents[idx];
        let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorKey, agentKey);
        let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentKey);
        log(_prefix + "Agent[" + agentIndex + "] => Account[" + agentActIdx + "]:" + agentKey );
    }
    return insertedSponsorAgents;
}
 
