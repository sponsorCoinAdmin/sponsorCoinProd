let spCoinContractDeployed;

setContractAddMethods = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
}

addPatronSponsor = async (_accountKey, _sponsorKey) => {
    logFunctionHeader(
      "addPatronSponsor = async(" + _accountKey + ", " + _sponsorKey + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Inserting " + _sponsorKey + " Sponsors To Blockchain Network"
    );
  
    logDetail("JS => Inserting Sponsor " + _sponsorKey );
    await spCoinContractDeployed.addPatronSponsor(_accountKey, _sponsorKey);
  };
  
  addPatronSponsors = async (_accountKey, _sponsorAccountList) => {
    logFunctionHeader(
      "addPatronSponsors = async(" + _accountKey + ", " + _sponsorAccountList + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding " + _sponsorAccountList.length + " Sponsors To Blockchain Network"
    );
  
    let sponsorCount = 0;
    for (sponsorCount; sponsorCount < _sponsorAccountList.length; sponsorCount++) {
      let _sponsorKey = _sponsorAccountList[sponsorCount];
      await addPatronSponsor(_accountKey, _sponsorKey);
    }
    logDetail("JS => Inserted = " + sponsorCount + " Sponsor Records");
    return --sponsorCount;
  };

  addSponsorAgent = async (_accountKey, _sponsorAccountKey, _sponsorRateKey, _accountAgentKey) => {
    logFunctionHeader(
      "addSponsorAgent = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _sponsorRateKey + ", " + _accountAgentKey + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");
  
    logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
    await spCoinContractDeployed.addSponsorAgent( _accountKey, _sponsorAccountKey, _sponsorRateKey, _accountAgentKey );
    logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to SponsorKey " + _sponsorAccountKey);
  };
  
  addSponsorAgents = async (_accountKey, _sponsorAccountKey, _sponsorRateKey, _agentAccountList) => {
    logFunctionHeader(
      "addSponsorAgents = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _sponsorRateKey + ", " + _agentAccountList + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => For Sponsor[" + _sponsorAccountKey + "]: " + _sponsorAccountKey + ")");
    logDetail("JS => Inserting " + _agentAccountList.length + " Agents To Blockchain Network"
    );
    logDetail("JS => _agentAccountList = " + _agentAccountList);
  
    let agentSize = _agentAccountList.length;
    logDetail("JS => agentSize.length = " + agentSize);
    let agentCount = 0;
    for (let agentCount = 0; agentCount < agentSize; agentCount++) {
      let agentAccountKey = _agentAccountList[agentCount];
      logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentAccountKey );
      await addSponsorAgent( _accountKey, _sponsorAccountKey, _sponsorRateKey, agentAccountKey );
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
  _sponsorAccountKey,
  _sponsorRateKey,
  _accountAgentKey,
  _agentRateKey,
  _transactionQtyKey ) => {
    logFunctionHeader(
      "addAgentRateTransaction = async(" + 
      _accountKey + ", " + 
      _sponsorAccountKey + ", " + 
      _sponsorRateKey + ", " + 
      _accountAgentKey + ", " +
      _agentRateKey + ", " +
      _transactionQtyKey + ")"
    );

  await spCoinContractDeployed.addAgentRateTransaction(
    _accountKey,
    _sponsorAccountKey,
    _sponsorRateKey,
    _accountAgentKey,
    _agentRateKey,
    _transactionQtyKey );
    logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to SponsorKey " + _sponsorAccountKey);
};

//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
    addAccountRecord,
    addAccountRecords,
    addPatronSponsors,
    addAgentRateTransaction,
    addSponsorAgent,
    addSponsorAgents,
    setContractAddMethods,
}
