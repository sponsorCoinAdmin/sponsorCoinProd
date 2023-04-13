class AccountStruct {
  constructor() {
    this.accountKey;
    this.balanceOf;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.patronAccountList;
    this.sponsorAccountList;
    this.agentAccountList;
    this.parentSponsorAccountList;
    this.sponsorRecordList;
//    this.KYC;
  }
}

class SponsorStruct {
  constructor() {
    this.sponsorKey;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.sponsorRateList;
  }
}


class SponsorRateStruct {
  constructor() {
    this.sponsorRate;
    this.stakedSPCoins;
    this.insertionTime;
    this.lastUpdateTime;
    this.transactions;
    this.agentAccountList;
    this.sponsorRecordList;
  }
}

class AgentStruct {
  constructor() {
    this.agentKey;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.agentRateList;
  }
}

class AgentRateStruct {
  constructor() {
    this.agentRate;
    this.stakedSPCoins;
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
