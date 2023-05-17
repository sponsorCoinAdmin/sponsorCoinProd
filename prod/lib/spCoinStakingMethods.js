const { bigIntToDecString } = require("./utils/dateTime");
const { SpCoinLogger } = require("./utils/logging");

let spCoinLogger;

const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * (365 + hour * 8);
const month = year/12;
const millennium = year * 1000;

console.log("SpCoinStakingMethods:second     = ", second);
console.log("SpCoinStakingMethods:minute     = ", minute);
console.log("SpCoinStakingMethods:hour       = ", hour);
console.log("SpCoinStakingMethods:day        = ", day);
console.log("SpCoinStakingMethods:week       = ", week);
console.log("SpCoinStakingMethods:year       = ", year);
console.log("SpCoinStakingMethods:month      = ", month);
console.log("SpCoinStakingMethods:millennium = ", millennium);

class SpCoinStakingMethods {

  constructor(_spCoinContractDeployed) {
    this.spCoinContractDeployed = _spCoinContractDeployed;
    spCoinLogger = new SpCoinLogger(_spCoinContractDeployed)
    this.setSigner(_spCoinContractDeployed.signer);

  }

  setSigner(_signer) {
    this.signer = _signer;
  }

  getStakingRewards = async(lastUpdateTime,  interestRate,  quantity) => {
    // spCoinLogger.logFunctionHeader("getStakingRewards(lastUpdateTime,  interestRate,  quantity)");
    let stakingRewards = await this.spCoinContractDeployed.connect(this.signer).getStakingRewards(lastUpdateTime,  interestRate,  quantity);
    
    spCoinLogger.logExitFunction();
    return stakingRewards;
  }

  getTimeMultiplier = async(_timeMultiplier) => {
    // spCoinLogger.getTimeMultiplier("getTimeMultiplier(_timeMultiplier)");
    let timeMultiplier = await this.spCoinContractDeployed.connect(this.signer).getTimeMultiplier(_timeMultiplier);
    
    spCoinLogger.logExitFunction();
    return timeMultiplier;
  }

  getAccountTimeInSecondeSinceUpdate = async(_tokenLastUpdate) => {
    // spCoinLogger.getAccountTimeInSecondeSinceUpdate("getAccountRecords(_tokenLastUpdate)");
    let timeInSecondeSinceUpdate = await this.spCoinContractDeployed.connect(this.signer).getAccountTimeInSecondeSinceUpdate(_tokenLastUpdate);
    
    spCoinLogger.logExitFunction();
    return timeInSecondeSinceUpdate;
  }

  getMillenniumTimeIntervalDivisor = async(_timeInSeconds) => {
      console.log("QQQQ getMillenniumTimeIntervalDivisor("+ _timeInSeconds + ")"); 
      let annualizedPercentage = await spCoinContractDeployed.connect(this.signer).getMillenniumTimeIntervalDivisor(_timeInSeconds);

    // return annualizedPercentage;
    return bigIntToDecString(annualizedPercentage);
  }
};

/////////////////////// EXPORT MODULE FUNCTIONS ///////////////////////

module.exports = {
  SpCoinStakingMethods,
  second,
  hour,
  minute,
  week,
  year,
  month ,
  millennium
};
