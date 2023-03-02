let prefix = "";
let indentation = 2;

class AccountStruct {
  constructor() {
    this.index;
    this.accountKey;
    this.insertionTime;
    this.inserted;
    this.verified;
    this.KYC;
    this.sponsorKeys;
    this.sponsorArr;
    this.agentKeys;
    this.beneficiaryKeys;
  }
}

class SponsorStruct {
  constructor() {
    this.index;
    this.parentAccountKey;
    this.sponsorKey;
    this.insertionTime;
    this.inserted;
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
    this.parentSponsorKey;
    this.agentKey;
    this.insertionTime;
    this.inserted;
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
