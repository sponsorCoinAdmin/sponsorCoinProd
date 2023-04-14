class AccountStruct {
  constructor() {
    this.accountKey;
    this.balanceOf;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.patronAccountList;
    this.recipientAccountList;
    this.agentAccountList;
    this.parentRecipientAccountList;
    this.recipientRecordList;
//    this.KYC;
  }
}

class RecipientStruct {
  constructor() {
    this.recipientKey;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.recipientRateList2;
  }
}


class RecipientRateStruct {
  constructor() {
    this.recipientRate;
    this.stakedSPCoins;
    this.insertionTime;
    this.lastUpdateTime;
    this.transactions;
    this.agentAccountList;
    this.recipientRecordList;
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
  RecipientStruct,
  RecipientRateStruct,
  TransactionStruct
};
