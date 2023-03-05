class AccountStruct {
  constructor() {
    this.index;
    this.accountKey;
    this.insertionTime;
    this.verified;
    this.KYC;
    this.sponsoredAccountKeys;
    this.sponsorArr;
    this.agentKeys;
    this.patreonAccountKeys;
  }
}

class SponsorStruct {
  constructor() {
    this.index;
    this.sponsorKey;
    this.insertionTime;
    this.verified;
    this.rates;
    this.verified;
    this.agentKeys;
    this.agentArr;
  }
}

class AgentStruct {
  constructor() {
    this.index;
    this.agentKey;
    this.insertionTime;
    this.verified;
    this.rates;
  }
}

class RateHeaderStruct {
  constructor() {
    this.insertionTime;
    this.lastUpdateTime;
    this.totalQuantity;
    this.TransactionStruct = [];
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
  RateHeaderStruct,
  TransactionStruct
};
