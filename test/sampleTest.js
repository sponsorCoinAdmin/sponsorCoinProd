const { expect } = require("chai");
describe("TestContract", function() {

    it("should return correct name and symbol", async function () {

        console.log("JAVASCRIPT => TestContract retreived from Factory");
        const TestContract = await hre.ethers.getContractFactory("TestContract");

        console.log("JAVASCRIPT => Deploying TestContract to Network");
        const TestContractDeployed = await TestContract.deploy("TestContractName", "TEST_SYM");
        console.log("JAVASCRIPT => TestContract is being mined");

        await TestContractDeployed.deployed();
        console.log("JAVASCRIPT => TestContract Deployed to Network");

        console.log("JAVASCRIPT => Name   = " + await TestContractDeployed.name());
        console.log("JAVASCRIPT => Symbol = " + await TestContractDeployed.symbol());

        expect(await TestContractDeployed.name()).to.equal("TestContractName");
        expect(await TestContractDeployed.symbol()).to.equal("TEST_SYM");
    });

});