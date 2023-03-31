let spCoinContractDeployed;

setContractAddMethods = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
}

addPatreonSponsor = async (_accountKey, _sponsorKey) => {
    logFunctionHeader(
      "addPatreonSponsor = async(" + _accountKey + ", " + _sponsorKey + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Inserting " + _sponsorKey + " Sponsors To Blockchain Network"
    );
  
    logDetail("JS => Inserting Sponsor " + _sponsorKey );
    await spCoinContractDeployed.addPatreonSponsor(_accountKey, _sponsorKey);
  };
  
  addPatreonSponsors = async (_accountKey, _accountSponsorKeys) => {
    logFunctionHeader(
      "addPatreonSponsors = async(" + _accountKey + ", " + _accountSponsorKeys + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding " + _accountSponsorKeys.length + " Sponsors To Blockchain Network"
    );
  
    let sponsorCount = 0;
    for (sponsorCount; sponsorCount < _accountSponsorKeys.length; sponsorCount++) {
      let _sponsorKey = _accountSponsorKeys[sponsorCount];
      await addPatreonSponsor(_accountKey, _sponsorKey);
    }
    logDetail("JS => Inserted = " + sponsorCount + " Sponsor Records");
    return --sponsorCount;
  };

  addSponsorAgent = async (_accountKey, _sponsorAccountKey, _sponsorRate, _accountAgentKey) => {
    logFunctionHeader(
      "addSponsorAgent = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _sponsorRate + ", " + _accountAgentKey + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");
  
    logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
    await spCoinContractDeployed.addSponsorAgent( _accountKey, _sponsorAccountKey, _sponsorRate, _accountAgentKey );
    logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to SponsorKey " + _sponsorAccountKey);
  };
  
  addSponsorAgents = async (_accountKey, _sponsorAccountKey, _sponsorRate, _accountAgentKeys) => {
    logFunctionHeader(
      "addSponsorAgents = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _sponsorRate + ", " + _accountAgentKeys + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => For Sponsor[" + _sponsorAccountKey + "]: " + _sponsorAccountKey + ")");
    logDetail("JS => Inserting " + _accountAgentKeys.length + " Agents To Blockchain Network"
    );
    logDetail("JS => _accountAgentKeys = " + _accountAgentKeys);
  
    let agentSize = _accountAgentKeys.length;
    logDetail("JS => agentSize.length = " + agentSize);
    let agentCount = 0;
    for (let agentCount = 0; agentCount < agentSize; agentCount++) {
      let agentAccountKey = _accountAgentKeys[agentCount];
      logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentAccountKey );
      await addSponsorAgent( _accountKey, _sponsorAccountKey, _sponsorRate, agentAccountKey );
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
  _sponsorRate,
  _accountAgentKey,
  _rateKey,
  _transactionQtyKey ) => {
  logFunctionHeader(
    "addAgentRateTransaction = async(" + 
    _accountKey + ", " + 
    _sponsorAccountKey + ", " + 
    _accountAgentKey + 
    _rateKey + 
    _transactionQtyKey + ")"
  );

  logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
  logDetail("JS => Adding Transaction " + _transactionQtyKey + " To Blockchain Network");

  logDetail("JS =>  " + _accountKey + ". " + "Inserting Transaction[" + _rateKey + "]: " + _transactionQtyKey );
  await spCoinContractDeployed.addAgentRateTransaction(
    _accountKey,
    _sponsorAccountKey,
    _sponsorRate,
    _accountAgentKey,
    _rateKey,
    _transactionQtyKey );
    logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to SponsorKey " + _sponsorAccountKey);
};

//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
    addAccountRecord,
    addAccountRecords,
    addPatreonSponsors,
    addAgentRateTransaction,
    addSponsorAgent,
    addSponsorAgents,
    setContractAddMethods,
}
