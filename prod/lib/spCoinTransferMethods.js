const { SpCoinLoggingMethods } = require("./utils/logging");
let spCoinLoggingMethods;

class SpCoinERC20Methods {

  constructor(_spCoinContractDeployed) {
    this.spCoinContractDeployed = _spCoinContractDeployed;
    spCoinLoggingMethods = new SpCoinLoggingMethods(_spCoinContractDeployed)
    this.setSigner(_spCoinContractDeployed.signer);
  }

  setSigner(_signer) {
    this.signer = _signer;
  }

  transfer = async ( _to, _value) => {
    await this.spCoinContractDeployed.connect(this.signer).transfer(_to, _value.toString());
  }
}
  
//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
  SpCoinERC20Methods
}
