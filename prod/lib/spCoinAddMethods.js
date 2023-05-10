class SpCoinAddMethods {

  constructor(_spCoinContractDeployed) {
    this.spCoinContractDeployed = _spCoinContractDeployed;
    this.setSigner(_spCoinContractDeployed.signer);
  }

  setSigner(_signer) {
    this.signer = _signer;
  }

  addRecipient = async (_recipientKey) => {
      logFunctionHeader(
        "addRecipient = async(" + _recipientKey + ")"
      );
    
      logDetail("JS => Inserting " + _recipientKey + " Recipient To Blockchain Network"
      );
    
      logDetail("JS => Inserting Recipient " + _recipientKey );
      await this.spCoinContractDeployed.connect(this.signer).addRecipient(_recipientKey);
      logExitFunction();
    };
    
    addRecipients = async (_accountKey, _recipientAccountList) => {
      logFunctionHeader(
        "addRecipients = async(" + _accountKey + ", " + _recipientAccountList + ")"
      );
    
      logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
      logDetail("JS => Adding " + _recipientAccountList.length + " Recipient To Blockchain Network"
      );
    
      let recipientCount = 0;
      for (recipientCount; recipientCount < _recipientAccountList.length; recipientCount++) {
        let _recipientKey = _recipientAccountList[recipientCount];
        await addRecipient(_recipientKey);
      }
      logDetail("JS => Inserted = " + recipientCount + " Recipient Records");
      return --recipientCount;
      logExitFunction();
    };

    addAgent = async (_recipientKey, _recipientRateKey, _accountAgentKey) => {
      logFunctionHeader(
        "addAgent = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _accountAgentKey + ")"
      );
      logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");
    
      logDetail("JS =>  " + "Inserting Agent[" + _recipientKey + "]: " + _accountAgentKey );
      await this.spCoinContractDeployed.connect(this.signer).addAgent(_recipientKey, _recipientRateKey, _accountAgentKey );
      logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to RecipientKey " + _recipientKey);
      logExitFunction();
    };
    
    addAgents = async (_recipientKey, _recipientRateKey, _agentAccountList) => {
      logFunctionHeader(
        "addAgents = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentAccountList + ")"
      );
      logDetail("JS => For Recipient[" + _recipientKey + "]: " + _recipientKey + ")");
      logDetail("JS => Inserting " + _agentAccountList.length + " Agent To Blockchain Network"
      );
      logDetail("JS => _agentAccountList = " + _agentAccountList);
    
      let agentSize = _agentAccountList.length;
      logDetail("JS => agentSize.length = " + agentSize);
      let agentCount = 0;
      for (let agentCount = 0; agentCount < agentSize; agentCount++) {
        let agentKey = _agentAccountList[agentCount];
        logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentKey );
        await addAgent(_recipientKey, _recipientRateKey, agentKey );
      }
      logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
      return agentCount;
      logExitFunction();
    };
    
  addAccountRecord = async (_accountKey) => {
      logFunctionHeader("addAccountRecord = async(" + _accountKey + ")");
      logDetail("JS => Inserting Account " + _accountKey + " To Blockchain Network");
      await this.spCoinContractDeployed.connect(this.signer).addAccountRecord(_accountKey);
      logExitFunction();
    };  

  addAccountRecords = async (_accountListKeys) => {
      logFunctionHeader("addAccountRecord = async(arrayAccounts)");
      let maxCount = _accountListKeys.length;
      logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");
    
      for (idx = 0; idx < maxCount; idx++) {
        let account = _accountListKeys[idx];
        logDetail("JS => Inserting " + idx + ", " + account);
        await this.spCoinContractDeployed.connect(this.signer).addAccountRecord(account);
      }
      logDetail("JS => Inserted " + maxCount + " Account to Blockchain Network");
    
      logExitFunction();
      return maxCount;
  };

//////////////////// ADD TRANSACTIONS METHODS //////////////////////

  addSponsorship = async (
    _sponsorSigner,
    _recipientKey,
    _recipientRateKey,
    _accountAgentKey,
    _agentRateKey,
    _transactionQty ) => {
      logFunctionHeader(
        "addSponsorship = async(" + 
        _sponsorSigner + ", " + 
        _recipientKey + ", " + 
        _recipientRateKey + ", " + 
        _accountAgentKey + ", " +
        _agentRateKey + ", " +
        _transactionQty + ")"
      );

      let components = _transactionQty.toString().split(".");
      let wholePart = components[0].length > 0   ? components[0] : "0";
      let fractionalPart = components.length > 1 ? components[1] : "0";

      // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
      // console.log("_transactionQty   = " + _transactionQty);
      // console.log("components.length = " + components.length);
      // console.log("wholePart         = " + wholePart);
      // console.log("fractionalPart    = " + fractionalPart);
      // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
      
      await this.spCoinContractDeployed.connect(this.signer).addSponsorship(
        _recipientKey,
        _recipientRateKey,
        _accountAgentKey,
        _agentRateKey,
        wholePart,
        fractionalPart);
        
        logDetail("JS => "+ "Added Agent Transaction " + _accountAgentKey + " _transactionQty = " + _transactionQty);
        logExitFunction();
    };

    addSponsorship = async (
      _sponsorSigner,
      _recipientKey,
      _recipientRateKey,
      _accountAgentKey,
      _agentRateKey,
      _transactionQty ) => {
        logFunctionHeader(
          "addSponsorship = async(" + 
          _sponsorSigner + ", " + 
          _recipientKey + ", " + 
          _recipientRateKey + ", " + 
          _accountAgentKey + ", " +
          _agentRateKey + ", " +
          _transactionQty + ")"
        );
      
        let components = _transactionQty.toString().split(".");
        let wholePart = components[0].length > 0   ? components[0] : "0";
        let fractionalPart = components.length > 1 ? components[1] : "0";
      
        // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
        // console.log("_transactionQty   = " + _transactionQty);
        // console.log("components.length = " + components.length);
        // console.log("wholePart         = " + wholePart);
        // console.log("fractionalPart    = " + fractionalPart);
        // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
          
        await this.spCoinContractDeployed.connect(this.signer).addSponsorship(
          _recipientKey,
          _recipientRateKey,
          _accountAgentKey,
          _agentRateKey,
          wholePart,
          fractionalPart);
            
          logDetail("JS => "+ "Added Agent Transaction " + _accountAgentKey + " _transactionQty = " + _transactionQty);
          logExitFunction();
    };
  }
    //////////////////// MODULE EXPORTS //////////////////////

module.exports = {
  SpCoinAddMethods,
}
