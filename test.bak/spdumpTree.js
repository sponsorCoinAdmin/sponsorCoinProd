const { expect } = require("chai");
const { testHHAccounts } = require("./lib/hhTestAccounts");
const { setContract,
        insertSponsorAccounts,
//        insertAgentAccounts 
      } = require("./lib/scMethods");
const { loggers } = require("./lib/logging");

class accountStruct {
    constructor(address) {
        this.address = address;
        this.sponsors;
        this.index;
        this.insertionTime;
        this.inserted;
        this.KYC;   
      }
 }
 class sponsorRec {
    constructor(address) {
        this.address = address;
        this.rate;
        this.verified;
    }
 }
 class agentRec {
    constructor(address) {
        this.address = address;
        this.rate;
        this.verified;
    }
 }

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
        const JUNKTestAccounts = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
                        "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
                        "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"];

//        let accountsInserted = await insertArrayAccounts(JUNKTestAccounts);

        // USAGE: insertSponsorAccounts(_accountRecIdx, _startSpIdx, _lastSpIdx);
        // await insertSponsorAccounts(2, [1, 7, 14, 7, 18, 9]);
        // await insertSponsorAccounts(3, [14, 17]);
        // await insertSponsorAccounts(1, [5, 11, 13,15]);
        // await insertSponsorAccounts(14, [18, 19, 7]);
        // await insertSponsorAccounts(3, [4]);
           await insertSponsorAccounts(1, [2, 5]);
        // await insertSponsorAccounts(11, [5, 9, 0]);

//        USAGE: insertAgentAccounts(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
        // await insertAgentAccounts(1, 5, [7, 2, 17, 3, 9, 19]);
        // await insertAgentAccounts(3, 6, [1]);
        // await insertAgentAccounts(11, 18, [5, 7, 9, 6]);
        // await insertAgentAccounts(14, 7, [1, 11, 0, 12, 2]);
        // await insertAgentAccounts(14, 2, [3]);
        // await insertAgentAccounts(14, 3, [1, 2]);
        // await insertAgentAccounts(0, 2, [6, 7, 16]);

        await dumpAccounts();
    });
});

/*
insertAgentAccounts = async(_accountRecIdx, _sponsorRecIdx, _agentArr ) => {
    logFunctionHeader("insertAgentAccounts = async(" + _sponsorRecIdx + ", " + _agentArr + ")");
    let accountRec = testHHAccounts[_accountRecIdx];
    let sponsorRec = testHHAccounts[_sponsorRecIdx];
    let prefix = "        ";
    logDetail(prefix + "For Account [" + _accountRecIdx + "]: " + accountRec + ")");
    logDetail(prefix + "For Sponsor [" + _sponsorRecIdx + "]: " + sponsorRec + ")");
    let recCount = 0;
    let agentCount = _agentArr.length;
    logDetail ("_agentArr = " + _agentArr);
    logDetail ("agentCount.length = " + agentCount);
    for (let i = 0; i < agentCount; i++) {
        let agentRec = testHHAccounts[_agentArr[i]];
        logDetail(prefix + ++recCount + ". " + "Inserting Agent[" + _agentArr[i] + "]: " + agentRec);
        await spCoinContractDeployed.insertSponsorAgent(accountRec, sponsorRec, agentRec);
    }
    agentCount = await spCoinContractDeployed.getAgentRecordCount(accountRec, sponsorRec);
    logDetail(prefix + "Inserted = " + agentCount + " Agent Records");
    return agentCount;
}

insertSponsorAccounts = async(_accountRecIdx, _sponsorArr ) => {
    logFunctionHeader("insertSponsorAccounts = async(" + _accountRecIdx + ", " + _sponsorArr + ")");
    let accountRec = testHHAccounts[_accountRecIdx];

    logDetail("For Account[" + _accountRecIdx + "]: " + accountRec + ")");
    let recCount = 0;
    let sponsorCount = _sponsorArr.length;
    logDetail ("_sponsorArr = " + _sponsorArr);
    logDetail ("sponsorCount.length = " + sponsorCount);
    for (let i = 0; i < sponsorCount; i++) {
        let sponsorRec = testHHAccounts[_sponsorArr[i]];
        logDetail("   "+ ++recCount + ". " + "Inserting Sponsor[" + _sponsorArr[i] + "]: " + sponsorRec);
        await spCoinContractDeployed.insertAccountSponsor(accountRec, sponsorRec);
    }
    sponsorCount = await spCoinContractDeployed.getSponsorRecordCount(accountRec);
    logDetail("Inserted = " + sponsorCount + " Sponsor Records");
    return sponsorCount;
}
*/

