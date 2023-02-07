const { expect } = require("chai");

describe("spCoinContract", function() {
    let spCoinContract;
    let spCoinContractDeployed;
    let msgSender;
    beforeEach(async() =>  {
        spCoinContract = await hre.ethers.getContractFactory("SPCoin");
        console.log("JAVASCRIPT => spCoinContract retreived from Factory");

        console.log("JAVASCRIPT => Deploying spCoinContract to Network");
        spCoinContractDeployed = await spCoinContract.deploy();
        console.log("JAVASCRIPT => spCoinContract is being mined");

        await spCoinContractDeployed.deployed();
        console.log("JAVASCRIPT => spCoinContract Deployed to Network");
        msgSender = await spCoinContractDeployed.msgSender();
    });

    it("Deployment should return correct parameter settings", async function () {
        console.log ("*** TEST ACCOUNT DEPLOYMENT ***");
        let testName         = "sponsorTestCoin";
        let testSymbol       = "SPTest";
        let testDecimals    = 3;
        let testTotalSupply = 10 * 10**testDecimals;
        let testMsgSender   = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        await spCoinContractDeployed.initToken(testName,  testSymbol, testDecimals, testTotalSupply);
        console.log("JAVASCRIPT => MsgSender = " + msgSender);
        console.log("JAVASCRIPT => Name      = " + await spCoinContractDeployed.name());
        console.log("JAVASCRIPT => Symbol    = " + await spCoinContractDeployed.symbol());
        console.log("JAVASCRIPT => Decimals  = " + await spCoinContractDeployed.decimals());
        console.log("JAVASCRIPT => balanceOf = " + await spCoinContractDeployed.balanceOf(msgSender));
        expect(await spCoinContractDeployed.msgSender()).to.equal(testMsgSender);
        expect(await spCoinContractDeployed.name()).to.equal(testName);
        expect(await spCoinContractDeployed.symbol()).to.equal(testSymbol);
        expect(await spCoinContractDeployed.decimals()).to.equal(testDecimals);
        expect(await spCoinContractDeployed.balanceOf(msgSender)).to.equal(testTotalSupply);
    });

    it("Account Insertion Validation", async function () {
        console.log ("*** TEST ACCOUNT INSERTION ***");
        let addr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        let recCount = await spCoinContractDeployed.getRecordCount();
        expect(recCount).to.equal(0);
        console.log("JAVASCRIPT => ** Before Inserted Record Count = " + recCount);
        let isInserted = await spCoinContractDeployed.isInserted(addr);
        console.log("JAVASCRIPT => Address "+ addr + " Before Inserted = " + isInserted);
        await spCoinContractDeployed.insertAccount(addr);
        isInserted = await spCoinContractDeployed.isInserted(addr);
        console.log("JAVASCRIPT => Address "+ addr + " After Inserted = " + isInserted);
        recCount = await spCoinContractDeployed.getRecordCount();
        console.log("JAVASCRIPT => ** After Inserted Record Count = " + await recCount);        
        expect(recCount).to.equal(1);
    });

    it("Insertion 20 Hardhat Accounts for Validation", async function () {
        console.log("*** ADD MORE HARDHAT ACCOUNTS ***")
        await insertHHArrayAccounts(spCoinContractDeployed);

        console.log("*** RETRIEVE ALL INSERTED RECORDS FROM THE BLOCKCHAIN ***")
        let insertedArrayAccounts = await getInsertedArrayAccounts(spCoinContractDeployed);
        let testHHAccounts = getTestHHAccounts();
        let testRecCount = testHHAccounts.length;
        let insertedRecCount = insertedArrayAccounts.length;
        expect(testRecCount).to.equal(insertedRecCount);

        for(idx = 0; idx < insertedRecCount; idx++) {
            expect(testHHAccounts[idx]).to.equal(insertedArrayAccounts[idx]);
            addr = insertedArrayAccounts[idx];
            console.log("JAVASCRIPT => Address Retrieved from Block Chain at Index " + idx + "  = "+ addr );
        }
        let scInsertedArray = getInsertedArrayAccounts(spCoinContractDeployed, insertedRecCount);

    });
});

insertHHArrayAccounts = async(spCoinContractDeployed) => {
    console.log("insertHHArrayAccounts = async(spCoinContractDeployed");
    let testHHAccounts = getTestHHAccounts();
    let recCount = testHHAccounts.length;
    console.log("Inserting " + recCount + " Records to Blockchain");

    for(idx = 0; idx < recCount; idx++){
        let addr = testHHAccounts[idx];
        console.log("Inserting " + idx + ", " + addr);
        await spCoinContractDeployed.insertAccount(addr);
    }
    console.log("JAVASCRIPT => ** Finally Inserted Record Count = " + recCount);
}

getInsertedArrayAccounts = async(spCoinContractDeployed) => {
    console.log("getInsertedArrayAccounts = async(spCoinContractDeployed)");
    let maxCount = await spCoinContractDeployed.getRecordCount();

    var insertedArrayAccounts = [];
    for(idx = 0; idx < maxCount; idx++){
       let addr = await spCoinContractDeployed.getAccount(idx);
//       console.log("JAVASCRIPT => Address at Index " + idx + "  = "+ addr );
       insertedArrayAccounts.push(addr);
    }
    return insertedArrayAccounts;
}

getTestHHAccounts = (spCoinContractDeployed, maxCount) => {

    let idx = 0;
    var testAccountArray = [];
    testAccountArray[idx++] = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    testAccountArray[idx++] = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    testAccountArray[idx++] = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
    testAccountArray[idx++] = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
    testAccountArray[idx++] = "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65";
    testAccountArray[idx++] = "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc";
    testAccountArray[idx++] = "0x976EA74026E726554dB657fA54763abd0C3a0aa9";
    testAccountArray[idx++] = "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955";
    testAccountArray[idx++] = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f";
    testAccountArray[idx++] = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";
    testAccountArray[idx++] = "0xBcd4042DE499D14e55001CcbB24a551F3b954096";
    testAccountArray[idx++] = "0x71bE63f3384f5fb98995898A86B02Fb2426c5788";
    testAccountArray[idx++] = "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a";
    testAccountArray[idx++] = "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec";
    testAccountArray[idx++] = "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097";
    testAccountArray[idx++] = "0xcd3B766CCDd6AE721141F452C550Ca635964ce71";
    testAccountArray[idx++] = "0x2546BcD3c84621e976D8185a91A922aE77ECEc30";
    testAccountArray[idx++] = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
    testAccountArray[idx++] = "0xdD2FD4581271e230360230F9337D5c0430Bf44C0";
    testAccountArray[idx++] = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
    console.log("getTestHHAccounts = " + idx + ")");

    return testAccountArray;
}
