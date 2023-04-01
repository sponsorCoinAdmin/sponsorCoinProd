class AccountStruct {
  constructor() {
    this.index;
    this.accountKey;
    this.balanceOf;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.accountSponsorKeys;
    this.sponsorRecordList;
    this.accountAgentKeys;
    this.accountPatreonKeys;
    this.accountParentSponsorKeys;
//    this.KYC;
  }
}

class SponsorStruct {
  constructor() {
    this.index;
    this.sponsorAccountKey;
    this.totalAgentsSponsored;
    this.insertionTime;
    this.verified;
    this.sponsorRateList;
    this.verified;
    this.accountAgentKeys;
    this.agentRecordList;
  }
}

class AgentStruct {
  constructor() {
    this.index;
    this.agentAccountKey;
    this.totalRatesSponsored;
    this.insertionTime;
    this.verified;
    this.agentRateList;
  }
}

class AgentRateHeaderStruct {
  constructor() {
    this.agentRate;
    this.totalTransactionsSponsored;
    this.insertionTime;
    this.lastUpdateTime;
    this.transactions;
  }
}

class TransactionStruct {
  constructor() {
    this.insertionTime;
    this.quantity;
  }
}

module.exports = {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  AgentRateHeaderStruct,
  TransactionStruct
};
