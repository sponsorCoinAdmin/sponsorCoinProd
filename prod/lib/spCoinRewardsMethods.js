const { bigIntToDecString } = require("./utils/dateTime");
const { SpCoinLogger } = require("./utils/logging");

let spCoinLogger;

class SpCoinRewardsMethods {

  constructor(_spCoinContractDeployed) {
    this.spCoinContractDeployed = _spCoinContractDeployed;
    spCoinLogger = new SpCoinLogger(_spCoinContractDeployed)
    this.setSigner(_spCoinContractDeployed.signer);
  }

  setSigner(_signer) {
    this.signer = _signer;
  }

  updateAccountStakingRewards = async(accountKey) => {
    // spCoinLogger.logFunctionHeader("getStakingRewards(lastUpdateTime,  interestRate,  quantity)");
    let stakingRewards = await this.spCoinContractDeployed.connect(this.signer).updateAccountStakingRewards(accountKey);
    console.log("=================================================================================================");
    console.log("stakingRewards = ", stakingRewards);
    console.log("=================================================================================================");
    
    spCoinLogger.logExitFunction();
    return stakingRewards;
  }

};

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  SpCoinRewardsMethods
};
