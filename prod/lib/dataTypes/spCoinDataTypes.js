class AccountStruct {
  constructor() {
    this.TYPE = "--ACCOUNT--";
    this.accountKey;
    this.balanceOf;
    this.stakedSPCoins;
    this.creationTime;
    this.verified;
    this.sponsorAccountList;
    this.recipientAccountList;
    this.agentAccountList;
    this.agentsParentRecipientAccountList;
    this.recipientRecordList;
    this.stakingRewardsList;
//    this.KYC;
  }
}

class RecipientStruct {
  constructor() {
    this.TYPE = "--RECIPIENT_RECORD--";
    this.recipientKey;
    this.creationTime;
    this.stakedSPCoins;
    this.verified;
    this.recipientRateRecordList;
  }
}

class RecipientRateStruct {
  constructor() {
    this.TYPE = "--RECIPIENT_RATE--";
    this.recipientRate;
    this.creationTime;
    this.lastUpdateTime;
    this.stakedSPCoins;
    this.transactions;
    this.agentAccountList;
    this.agentRecordList;
  }
}

class AgentStruct {
  constructor() {
    this.TYPE = "--AGENT_RECORD--";
    this.agentKey;
    this.stakedSPCoins;
    this.creationTime;
    this.verified;
    this.agentRateList;
  }
}

class AgentRateStruct {
  constructor() {
    this.TYPE = "--AGENT_RATE--";
    this.agentRate;
    this.stakedSPCoins;
    this.creationTime;
    this.lastUpdateTime;
    this.transactions;
  }
}

class TransactionStruct {
  constructor() {
    this.insertionTime;
    this.location;
    this.quantity;
  }
}

class StakingRewardStruct {
  constructor() {
    this.sourceKey;
    this.sourceType;
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
  TransactionStruct,
  StakingRewardStruct
};
