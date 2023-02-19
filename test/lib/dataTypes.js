class accountStruct {
    constructor(address) {
        this.address = address;
        this.sponsors;
        this.index;
        this.insertionTime;
        this.inserted;
        this.KYC;   
      }
 }
 class sponsorRec {
    constructor(address) {
        this.address = address;
        this.rate;
        this.verified;
    }
 }
 class agentRec {
    constructor(address) {
        this.address = address;
        this.rate;
        this.verified;
    }
 }