class accountStruct {
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
 class sponsorStruct {
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

 class agentStruct {
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

class rateStruct {
    constructor(rate) {
        this.insertionTime;
        this.lastUpdateTime;
        this.totalQuantity;
        this.rate = [];
        this.transactionStruct = [];
    }
}

class transactionStruct {
    constructor(rate) {
        this.insertionTime;
        this.quantity;
     }
 }
