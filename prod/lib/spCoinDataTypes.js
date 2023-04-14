class AccountStruct {
  constructor() {
    this.accountKey;
    this.balanceOf;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.patronAccountList;
    this.benificiaryAccountList;
    this.agentAccountList;
    this.parentBenificiaryAccountList;
    this.benificiaryRecordList;
//    this.KYC;
  }
}

class BenificiaryStruct {
  constructor() {
    this.benificiaryKey;
    this.stakedSPCoins;
    this.insertionTime;
    this.verified;
    this.benificiaryRateList2;
  }
}


class BenificiaryRateStruct {
  constructor() {
    this.benificiaryRate;
    this.stakedSPCoins;
    this.insertionTime;
    this.lastUpdateTime;
    this.transactions;
    this.agentAccountList;
    this.benificiaryRecordList;
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
  BenificiaryStruct,
  BenificiaryRateStruct,
  TransactionStruct
};
