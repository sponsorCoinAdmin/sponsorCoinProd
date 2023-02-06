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

        console.log("JAVASCRIPT => Name   = " + await spCoinContractDeployed.name());
        console.log("JAVASCRIPT => Symbol = " + await spCoinContractDeployed.symbol());

        let addr = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.isInserted(addr));
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.insertAccount(addr));
        console.log("JAVASCRIPT => Address "+ addr + " Inserted = " + await spCoinContractDeployed.isInserted(addr));

        expect(await spCoinContractDeployed.name()).to.equal("sponsorCoin");
        expect(await spCoinContractDeployed.symbol()).to.equal("SPCoin");
    });

});