insertArrayAccounts = async(_arrayAccounts) => {
    logFunctionHeader("insertArrayAccounts = async(arrayAccounts)");
    let recCount = _arrayAccounts.length;
    logDetail("Inserting " + recCount + " Records to Blockchain");

    for(idx = 0; idx < recCount; idx++){
        let account = _arrayAccounts[idx];
        logDetail("Inserting " + idx + ", " + account);
        await spCoinContractDeployed.insertAccount(account);
    }
    logDetail("JAVASCRIPT => ** Inserted " + recCount + " Accounts");
    return recCount;
}

getInsertedAccounts = async() => {
    logFunctionHeader("getInsertedAccounts = async()");
    let maxCount = await spCoinContractDeployed.getAccountRecordCount();

    var insertedArrayAccounts = [];
    for(idx = 0; idx < maxCount; idx++){
       let account = await spCoinContractDeployed.getAccount(idx);
       logDetail("JAVASCRIPT => Address at Index " + idx + "  = "+ account );
       insertedArrayAccounts.push(account);
    }
    return insertedArrayAccounts;
}

getInsertedAccountSponsors = async(_prefix, _accountKey) => {
    logFunctionHeader("getInsertedAccountSponsors = async(" + _prefix + ", " + _accountKey + ")");
    let maxCount = await spCoinContractDeployed.getSponsorRecordCount(_accountKey);
    
        let insertedAccountSponsors = [];
        for(let idx = 0; idx < maxCount; idx++) {
           let sponsor = await spCoinContractDeployed.getAccountSponsorAddress(_accountKey, idx);
           logDetail(_prefix + "[" + idx + "]: " + sponsor );
           insertedAccountSponsors.push(sponsor);
        }
        return insertedAccountSponsors;
    }

getInsertedSponsorAgents = async(_prefix, _accountKey, _sponsorKey) => {
//    logFunctionHeader("getInsertedSponsorAgents = async(" + _prefix + ", " + _sponsorKey + ")");
    let maxCount = await spCoinContractDeployed.getAgentRecordCount(_accountKey, _sponsorKey);
//    console.log("        JAVASCRIPT => Found " + maxCount + " Agents for Sponsor account " + _sponsorKey)
    let insertedSponsorAgents = [];
    for(let idx = 0; idx < maxCount; idx++) {
        let agent = await spCoinContractDeployed.getAgentKeyAddress(_accountKey, _sponsorKey, idx);
//        console.log(_prefix + "[" + idx + "]: " + agent );
        insertedSponsorAgents.push(agent);
    }
    return insertedSponsorAgents;
}
            
dumpAccounts = async(_preix) => {
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
  
dumpArray = (_prefix, _arr) => {
    logFunctionHeader("dumpArray = async(" + _prefix + ", _arr)");
    let maxCount = _arr.length;
//    logDetail("DUMPING " + maxCount + " RECORDS");
    for(idx = 0; idx < maxCount; idx++) {
        let element = _arr[idx];
        log(_prefix + idx + ": " + element );
      }
}

// ************************* LOGGING SECTION ******************************/
let LOGGING = true;
let LOG_DETAIL = false;
let LOG_TEST_HEADER = false;
let LOG_FUNCTION_HEADER = false;
let LOG_SETUP = false;

logSetup = (details) => {
    if (LOG_SETUP) {
        log(details);
    }
}

logTestHeader = (testHeader) => {
    if (LOG_TEST_HEADER) {
        log("=============== TEST HEADER " + testHeader + " ===============");
    }
}

logFunctionHeader = (functionHeader) => {
    if (LOG_FUNCTION_HEADER) {
        log("************** HEADER FUNCTION " + functionHeader + " **************");
    }
}

logDetail = (details) => {
    if (LOG_DETAIL) {
        log(details);
    }
}

log = (text) => {
    if (LOGGING) {
        console.log(text);
    }
}