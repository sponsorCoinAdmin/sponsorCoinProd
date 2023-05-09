class SpCoinContract {
  constructor(spCoinContractDeployed, signer) {
    this.spCoinContractDeployed;
    this.signers;
    this.signer;
  }

  setSigners = (_signers) => {
    signers = _signers;
  }

  setSignerByIndex = (_signerIxd) => {
    setSigner(signers[_signerIxd]);
  }
  
  setSigner = (_signer) => {
    injectReadMethodsSigner(_signer);
    injectDeleteMethodsSigner(_signer);
    injectAddMethodsSigner(_signer);
    injectTransferMethodsSigner(_signer);
    injectSpCoinSigner(_signer)
  }

  injectSpCoinContract = (_spCoinContractDeployed) => {
    this.spCoinContractDeployed = _spCoinContractDeployed;
  };

  injectSpCoinSigner = (_signer) => {
    this.signer = _signer;
  };

  getSpCoinContract = () => {
    return spCoinContractDeployed;
  };
}

/*
module.exports = {
  getSpCoinContract,
  spCoinContractDeployed,
  signer,
  injectSpCoinContract,
  injectSpCoinSigner
}
*/

