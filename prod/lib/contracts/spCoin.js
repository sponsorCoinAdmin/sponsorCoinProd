class SpCoinContract {
  constructor(spCoinContractDeployed, signer) {
    this.spCoinContractDeployed;
    this.signers;
    this.signer;
  }

  setSigners = (_signers) => {
    signers = _signers;
  }

  injectSpCoinContract = (_spCoinContractDeployed) => {
    this.spCoinContractDeployed = _spCoinContractDeployed;
    setSigner6(this.spCoinContractDeployed.signer)
  };

  setSigner6 = (_signer) => {
    this.signer = _signer;
  };

  getSpCoinContract = () => {
    return spCoinContractDeployed;
  };
}
