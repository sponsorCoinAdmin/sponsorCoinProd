let spCoinContractDeployed;

setContractAddMethods = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
}

addPatronBenificiary = async (_accountKey, _benificiaryKey) => {
    logFunctionHeader(
      "addPatronBenificiary = async(" + _accountKey + ", " + _benificiaryKey + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Inserting " + _benificiaryKey + " Benificiarias To Blockchain Network"
    );
  
    logDetail("JS => Inserting Benificiary " + _benificiaryKey );
    await spCoinContractDeployed.addPatronBenificiary(_accountKey, _benificiaryKey);
  };
  
  addPatronBenificiarias = async (_accountKey, _benificiaryAccountList) => {
    logFunctionHeader(
      "addPatronBenificiarias = async(" + _accountKey + ", " + _benificiaryAccountList + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding " + _benificiaryAccountList.length + " Benificiarias To Blockchain Network"
    );
  
    let benificiaryCount = 0;
    for (benificiaryCount; benificiaryCount < _benificiaryAccountList.length; benificiaryCount++) {
      let _benificiaryKey = _benificiaryAccountList[benificiaryCount];
      await addPatronBenificiary(_accountKey, _benificiaryKey);
    }
    logDetail("JS => Inserted = " + benificiaryCount + " Benificiary Records");
    return --benificiaryCount;
  };

  addBenificiaryAgent = async (_accountKey, _benificiaryKey, _benificiaryRateKey, _accountAgentKey) => {
    logFunctionHeader(
      "addBenificiaryAgent = async(" + _accountKey + ", " + _benificiaryKey + ", " + _benificiaryRateKey + ", " + _accountAgentKey + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");
  
    logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
    await spCoinContractDeployed.addBenificiaryAgent( _accountKey, _benificiaryKey, _benificiaryRateKey, _accountAgentKey );
    logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to BenificiaryKey " + _benificiaryKey);
  };
  
  addBenificiaryAgents = async (_accountKey, _benificiaryKey, _benificiaryRateKey, _agentAccountList) => {
    logFunctionHeader(
      "addBenificiaryAgents = async(" + _accountKey + ", " + _benificiaryKey + ", " + _benificiaryRateKey + ", " + _agentAccountList + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => For Benificiary[" + _benificiaryKey + "]: " + _benificiaryKey + ")");
    logDetail("JS => Inserting " + _agentAccountList.length + " Agents To Blockchain Network"
    );
    logDetail("JS => _agentAccountList = " + _agentAccountList);
  
    let agentSize = _agentAccountList.length;
    logDetail("JS => agentSize.length = " + agentSize);
    let agentCount = 0;
    for (let agentCount = 0; agentCount < agentSize; agentCount++) {
      let agentKey = _agentAccountList[agentCount];
      logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentKey );
      await addBenificiaryAgent( _accountKey, _benificiaryKey, _benificiaryRateKey, agentKey );
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

addAgentRateTransaction = async (
  _accountKey, 
  _benificiaryKey,
  _benificiaryRateKey,
  _accountAgentKey,
  _agentRateKey,
  _transactionQtyKey ) => {
    logFunctionHeader(
      "addAgentRateTransaction = async(" + 
      _accountKey + ", " + 
      _benificiaryKey + ", " + 
      _benificiaryRateKey + ", " + 
      _accountAgentKey + ", " +
      _agentRateKey + ", " +
      _transactionQtyKey + ")"
    );

  await spCoinContractDeployed.addAgentRateTransaction(
    _accountKey,
    _benificiaryKey,
    _benificiaryRateKey,
    _accountAgentKey,
    _agentRateKey,
    _transactionQtyKey );
    logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to BenificiaryKey " + _benificiaryKey);
};

//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
    addAccountRecord,
    addAccountRecords,
    addPatronBenificiarias,
    addAgentRateTransaction,
    addBenificiaryAgent,
    addBenificiaryAgents,
    setContractAddMethods,
}
