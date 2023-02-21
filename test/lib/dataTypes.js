const EOLN = "\n"

class AccountStruct {
    constructor(_accountKey) {
        this.index;
        this.accountKey = _accountKey;
        this.insertionTime;
        this.inserted;
        this.verified;
        this.KYC;   
        this.sponsorKeys = [];
        this.sponsorMap = new Map;
      }
 }

 class SponsorStruct {
    constructor(_sponsorKey) {
        this.index;
        this.parentAccountKey;
        this.sponsorKey = _sponsorKey;
        this.insertionTime;
        this.inserted;
        this.verified;
        this.rate;
        this.verified;
        this.agentKeys = [];
        this.agentMap = new Map;
    }

    toString = async(prefix) => {
        let str = prefix + "index             = " + this.index + EOLN;
        str    += prefix + "parentAccountKey = " + this.parentAccountKey + EOLN;
        str    += prefix + "sponsorKey       = " + this.sponsorKey + EOLN;
        str    += prefix + "insertionTime    = " + this.insertionTime + EOLN;
        str    += prefix + "inserted         = " + this.inserted + EOLN;
        str    += prefix + "verified         = " + this.verified + EOLN;
        str    += prefix + "rate             = " + this.rate + EOLN;
        str    += prefix + "verified         = " + this.verified + EOLN;
        str    += prefix + "agentKeys        = " + this.agentKeys.toString() + EOLN;
        str    += prefix + "agentMap         = " + this.agentMap.toString() + EOLN;
        return(str);
    }
}

class AgentStruct {
    constructor(_agentKey) {
        this.index;
        this.parentSponsorKey;
        this.agentKey = _agentKey;
        this.insertionTime
        this.inserted;
        this.verified;
        this.rates = new Map;
        this.rateMap = new Map;
    }
 }

class RateHeaderStruct {
    constructor(_rate) {
        this.insertionTime;
        this.lastUpdateTime;
        this.totalQuantity;
        this.rate = new Map;
        this.TransactionStruct = [];
    }
}

class TransactionStruct {
    constructor(_quantity) {
        this.insertionTime;
        this.quantity = _quantity;
     }
 }

module.exports = {
    AccountStruct,
    SponsorStruct,
    AgentStruct,
    RateHeaderStruct,
    TransactionStruct
}
