const { SpCoinLogger } = require("./utils/logging");
let spCoinLogger;
class SpCoinAddMethods {

  constructor(_spCoinContractDeployed) {
    this.spCoinContractDeployed = _spCoinContractDeployed;
    spCoinLogger = new SpCoinLogger(_spCoinContractDeployed)
    this.setSigner(_spCoinContractDeployed.signer);
  }

  setSigner(_signer) {
    this.signer = _signer;
  }

  addRecipient = async (_recipientKey) => {
      spCoinLogger.logFunctionHeader(
        "addRecipient = async(" + _recipientKey + ")"
      );
    
      spCoinLogger.logDetail("JS => Inserting " + _recipientKey + " Recipient To Blockchain Network"
      );
    
      spCoinLogger.logDetail("JS => Inserting Recipient " + _recipientKey );
      await this.spCoinContractDeployed.connect(this.signer).addRecipient(_recipientKey);
      spCoinLogger.logExitFunction();
    };
    
    addRecipients = async (_accountKey, _recipientAccountList) => {
      spCoinLogger.logFunctionHeader(
        "addRecipients = async(" + _accountKey + ", " + _recipientAccountList + ")"
      );
    
      spCoinLogger.logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
      spCoinLogger.logDetail("JS => Adding " + _recipientAccountList.length + " Recipient To Blockchain Network"
      );
    
      let recipientCount = 0;
      for (recipientCount; recipientCount < _recipientAccountList.length; recipientCount++) {
        let _recipientKey = _recipientAccountList[recipientCount];
        await addRecipient(_recipientKey);
      }
      spCoinLogger.logDetail("JS => Inserted = " + recipientCount + " Recipient Records");
      return --recipientCount;
      spCoinLogger.logExitFunction();
    };

    addAgent = async (_recipientKey, _recipientRateKey, _accountAgentKey) => {
      spCoinLogger.logFunctionHeader(
        "addAgent = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _accountAgentKey + ")"
      );
      spCoinLogger.logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");
    
      spCoinLogger.logDetail("JS =>  " + "Inserting Agent[" + _recipientKey + "]: " + _accountAgentKey );
      await this.spCoinContractDeployed.connect(this.signer).addAgent(_recipientKey, _recipientRateKey, _accountAgentKey );
      spCoinLogger.logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to RecipientKey " + _recipientKey);
      spCoinLogger.logExitFunction();
    };
    
    addAgents = async (_recipientKey, _recipientRateKey, _agentAccountList) => {
      spCoinLogger.logFunctionHeader(
        "addAgents = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentAccountList + ")"
      );
      spCoinLogger.logDetail("JS => For Recipient[" + _recipientKey + "]: " + _recipientKey + ")");
      spCoinLogger.logDetail("JS => Inserting " + _agentAccountList.length + " Agent To Blockchain Network"
      );
      spCoinLogger.logDetail("JS => _agentAccountList = " + _agentAccountList);
    
      let agentSize = _agentAccountList.length;
      spCoinLogger.logDetail("JS => agentSize.length = " + agentSize);
      let agentCount = 0;
      for (let agentCount = 0; agentCount < agentSize; agentCount++) {
        let agentKey = _agentAccountList[agentCount];
        spCoinLogger.logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentKey );
        await addAgent(_recipientKey, _recipientRateKey, agentKey );
      }
      spCoinLogger.logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
      return agentCount;
      spCoinLogger.logExitFunction();
    };
    
  addAccountRecord = async (_accountKey) => {
      spCoinLogger.logFunctionHeader("addAccountRecord = async(" + _accountKey + ")");
      spCoinLogger.logDetail("JS => Inserting Account " + _accountKey + " To Blockchain Network");
      await this.spCoinContractDeployed.connect(this.signer).addAccountRecord(_accountKey);
      spCoinLogger.logExitFunction();
    };  

  addAccountRecords = async (_accountListKeys) => {
      spCoinLogger.logFunctionHeader("addAccountRecord = async(arrayAccounts)");
      let maxCount = _accountListKeys.length;
      spCoinLogger.logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");
    
      for (idx = 0; idx < maxCount; idx++) {
        let account = _accountListKeys[idx];
        spCoinLogger.logDetail("JS => Inserting " + idx + ", " + account);
        await this.spCoinContractDeployed.connect(this.signer).addAccountRecord(account);
      }
      spCoinLogger.logDetail("JS => Inserted " + maxCount + " Account to Blockchain Network");
    
      spCoinLogger.logExitFunction();
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
      spCoinLogger.logFunctionHeader(
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
        
        spCoinLogger.logDetail("JS => "+ "Added Agent Transaction " + _accountAgentKey + " _transactionQty = " + _transactionQty);
        spCoinLogger.logExitFunction();
    };

    addSponsorship = async (
      _sponsorSigner,
      _recipientKey,
      _recipientRateKey,
      _accountAgentKey,
      _agentRateKey,
      _transactionQty ) => {
        spCoinLogger.logFunctionHeader(
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
            
        spCoinLogger.logDetail("JS => "+ "Added Agent Transaction " + _accountAgentKey + " _transactionQty = " + _transactionQty);
        spCoinLogger.logExitFunction();
    };
    //////////////////// STAKING REWARDS //////////////////////

    depositAccountStakingReward = async (
      _recipientAccount,
      _sourceAccount, 
      _sourceType,
      _amount ) => {
        spCoinLogger.logFunctionHeader(
          "depositAccountStakingReward = async(" + 
          _sourceAccount + ", " + 
          _recipientKey + ", " + 
          _sourceType + ", " + 
          _amount + ")"
        );
          
      await this.spCoinContractDeployed.connect(this.signer).depositAccountStakingReward(
        _recipientAccount,
        _sourceAccount, 
        _sourceType,
        _amount );
            
      spCoinLogger.logDetail("JS => "+ "Deposited Staking Reward to Account " + _recipientAccount +
      " from source account = " + _sourceAccount + " of Account Type = " + _sourceType + " for Amount = " + _amount);
      spCoinLogger.logExitFunction();
    };
  }

    //////////////////// MODULE EXPORTS //////////////////////

module.exports = {
  SpCoinAddMethods,
}
   