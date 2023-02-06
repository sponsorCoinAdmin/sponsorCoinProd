const { expect } = require("chai");
describe("spCoinContract", function() {

    it("should return correct name and symbol", async function () {

        console.log("JAVASCRIPT => spCoinContract retreived from Factory");
        const spCoinContract = await hre.ethers.getContractFactory("SPCoin");

        console.log("JAVASCRIPT => Deploying spCoinContract to Network");
        const spCoinContractDeployed = await spCoinContract.deploy();
        console.log("JAVASCRIPT => spCoinContract is being mined");

        await spCoinContractDeployed.deployed();
        console.log("JAVASCRIPT => spCoinContract Deployed to Network");

        let msgSender = await spCoinContractDeployed.msgSender();
        
        console.log ("*** TEST ACCOUNT DEPLOYMENT ***");
        console.log("JAVASCRIPT => MsgSender = " + msgSender);
        console.log("JAVASCRIPT => Name      = " + await spCoinContractDeployed.name());
        console.log("JAVASCRIPT => balanceOf = " + await spCoinContractDeployed.balanceOf(msgSender));
        console.log("JAVASCRIPT => Symbol    = " + await spCoinContractDeployed.symbol());
        console.log("JAVASCRIPT => Decimals  = " + await spCoinContractDeployed.decimals());

        console.log ("*** TEST ACCOUNT INSERTION ***");
        let addr = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
        console.log("JAVASCRIPT => ** Before Inserted Record Count = " + await spCoinContractDeployed.getRecCount());        
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.isInserted(addr));
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.isInserted(addr));
        console.log("JAVASCRIPT => ** After Inserted Record Count = " + await spCoinContractDeployed.getRecCount());        

        console.log("*** ADD MORE ACCOUNTS ***")
        addr = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));

        addr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x976EA74026E726554dB657fA54763abd0C3a0aa9";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0xBcd4042DE499D14e55001CcbB24a551F3b954096";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x71bE63f3384f5fb98995898A86B02Fb2426c5788";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0xcd3B766CCDd6AE721141F452C550Ca635964ce71";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0x2546BcD3c84621e976D8185a91A922aE77ECEc30";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        addr = "0xdD2FD4581271e230360230F9337D5c0430Bf44C0";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        let recCount = await spCoinContractDeployed.getRecCount();
        console.log("JAVASCRIPT => ** Finally Inserted Record Count = " + recCount);        

        console.log("*** RETRIEVE ALL INSERTED RECORDS FROM THE BLOCKCHAIN ***")
        for(idx = 0; idx < recCount; idx++) {
            let addr = await spCoinContractDeployed.getAccount(idx);
            console.log("JAVASCRIPT => Address Retrieved from Block Chain at Index " + idx + "  = "+ addr );
        }
        //getAccountArr(spCoinContractDeployed, recCount);

        expect(await spCoinContractDeployed.name()).to.equal("sponsorCoin");
        expect(await spCoinContractDeployed.symbol()).to.equal("SPCoin");
    });

});

/** TO Do Fix 
function async getAccountArr(spCoinContractDeployed, maxCount) {
    var addressArray = [];
    for(idx = 0; idx < maxCount; idx++){
       let addr = await spCoinContractDeployed.getAccount(idx);
       console.log("JAVASCRIPT => Address at Index " + idx + "  = "+ addr );
       addressArray.push(addr);
    }
    return addressArray;
}
*/