class AccountStruct {
  constructor() {
    this.accountKey;
    this.balanceOf;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.patreonAccountKeys;
    this.sponsorAccountKeys;
    this.agentAccountKeys;
    this.parentSponsorAccountKeys;
    this.sponsorRecordList;
//    this.KYC;
  }
}

class SponsorStruct {
  constructor() {
    this.sponsorAccountKey;
    this.totalAgentsSponsored;
    this.insertionTime;
    this.verified;
    this.sponsorRateList;
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
    this.sponsorRecordList;
  }
}

class AgentStruct {
  constructor() {
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
