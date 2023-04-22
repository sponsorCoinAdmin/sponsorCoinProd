let spCoinContractDeployed;
let signer;

//////////////////////////// ROOT LEVEL FUNCTIONS ////////////////////////////
injectAddMethodsContract = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
}

injectAddMethodsSigner = (_signer) => {
  signer = _signer;
};

addRecipient = async (_recipientKey) => {
    logFunctionHeader(
      "addRecipient = async(" + _recipientKey + ")"
    );
  
    logDetail("JS => Inserting " + _recipientKey + " Recipient To Blockchain Network"
    );
  
    logDetail("JS => Inserting Recipient " + _recipientKey );
    await spCoinContractDeployed.connect(signer).addRecipient(_recipientKey);
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
  };

  addAgent = async (_recipientKey, _recipientRateKey, _accountAgentKey) => {
    logFunctionHeader(
      "addAgent = async(" + _recipientKey + ", " + _recipientRateKey + ", " + _accountAgentKey + ")"
    );
    logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");
  
    logDetail("JS =>  " + "Inserting Agent[" + _recipientKey + "]: " + _accountAgentKey );
    await spCoinContractDeployed.connect(signer).addAgent(_recipientKey, _recipientRateKey, _accountAgentKey );
    logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to RecipientKey " + _recipientKey);
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
  };
  
addAccountRecord = async (_accountKey) => {
    logFunctionHeader("addAccountRecord = async(" + _accountKey + ")");
    logDetail("JS => Inserting Account " + _accountKey + " To Blockchain Network");
    await spCoinContractDeployed.connect(signer).addAccountRecord(_accountKey);
  };  

addAccountRecords = async (_accountListKeys) => {
    logFunctionHeader("addAccountRecord = async(arrayAccounts)");
    let maxCount = _accountListKeys.length;
    logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");
  
    for (idx = 0; idx < maxCount; idx++) {
      let account = _accountListKeys[idx];
      logDetail("JS => Inserting " + idx + ", " + account);
      await spCoinContractDeployed.connect(signer).addAccountRecord(account);
    }
    logDetail("JS => Inserted " + maxCount + " Account to Blockchain Network");
  
    return maxCount;
};

//////////////////// ADD TRANSACTIONS METHODS //////////////////////

addAgentTransaction = async (
  _sponsorKey,
  _recipientKey,
  _recipientRateKey,
  _accountAgentKey,
  _agentRateKey,
  _transactionQty ) => {
    logFunctionHeader(
      "addAgentTransaction = async(" + 
      _sponsorKey + ", " + 
      _recipientKey + ", " + 
      _recipientRateKey + ", " + 
      _accountAgentKey + ", " +
      _agentRateKey + ", " +
      _transactionQty + ")"
    );

    // do decimal power operation for quantity
    let decimals = 18;
    let transactionQty = Math.round(_transactionQty * (10 ** decimals));
    signers = await ethers.getSigners();

    // await spCoinContractDeployed.connect(signer).connect(signers[7]).addAgentTransaction(
    await spCoinContractDeployed.connect(_sponsorKey).addAgentTransaction(
      _recipientKey,
      _recipientRateKey,
      _accountAgentKey,
      _agentRateKey,
      transactionQty.toString());
      logDetail("JS => "+ "Added Agent Transaction " + _accountAgentKey + " transactionQty = " + transactionQty);
    };

//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
    addAccountRecord,
    addAccountRecords,
    addRecipient,
    addRecipients,
    addAgentTransaction,
    addAgent,
    addAgents,
    injectAddMethodsContract,
}
