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
    this.parentRecipientAccountList;
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
    this.recipientRateList2;
  }
}


class RecipientRateStruct {
  constructor() {
    this.TYPE = "--RECIPIENT_RATE--";
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
    this.agentRateList;
  }
}

class AgentRateStruct {
  constructor() {
    this.TYPE = "--AGENT_RATE--";
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
