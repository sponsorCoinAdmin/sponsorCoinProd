let spCoinContractDeployed;

setContractAddMethods = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
}

addSponsorRecipient = async (_accountKey, _recipientKey) => {
    logFunctionHeader(
      "addSponsorRecipient = async(" + _accountKey + ", " + _recipientKey + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Inserting " + _recipientKey + " Recipients To Blockchain Network"
    );
  
    logDetail("JS => Inserting Recipient " + _recipientKey );
    await spCoinContractDeployed.addSponsorRecipient(_accountKey, _recipientKey);
  };
  
  addSponsorRecipients = async (_accountKey, _recipientAccountList) => {
    logFunctionHeader(
      "addSponsorRecipients = async(" + _accountKey + ", " + _recipientAccountList + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding " + _recipientAccountList.length + " Recipients To Blockchain Network"
    );
  
    let recipientCount = 0;
    for (recipientCount; recipientCount < _recipientAccountList.length; recipientCount++) {
      let _recipientKey = _recipientAccountList[recipientCount];
      await addSponsorRecipient(_accountKey, _recipientKey);
    }
    logDetail("JS => Inserted = " + recipientCount + " Recipient Records");
    return --recipientCount;
  };

  addRecipientAgent = async (_accountKey, _recipientKey, _recipientRateKey, _accountAgentKey) => {
    logFunctionHeader(
      "addRecipientAgent = async(" + _accountKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _accountAgentKey + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");
  
    logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
    await spCoinContractDeployed.addRecipientAgent( _accountKey, _recipientKey, _recipientRateKey, _accountAgentKey );
    logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to RecipientKey " + _recipientKey);
  };
  
  addRecipientAgents = async (_accountKey, _recipientKey, _recipientRateKey, _agentAccountList) => {
    logFunctionHeader(
      "addRecipientAgents = async(" + _accountKey + ", " + _recipientKey + ", " + _recipientRateKey + ", " + _agentAccountList + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => For Recipient[" + _recipientKey + "]: " + _recipientKey + ")");
    logDetail("JS => Inserting " + _agentAccountList.length + " Agents To Blockchain Network"
    );
    logDetail("JS => _agentAccountList = " + _agentAccountList);
  
    let agentSize = _agentAccountList.length;
    logDetail("JS => agentSize.length = " + agentSize);
    let agentCount = 0;
    for (let agentCount = 0; agentCount < agentSize; agentCount++) {
      let agentKey = _agentAccountList[agentCount];
      logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentKey );
      await addRecipientAgent( _accountKey, _recipientKey, _recipientRateKey, agentKey );
    }
    logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
    return agentCount;
  };
  
addAccountRecord = async (_accountKey) => {
    logFunctionHeader("addAccountRecord = async(" + _accountKey + ")");
    logDetail("JS => Inserting Account " + _accountKey + " To Blockchain Network");
    await spCoinContractDeployed.addAccountRecord(_accountKey);
  };  

addAccountRecords = async (_accountListKeys) => {
    logFunctionHeader("addAccountRecord = async(arrayAccounts)");
    let maxCount = _accountListKeys.length;
    logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");
  
    for (idx = 0; idx < maxCount; idx++) {
      let account = _accountListKeys[idx];
      logDetail("JS => Inserting " + idx + ", " + account);
      await spCoinContractDeployed.addAccountRecord(account);
    }
    logDetail("JS => Inserted " + maxCount + " Accounts to Blockchain Network");
  
    return maxCount;
};

//////////////////// ADD TRANSACTIONS METHODS //////////////////////

addAgentTransaction = async (
  _accountKey, 
  _recipientKey,
  _recipientRateKey,
  _accountAgentKey,
  _agentRateKey,
  _transactionQty ) => {
    logFunctionHeader(
      "addAgentTransaction = async(" + 
      _accountKey + ", " + 
      _recipientKey + ", " + 
      _recipientRateKey + ", " + 
      _accountAgentKey + ", " +
      _agentRateKey + ", " +
      _transactionQty + ")"
    );

    // do decimal power operation for quantity
    let decimals = 18;
    let transactionQty = Math.round(_transactionQty * (10 ** decimals));
    await spCoinContractDeployed.addAgentTransaction(
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
    addSponsorRecipients,
    addAgentTransaction,
    addRecipientAgent,
    addRecipientAgents,
    setContractAddMethods,
}
