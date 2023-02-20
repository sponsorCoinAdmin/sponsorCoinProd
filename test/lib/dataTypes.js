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
 class sponsorRec {
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
 class agentRec {
    constructor(address) {
        this.index;
        this.address = address;
        this.rate;
        this.verified;
    }
 }