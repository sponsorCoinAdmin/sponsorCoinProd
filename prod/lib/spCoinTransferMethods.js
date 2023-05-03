let spCoinContractDeployed;
let signer;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////
injectTransferMethodsContract = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
}

injectTransferMethodsSigner = (_signer) => {
  signer = _signer;
};


transfer = async ( _to, _value) => {
  await spCoinContractDeployed.transfer(_to, _value.toString());
}
  
//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
    transfer,
}
