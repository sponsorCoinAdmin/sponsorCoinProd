const { SpCoinLoggingMethods } = require("./utils/logging");
let spCoinLoggingMethods;
class SpCoinAddMethods {

  constructor(_spCoinContractDeployed) {
    this.spCoinContractDeployed = _spCoinContractDeployed;
    spCoinLoggingMethods = new SpCoinLoggingMethods(_spCoinContractDeployed)
    this.setSigner(_spCoinContractDeployed.signer);
  }

  setSigner(_signer) {
    this.signer = _signer;
  }

  addRecipient = async (_recipientKey) => {
      spCoinLoggingMethods.logFunctionHeader(
        "addRecipient = async(" + _recipientKey + ")"
      );
    
      spCoinLoggingMethods.logDetail("JS => Inserting " + _recipientKey + " Recipient To Blockchain Network"
      );
    
      spCoinLoggingMethods.logDetail("JS => Inserting Recipient " + _recipientKey );
      await this.spCoinContractDeployed.connect(this.signer).addRecipient(_recipientKey);
      spCoinLoggingMethods.logExitFunction();
    };
    
    addRecipients = async (_accountKey, _recipientAccountList) => {
      spCoinLoggingMethods.logFunctionHeader(
        "addRecipients = async(" + _accountKey + ", " + _recipientAccountList + ")"
      );
    
      spCoinLoggingMethods.logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
      spCoinLoggingMethods.logDetail("JS => Adding " + _recipientAccountList.length + " Recipient To Blockchain Network"
      );
    
      let recipientCount = 0;
      for (recipientCount; recipientCount < _recipientAccountList.length; recipientCount++) {
        let _recipientKey = _recipientAccountList[recipientCount];
        await addRecipient(_recipientKey);
      }
      spCoinLoggingMethods.logDetail("JS => Inserted = " + recipientCount + " Recipient Records");
      return --recipientCount;
      spCoinLoggingMethods.logExitFunction();
    };

    addAgent = async (_recipientKey, _recipientRateKey, _accountAgentKey) => {
      spCoinLoggingMethods.logFunctionHeader(
        "addAgent = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _accountAgentKey + ")"
      );
      spCoinLoggingMethods.logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");
    
      spCoinLoggingMethods.logDetail("JS =>  " + "Inserting Agent[" + _recipientKey + "]: " + _accountAgentKey );
      await this.spCoinContractDeployed.connect(this.signer).addAgent(_recipientKey, _recipientRateKey, _accountAgentKey );
      spCoinLoggingMethods.logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to RecipientKey " + _recipientKey);
      spCoinLoggingMethods.logExitFunction();
    };
    
    addAgents = async (_recipientKey, _recipientRateKey, _agentAccountList) => {
      spCoinLoggingMethods.logFunctionHeader(
        "addAgents = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentAccountList + ")"
      );
      spCoinLoggingMethods.logDetail("JS => For Recipient[" + _recipientKey + "]: " + _recipientKey + ")");
      spCoinLoggingMethods.logDetail("JS => Inserting " + _agentAccountList.length + " Agent To Blockchain Network"
      );
      spCoinLoggingMethods.logDetail("JS => _agentAccountList = " + _agentAccountList);
    
      let agentSize = _agentAccountList.length;
      spCoinLoggingMethods.logDetail("JS => agentSize.length = " + agentSize);
      let agentCount = 0;
      for (let agentCount = 0; agentCount < agentSize; agentCount++) {
        let agentKey = _agentAccountList[agentCount];
        spCoinLoggingMethods.logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentKey );
        await addAgent(_recipientKey, _recipientRateKey, agentKey );
      }
      spCoinLoggingMethods.logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
      return agentCount;
      spCoinLoggingMethods.logExitFunction();
    };
    
  addAccountRecord = async (_accountKey) => {
      spCoinLoggingMethods.logFunctionHeader("addAccountRecord = async(" + _accountKey + ")");
      spCoinLoggingMethods.logDetail("JS => Inserting Account " + _accountKey + " To Blockchain Network");
      await this.spCoinContractDeployed.connect(this.signer).addAccountRecord(_accountKey);
      spCoinLoggingMethods.logExitFunction();
    };  

  addAccountRecords = async (_accountListKeys) => {
      spCoinLoggingMethods.logFunctionHeader("addAccountRecord = async(arrayAccounts)");
      let maxCount = _accountListKeys.length;
      spCoinLoggingMethods.logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");
    
      for (idx = 0; idx < maxCount; idx++) {
        let account = _accountListKeys[idx];
        spCoinLoggingMethods.logDetail("JS => Inserting " + idx + ", " + account);
        await this.spCoinContractDeployed.connect(this.signer).addAccountRecord(account);
      }
      spCoinLoggingMethods.logDetail("JS => Inserted " + maxCount + " Account to Blockchain Network");
    
      spCoinLoggingMethods.logExitFunction();
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
      spCoinLoggingMethods.logFunctionHeader(
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
        
        spCoinLoggingMethods.logDetail("JS => "+ "Added Agent Transaction " + _accountAgentKey + " _transactionQty = " + _transactionQty);
        spCoinLoggingMethods.logExitFunction();
    };

    addSponsorship = async (
      _sponsorSigner,
      _recipientKey,
      _recipientRateKey,
      _accountAgentKey,
      _agentRateKey,
      _transactionQty ) => {
        spCoinLoggingMethods.logFunctionHeader(
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
            
          spCoinLoggingMethods.logDetail("JS => "+ "Added Agent Transaction " + _accountAgentKey + " _transactionQty = " + _transactionQty);
          spCoinLoggingMethods.logExitFunction();
    };
  }
    //////////////////// MODULE EXPORTS //////////////////////

module.exports = {
  SpCoinAddMethods,
}
