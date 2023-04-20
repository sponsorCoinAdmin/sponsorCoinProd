class HHAccountStruct {
     constructor()
      {
          this.signers;
          this.accounts;
          this.rates = [0,1,2,3,4,5,6,7,8,9,10];
      }
};

initHHAccounts = async ( ) => {
     signers = await ethers.getSigners();
     let hhTestAccountElements = new HHAccountStruct();
     let accounts = [];
     signers.forEach((signer, i) => {
          signer.address = signer.address.toLowerCase();
          accounts.push(signer.address);
     });

     hhTestAccountElements.signers = signers;
     hhTestAccountElements.accounts = accounts; 
     return hhTestAccountElements;
 };


module.exports = {
     initHHAccounts,
}
