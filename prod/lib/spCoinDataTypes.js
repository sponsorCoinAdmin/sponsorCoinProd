class AccountStruct {
  constructor() {
    this.TYPE = "--ACCOUNT--";
    this.accountKey;
    this.balanceOf;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.sponsorAccountList;
    this.recipientAccountList;
    this.agentAccountList;
    this.agentsParentRecipientAccountList;
    this.recipientRecordList;
//    this.KYC;
  }
}

class RecipientStruct {
  constructor() {
    this.TYPE = "--RECIPIENT--";
    this.recipientKey;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.recipientRateRecordList;
  }
}


class RecipientRateStruct {
  constructor() {
    this.TYPE = "--RECIPIENT_RATES--";
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
    this.TYPE = "--AGENT--";
    this.agentKey;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.agentRateRecordList;
  }
}

class AgentRateStruct {
  constructor() {
    this.TYPE = "--AGENT_RATES--";
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
