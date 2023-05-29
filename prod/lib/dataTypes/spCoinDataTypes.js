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
    this.stakingRewardList;
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

class StakingTransactionStruct {
  constructor() {
    this.TYPE = "--STAKING TRANSACTION RECORD--";
    this.insertionTime;
    this.location;
    this.quantity;
  }
}

/// STAKING REWARDS SECTION ////////////////////////////////////////////////////////////////////

class RewardsStruct {
  constructor() {
    this.TYPE = "--REWARDS STRUCTURE--";
    this.totalStakingRewards;
    this.sponsorRewardsList;
    this.recipientRewardsList;
    this.agentRewardsList;
  }
}

class RewardTypeStruct {
  constructor() {
    this.TYPE = "--REWARD TYPE STRUCTURE--";
    this.rewardType;
    this.stakingRewards;
    this.rewardAccountList;
  }
}

class RewardAccountStruct {
  constructor() {
    this.TYPE = "--REWARD ACCOUNT--";
    this.sourceKey;
    this.rate;
    this.stakingRewards;
  }
}

class RewardTransactionStruct {
  constructor() {
    this.TYPE = "--REWARD TRANSACTION--";
    this.rate;
    this.updateTime;
    this.stakingRewards;
  }
}

module.exports = {
  RewardAccountStruct,
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  RecipientStruct,
  RecipientRateStruct,
  RewardTransactionStruct,
  RewardTypeStruct,
  RewardsStruct,
  StakingTransactionStruct,
};
