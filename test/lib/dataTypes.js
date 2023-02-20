class accountStruct {
    constructor(address) {
        this.index;
        this.insertionTime;
        this.inserted;
        this.verified;
        this.KYC;   


        this.address = address;
        this.sponsors;
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