const { SpCoinLogger } = require("./utils/logging");
let spCoinLogger;
const SPONSOR = 0;
const RECIPIENT = 1;
const AGENT = 2;
const burnAddress = "0x0000000000000000000000000000000000000000";

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

  spCoinLogger.logDetail("JS => Inserting " + _recipientKey + " Recipient To Blockchain Network");
    spCoinLogger.logDetail("JS => Inserting Recipient " + _recipientKey);
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

    spCoinLogger.logDetail("JS =>  " + "Inserting Agent[" + _recipientKey + "]: " + _accountAgentKey);
    await this.spCoinContractDeployed.connect(this.signer).addAgent(_recipientKey, _recipientRateKey, _accountAgentKey);
    spCoinLogger.logDetail("JS => " + "Added Agent " + _accountAgentKey + " Record to RecipientKey " + _recipientKey);
    spCoinLogger.logExitFunction();
  };

  addAgents = async (_recipientKey, _recipientRateKey, _agentAccountList) => {
    spCoinLogger.logFunctionHeader(
      "addAgents = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _agentAccountList + ")");
    spCoinLogger.logDetail("JS => For Recipient[" + _recipientKey + "]: " + _recipientKey + ")");
    spCoinLogger.logDetail("JS => Inserting " + _agentAccountList.length + " Agent To Blockchain Network");
    spCoinLogger.logDetail("JS => _agentAccountList = " + _agentAccountList);

    let agentSize = _agentAccountList.length;
    spCoinLogger.logDetail("JS => agentSize.length = " + agentSize);
    let agentCount = 0;
    for (let agentCount = 0; agentCount < agentSize; agentCount++) {
      let agentKey = _agentAccountList[agentCount];
      spCoinLogger.logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentKey);
      await addAgent(_recipientKey, _recipientRateKey, agentKey);
    }
    spCoinLogger.logDetail("JS => " + "Inserted = " + agentSize + " Agent Records");
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
    _transactionQty) => {
    spCoinLogger.logFunctionHeader(
      "addSponsorship = async(" +
      _sponsorSigner + ", " +
      _recipientKey + ", " +
      _recipientRateKey + ", " +
      _transactionQty + ")"
    );

    await this.addAgentSponsorship (
      _sponsorSigner,
      _recipientKey,
      _recipientRateKey,
        BURN_ACCOUNT,
        0,
      _transactionQty);

    spCoinLogger.logExitFunction();
  };

  addAgentSponsorship = async (
    _sponsorSigner,
    _recipientKey,
    _recipientRateKey,
    _accountAgentKey,
    _agentRateKey,
    _transactionQty) => {
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
    let wholePart = components[0].length > 0 ? components[0] : "0";
    let fractionalPart = components.length > 1 ? components[1] : "0";

    await this.spCoinContractDeployed.connect(_sponsorSigner).addSponsorship(
      _recipientKey,
      _recipientRateKey,
      _accountAgentKey,
      _agentRateKey,
      wholePart,
      fractionalPart);
    spCoinLogger.logExitFunction();
  };

  depositSponsorStakingRewards = async (
    _sponsorAccount, 
    _recipientAccount,
    _recipientRate ,
    _amount) => {
      spCoinLogger.logFunctionHeader(
      "depositSponsorStakingRewards = async(" +
      _sponsorAccount + ", " +
      _recipientAccount + ", " +
      _recipientRate  + ", " +
      _amount + ")"
    );
    await this.spCoinContractDeployed.connect(this.signer).depositStakingRewards (
      SPONSOR,
      _sponsorAccount,
      _recipientAccount,
      _recipientRate ,
      _sponsorAccount,
      0,
      _amount
      );
    spCoinLogger.logExitFunction();
  };
    
  depositRecipientStakingRewards = async (
    _sponsorAccount, 
    _recipientAccount,
    _recipientRate,
    _amount) => {
    spCoinLogger.logFunctionHeader(
      "depositRecipientStakingRewards = async(" +
      _sponsorAccount + ", " +
      _recipientAccount + ", " +
      _recipientRate + ", " +
      _amount + ")"
    );
    await this.spCoinContractDeployed.connect(this.signer).depositStakingRewards (
      RECIPIENT,
      _sponsorAccount,
      _recipientAccount,
      _recipientRate,
      burnAddress,
      0,
      _amount
    );
    spCoinLogger.logExitFunction();
  };
    
  depositAgentStakingRewards = async (
    _sponsorAccount,
    _recipientAccount,
    _recipientRate,
    _agentAccount, 
    _agentRate,
    _amount) => {
    spCoinLogger.logFunctionHeader(
      "depositAgentStakingRewards = async(" +
      _recipientAccount,
      _agentAccount + ", " +
      _agentRate + ", " +
      _amount + ")"
    );
    await this.spCoinContractDeployed.connect(this.signer).depositStakingRewards (
      AGENT,
      _sponsorAccount,
      _recipientAccount,
      _recipientRate,
      _agentAccount,
      _agentRate,
      _amount
    );
    spCoinLogger.logExitFunction();
  };
}

backDateAgentRateRecord = async (
  _sponsorAccount,
  _recipientAccount,
  _recipientRate,
  _agentAccount, 
  _agentRate,
  _backdate
) => {
  await this.spCoinContractDeployed.connect(this.signer).backDateAgentRateRecord (
    _sponsorAccount,
    _recipientAccount,
    _recipientRate,
    _agentAccount,
    _agentRate,
    _backdate
  );
}
//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
  SpCoinAddMethods,
}