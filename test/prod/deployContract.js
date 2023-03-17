const { setCreateContract } = require("./lib/scAccountMethods");
const { setDeleteContract } = require("./lib/scAccountDeleteMethods");
const { setStructureContract } = require("./lib/loadStructures");

const {
    LOG_MODE,
    logSetup,
    setLogMode,
    log
  } = require("./lib/utils/logging");

  let spCoinContractDeployed;

  loadSpCoinContract = async () => {
    spCoinContractDeployed = await deployContract();
    loadContracts();
    return spCoinContractDeployed;
  }
  
  loadContracts = () => {
    setCreateContract(spCoinContractDeployed);
    setDeleteContract(spCoinContractDeployed);
    setStructureContract(spCoinContractDeployed);
    return spCoinContractDeployed;
  }
  
  deployContract = async () => {
    //setLogMode(LOG_MODE.LOG_SETUP, true);

    logSetup("deployContract = async ()");

    logSetup("JS => spCoinContract retrieved from Factory");
    let spCoinContract = await hre.ethers.getContractFactory("SPCoin");

    logSetup("JS => Deploying spCoinContract to Network");
    spCoinContractDeployed = await spCoinContract.deploy();
    logSetup("JS => spCoinContract is currently being mined");

    await spCoinContractDeployed.deployed();
    logSetup("JS => spCoinContract is mined and Deployed to the BlockChain Network");
//    let msgSender = await spCoinContractDeployed.msgSender();
     return spCoinContractDeployed;
}

module.exports = {
  deployContract,
  loadContracts,
  loadSpCoinContract,
  spCoinContractDeployed
}