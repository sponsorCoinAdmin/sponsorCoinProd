let spCoinContractDeployed;

deploySpCoinContract = async () => {
  spCoinContractDeployed = await deployContract();
  return spCoinContractDeployed;
}

deployContract = async () => {
  //setLogMode(LOG_MODE.LOG_SETUP, true);
  console.log("deployContract = async ()");

  let spCoinContract = await hre.ethers.getContractFactory("SPCoin");
  spCoinContractDeployed = await spCoinContract.deploy();
  await spCoinContractDeployed.deployed();
  return spCoinContractDeployed;
}

module.exports = {
  deployContract,
  deploySpCoinContract,
  spCoinContractDeployed
}
