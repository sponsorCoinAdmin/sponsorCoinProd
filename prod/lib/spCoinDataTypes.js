class AccountStruct {
  constructor() {
    this.index;
    this.accountKey;
    this.balanceOf;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.accountPatreonKeys;
    this.agentRecKeys;
    this.agentAccountKeys;
    this.accountParentSponsorKeys;
    this.sponsorRecordList;
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
  }
}


class SponsorRateStruct {
  constructor() {
    this.sponsorRate;
    this.totalTransactionsSponsored;
    this.insertionTime;
    this.lastUpdateTime;
    this.transactions;
    this.agentAccountKeys;
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

class AgentRateStruct {
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
  AgentRateStruct,
  AgentStruct,
  SponsorStruct,
  SponsorRateStruct,
  TransactionStruct
};
