const { expect } = require("chai");
const { loggers } = require("./lib/logging");

class accountRec {
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
//let scTree[] = {account, sponsor, agent};


let spCoinContractDeployed;
const testHHAccounts = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
                        "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
                        "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
                        "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
                        "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
                        "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
                        "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
                        "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
                        "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
                        "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
                        "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
                        "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
                        "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
                        "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
                        "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
                        "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
                        "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
                        "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"];

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
    });

    it("Deployment should return correct parameter settings", async function () {
        logTestHeader("TEST ACCOUNT DEPLOYMENT");
        let testName         = "sponsorTestCoin";
        let testSymbol       = "SPTest";
        let testDecimals    = 3;
        let testTotalSupply = 10 * 10**testDecimals;
        let testMsgSender   = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        await spCoinContractDeployed.initToken(testName,  testSymbol, testDecimals, testTotalSupply);
        logDetails("JAVASCRIPT => MsgSender = " + msgSender);
        logDetails("JAVASCRIPT => Name      = " + await spCoinContractDeployed.name());
        logDetails("JAVASCRIPT => Symbol    = " + await spCoinContractDeployed.symbol());
        logDetails("JAVASCRIPT => Decimals  = " + await spCoinContractDeployed.decimals());
        logDetails("JAVASCRIPT => balanceOf = " + await spCoinContractDeployed.balanceOf(msgSender));
        expect(await spCoinContractDeployed.msgSender()).to.equal(testMsgSender);
        expect(await spCoinContractDeployed.name()).to.equal(testName);
        expect(await spCoinContractDeployed.symbol()).to.equal(testSymbol);
        expect(await spCoinContractDeployed.decimals()).to.equal(testDecimals);
        expect(await spCoinContractDeployed.balanceOf(msgSender)).to.equal(testTotalSupply);
    });

    it("Account Insertion Validation", async function () {
        logTestHeader("TEST ACCOUNT INSERTION");
        let addr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        let recCount = await spCoinContractDeployed.getAccountRecordCount();
        expect(recCount).to.equal(0);
        logDetails("JAVASCRIPT => ** Before Inserted Record Count = " + recCount);
        let isInserted = await spCoinContractDeployed.isInserted(addr);
        logDetails("JAVASCRIPT => Address "+ addr + " Before Inserted Record Found = " + isInserted);
        await spCoinContractDeployed.insertAccount(addr);
        isInserted = await spCoinContractDeployed.isInserted(addr);
        logDetails("JAVASCRIPT => Address "+ addr + " After Inserted Record Found = " + isInserted);
        recCount = await spCoinContractDeployed.getAccountRecordCount();
        logDetails("JAVASCRIPT => ** After Inserted Record Count = " + await recCount);        
        expect(recCount).to.equal(1);
    });

    it("Insertion 20 Hardhat Accounts for Validation", async function () {
        logTestHeader("ADD MORE HARDHAT ACCOUNTS")
        await insertHHTestAccounts();

        logDetails("*** RETRIEVE ALL INSERTED RECORDS FROM THE BLOCKCHAIN ***")
        let insertedArrayAccounts = await getInsertedAccounts();
        let testRecCount = testHHAccounts.length;
        let insertedRecCount = insertedArrayAccounts.length;
        expect(testRecCount).to.equal(insertedRecCount);

        for(idx = 0; idx < insertedRecCount; idx++) {
            expect(testHHAccounts[idx]).to.equal(insertedArrayAccounts[idx]);
            addr = insertedArrayAccounts[idx];
            logDetails("JAVASCRIPT => Address Retrieved from Block Chain at Index " + idx + "  = "+ addr );
        }
    });
    
    it("Insertion Sponsor Coin Records Hardhat Accounts for Validation", async function () {
        logTestHeader("TEST MORE HARDHAT SPONSOR RECORD INSERTIONS")
        await insertHHTestAccounts();

        logDetails("*** Insert Sponsor to AccountRecord[2] as AccountRecord[5] ***")
        let startRec = 4;
        let endRec = 15;
        let insertCount = await insertSponsorRecords(0, 4, 15);
        expect(insertCount).to.equal(endRec-startRec+1);
    });

    it("Dump Sponsor Coin Records", async function () {
        logTestHeader("DUMP Sponsor Coin Records");
        await insertHHTestAccounts();
        await insertSponsorRecords(1,2,5);
        await insertSponsorRecords(2,1,7);
        await insertSponsorRecords(3,6,17);
        await insertSponsorRecords(1,5,7);
        await insertSponsorRecords(11,18,19);
        await dumpAccounts("Account");
    });
});

