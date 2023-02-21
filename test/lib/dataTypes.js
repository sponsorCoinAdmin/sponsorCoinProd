class AccountStruct {
    constructor(address) {
        this.index;
        this.account = address;
        this.insertionTime;
        this.inserted;
        this.verified;
        this.KYC;   
        this.sponsors = [];
        this.sponsorMap = Map;
      }
 }
 class SponsorStruct {
    constructor(address) {
        this.index;
        this.parentAccount;
        this.sponsor = address;
        this.insertionTime;
        this.inserted;
        this.verified;
        this.rate;
        this.verified;
        this.sponsors = [];
        this.sponsorMap = Map;
    }
 }

 class AgentStruct {
    constructor(address) {
        this.index;
        this.parentSponsor;
        this.agent = address;
        this.insertionTime
        this.inserted;
        this.verified;
        this.rates = [];
        this.rateMap = Map;
    }
 }

class RateStruct {
    constructor(rate) {
        this.insertionTime;
        this.lastUpdateTime;
        this.totalQuantity;
        this.rate = [];
        this.TransactionStruct = [];
    }
}

class TransactionStruct {
    constructor(rate) {
        this.insertionTime;
        this.quantity;
     }
 }

module.exports = {
    AccountStruct,
    SponsorStruct,
    AgentStruct,
    RateStruct,
    TransactionStruct
}
