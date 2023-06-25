/*
struct SponsorCoinHeader {
  string  name;
  string  symbol;
  uint256 decimals;
  uint    annualInflation;
  uint256 totalSupply;
  uint256 totalBalanceOf;
  uint256 totalStakedSPCoins; // Coins Owned but steaked to recipients
  uint256 totalStakingRewards; // Coins not owned but Recipiented

  address[] masterAccountList;
  // mapping(address => AccountStruct) accountMap;
}
*/ 

class SponsorCoinHeader {
  // Initialize values to maintain output display order
  constructor() {
    this.TYPE = "--SPONSOR COIN HEADER--";
    this.name = "ToDo";
    this.symbol = "ToDo";
    this.decimals = "ToDo";
    this.creationTime = "ToDo";
    this.annualInflation = "ToDo";
    this.totalSupply = "ToDo";
    this.totalBalanceOf = "ToDo";
    this.totalStakedSPCoins = "ToDo";
    this.totalStakingRewards = "ToDo";
    this.recipientRecordList = "ToDo";
    this.masterAccountList = "ToDo";
  }
}

class AccountStruct {
  // Initialize values to maintain output display order
  constructor() {
    this.TYPE = "--ACCOUNT--";
    this.accountKey = 0;
    this.balanceOf = 0;
    this.stakedSPCoins = 0;
    this.creationTime = 0;
    this.verified = false;
    this.sponsorAccountList = 0;
    this.recipientAccountList = 0;
    this.agentAccountList = 0;
    this.agentsParentRecipientAccountList = 0;
    this.recipientRecordList = 0;
    this.stakingRewards = 0;
    this.stakingRewardList = 0;
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
    this.sponsorRewardsList;
    this.recipientRewardsList;
    this.agentRewardsList;
  }
}

class RewardTypeStruct {
  constructor() {
    this.TYPE;
    this.stakingRewards;
    this.rewardAccountList;
  }
}

class RewardAccountStruct {
  constructor() {
    this.TYPE = "--REWARD ACCOUNT--";
    this.sourceKey;
    this.stakingRewards;
    this.rateList;
  }
}

class RewardRateStruct {
  constructor() {
    this.TYPE = "--REWARD RATE--";
    this.rate;
    this.stakingRewards;
    this.rewardTransactionList;
  }
}

class RewardTransactionStruct {
  constructor() {
    this.TYPE = "--REWARD TRANSACTION--";
    this.updateTime;
    this.stakingRewards;
  }
}

module.exports = {
  AccountStruct,
  AgentRateStruct,
  AgentStruct,
  RewardRateStruct,
  RecipientStruct,
  RecipientRateStruct,
  RewardAccountStruct,
  RewardsStruct,
  RewardTransactionStruct,
  RewardTypeStruct,
  SponsorCoinHeader,
  StakingTransactionStruct,
};
