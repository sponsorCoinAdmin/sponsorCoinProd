let prefix = "";
let indentation = 2;

class AccountStruct {
  constructor(_accountKey) {
    this.index;
    this.accountKey = _accountKey;
    this.insertionTime;
    this.inserted;
    this.verified;
    this.KYC;
    this.sponsorKeys;
    this.sponsorArr;
  }
}

class SponsorStruct {
  constructor(_sponsorKey) {
    this.index;
    this.parentAccountKey;
    this.sponsorKey = _sponsorKey;
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
  constructor(_agentKey) {
    this.index;
    this.parentSponsorKey;
    this.agentKey = _agentKey;
    this.insertionTime;
    this.inserted;
    this.verified;
    this.rates;
  }
}

class RateHeaderStruct {
  constructor(_rate) {
    this.insertionTime;
    this.lastUpdateTime;
    this.totalQuantity;
    this.TransactionStruct = [];
  }
}

class TransactionStruct {
  constructor(_quantity) {
    this.insertionTime;
    this.quantity = _quantity;
  }
}

module.exports = {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct
};
