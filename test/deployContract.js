const { } = require("../prod/lib/spCoinAddMethods");
const { } = require("../prod/lib/spCoinDeleteMethods");
const { } = require("../prod/lib/spCoinTransferMethods");
const { } = require("../prod/lib/contracts/spCoin");
const { SpCoinLoggingMethods } = require("../prod/lib/utils/logging");

  let spCoinContractDeployed;

  deploySpCoinContract = async () => {
    spCoinContractDeployed = await deployContract();
    injectContract(spCoinContractDeployed);
    return spCoinContractDeployed;
  }

  injectContract = (spCoinContractDeployed) => {
    injectDeleteMethodsContract(spCoinContractDeployed);
    // injectLoggingMethodsContract(spCoinContractDeployed);
     return spCoinContractDeployed;
  }

  deployContract = async () => {
    //setLogMode(LOG_MODE.LOG_SETUP, true);
    console.log("deployContract = async ()");

    let spCoinContract = await hre.ethers.getContractFactory("SPCoin");
    spCoinContractDeployed = await spCoinContract.deploy();
    // spCoinLoggingMethods = new SpCoinLoggingMethods(spCoinContractDeployed);

    // spCoinLoggingMethods.logSetup("deployContract = async ()");

    // spCoinLoggingMethods.logSetup("JS => spCoinContract retrieved from Factory");
    
    // spCoinLoggingMethods.logSetup("JS => Deploying spCoinContract to Network");
    // spCoinLoggingMethods.logSetup("JS => spCoinContract is currently being mined");

    await spCoinContractDeployed.deployed();
    // spCoinLoggingMethods.logSetup("JS => spCoinContract is mined and Deployed to the BlockChain Network");

    // let msgSender = await spCoinContractDeployed.msgSender();
    return spCoinContractDeployed;
}

module.exports = {
  deployContract,
  injectContract,
  deploySpCoinContract,
  spCoinContractDeployed
}
