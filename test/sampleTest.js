const { expect } = require("chai");
describe("MyContract", function() {

    it("should return correct name and symbol", async function () {

        console.log("JAVASCRIPT => MyContract retreived from Factory");
        const MyContract = await hre.ethers.getContractFactory("TestContract");

        console.log("JAVASCRIPT => Deploying MyContract to Network");
        const myContractDeployed = await MyContract.deploy("TestContractName", "TEST_SYM");
        console.log("JAVASCRIPT => MyContract is being mined");

        await myContractDeployed.deployed();
        console.log("JAVASCRIPT => MyContract Deployed to Network");

        console.log("JAVASCRIPT => Name   = " + await myContractDeployed.name());
        console.log("JAVASCRIPT => Symbol = " + await myContractDeployed.symbol());

        expect(await myContractDeployed.name()).to.equal("TestContractName");
        expect(await myContractDeployed.symbol()).to.equal("TEST_SYM");
    });

});