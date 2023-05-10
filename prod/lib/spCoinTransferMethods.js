let spCoinContractDeployed;
let signer;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////
injectTransferMethodsContract = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
    setSigner4(spCoinContractDeployed.signer);
}

setSigner4 = (_signer) => {
  signer = _signer;
};


transfer = async ( _to, _value) => {
  await spCoinContractDeployed.connect(signer).transfer(_to, _value.toString());
}
  
//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
    transfer,
}
