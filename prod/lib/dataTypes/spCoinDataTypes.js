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

class StakingRewardsStruct {
  constructor() {
    this.TYPE = "--STAKING REWARDS--";
    this.stakingRewards;
    this.agentRewardsList;
    this.recipientRewardsList;
    this.sponsorRewardsList;
  }
}

class AccountRewardsStruct {
  constructor() {
    this.TYPE = "--ACCOUNT REWARDS--";
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
/*
struct StakingTransactionStruct {
  uint256 insertionTime;
  uint256 stakingRewards;
  address[] sourceList;
}

struct StakingAccountStruct {
  uint256 stakingRewards;
  RewardsTransactionStruct[] rewardTransactionList;
}

struct RewardsTransactionStruct {
  uint256 rate;
  uint256 updateTime;
  uint256 stakingRewards;
}
*/

module.exports = {
  AccountRewardsStruct,
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  RecipientStruct,
  RecipientRateStruct,
  RewardTransactionStruct,
  StakingRewardsStruct,
  StakingTransactionStruct,
};