insertSponsorRecords = async(accountRecIdx, startSpIdx, lastSpIdx ) => {
    logTestHeader("insertSponsorRecords = async(" + accountRecIdx + ", " + startSpIdx + ", " + lastSpIdx + ")");
    let accountRec = testHHAccounts[accountRecIdx];

    logDetails("For Account[" + accountRecIdx + "]: " + accountRec + ")");
    let recCount = 0;
    for (let i = startSpIdx; i <= lastSpIdx; i++) {
        let sponsorRec = testHHAccounts[i];
        logDetails("   "+ ++recCount + ". " + "Inserting Sponsor[" + i + "]: " + sponsorRec);
        await spCoinContractDeployed.insertAccountSponsor(accountRec, sponsorRec);
    }
    let sponsorCount = await spCoinContractDeployed.getSponsorRecordCount(accountRec);
    logDetails("Inserted = " + sponsorCount + " Sponsor Records");
    return sponsorCount;
}

insertHHTestAccounts = async() => {
    logFunctionHeader("insertHHTestAccounts = async()");
    return await insertArrayAccounts(testHHAccounts);
}

insertArrayAccounts = async(arrayAccounts) => {
    logFunctionHeader("insertArrayAccounts = async(arrayAccounts)");
    let recCount = testHHAccounts.length;
    logDetails("Inserting " + recCount + " Records to Blockchain");

    for(idx = 0; idx < recCount; idx++){
        let addr = testHHAccounts[idx];
//        logDetails("Inserting " + idx + ", " + addr);
        await spCoinContractDeployed.insertAccount(addr);
    }
    logDetails("JAVASCRIPT => ** Finally Inserted Record Count = " + recCount);
    return testHHAccounts;
}

getInsertedAccounts = async() => {
    logFunctionHeader("getInsertedAccounts = async()");
    let maxCount = await spCoinContractDeployed.getAccountRecordCount();

    var insertedArrayAccounts = [];
    for(idx = 0; idx < maxCount; idx++){
       let addr = await spCoinContractDeployed.getAccount(idx);
       logDetails("JAVASCRIPT => Address at Index " + idx + "  = "+ addr );
       insertedArrayAccounts.push(addr);
    }
    return insertedArrayAccounts;
}

getInsertedAccountSponsors = async(prefix, _accountKey) => {
//    logFunctionHeader("getInsertedAccountSponsors = async(" + prefix + ", " + _accountKey + ")");
    let maxCount = await spCoinContractDeployed.getSponsorRecordCount(_accountKey);

    let insertedAccountSponsors = [];
    for(let idx = 0; idx < maxCount; idx++) {
       let addr = await spCoinContractDeployed.getAccountSponsorKey(_accountKey, idx);
//       console.log(prefix + "[" + idx + "]: " + addr );
       insertedAccountSponsors.push(addr);
    }
    return insertedAccountSponsors;
}

dumpAccounts = async(prefix) => {
//    logFunctionHeader("dumpAccounts = async()");
    let insertedArrayAccounts = await getInsertedAccounts();
//    dumpArray("Record ", insertedArrayAccounts);
    let maxCount = insertedArrayAccounts.length;
//    logDetails("DUMPING " + maxCount + " ACCOUNT RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let addr = insertedArrayAccounts[idx];
        console.log(prefix + "[" + idx + "]: " + addr );
        await dumpAccountSponsors("   Sponsor", addr);
    }
    return insertedArrayAccounts;
}

dumpAccountSponsors = async(prefix, account) => {
//    logFunctionHeader("dumpAccountSponsors = async(" + account + ")");
    insertedAccountSponsors = await getInsertedAccountSponsors("Sponsor", account);
    let maxCount = insertedAccountSponsors.length;
//    logDetails("   DUMPING " + maxCount + " SPONSOR RECORDS");
    for(let idx = 0; idx < maxCount; idx++) {
        let addr = insertedAccountSponsors[idx];
        log(prefix + "[" + idx + "]: " + addr );
    }
    return insertedAccountSponsors;
}

dumpArray = (prefix, arr) => {
    logFunctionHeader("dumpArray = async(" + prefix + ", arr)");
    let maxCount = arr.length;
//    logDetails("DUMPING " + maxCount + " RECORDS");
    for(idx = 0; idx < maxCount; idx++) {
        let addr = arr[idx];
        log(prefix + idx + ": " + addr );
      }
}

// ************************* LOGGING SECTION ******************************/
let LOGGING = true;
let LOG_DETAILS = false;
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
        log("==============================================================================");
        log("************** " + testHeader + " **************");
    }
}

logFunctionHeader = (functionHeader) => {
    if (LOG_FUNCTION_HEADER) {
        log("******************************************************************************");
        log("************** " + functionHeader + " **************");
    }
}

logDetails = (details) => {
    if (LOG_DETAILS) {
        log(details);
    }
}

log = (text) => {
    if (LOGGING) {
        console.log(text);
    }
}