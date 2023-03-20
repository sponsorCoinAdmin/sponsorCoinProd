const { expect } = require("chai");

const { testHHAccounts } = require("./testMethods/hhTestAccounts");
const { addTestNetworkPatreonSponsors,
    addTestNetworkSponsorAgents,
    addTestNetworkAccount,
    getTestHHAccountListKeys
  } = require("../test/testMethods/scTestMethods");

const {    
    LOG_MODE,
    setLogDefaults,
    logSetup,
    setLogMode,
    logTestHeader,
    logFunctionHeader,
    logDetail,
    log
    } = require("../test/prod/lib/utils/logging");

    const {
        deployContract,
        loadSpCoinContract 
      } = require("../test/prod/deployContract");

logSetup("JS => Setup Test");

let spCoinContractDeployed;

describe("spCoinContract", function() {
    beforeEach(async() =>  {
        spCoinContractDeployed = await loadSpCoinContract();
    });

/**/

    it("Deployment ~ Validating ERC20 standard parameter settings", async function () {
        // setLogMode(LOG_MODE.LOG, true);
        // setLogMode(LOG_MODE.LOG_DETAIL, true);
        // setLogMode(LOG_MODE.LOG_TEST_HEADER, true);
        // setLogMode(LOG_MODE.LOG_FUNCTION_HEADER, true);
        // setLogMode(LOG_MODE.LOG_SETUP, true);
        logTestHeader("ACCOUNT DEPLOYMENT");
        let testName         = "sponsorTestCoin";
        let testSymbol       = "SPTest";
        let testDecimals    = 3;
        let testTotalSupply = 10 * 10**testDecimals;
        let testMsgSender   = testHHAccounts[0];
        log("**** BEFORE ACCOUNT DEPLOYMENT");
        await spCoinContractDeployed.initToken(testName,  testSymbol, testDecimals, testTotalSupply);
        log("JS => Name      = " + await spCoinContractDeployed.name());
        log("JS => Symbol    = " + await spCoinContractDeployed.symbol());
        log("JS => Decimals  = " + await spCoinContractDeployed.decimals());
        log("JS => balanceOf = " + await spCoinContractDeployed.balanceOf(testMsgSender));
        expect(await spCoinContractDeployed.msgSender()).to.equal(testMsgSender);

        let solName = await spCoinContractDeployed.name();
        let solSymbol = await spCoinContractDeployed.symbol();
        let solBalanceOf = (await spCoinContractDeployed.balanceOf(testMsgSender)).toNumber();
        let solDecimals = (await spCoinContractDeployed.decimals()).toNumber();
        
        expect(solName).to.equal(testName);
        expect(solSymbol).to.equal(testSymbol);
        expect(solBalanceOf).to.equal(testTotalSupply);
        expect(solDecimals).to.equal(testDecimals);
    });

/**/

    it("Account Insertion Validation", async function () {
        logTestHeader("TEST ACCOUNT INSERTION");
        let accountKey = testHHAccounts[0];
        let recCount = await spCoinContractDeployed.getAccountListSize();
        expect(recCount.toNumber()).to.equal(0);
        logDetail("JS => ** Before Inserted Record Count = " + recCount);
        let isAccountInserted = await spCoinContractDeployed.isAccountInserted(accountKey);
        logDetail("JS => Address "+ accountKey + " Before Inserted Record Found = " + isAccountInserted);
        await spCoinContractDeployed.addAccountRecord(accountKey);
        isAccountInserted = await spCoinContractDeployed.isAccountInserted(accountKey);
        logDetail("JS => Address "+ accountKey + " After Inserted Record Found = " + isAccountInserted);
        recCount = (await spCoinContractDeployed.getAccountListSize()).toNumber();
        logDetail("JS => ** After Inserted Record Count = " + await recCount);        
        expect(recCount).to.equal(1);
    });

/**/

    it("Insertion 20 Hardhat Accounts for Validation", async function () {
        logTestHeader("ADD MORE HARDHAT ACCOUNTS")
        await addAccountRecords(testHHAccounts);

        logDetail("JS => *** RETRIEVE ALL INSERTED RECORDS FROM THE BLOCKCHAIN ***")
        let insertedListAccounts = await getAccountKeys();
        let testRecCount = testHHAccounts.length;
        let insertedRecCount = insertedListAccounts.length;
        expect(testRecCount).to.equal(insertedRecCount);

        for(idx = 0; idx < insertedRecCount; idx++) {
            expect(testHHAccounts[idx]).to.equal(insertedListAccounts[idx]);
            let accountKey = insertedListAccounts[idx];
            logDetail("JS => Address Retrieved from Block Chain at Index " + idx + "  = "+ accountKey );
        }
    });
    /**/

    it("Insert 4 Sponsor Coin Records 1 count, 1 sponsor and 2 Agents", async function () {
        logTestHeader("TEST MORE HARDHAT SPONSOR RECORD INSERTIONS")

        logDetail("JS => *** Insert Sponsor to AccountRecord[2] as AccountRecord[5] ***")
        let startRec = 4;
        let endRec = 15;
        await addTestNetworkSponsorAgents(3, 6, [1, 2]);
        let insertCount = (await spCoinContractDeployed.getAccountListSize()).toNumber();
        expect(insertCount).to.equal(4);
    });
    /**/
});
